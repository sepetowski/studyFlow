import React from 'react';
import { Bottom } from './Bottom';
import { Top } from './Top';
import { Workspaces } from './workspaces/Workspaces';
import { AddWorkspace } from './newWorkspace/AddWorkspace';
import { Workspace } from '@prisma/client';

interface Props {
	userWorkspaces: Workspace[];
}

export const ShortcutSidebar = ({ userWorkspaces }: Props) => {
	return (
		<div className='flex flex-col justify-between items-center h-full p-4 sm:py-6 border-r'>
			<div className='w-full h-2/3 space-y-3 '>
				<Top />
				<Workspaces userWorkspaces={userWorkspaces} />
				<AddWorkspace activeWorkspaces={userWorkspaces.length} />
			</div>
			<Bottom />
		</div>
	);
};
