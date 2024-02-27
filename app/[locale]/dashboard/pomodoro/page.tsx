import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { getUserEditableWorkspaces, getUserPomodoroSettings } from '@/lib/api';
import { PomodoroContainer } from '@/components/pomodoro/timer/PomodoroContainer';
import { AddTaskShortcut } from '@/components/addTaskShortcut/AddTaskShortcut';

const Pomodoro = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/pomodoro');

	const [pomodoroSettings, userEditableWorkspaces] = await Promise.all([
		getUserPomodoroSettings(session.user.id),
		getUserEditableWorkspaces(session.user.id),
	]);

	return (
		<>
			<DashboardHeader>
				<AddTaskShortcut userId={session.user.id} userEditableWorkspaces={userEditableWorkspaces} />
			</DashboardHeader>
			<main className='flex flex-col gap-2 h-full  items-center'>
				<PomodoroContainer pomodoroSettings={pomodoroSettings} />
			</main>
		</>
	);
};
export default Pomodoro;
