import xterm from '@xterm/headless';

export const createTerminal = (dimensions: {
	cols: number;
	rows: number;
}) => {
	const terminal = new xterm.Terminal({
		...dimensions,
		allowProposedApi: true,
	});

	return {
		terminal,
		// Await parsing before inspecting the buffer or changing terminal dimensions.
		write: (output: string) => new Promise<void>((resolve) => {
			terminal.write(output, resolve);
		}),
		get screen() {
			// Include scrollback and preserve physical row boundaries and interior blank rows.
			const { active } = terminal.buffer;
			const lines = Array.from(
				{ length: active.length },
				(_, index) => active.getLine(index)!.translateToString(true),
			);
			while (lines.at(-1) === '') {
				lines.pop();
			}
			return lines.join('\n');
		},
		[Symbol.dispose]: () => {
			terminal.dispose();
		},
	};
};
