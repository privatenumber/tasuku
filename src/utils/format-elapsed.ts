export const formatElapsed = (ms: number): string => {
	const seconds = Math.floor(ms / 1000);
	if (seconds < 60) {
		return `(${seconds}s)`;
	}
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) {
		const remainingSeconds = seconds % 60;
		return `(${minutes}m ${remainingSeconds}s)`;
	}
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;
	return `(${hours}h ${remainingMinutes}m)`;
};
