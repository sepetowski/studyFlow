'use client';

import React from 'react';
import { usePathname } from 'next-intl/client';
import { Settings } from './Settings';

export const OptionsSidebar = () => {
	const pathname = usePathname();
	if (pathname === '/dashboard') return null;

	return (
		<div className='h-full p-4 sm:py-6 border-r w-64'>
			{pathname.includes('/dashboard/settings') && <Settings />}
		</div>
	);
};
