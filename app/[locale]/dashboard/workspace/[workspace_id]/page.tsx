import { AddTaskShortcut } from '@/components/addTaskShortcut/AddTaskShortcut';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { InviteUsers } from '@/components/inviteUsers/InviteUsers';
import { PermissionIndicator } from '@/components/permissionIndicator/PermissionIndicator';
import { FilterContainer } from '@/components/workspaceMainPage/filter/FilterContainer';
import { RecentActivityContainer } from '@/components/workspaceMainPage/recentActivity/RecentActivityContainer';
import { ShortcutContainer } from '@/components/workspaceMainPage/shortcuts/ShortcutContainer';
import { FilterByUsersAndTagsInWorkspaceProvider } from '@/context/FilterByUsersAndTagsInWorkspace';
import { getUserWorkspaceRole, getWorkspace } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

interface Params {
	params: {
		workspace_id: string;
	};
}

const Workspace = async ({ params: { workspace_id } }: Params) => {
	const session = await checkIfUserCompletedOnboarding(`/dashboard/workspace/${workspace_id}`);

	const [workspace, userRole] = await Promise.all([
		getWorkspace(workspace_id, session.user.id),
		getUserWorkspaceRole(workspace_id, session.user.id),
	]);

	return (
		<FilterByUsersAndTagsInWorkspaceProvider>
			<DashboardHeader
				addManualRoutes={[
					{
						name: 'DASHBOARD',
						href: '/dashboard',
						useTranslate: true,
					},
					{
						name: workspace.name,
						href: `/dashboard/workspace/${workspace_id}`,
					},
				]}>
				{(userRole === 'ADMIN' || userRole === 'OWNER') && <InviteUsers workspace={workspace} />}
				<AddTaskShortcut userId={session.user.id} />
			</DashboardHeader>
			<main className='flex flex-col gap-2 h-full w-full'>
				<ShortcutContainer workspace={workspace} userRole={userRole} />
				<FilterContainer sessionUserId={session.user.id} workspaceId={workspace.id} />
				<RecentActivityContainer userId={session.user.id} workspaceId={workspace.id} />
			</main>
		</FilterByUsersAndTagsInWorkspaceProvider>
	);
};
export default Workspace;
