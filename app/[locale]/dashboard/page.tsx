import { AddTaskShortcut } from '@/components/addTaskShortcut/AddTaskShortcut';
import Welcoming from '@/components/common/Welcoming';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { HomeRecentActivityContainer } from '@/components/homeRecentAcrivity/HomeRecentActivityContainer';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

const Dashboard = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard');

	return (
		<>
			<DashboardHeader>
				<AddTaskShortcut userId={session.user.id} />
			</DashboardHeader>
			<main>
				<Welcoming
					hideOnDesktop
					username={session.user.username!}
					name={session.user.name}
					surname={session.user.surname}
					className='px-4 py-2 '
				/>
				<HomeRecentActivityContainer userId={session.user.id} />
			</main>
		</>
	);
};
export default Dashboard;
