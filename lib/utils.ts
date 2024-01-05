import { type ClassValue, clsx } from 'clsx';
import { Home, BrainCircuit, CalendarDays, Star, User, Clock } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const compareDates = (a: { updated: { at: Date } }, b: { updated: { at: Date } }) => {
	return new Date(a.updated.at).getTime() - new Date(b.updated.at).getTime();
};

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

export const pathsToSoundEffects = {
	ANALOG: '/music/analog.mp3',
	BELL: '/music/bell.mp3',
	BIRD: '/music/bird.mp3',
	CHURCH_BELL: '/music/churchBell.mp3',
	DIGITAL: '/music/digital.mp3',
	FANCY: '/music/fancy.mp3',
} as const;

export const topSidebarLinks = [
	{
		href: '/dashboard',
		Icon: Home,
		hoverTextKey: 'HOME_HOVER',
	},
	{
		href: '/dashboard/pomodoro',
		Icon: Clock,
		hoverTextKey: 'POMODORO_HOVER',
	},
	{
		href: '/dashboard/calendar',
		Icon: CalendarDays,
		hoverTextKey: 'CALENDAR_HOVER',
	},
	{
		href: '/dashboard/starred',
		Icon: Star,
		hoverTextKey: 'STARRED_HOVER',
	},
	{
		href: '/dashboard/assigned-to-me',
		Icon: User,
		hoverTextKey: 'ASSIGNED_TO_ME_HOVER',
	},
];
