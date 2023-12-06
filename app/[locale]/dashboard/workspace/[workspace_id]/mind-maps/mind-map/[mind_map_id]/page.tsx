import { DashboardHeader } from '@/components/header/DashboardHeader';
import { InviteUsers } from '@/components/inviteUsers/InviteUsers';
import { MindMap } from '@/components/mindMaps/MindMap';
import { TaskContener } from '@/components/tasks/editable/contener/TaskContener';
import { AutoSaveMindMapProvider } from '@/context/AutoSaveMindMap';
import { AutosaveIndicatorProvider } from '@/context/AutosaveIndicator';
import { getMindMap, getTask, getUserWorkspaceRole, getWorkspace } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

interface Params {
	params: {
		workspace_id: string;
		mind_map_id: string;
	};
}

const EditTask = async ({ params: { workspace_id, mind_map_id } }: Params) => {
	const session = await checkIfUserCompletedOnboarding(
		`/dashboard/workspace/${workspace_id}/tasks/task/${mind_map_id}`
	);

	const [workspace, userRole, mindMap] = await Promise.all([
		getWorkspace(workspace_id, session.user.id),
		getUserWorkspaceRole(workspace_id, session.user.id),
		getMindMap(mind_map_id, session.user.id),
	]);

	return (
		<AutosaveIndicatorProvider>
			<AutoSaveMindMapProvider>
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
						{
							name: `${mindMap.title ? mindMap.title : 'UNTITLED'}`,
							href: '/',
							useTranslate: mindMap.title ? false : true,
						},
					]}>
					{(userRole === 'ADMIN' || userRole === 'OWNER') && <InviteUsers workspace={workspace} />}
				</DashboardHeader>
				<main className='flex flex-col gap-2 h-full'>
					<MindMap
						initialActiveTags={mindMap.tags}
						initialInfo={mindMap}
						workspaceId={workspace.id}
						candEdit={false}
					/>
				</main>
			</AutoSaveMindMapProvider>
		</AutosaveIndicatorProvider>
	);
};
export default EditTask;
