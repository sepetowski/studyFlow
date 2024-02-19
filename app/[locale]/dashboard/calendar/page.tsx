import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';

import { Calendar } from '@/components/calendar/Calendar';

const CalendarPage = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/calendar');

	return (
		<>
			<DashboardHeader />
			<main className='h-full'>
				<Calendar userId={session.user.id} />
			</main>
		</>
	);
};
export default CalendarPage;
