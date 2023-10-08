import { AditionalInfoSection } from '@/components/onboarding/AditionalInfoSection';
import { SummarySection } from '@/components/onboarding/SummarySection';
import { OnboardingFormProvider } from '@/context/OnboardingForm';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

const Onboarding = async () => {
	const session = await checkIfUserCompletedOnboarding('/onboarding');
	console.log(session);

	return (
		<OnboardingFormProvider session={session}>
			<AditionalInfoSection />
			<SummarySection />
		</OnboardingFormProvider>
	);
};
export default Onboarding;
