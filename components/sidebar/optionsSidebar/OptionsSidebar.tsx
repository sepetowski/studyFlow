'use client';

import React from 'react';
import { usePathname } from 'next-intl/client';
import { Settings } from './Settings';
import { CreatedWorkspacesInfo } from '@/components/common/CreatedWorkspacesInfo';

interface Props {
	createdWorkspaces: number;
}

export const OptionsSidebar = ({ createdWorkspaces }: Props) => {
	const pathname = usePathname();
	if (pathname === '/dashboard') return null;

	return (
		<div className='h-full p-4 sm:py-6 border-r w-64 flex flex-col justify-between'>
			{pathname.includes('/dashboard/settings') && <Settings />}
			<CreatedWorkspacesInfo createdNumber={createdWorkspaces} />
		</div>
	);
};
