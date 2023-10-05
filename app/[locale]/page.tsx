"use client"

import { ThemeSwitcher } from '@/components/switchers/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { signOut ,useSession} from 'next-auth/react';
import { useTranslations } from 'next-intl';

const Home = () => {
	const t = useTranslations('Index');
	const session=useSession()
	console.log(session);

	const logOutHandler = () => {
		signOut({
			callbackUrl: `${window.location.origin}/sign-in`,
		});
		
	};
	return (
		<>
			<Button onClick={logOutHandler}>{t('title')}</Button>
			<ThemeSwitcher />
			<p>axaxaxa</p>
		</>
	);
};
export default Home;
