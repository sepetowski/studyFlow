import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';

const AssignedToMe = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/assigned-to-me');

	return (
		<>
			<DashboardHeader />
			<main className='flex flex-col gap-2 h-full  items-center'></main>
		</>
	);
};
export default AssignedToMe;
