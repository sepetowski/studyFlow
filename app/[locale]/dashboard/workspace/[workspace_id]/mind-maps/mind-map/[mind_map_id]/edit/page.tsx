import { DashboardHeader } from '@/components/header/DashboardHeader';
import { InviteUsers } from '@/components/inviteUsers/InviteUsers';
import { LeaveWorkspace } from '@/components/leaveWorksapce/LeaveWorkspace';
import { MindMap } from '@/components/mindMaps/MindMap';
import { TaskContener } from '@/components/tasks/editable/contener/TaskContener';
import { AutoSaveMindMapProvider } from '@/context/AutoSaveMindMap';
import { AutosaveIndicatorProvider } from '@/context/AutosaveIndicator';
import { getMindMap, getTask, getUserWorkspaceRole, getWorkspace } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { redirect } from 'next-intl/server';

interface Params {
	params: {
		workspace_id: string;
		mind_map_id: string;
	};
}

const EditTask = async ({ params: { workspace_id, mind_map_id } }: Params) => {
	const session = await checkIfUserCompletedOnboarding(
		`/dashboard/workspace/${workspace_id}/tasks/task/${mind_map_id}/edit`
	);

	const [workspace, userRole, mindMap] = await Promise.all([
		getWorkspace(workspace_id, session.user.id),
		getUserWorkspaceRole(workspace_id, session.user.id),
		getMindMap(mind_map_id, session.user.id),
	]);
	const candEdit =
		userRole === 'ADMIN' || userRole === 'OWNER' || userRole === 'CAN_EDIT' ? true : false;
	if (!candEdit) redirect(`/dashboard/workspace/${workspace_id}/tasks/task/${mind_map_id}`);

	return (
		<AutosaveIndicatorProvider>
			<AutoSaveMindMapProvider>
				<DashboardHeader showBackBtn hideBreadCrumb showSavingStatus>
					{(userRole === 'ADMIN' || userRole === 'OWNER') && <InviteUsers workspace={workspace} />}
					{userRole !== 'OWNER' && <LeaveWorkspace workspace={workspace} />}
				</DashboardHeader>
				<main className='flex flex-col gap-2 h-full'>
					<MindMap
						initialActiveTags={mindMap.tags}
						initialInfo={mindMap}
						workspaceId={workspace.id}
						candEdit={candEdit}
					/>
				</main>
			</AutoSaveMindMapProvider>
		</AutosaveIndicatorProvider>
	);
};
export default EditTask;
