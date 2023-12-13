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
	const urlWorkspaceId: string | undefined = pathname.split('/')[3];
	const urlAditionalId: string | undefined = pathname.split('/')[6];
	const workspaceId = urlWorkspaceId ? urlWorkspaceId : '';

	if (
		pathname === '/dashboard' ||
		(urlAditionalId &&
			pathname === `/dashboard/workspace/${workspaceId}/tasks/task/${urlAditionalId}/edit`) ||
		(urlAditionalId &&
			pathname === `/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${urlAditionalId}/edit`)
	)
		return null;

	return (
		<div className='h-full p-4 sm:py-6 border-r w-52 sm:w-64 flex flex-col justify-between'>
			{pathname.includes('/dashboard/settings') && (
				<Settings userAdminWorkspaces={userAdminWorkspaces} />
			)}
			{(pathname === `/dashboard/workspace/${workspaceId}` ||
				pathname === `/dashboard/workspace/${workspaceId}/tasks/task/${urlAditionalId}` ||
				pathname ===
					`/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${urlAditionalId}`) && (
				<WorkspaceOptions workspaceId={workspaceId} />
			)}

			<CreatedWorkspacesInfo createdNumber={createdWorkspaces} />
		</div>
	);
};
