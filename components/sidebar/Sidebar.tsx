import { SidebarContener } from './SidebarContener';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { Workspace } from '@prisma/client';

export const Sidebar = async () => {
	const session = await getAuthSession();
	if (!session) return null;

	let userWorkspaces: Workspace[] = [];

	try {
		const workspaces = await db.workspace.findMany({
			where: {
				creatorId: session.user.id,
			},
		});
		if (!workspaces) userWorkspaces = [];

		userWorkspaces = workspaces;
	} catch (_) {
		userWorkspaces = [];
	}

	return <SidebarContener userWorkspaces={userWorkspaces} />;
};
