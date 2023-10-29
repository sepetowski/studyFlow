import React from 'react';
import { User } from './User';
import { BreadcrumbNav } from './BreadcrumbNav';
import { getAuthSession } from '@/lib/auth';
import { OpenSidebar } from './OpenSidebar';
import Welcoming from '../common/Welcoming';

export const DashboardHeader = async () => {
	const session = await getAuthSession();
	if (!session) return null;
	return (
		<header className='w-full flex justify-between items-center mb-4 py-2 gap-2'>
			<div className='flex items-center gap-2'>
				<OpenSidebar />
				<Welcoming
					hideOnMobile
					hideOnDesktop
					username={session.user.username!}
					name={session.user.name}
					surname={session.user.surname}
					showOnlyOnPath='/dashboard'
				/>
				<BreadcrumbNav />
			</div>
			<User profileImage={session?.user.image} />
		</header>
	);
};
