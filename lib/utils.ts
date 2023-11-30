import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const color = z.enum([
	'PURPLE',
	'RED',
	'GREEN',
	'BLUE',
	'PINK',
	'YELLOW',
	'ORANGE',
	'CYAN',
	'FUCHSIA',
	'LIME',
	'EMERALD',
	'INDIGO',
]);

