/**
 * Intercept raw writes to a single stream so a renderer can react to output it
 * didn't produce — `process.stderr.write(...)` and the like that bypass
 * `console.*` (which is handled separately by patch-console).
 *
 * Scoped per stream: only registrants on the same stream coordinate, so
 * renderers writing to unrelated streams never affect each other.
 *
 * A registrant writes its own output via the returned `write()`, which marks it
 * as that registrant's own — its hooks are skipped (no reacting to itself),
 * while other registrants on the same stream still see it and stay in sync.
 */

// `fromPeer` is true when the write came from another registrant's write()
// (i.e. another renderer on this stream), false for a genuine external write
// (console.* bypasses this; app/library raw writes, child output, etc.). A
// renderer that reacts by writing (re-rendering) must ignore peer writes to
// avoid cascading with another such renderer; offset-only reactions can react
// to both.
export type StreamHooks = {
	before?: (data: string, fromPeer: boolean) => void;
	after?: (data: string, fromPeer: boolean, rowCountChange?: number, minOffset?: number) => void;
};

export type StreamController = {
	write: (data: string, rowCountChange?: number, minOffset?: number) => void;
	restore: () => void;
};

type WriteFunction = NodeJS.WriteStream['write'];

type StreamEntry = {
	registrants: Set<StreamHooks>;
	originalWrite: WriteFunction;

	// The registrant whose own output is currently being written to THIS stream.
	// Its hooks are skipped for that write; saved/restored so nested writes (a
	// hook that itself writes) don't lose the outer writer. Scoped per stream so
	// a write to one stream never misreports another stream's writes as peer.
	writing?: StreamHooks;
	rowCountChange?: number;
	minOffset?: number;
};

const streams = new Map<NodeJS.WriteStream, StreamEntry>();

const toText = (chunk: unknown): string => {
	if (typeof chunk === 'string') {
		return chunk;
	}
	if (Buffer.isBuffer(chunk) || chunk instanceof Uint8Array) {
		return Buffer.from(chunk).toString();
	}
	return String(chunk);
};

export const interceptStream = (
	stream: NodeJS.WriteStream,
	hooks: StreamHooks,
): StreamController => {
	let entry = streams.get(stream);
	if (!entry) {
		const originalWrite = stream.write.bind(stream) as WriteFunction;
		const newEntry: StreamEntry = {
			registrants: new Set(),
			originalWrite,
		};
		streams.set(stream, newEntry);
		entry = newEntry;

		stream.write = ((chunk, ...args) => {
			const data = toText(chunk);
			const {
				writing, rowCountChange, minOffset,
			} = newEntry;
			const fromPeer = writing !== undefined;

			for (const registrant of newEntry.registrants) {
				if (registrant !== writing) {
					try { registrant.before?.(data, fromPeer); } catch {}
				}
			}

			// @ts-expect-error forwarding original write args verbatim
			const result = originalWrite(chunk, ...args);

			for (const registrant of newEntry.registrants) {
				if (registrant !== writing) {
					try { registrant.after?.(data, fromPeer, rowCountChange, minOffset); } catch {}
				}
			}

			return result;
		}) as WriteFunction;
	}

	const activeEntry = entry;
	const { registrants } = activeEntry;
	registrants.add(hooks);

	return {
		write: (data, rowCountChange, minOffset) => {
			const previous = activeEntry.writing;
			const previousRowCountChange = activeEntry.rowCountChange;
			const previousMinOffset = activeEntry.minOffset;
			activeEntry.writing = hooks;
			activeEntry.rowCountChange = rowCountChange;
			activeEntry.minOffset = minOffset;
			try {
				stream.write(data);
			} finally {
				activeEntry.writing = previous;
				activeEntry.rowCountChange = previousRowCountChange;
				activeEntry.minOffset = previousMinOffset;
			}
		},
		restore: () => {
			registrants.delete(hooks);
			const current = streams.get(stream);
			if (current && current.registrants.size === 0) {
				stream.write = current.originalWrite;
				streams.delete(stream);
			}
		},
	};
};
