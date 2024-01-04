import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';

const Starred = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/starred');

	return (
		<>
			<DashboardHeader />
			<main className='flex flex-col gap-2 h-full  items-center'></main>
		</>
	);
};
export default Starred;
