import { DashboardHeader } from '@/components/header/DashboardHeader';
import { SecurityCrad } from '@/components/settings/security/SecurityCrad';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

const SecuritySettings = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/settings/security');
	return (
		<>
			<DashboardHeader />
			<SecurityCrad />
		</>
	);
};
export default SecuritySettings;
