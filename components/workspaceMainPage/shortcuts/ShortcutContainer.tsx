'use client';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React from 'react';
import { ShortcutContainerItem } from './ShortcutContainerItem';
import { Bell, MessageSquare, MessagesSquare, PencilRuler, Users, Workflow } from 'lucide-react';
import { ShortcutContainerItemPrivateMessageDialog } from './privateMessagesDialog/ShortcutContainerItemPrivateMessageDialog';
import { LeaveWorkspace } from './leaveWorksapce/LeaveWorkspace';
import { UserPermisson, Workspace } from '@prisma/client';

interface Props {
	workspace: Workspace;
	userRole: UserPermisson | null;
}

export const ShortcutContainer = ({ userRole, workspace }: Props) => {
	return (
		<ScrollArea className='w-full'>
			<div className='flex w-max space-x-4 pb-4  mt-4 xl:w-full'>
				<ShortcutContainerItem userRole={userRole} Icon={MessagesSquare} title='Group chat' />
				<ShortcutContainerItemPrivateMessageDialog
					userRole={userRole}
					Icon={MessageSquare}
					title='Private chat'
				/>
				<ShortcutContainerItem userRole={userRole} Icon={PencilRuler} title='New task' />
				<ShortcutContainerItem userRole={userRole} Icon={Workflow} title='New mind map' />
				{userRole !== 'OWNER' && <LeaveWorkspace workspace={workspace} />}
			</div>
			<ScrollBar orientation='horizontal' />
		</ScrollArea>
	);
};
