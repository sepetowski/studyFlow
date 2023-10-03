import { useTranslations } from 'next-intl';

const Home = () => {
	const t = useTranslations('Index');
	return <h1>{t('title')}</h1>;
};
export default Home;
