import { type ClassValue, clsx } from 'clsx';
import { Home, CalendarDays, Star, User, Clock } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import dayjs from 'dayjs';
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getMonth = (month = dayjs().month()) => {
	const year = dayjs().year();
	const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

	let currentMonthCount = 1 - firstDayOfMonth;

	const daysMatrix = new Array(5).fill([]).map(() => {
		return new Array(7).fill(null).map(() => {
			currentMonthCount++;
			return dayjs(new Date(year, month, currentMonthCount));
		});
	});

	if (firstDayOfMonth === 1) {
		const firstWeek = daysMatrix[0];
		const previousMonth = month === 0 ? 11 : month - 1;
		const previousYear = month === 0 ? year - 1 : year;
		const lastDayOfPreviousMonth = dayjs(new Date(year, previousMonth + 1, 0)).date();

		for (let i = 7 - firstWeek.length; i > 0; i--) {
			const day = lastDayOfPreviousMonth - i + 1;
			firstWeek.unshift(dayjs(new Date(previousYear, previousMonth, day)));
		}
	}

	return daysMatrix;
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
		include: '/dashboard/pomodoro',
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
