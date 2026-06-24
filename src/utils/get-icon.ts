import type { State } from '../types.ts';
import { icons, spinner } from '../style.ts';

export const getIcon = (
	state: State,
	hasChildren: boolean,
	spinnerFrame: number,
): string => {
	switch (state) {
		case 'loading': { return hasChildren ? icons.parent : spinner[spinnerFrame];
		}
		case 'success': { return hasChildren ? icons.parent : icons.success;
		}
		case 'error': { return hasChildren ? icons.parentError : icons.error;
		}
		case 'warning': { return icons.warning;
		}
		case 'skipped': { return icons.skipped;
		}
		default: { return icons.pending;
		}
	}
};
