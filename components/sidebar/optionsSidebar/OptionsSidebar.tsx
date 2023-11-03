'use client';

import React from 'react';
import { usePathname } from 'next-intl/client';
import { Settings } from './Settings';
import { CreatedWorkspacesInfo } from '@/components/common/CreatedWorkspacesInfo';
import { Workspace } from '@prisma/client';

interface Props {
	createdWorkspaces: number;
	userAdminWorkspaces: Workspace[];
}

export const OptionsSidebar = ({ createdWorkspaces, userAdminWorkspaces }: Props) => {
	const pathname = usePathname();
	if (pathname === '/dashboard') return null;

	return (
		<div className='h-full p-4 sm:py-6 border-r w-64 flex flex-col justify-between'>
			{pathname.includes('/dashboard/settings') && (
				<Settings userAdminWorkspaces={userAdminWorkspaces} />
			)}
			<CreatedWorkspacesInfo createdNumber={createdWorkspaces} />
		</div>
	);
};
