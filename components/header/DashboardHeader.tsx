import React from 'react';
import { User } from './User';
import { BreadcrumbNav } from './BreadcrumbNav';
import { getAuthSession } from '@/lib/auth';
import { OpenSidebar } from './OpenSidebar';
import Welcoming from '../common/Welcoming';
import { cn } from '@/lib/utils';

interface Props {
	addManualRoutes?: string[];
	className?:string
}


export const DashboardHeader = async ({addManualRoutes,className}:Props) => {
	const session = await getAuthSession();
	if (!session) return null;
	return (
		<header className={cn('w-full flex justify-between items-center mb-4 py-2 gap-2',className)}>
			<div className='flex items-center gap-2 max-w-[17rem] sm:max-w-4xl'>
				<OpenSidebar />
				<Welcoming
					hideOnMobile
					hideOnDesktop
					username={session.user.username!}
					name={session.user.name}
					surname={session.user.surname}
					showOnlyOnPath='/dashboard'
				/>
				<BreadcrumbNav addManualRoutes={addManualRoutes} />
			</div>
			<User profileImage={session?.user.image} />
		</header>
	);
};
