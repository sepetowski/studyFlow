import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { StarredContainer } from '@/components/starred/StarredContainer';
import { AddTaskShortcut } from '@/components/addTaskShortcut/AddTaskShortcut';
import { getUserEditableWorkspaces } from '@/lib/api';

const Starred = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/starred');

	const userEditableWorkspaces = await getUserEditableWorkspaces(session.user.id);

	return (
		<>
			<DashboardHeader>
				<AddTaskShortcut userId={session.user.id} userEditableWorkspaces={userEditableWorkspaces} />
			</DashboardHeader>
			<main>
				<StarredContainer userId={session.user.id} />
			</main>
		</>
	);
};
export default Starred;
