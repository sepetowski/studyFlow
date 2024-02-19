import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next-intl/server';

const Home = async () => {
	const session = await getAuthSession();

	if (session) redirect('/dashboard');
	return <div>home</div>;
};
export default Home;
