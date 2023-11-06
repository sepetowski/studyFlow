import { DashboardHeader } from '@/components/header/DashboardHeader';
import { InviteUsers } from '@/components/inviteUsers/InviteUsers';
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
		<>
			<DashboardHeader addManualRoutes={['dashboard', workspace.name]}>
				{(userRole === 'ADMIN' || userRole === 'OWNER') && <InviteUsers workspace={workspace} />}
			</DashboardHeader>
			<main className='flex flex-col gap-2'>
				{workspace.name} {workspace.id}
			</main>
		</>
	);
};
export default Workspace;
