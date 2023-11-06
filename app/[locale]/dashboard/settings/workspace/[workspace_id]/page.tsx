import { DashboardHeader } from '@/components/header/DashboardHeader';
import { WorkspaceTab } from '@/components/settings/workspace/WorkspaceTab';
import { getWorkspaceSettings } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

interface Params {
	params: {
		workspace_id: string;
	};
}

const Workspace = async ({ params: { workspace_id } }: Params) => {
	const session = await checkIfUserCompletedOnboarding(
		`/dashboard/settings/workspace/${workspace_id}`
	);
	const workspace = await getWorkspaceSettings(workspace_id, session.user.id);

	return (
		<>
			<DashboardHeader
				className='mb-2 sm:mb-0'
				addManualRoutes={['dashboard', 'settings', workspace.name]}
			/>
			<main className='flex flex-col gap-2'>
				<WorkspaceTab workspace={workspace} />
			</main>
		</>
	);
};
export default Workspace;
