import { Writable } from 'node:stream';
import { describe, test, expect } from 'manten';
import { interceptStream } from '../../src/utils/intercept-stream.ts';

// A stream that records what's actually written to it (after interception).
const recordingStream = () => {
	const written: string[] = [];
	const stream = new Writable({
		write(chunk, _encoding, callback) {
			written.push(chunk.toString());
			callback();
		},
	}) as unknown as NodeJS.WriteStream;
	return {
		stream,
		written,
	};
};

describe('interceptStream', () => {
	test('hooks fire for external writes; the write still reaches the stream', () => {
		const { stream, written } = recordingStream();
		const before: string[] = [];
		const after: string[] = [];

		const handle = interceptStream(stream, {
			before: data => before.push(data),
			after: data => after.push(data),
		});

		stream.write('hello\n');

		expect(before).toEqual(['hello\n']);
		expect(after).toEqual(['hello\n']);
		expect(written).toEqual(['hello\n']);

		handle.restore();
	});

	test('a registrant does not see its own write(), but other registrants do', () => {
		const { stream } = recordingStream();
		const own: string[] = [];
		const other: string[] = [];

		const ownHandle = interceptStream(stream, { after: data => own.push(data) });
		const otherHandle = interceptStream(stream, { after: data => other.push(data) });

		ownHandle.write('self\n');

		expect(own).toEqual([]);
		expect(other).toEqual(['self\n']);

		ownHandle.restore();
		otherHandle.restore();
	});

	test('restoring the last registrant restores the original write', () => {
		const { stream, written } = recordingStream();
		const seen: string[] = [];

		const handle = interceptStream(stream, { after: data => seen.push(data) });
		handle.restore();

		stream.write('after restore\n');

		expect(seen).toEqual([]);
		expect(written).toEqual(['after restore\n']);
	});

	test('writes are scoped per stream', () => {
		const a = recordingStream();
		const b = recordingStream();
		const seenA: string[] = [];

		const handleA = interceptStream(a.stream, { after: data => seenA.push(data) });
		const handleB = interceptStream(b.stream, { after: () => {} });

		b.stream.write('to-b\n');
		expect(seenA).toEqual([]);

		handleA.restore();
		handleB.restore();
	});

	// The "currently writing" marker is scoped per stream. A write() in progress
	// on one stream must not make a genuine external write to another stream look
	// like a peer write (fromPeer). Regresses a module-global `writing`.
	test('a write() on one stream does not pollute another stream fromPeer', () => {
		const a = recordingStream();
		const b = recordingStream();
		const bFromPeer: boolean[] = [];

		// A peer on stream A that, when it sees a write, writes externally to B.
		const peerA = interceptStream(a.stream, {
			after: () => { b.stream.write('nested\n'); },
		});
		const writerA = interceptStream(a.stream, {});
		const watcherB = interceptStream(b.stream, {
			after: (_data, fromPeer) => bFromPeer.push(fromPeer),
		});

		// writerA.write marks A as writing; that notifies peerA, which writes to B.
		// B's write is genuinely external, so it must report fromPeer === false.
		writerA.write('x\n');

		expect(bFromPeer).toEqual([false]);

		peerA.restore();
		writerA.restore();
		watcherB.restore();
	});
});
