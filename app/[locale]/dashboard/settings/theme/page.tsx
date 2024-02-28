import { AddTaskShortcut } from '@/components/addTaskShortcut/AddTaskShortcut';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { Theme } from '@/components/settings/theme/Theme';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

const ThemeSettings = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/settings/theme');
	return (
		<>
			<DashboardHeader>
				<AddTaskShortcut userId={session.user.id} />
			</DashboardHeader>
			<Theme />
		</>
	);
};
export default ThemeSettings;
