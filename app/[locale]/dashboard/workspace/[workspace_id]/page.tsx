import { DashboardHeader } from '@/components/header/DashboardHeader';
import { InviteUsers } from '@/components/inviteUsers/InviteUsers';
import { MindMap } from '@/components/mindMaps/MindMap';
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
			</DashboardHeader>
			<main className='flex flex-col gap-2 h-full'>
				{workspace.name} {workspace.id}
			</main>
		</>
	);
};
export default Workspace;
