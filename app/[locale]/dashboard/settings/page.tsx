import { AccountInfo } from '@/components/settings/account/AccountInfo';
import { DeleteAccount } from '@/components/settings/account/DeleteAccount';
import { Heading } from '@/components/settings/account/Heading';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { Separator } from '@/components/ui/separator';


const Settings = async () => {
	const session = await checkIfUserCompletedOnboarding('/dashboard/settings');

	return (
		<div>
			<Heading />
			<AccountInfo session={session} />
			<div className='p-4 sm:p-6'>
				<Separator />
			</div>
			<DeleteAccount />
		</div>
	);
};
export default Settings;
