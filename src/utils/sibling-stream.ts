// In a shared TTY, stdout and stderr move the same cursor. Returns the other
// real terminal stream that shares the screen with `outputStream`, so a renderer
// can coordinate raw writes to it too. Undefined when there's no shared sibling:
// not both TTYs (e.g. redirection), or a custom/non-standard stream.
export const getSiblingStream = (
	outputStream: NodeJS.WriteStream,
): NodeJS.WriteStream | undefined => {
	const bothStreamsTTY = process.stdout.isTTY === true && process.stderr.isTTY === true;
	if (!bothStreamsTTY) {
		return undefined;
	}
	if (outputStream === process.stderr) {
		return process.stdout;
	}
	if (outputStream === process.stdout) {
		return process.stderr;
	}
	return undefined;
};
