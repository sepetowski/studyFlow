import Welcoming from '@/components/common/Welcoming';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

const Dashboard = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard');

	return (
		<div>
			<Welcoming
				hideOnDesktop
				username={session.user.username!}
				name={session.user.name}
				surname={session.user.surname}
				className='px-4 py-2 '
			/>
		</div>
	);
};
export default Dashboard;
