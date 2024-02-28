import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { getUserPomodoroSettings } from '@/lib/api';
import { PomodoroContainer } from '@/components/pomodoro/timer/PomodoroContainer';
import { AddTaskShortcut } from '@/components/addTaskShortcut/AddTaskShortcut';

const Pomodoro = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/pomodoro');

	const pomodoroSettings = await getUserPomodoroSettings(session.user.id);

	return (
		<>
			<DashboardHeader>
				<AddTaskShortcut userId={session.user.id} />
			</DashboardHeader>
			<main className='flex flex-col gap-2 h-full  items-center'>
				<PomodoroContainer pomodoroSettings={pomodoroSettings} />
			</main>
		</>
	);
};
export default Pomodoro;
