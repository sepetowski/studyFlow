import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

const ThemeSettings = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/settings/theme');
	return <div>ThemeSettings</div>;
};
export default ThemeSettings;
