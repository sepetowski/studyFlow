import {
	ExtendedMindMap,
	ExtendedTask,
	ExtendedWorkspace,
	HomeRecentActivity,
	SettingsWorkspace,
} from '@/types/extended';
import { PomodoroSettings, UserPermisson, Workspace } from '@prisma/client';
import { notFound } from 'next/navigation';
import { ACTIVITY_PER_PAGE } from './constants';

export const domain =
	process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'http://localhost:3000';

export const getWorkspace = async (workspace_id: string, user_id: string) => {
	const res = await fetch(
		`${domain}/api/workspace/get/workspace_details/${workspace_id}?userId=${user_id}`,
		{
			method: 'GET',
			cache: 'no-store',
		}
	);
	if (!res.ok) {
		return notFound();
	}
	return res.json() as Promise<Workspace>;
};

export const getWorkspaceWithChatId = async (workspace_id: string, user_id: string) => {
	const res = await fetch(
		`${domain}/api/workspace/get/workspace_with_chat/${workspace_id}?userId=${user_id}`,
		{
			method: 'GET',
			cache: 'no-store',
		}
	);
	if (!res.ok) {
		return notFound();
	}
	return res.json() as Promise<ExtendedWorkspace>;
};

export const getWorkspaceSettings = async (workspace_id: string, user_id: string) => {
	const res = await fetch(
		`${domain}/api/workspace/get/settings/${workspace_id}?userId=${user_id}`,
		{
			method: 'GET',
			cache: 'no-store',
		}
	);
	if (!res.ok) {
		return notFound();
	}
	return res.json() as Promise<SettingsWorkspace>;
};

export const getWorkspaces = async (user_id: string) => {
	const res = await fetch(`${domain}/api/workspace/get/user_workspaces?userId=${user_id}`, {
		method: 'GET',
		cache: 'no-store',
	});
	if (!res.ok) {
		return [];
	}
	return res.json() as Promise<Workspace[]>;
};

export const getUserAdminWorkspaces = async (user_id: string) => {
	const res = await fetch(`${domain}/api/workspace/get/user_admin_workspaces?userId=${user_id}`, {
		method: 'GET',
		cache: 'no-store',
	});
	if (!res.ok) {
		return [];
	}
	return res.json() as Promise<Workspace[]>;
};

export const getUserWorkspaceRole = async (workspace_id: string, user_id: string) => {
	const res = await fetch(
		`${domain}/api/workspace/get/user_role?workspaceId=${workspace_id}&userId=${user_id}`,
		{
			method: 'GET',
			cache: 'no-store',
		}
	);
	if (!res.ok) {
		return null;
	}
	return res.json() as Promise<UserPermisson>;
};

export const getTask = async (task_id: string, user_id: string) => {
	const res = await fetch(`${domain}/api/task/get/details/${task_id}?userId=${user_id}`, {
		method: 'GET',
		cache: 'no-store',
	});
	if (!res.ok) {
		return notFound();
	}
	return res.json() as Promise<ExtendedTask>;
};

export const getMindMap = async (mind_map_id: string, user_id: string) => {
	const res = await fetch(`${domain}/api/mind_maps/get/details/${mind_map_id}?userId=${user_id}`, {
		method: 'GET',
		cache: 'no-store',
	});
	if (!res.ok) {
		return notFound();
	}
	return res.json() as Promise<ExtendedMindMap>;
};
export const getUserPomodoroSettings = async (user_id: string) => {
	const res = await fetch(`${domain}/api/pomodoro/get_settings?userId=${user_id}`, {
		method: 'GET',
		cache: 'no-store',
	});
	if (!res.ok) {
		return notFound();
	}
	return res.json() as Promise<PomodoroSettings>;
};
export const getInitialHomeRecentActivitiy = async (userId: string) => {
	const res = await fetch(
		`${domain}/api/home_page/get?userId=${userId}&page=${1}&take=${ACTIVITY_PER_PAGE}`,
		{
			method: 'GET',
			cache: 'no-store',
		}
	);
	if (!res.ok) {
		return notFound();
	}
	return res.json() as Promise<HomeRecentActivity[]>;
};
