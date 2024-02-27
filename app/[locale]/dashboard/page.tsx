import { AddTaskShortcut } from '@/components/addTaskShortcut/AddTaskShortcut';
import Welcoming from '@/components/common/Welcoming';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { getUserEditableWorkspaces } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

const Dashboard = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard');

	const userEditableWorkspaces = await getUserEditableWorkspaces(session.user.id);

	return (
		<>
			<DashboardHeader>
				<AddTaskShortcut userId={session.user.id} userEditableWorkspaces={userEditableWorkspaces} />
			</DashboardHeader>
			<main>
				<Welcoming
					hideOnDesktop
					username={session.user.username!}
					name={session.user.name}
					surname={session.user.surname}
					className='px-4 py-2 '
				/>
			</main>
		</>
	);
};
export default Dashboard;
