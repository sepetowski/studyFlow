import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { SettingsContainer } from '@/components/pomodoro/settings/SettingsContainer';
import { getUserPomodoroSettings } from '@/lib/api';

const PomodoroSettings = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/pomodoro/settings');

	const pomodoroSettings = await getUserPomodoroSettings(session.user.id);

	return (
		<>
			<DashboardHeader />
			<main className='flex flex-col gap-2 h-full'>
				<SettingsContainer pomodoroSettings={pomodoroSettings} />
			</main>
		</>
	);
};
export default PomodoroSettings;
