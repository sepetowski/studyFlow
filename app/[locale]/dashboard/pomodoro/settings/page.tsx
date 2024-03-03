import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { SettingsContainer } from '@/components/pomodoro/settings/SettingsContainer';
import { getUserPomodoroSettings } from '@/lib/api';
import { AddTaskShortcut } from '@/components/addTaskShortcut/AddTaskShortcut';

const PomodoroSettings = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/pomodoro/settings');

	const pomodoroSettings = await getUserPomodoroSettings(session.user.id);

	return (
		<>
			<DashboardHeader>
				<AddTaskShortcut userId={session.user.id} />
			</DashboardHeader>
			<main className='flex flex-col gap-2 h-full'>
				<SettingsContainer pomodoroSettings={pomodoroSettings} />
			</main>
		</>
	);
};
export default PomodoroSettings;
