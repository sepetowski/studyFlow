'use client';

import React from 'react';
import { usePathname } from 'next-intl/client';
import { Settings } from './settingsOptions/Settings';
import { CreatedWorkspacesInfo } from '@/components/common/CreatedWorkspacesInfo';
import { Workspace } from '@prisma/client';
import { WorkspaceOptions } from './workspaceOptions/WorkspaceOptions';

interface Props {
	createdWorkspaces: number;
	userAdminWorkspaces: Workspace[];
}

export const OptionsSidebar = ({ createdWorkspaces, userAdminWorkspaces }: Props) => {
	const pathname = usePathname();
	if (pathname === '/dashboard') return null;
	const urlWorkspaceId: string | undefined = pathname.split('/')[3];
	const workspaceId = urlWorkspaceId ? urlWorkspaceId : '';

	return (
		<div className='h-full p-4 sm:py-6 border-r w-48 sm:w-64 flex flex-col justify-between'>
			{pathname.includes('/dashboard/settings') && (
				<Settings userAdminWorkspaces={userAdminWorkspaces} />
			)}
			{pathname.includes(`/dashboard/workspace/${workspaceId}`) && (
				<WorkspaceOptions workspaceId={workspaceId} />
			)}
			<CreatedWorkspacesInfo createdNumber={createdWorkspaces} />
		</div>
	);
};
