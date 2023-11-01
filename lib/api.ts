import { Workspace } from '@prisma/client';
import { notFound } from 'next/navigation';

export const getWorkspace = async (workspace_name: string, userId: string) => {
	const res = await fetch(
		`http://localhost:3000/api/workspace/get/workspace_details/${workspace_name}?userId=${userId}`,
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

export const getWorkspaces = async (userId: string) => {
	const res = await fetch(
		`http://localhost:3000/api/workspace/get/user_workspaces?userId=${userId}`,
		{
			method: 'GET',
			cache: 'no-store',
		}
	);
	if (!res.ok) {
		return [];
	}
	return res.json() as Promise<Workspace[]>;
};
