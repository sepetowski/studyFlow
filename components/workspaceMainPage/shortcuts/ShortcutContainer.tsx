'use client';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React from 'react';
import { ShortcutContainerBtnItem } from './ShortcutContainerBtnItem';
import { Bell, MessageSquare, MessagesSquare, PencilRuler, Workflow } from 'lucide-react';
import { ShortcutContainerItemPrivateMessageDialog } from './privateMessagesDialog/ShortcutContainerItemPrivateMessageDialog';
import { LeaveWorkspace } from './leaveWorksapce/LeaveWorkspace';
import { UserPermisson, Workspace } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { ShortcutContainerLinkItem } from './ShortcutContainerLinkItem';

interface Props {
	workspace: Workspace;
	userRole: UserPermisson | null;
}

export const ShortcutContainer = ({ userRole, workspace }: Props) => {
	const t = useTranslations('WORKSPACE_MAIN_PAGE.SHORTCUT_CONTAINER');

	return (
		<ScrollArea className='w-full'>
			<div className='flex w-max space-x-4 pb-4  mt-4 xl:w-full'>
				<ShortcutContainerLinkItem
					href='/'
					userRole={userRole}
					Icon={MessagesSquare}
					title={t('GROUP_CHAT')}
				/>
				<ShortcutContainerItemPrivateMessageDialog
					userRole={userRole}
					Icon={MessageSquare}
					title={t('PRIVATE_CHAT')}
				/>
				<ShortcutContainerBtnItem userRole={userRole} Icon={PencilRuler} title={t('NEW_TASK')} />
				<ShortcutContainerBtnItem userRole={userRole} Icon={Workflow} title={t('NEW_MIND_MAP')} />
				{userRole !== 'OWNER' && <LeaveWorkspace workspace={workspace} />}
			</div>
			<ScrollBar orientation='horizontal' />
		</ScrollArea>
	);
};
