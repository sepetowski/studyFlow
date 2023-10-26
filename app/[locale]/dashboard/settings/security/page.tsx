import { ChnagePassword } from '@/components/settings/security/ChangePassword';
import { SecurityCrad } from '@/components/settings/security/SecurityCrad';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

const SecuritySettings = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/settings/security');
	return <SecurityCrad />;
};
export default SecuritySettings;
