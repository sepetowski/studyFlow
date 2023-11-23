import { DashboardHeader } from '@/components/header/DashboardHeader';
import { InviteUsers } from '@/components/inviteUsers/InviteUsers';
import { TaskContener } from '@/components/tasks/contener/TaskContener';
import { getUserWorkspaceRole, getWorkspace } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

interface Params {
	params: {
		workspace_id: string;
		task_id: string;
	};
}

const Task = async ({ params: { workspace_id, task_id } }: Params) => {
	
	const session = await checkIfUserCompletedOnboarding(
		`/dashboard/workspace/${workspace_id}/tasks/task/${task_id}`
	);

	const [workspace, userRole] = await Promise.all([
		getWorkspace(workspace_id, session.user.id),
		getUserWorkspaceRole(workspace_id, session.user.id),
	]);

	return (
		<>
			<DashboardHeader hideBreadCrumb>
				{(userRole === 'ADMIN' || userRole === 'OWNER') && <InviteUsers workspace={workspace} />}
			</DashboardHeader>
			<main className='flex flex-col gap-2 min-h-[40rem] '>
				<TaskContener taskId={task_id} workspaceId={workspace_id} initialActiveTags={[]} />
			</main>
		</>
	);
};
export default Task;
