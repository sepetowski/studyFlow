import { AddTaskShortcut } from '@/components/addTaskShortcut/AddTaskShortcut';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { InviteUsers } from '@/components/inviteUsers/InviteUsers';
import { LeaveWorkspace } from '@/components/leaveWorksapce/LeaveWorkspace';
import { PermissionIndicator } from '@/components/permissionIndicator/PermissionIndicator';
import { ReadOnlyContent } from '@/components/tasks/readOnly/ReadOnlyContent';
import { getTask, getUserWorkspaceRole, getWorkspace } from '@/lib/api';
import { changeCodeToEmoji } from '@/lib/changeCodeToEmoji';
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

	const [workspace, userRole, task] = await Promise.all([
		getWorkspace(workspace_id, session.user.id),
		getUserWorkspaceRole(workspace_id, session.user.id),
		getTask(task_id, session.user.id),
	]);

	const isSavedByUser =
		task.savedTask?.find((task) => task.userId === session.user.id) !== undefined;

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
					{
						emoji: changeCodeToEmoji(task.emoji),
						name: `${task.title ? task.title : 'UNTITLED'}`,
						href: '/',
						useTranslate: task.title ? false : true,
					},
				]}>
				<PermissionIndicator userRole={userRole} worksapceName={workspace.name} />
				<AddTaskShortcut userId={session.user.id} />
				{userRole !== 'OWNER' && <LeaveWorkspace workspace={workspace} />}
				{(userRole === 'ADMIN' || userRole === 'OWNER') && <InviteUsers workspace={workspace} />}
			</DashboardHeader>
			<main className='flex flex-col gap-2  '>
				<ReadOnlyContent task={task} isSavedByUser={isSavedByUser} userRole={userRole} />
			</main>
		</>
	);
};
export default Task;
