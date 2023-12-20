import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { getUserPomodoroSettings } from '@/lib/api';

const Pomodoro = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/pomodoro');

	const pomodoroSettings = await getUserPomodoroSettings(session.user.id);

	return (
		<>
			<DashboardHeader />
			<main>pomodoro</main>
		</>
	);
};
export default Pomodoro;
