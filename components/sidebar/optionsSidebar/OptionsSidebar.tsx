'use client';

import React from 'react';
import { usePathname } from 'next-intl/client';
import { Settings } from './Settings';
import { ActiveWorkspacesInfo } from '@/components/common/ActiveWorkspacesInfo';

interface Props {
	activeWorkspaces: number;
}

export const OptionsSidebar = ({ activeWorkspaces }: Props) => {
	const pathname = usePathname();
	if (pathname === '/dashboard') return null;

	return (
		<div className='h-full p-4 sm:py-6 border-r w-64 flex flex-col justify-between'>
			{pathname.includes('/dashboard/settings') && <Settings />}
			<ActiveWorkspacesInfo activeNumber={activeWorkspaces} />
		</div>
	);
};
