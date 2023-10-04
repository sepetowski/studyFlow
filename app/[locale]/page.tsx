import { ThemeSwitcher } from '@/components/switchers/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const Home = () => {
	const t = useTranslations('Index');
	return (
		<>
			<Button>{t('title')}</Button>
			<ThemeSwitcher />
			<p>axaxaxa</p>
		</>
	);
};
export default Home;
