import { DashboardHeader } from '@/components/header/DashboardHeader';
import { InviteUsers } from '@/components/inviteUsers/InviteUsers';
import { TaskContener } from '@/components/tasks/contener/TaskContener';
import { getTask, getUserWorkspaceRole, getWorkspace } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

interface Params {
	params: {
		workspace_id: string;
		task_id: string;
	};
}

const EditTask = async ({ params: { workspace_id, task_id } }: Params) => {
	console.log(task_id);
	const session = await checkIfUserCompletedOnboarding(
		`/dashboard/workspace/${workspace_id}/tasks/task/${task_id}/edit`
	);

	const [workspace, userRole, task] = await Promise.all([
		getWorkspace(workspace_id, session.user.id),
		getUserWorkspaceRole(workspace_id, session.user.id),
		getTask(task_id, session.user.id),
	]);

	console.log(task_id);
	return (
		<>
			<DashboardHeader hideBreadCrumb>
				{(userRole === 'ADMIN' || userRole === 'OWNER') && <InviteUsers workspace={workspace} />}
			</DashboardHeader>
			<main className='flex flex-col gap-2 min-h-[40rem] '>
				<TaskContener
					taskId={task_id}
					title={task.title}
					content={task.content as unknown as JSON}
					emoji={task.emoji}
					from={task?.date?.from}
					to={task?.date?.to}
					workspaceId={workspace_id}
					initialActiveTags={task.tags}
				/>
			</main>
		</>
	);
};
export default EditTask;
