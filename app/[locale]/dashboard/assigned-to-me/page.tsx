import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { AssignedToMeContainer } from '@/components/assigned-to-me/AssignedToMeContainer';

import { AddTaskShortcut } from '@/components/addTaskShortcut/AddTaskShortcut';

const AssignedToMe = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/assigned-to-me');

	return (
		<>
			<DashboardHeader>
				<AddTaskShortcut userId={session.user.id} />
			</DashboardHeader>
			<main>
				<AssignedToMeContainer userId={session.user.id} />
			</main>
		</>
	);
};
export default AssignedToMe;
