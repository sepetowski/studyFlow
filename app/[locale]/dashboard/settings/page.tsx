import { AccountInfo } from '@/components/settings/account/AccountInfo';
import { DeleteAccount } from '@/components/settings/account/DeleteAccount';
import { Heading } from '@/components/settings/account/Heading';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { Separator } from '@/components/ui/separator';
import { DashboardHeader } from '@/components/header/DashboardHeader';

const Settings = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/settings');

	return (
		<>
			<DashboardHeader />
			<main>
				<Heading />
				<AccountInfo session={session} />
				<div className='p-4 sm:p-6'>
					<Separator />
				</div>
				<DeleteAccount userEmail={session.user.email!} />
			</main>
		</>
	);
};
export default Settings;
