import { AddTaskShortcut } from '@/components/addTaskShortcut/AddTaskShortcut';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { InviteUsers } from '@/components/inviteUsers/InviteUsers';
import { TaskContener } from '@/components/tasks/editable/contener/TaskContener';
import { AutosaveIndicatorProvider } from '@/context/AutosaveIndicator';
import { getTask, getUserWorkspaceRole, getWorkspace } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { redirect } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface Params {
	params: {
		workspace_id: string;
		task_id: string;
	};
}

const EditTask = async ({ params: { workspace_id, task_id } }: Params) => {
	const session = await checkIfUserCompletedOnboarding(
		`/dashboard/workspace/${workspace_id}/tasks/task/${task_id}/edit`
	);

	const [workspace, userRole, task] = await Promise.all([
		getWorkspace(workspace_id, session.user.id),
		getUserWorkspaceRole(workspace_id, session.user.id),
		getTask(task_id, session.user.id),
	]);

	if (!workspace || !userRole || !task) notFound();

	const candEdit =
		userRole === 'ADMIN' || userRole === 'OWNER' || userRole === 'CAN_EDIT' ? true : false;

	if (!candEdit) redirect(`/dashboard/workspace/${workspace_id}/tasks/task/${task_id}`);

	return (
		<AutosaveIndicatorProvider>
			<DashboardHeader showBackBtn hideBreadCrumb showSavingStatus>
				{(userRole === 'ADMIN' || userRole === 'OWNER') && <InviteUsers workspace={workspace} />}
				<AddTaskShortcut userId={session.user.id} />
			</DashboardHeader>
			<main className='flex flex-col gap-2 '>
				<TaskContener
					taskId={task_id}
					title={task.title}
					content={task.content as unknown as JSON}
					emoji={task.emoji}
					from={task?.taskDate?.from}
					to={task?.taskDate?.to}
					workspaceId={workspace_id}
					initialActiveTags={task.tags}
				/>
			</main>
		</AutosaveIndicatorProvider>
	);
};
export default EditTask;
