import React from 'react';
import { User } from './User';
import { BreadcrumbNav } from './BreadcrumbNav';
import { getAuthSession } from '@/lib/auth';
import { OpenSidebar } from './OpenSidebar';
import Welcoming from '../common/Welcoming';
import { cn } from '@/lib/utils';
import { SavingStatus } from './SavingStatus';
import { BackBtn } from './BackBtn';

interface Props {
	addManualRoutes?: {
		name: string;
		href: string;
		useTranslate?: boolean;
		emoji?: string;
	}[];
	workspaceHref?: string;
	className?: string;
	children?: React.ReactNode;
	hideBreadCrumb?: boolean;
	showSavingStatus?: boolean;
	showBackBtn?: boolean;
}

export const DashboardHeader = async ({
	addManualRoutes,
	className,
	children,
	workspaceHref,
	showSavingStatus,
	hideBreadCrumb,
	showBackBtn,
}: Props) => {
	const session = await getAuthSession();
	if (!session) return null;
	return (
		<header className={cn('w-full flex justify-between items-center mb-4 py-2 gap-2', className)}>
			<div className='flex items-center gap-2 '>
				<OpenSidebar />
				<Welcoming
					hideOnMobile
					hideOnDesktop
					username={session.user.username!}
					name={session.user.name}
					surname={session.user.surname}
					showOnlyOnPath='/dashboard'
				/>
				{showBackBtn && <BackBtn />}
				{showSavingStatus && <SavingStatus />}
				{!hideBreadCrumb && (
					<BreadcrumbNav addManualRoutes={addManualRoutes} workspaceHref={workspaceHref} />
				)}
			</div>
			<div className='flex items-center gap-2 sm:gap-4'>
				{children}
				<User
					profileImage={session?.user.image}
					username={session.user.username!}
					email={session.user.email!}
				/>
			</div>
		</header>
	);
};
