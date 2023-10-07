import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

const Onboarding = async () => {
	const session = await checkIfUserCompletedOnboarding('/onboarding');
	console.log(session);

	return <p>Onboarding</p>;
};
export default Onboarding;
