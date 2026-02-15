import type { State, TasukuTheme } from '../types.ts';

export const getIcon = (
	state: State,
	hasChildren: boolean,
	theme: TasukuTheme,
	spinnerFrame: number,
): string => {
	switch (state) {
		case 'loading': { return hasChildren ? theme.icons.parent : theme.spinner[spinnerFrame];
		}
		case 'success': { return hasChildren ? theme.icons.parent : theme.icons.success;
		}
		case 'error': { return hasChildren ? theme.icons.parentError : theme.icons.error;
		}
		case 'warning': { return theme.icons.warning;
		}
		default: { return theme.icons.pending;
		}
	}
};
