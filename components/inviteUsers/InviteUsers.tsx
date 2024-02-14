import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UserPlus2 } from 'lucide-react';
import { Workspace } from '@prisma/client';
import { InviteContent } from './InviteContent';
import { useTranslations } from 'next-intl';

interface Props {
	workspace: Workspace;
}

export const InviteUsers = ({ workspace }: Props) => {
	const t = useTranslations('INVITE');
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'icon'}
					className=' sm:bg-primary/10 sm:text-primary sm:font-semibold sm:hover:bg-primary sm:hover:text-white sm:h-9 sm:rounded-md sm:px-3 sm:w-auto sm:space-x-2 text-primary'
					variant='ghost'>
					<span className='hidden sm:inline'>{t('INVITE')}</span>
					<UserPlus2 size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<span>{t('TITLE')}</span> <span>{workspace.name}</span>
					</DialogTitle>
					<DialogDescription>{t('DESC')}</DialogDescription>
				</DialogHeader>
				<InviteContent workspace={workspace} />
			</DialogContent>
		</Dialog>
	);
};
