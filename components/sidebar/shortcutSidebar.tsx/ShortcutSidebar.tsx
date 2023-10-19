import React from 'react';
import { Bottom } from './Bottom';
import { Top } from './Top';
import { Workspaces } from './Workspaces';

export const ShortcutSidebar = () => {
	return (
		<div className='flex flex-col justify-between items-center h-full p-4 sm:py-6 border-r'>
			<div className='w-full h-2/3'>
				<Top />
				<Workspaces />
			</div>
			<Bottom />
		</div>
	);
};
