import React from 'react';
import { ShortcutSidebar } from './shortcutSidebar.tsx/ShortcutSidebar';
import { OptionsSidebar } from './optionsSidebar/OptionsSidebar';

export const Sidebar = () => {
	return (
		<aside className='fixed top-0 left-0 md:static h-full   flex overflow-hidden'>
			<ShortcutSidebar />
			<OptionsSidebar />
		</aside>
	);
};
