import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { AssignedToMeContainer } from '@/components/assigned-to-me/AssignedToMeContainer';
import { getUserEditableWorkspaces } from '@/lib/api';
import { AddTaskShortcut } from '@/components/addTaskShortcut/AddTaskShortcut';

const AssignedToMe = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/assigned-to-me');

	const userEditableWorkspaces = await getUserEditableWorkspaces(session.user.id);

	return (
		<>
			<DashboardHeader>
				<AddTaskShortcut userId={session.user.id} userEditableWorkspaces={userEditableWorkspaces} />
			</DashboardHeader>
			<main>
				<AssignedToMeContainer userId={session.user.id} />
			</main>
		</>
	);
};
export default AssignedToMe;
