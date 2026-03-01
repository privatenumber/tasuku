// Force color output in the test runner so assertion builders (ansis.red, etc.)
// always produce ANSI codes regardless of the parent environment.
// Child processes manage their own color env via node() and nodePty() helpers.
import { describe } from 'manten';

delete process.env.NO_COLOR;
process.env.FORCE_COLOR = '1';

describe('tasuku', () => {
	// Core API
	import('./specs/api.spec.ts');
	import('./specs/types.spec.ts');

	// Task behavior
	import('./specs/task-states.spec.ts');
	import('./specs/elapsed-time.spec.ts');
	import('./specs/stream-preview.spec.ts');

	// Rendering
	import('./specs/rendering.spec.ts');
	import('./specs/spinner-restart.spec.ts');
	import('./specs/max-visible.spec.ts');

	// Environment
	import('./specs/environment.spec.ts');

	// Console & Lifecycle
	import('./specs/console-interleave.spec.ts');
	import('./specs/lifecycle.spec.ts');

	// Unit tests
	import('./specs/format-elapsed.spec.ts');
	import('./specs/task-list.spec.ts');
	import('./specs/truncate-line.spec.ts');
	import('./specs/get-icon.spec.ts');
	import('./specs/reactive.spec.ts');
	import('./specs/format-task-line.spec.ts');
	import('./specs/format-task-output.spec.ts');

	// Inline renderer
	import('./specs/inline-renderer.spec.ts');

	// Factory
	import('./specs/create-tasuku.spec.ts');
	import('./specs/claude-theme.spec.ts');
	import('./specs/blink-theme.spec.ts');
	import('./specs/codex-theme.spec.ts');

	import('./specs/patch-console.spec.ts');
});
