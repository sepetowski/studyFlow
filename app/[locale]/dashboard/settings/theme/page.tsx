import { DashboardHeader } from '@/components/header/DashboardHeader';
import { Theme } from '@/components/settings/theme/Theme';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

const ThemeSettings = async () => {
	await checkIfUserCompletedOnboarding('/dashboard/settings/theme');
	return (
		<>
			<DashboardHeader />
			<Theme />
		</>
	);
};
export default ThemeSettings;
