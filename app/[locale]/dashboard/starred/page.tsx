import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { StarredContainer } from '@/components/starred/StarredContainer';

const Starred = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/starred');

	return (
		<>
			<DashboardHeader />
			<main className='h-full'>
				<StarredContainer userId={session.user.id} />
			</main>
		</>
	);
};
export default Starred;
