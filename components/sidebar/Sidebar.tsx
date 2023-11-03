import { getWorkspaces } from '@/lib/api';
import { SidebarContener } from './SidebarContener';
import { getAuthSession } from '@/lib/auth';

export const Sidebar = async () => {
	const session = await getAuthSession();
	if (!session) return null;
	const userWorkspaces = await getWorkspaces(session.user.id);

	return <SidebarContener userWorkspaces={userWorkspaces} userId={session.user.id} />;
};
