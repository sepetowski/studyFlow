import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

const SecuritySettings = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/settings/security');
	return <div>SecuritySettings</div>;
};
export default SecuritySettings;
