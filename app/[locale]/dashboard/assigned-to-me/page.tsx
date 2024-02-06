import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { AssignedToMeContainer } from '@/components/assigned-to-me/AssignedToMeContainer';

const AssignedToMe = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/assigned-to-me');

	return (
		<>
			<DashboardHeader />
			<main>
				<AssignedToMeContainer userId={session.user.id} />
			</main>
		</>
	);
};
export default AssignedToMe;
