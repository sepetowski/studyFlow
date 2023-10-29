import React from 'react';
import { Bottom } from './Bottom';
import { Top } from './Top';
import { Workspaces } from './workspaces/Workspaces';
import { AddWorkspace } from './newWorkspace/AddWorkspace';

export const ShortcutSidebar = () => {
	return (
		<div className='flex flex-col justify-between items-center h-full p-4 sm:py-6 border-r'>
			<div className='w-full h-2/3 space-y-4'>
				<Top />
				<Workspaces />
				<AddWorkspace />
			</div>
			<Bottom />
		</div>
	);
};
