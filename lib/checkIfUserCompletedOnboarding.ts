import { redirect } from 'next-intl/server';
import { getAuthSession } from './auth';

export const checkIfUserCompletedOnboarding = async (currentPath: string) => {
	const session = await getAuthSession();
	if (!session) redirect('/');
	if (session.user.completedOnboarding && currentPath === '/onboarding') redirect('/dashboard');
	if (!session.user.completedOnboarding && currentPath !== '/onboarding')
		redirect('/onboarding?error=not-completed-onboarding');

	return session;
};
