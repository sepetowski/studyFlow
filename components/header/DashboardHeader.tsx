import React from 'react';
import { User } from './User';
import { BreadcrumbNav } from './BreadcrumbNav';
import { Welcoming } from './Welcoming';
import { getAuthSession } from '@/lib/auth';

export const DashboardHeader = async () => {
	const session = await getAuthSession();
	return (
		<header className='w-full flex justify-between items-center mb-4'>
			<Welcoming />
			<BreadcrumbNav />
			<User profileImage={session?.user.image} />
		</header>
	);
};
