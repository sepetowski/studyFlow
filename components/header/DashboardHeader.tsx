import React from 'react';
import { User } from './User';
import { BreadcrumbNav } from './BreadcrumbNav';
import { getAuthSession } from '@/lib/auth';
import { OpenSidebar } from './OpenSidebar';
import Welcoming from '../common/Welcoming';

export const DashboardHeader = async () => {
	const session = await getAuthSession();
	return (
		<header className='w-full flex justify-between items-center mb-4 py-2 gap-2'>
			<div className='flex items-center gap-2'>
				<OpenSidebar />
				<Welcoming hideOnMobile showOnlyOnPath='/dashboard' />
				<BreadcrumbNav />
			</div>
			<User profileImage={session?.user.image} />
		</header>
	);
};
