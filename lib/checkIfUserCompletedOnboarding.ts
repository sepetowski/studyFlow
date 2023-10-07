import { redirect } from 'next/navigation';
import { getAuthSession } from './auth';

export const checkIfUserCompletedOnboarding = async (currentPath: string) => {
	const session = await getAuthSession();
	if (!session) redirect('/');
	if (session.user.compledtedOnboarding && currentPath === '/onboarding') redirect('/dashboard');
	if (!session.user.compledtedOnboarding && currentPath !== '/onboarding')
		redirect('/onboarding?error=not-completed-onboarding');

	return session;
};
