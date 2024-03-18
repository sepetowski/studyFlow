import {
	Home,
	CalendarDays,
	Star,
	User,
	Clock,
	PencilRuler,
	Workflow,
	MessageSquare,
} from 'lucide-react';
import { z } from 'zod';

export const ACTIVITY_PER_PAGE = 8;
export const MESSAGES_LIMIT = 30;

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

export const homePageHeaderLinks = [
	{
		href: '/',
		Icon: PencilRuler,
		title: 'Tasks & Notes',
	},
	{
		href: '/',
		Icon: Workflow,
		title: 'Mind Maps',
	},
	{
		href: '/',
		Icon: CalendarDays,
		title: 'Calendar',
	},
	{
		href: '/',
		Icon: MessageSquare,
		title: 'Group Chat',
	},
	{
		href: '/',
		Icon: Clock,
		title: 'Pomodoro',
	},
];
