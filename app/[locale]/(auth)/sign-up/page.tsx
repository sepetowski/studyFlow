import { AuthCard } from '@/components/auth/AuthCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign up',
	description: 'Sign up',
};

const SignUp = () => {
	return <AuthCard  />;
};
export default SignUp;
