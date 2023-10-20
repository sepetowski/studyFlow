import React from 'react';
import { ShortcutSidebar } from './shortcutSidebar.tsx/ShortcutSidebar';
import { OptionsSidebar } from './optionsSidebar/OptionsSidebar';

export const Sidebar = () => {
	return (
		<aside className='fixed z-50 top-0 left-0 lg:static h-full bg-background border-r   flex overflow-hidden '>
			<ShortcutSidebar />
			<OptionsSidebar />
		</aside>
	);
};
