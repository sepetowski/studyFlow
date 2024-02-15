import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { Calendar } from '@/components/calendar/Calendar';

const CalendarPage = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/calendar');

	return (
		<>
			<DashboardHeader />
			<main className='h-full'>
				<Calendar />
			</main>
		</>
	);
};
export default CalendarPage;
