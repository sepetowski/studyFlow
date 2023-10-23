import { Theme } from '@/components/settings/theme/Theme';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

const ThemeSettings = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/settings/theme');
	return <Theme />;
};
export default ThemeSettings;
