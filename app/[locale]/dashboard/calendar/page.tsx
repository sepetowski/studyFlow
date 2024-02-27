import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';

import { Calendar } from '@/components/calendar/Calendar';
import { AddTaskShortcut } from '@/components/addTaskShortcut/AddTaskShortcut';
import { getUserEditableWorkspaces } from '@/lib/api';

const CalendarPage = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/calendar');

	const userEditableWorkspaces = await getUserEditableWorkspaces(session.user.id);

	return (
		<>
			<DashboardHeader>
				<AddTaskShortcut userId={session.user.id} userEditableWorkspaces={userEditableWorkspaces} />
			</DashboardHeader>
			<main className='h-full'>
				<Calendar userId={session.user.id} />
			</main>
		</>
	);
};
export default CalendarPage;
