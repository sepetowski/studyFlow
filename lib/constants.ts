import { HomePageImage } from '@/types/extended';
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

export const homePageHeaderImgs: HomePageImage[] = [
	{
		src: '/images/homeScreen.png',
		alt: 'Home page - dark theme',
	},

	{
		src: '/images/workspacePage.png',
		alt: 'Workspace page - dark theme',
	},
	{
		src: '/images/workspaceFilter.png',
		alt: 'Workspace page - dark theme',
	},
	{
		src: '/images/homeScreenWhite.png',
		alt: 'Home page - light theme',
	},
	{
		src: '/images/workspacePageWhite.png',
		alt: 'Workspace page - light theme',
	},
];

export const homePageTasksImgs: HomePageImage[] = [
	{
		src: '/images/task.png',
		alt: 'task - dark theme',
	},

	{
		src: '/images/task2.png',
		alt: 'task - dark theme',
	},

	{
		src: '/images/task3.png',
		alt: 'task - dark theme',
	},
	{
		src: '/images/taskWhite.png',
		alt: 'task - light theme',
	},
];

export const homePageMindMapsImgs: HomePageImage[] = [
	{
		src: '/images/mindMap3.png',
		alt: 'mindMap - dark theme',
	},
	{
		src: '/images/mindMap1.png',
		alt: 'mindMap - dark theme',
	},

	{
		src: '/images/mindMap2.png',
		alt: 'mindMap - dark theme',
	},

	{
		src: '/images/mindMapWhite.png',
		alt: 'mindMap - light theme',
	},
];

export const homePageRolesAndSettingsImgs: HomePageImage[] = [
	{
		src: '/images/settings1.png',
		alt: 'settings - dark theme',
	},
	{
		src: '/images/settings2.png',
		alt: 'settings - dark theme',
	},
	{
		src: '/images/settings3.png',
		alt: 'settings - dark theme',
	},
];

export const homePagePomodoroImgs: HomePageImage[] = [
	{
		src: '/images/pomodoro1.png',
		alt: 'pomodoro - dark theme',
	},
	{
		src: '/images/pomodoro2.png',
		alt: 'pomodoro - dark theme',
	},
];

export const homePageChatImgs: HomePageImage[] = [
	{
		src: '/images/chat1.png',
		alt: 'chat - dark theme',
	},
	{
		src: '/images/chat2.png',
		alt: 'chat - dark theme',
	},
	{
		src: '/images/chat3.png',
		alt: 'chat - dark theme',
	},
	{
		src: '/images/chat4.png',
		alt: 'chat - dark theme',
	},

	{
		src: '/images/chatWhite.png',
		alt: 'chat - light theme',
	},
];

export const homePageCalendarImgs: HomePageImage[] = [
	{
		src: '/images/calendar.png',
		alt: 'calendar - dark theme',
	},
	{
		src: '/images/calendarWhite.png',
		alt: 'calendar - light theme',
	},
];

export const homePageAssigmentFilterAndStarredImgs: HomePageImage[] = [
	{
		src: '/images/assignedToMe.png',
		alt: 'assigned to user site - dark theme',
	},
	{
		src: '/images/starred.png',
		alt: 'starred tasks and mind maps - dark theme',
	},
	{
		src: '/images/assignedToMeWhite.png',
		alt: 'assigned to user site - light theme',
	},
	{
		src: '/images/starredWhite.png',
		alt: 'starred tasks and mind maps - light theme',
	},
];
