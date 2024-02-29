'use client';
import React, { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useChangeCodeToEmoji } from '@/hooks/useChangeCodeToEmoji';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { UserPermisson } from '@prisma/client';
import { useTranslations } from 'next-intl';

interface Props {
	userRole: UserPermisson | null;
	worksapceName: string;
}

export const PermissionIndicator = ({ userRole, worksapceName }: Props) => {
	const t = useTranslations('PERMISSION_INDICATOR');

	const userRoleEmojis = useChangeCodeToEmoji('1f432', '1f60e', '1f920', '1f913');
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<HoverCard openDelay={250} closeDelay={250}>
				<DialogTrigger asChild>
					<HoverCardTrigger>
						<Button className='w-8 h-8 sm:w-9 sm:h-9' size={'icon'} variant='ghost'>
							{userRole === 'OWNER' && <span>{userRoleEmojis[0]}</span>}
							{userRole === 'ADMIN' && <span>{userRoleEmojis[1]}</span>}
							{userRole === 'CAN_EDIT' && <span>{userRoleEmojis[2]}</span>}
							{userRole === 'READ_ONLY' && <span>{userRoleEmojis[3]}</span>}
						</Button>
					</HoverCardTrigger>
				</DialogTrigger>
				<HoverCardContent align='center'>
					<p>
						{t('HINT', { workspace: worksapceName })}{' '}
						{userRole === 'OWNER' && (
							<span className='text-primary'>
								{t('ROLES.OWNER')} {userRoleEmojis[0]}
							</span>
						)}
						{userRole === 'ADMIN' && (
							<span className='text-primary'>
								{t('ROLES.ADMIN')} {userRoleEmojis[1]}
							</span>
						)}
						{userRole === 'CAN_EDIT' && (
							<span className='text-primary'>
								{t('ROLES.EDITOR')} {userRoleEmojis[2]}
							</span>
						)}
						{userRole === 'READ_ONLY' && (
							<span className='text-primary'>
								{t('ROLES.READ_ONLY')} {userRoleEmojis[3]}
							</span>
						)}
					</p>
				</HoverCardContent>
				<DialogContent className='sm:max-w-[525px]'>
					<DialogHeader>
						<DialogTitle>
							{t('TITLE')}{' '}
							{userRole === 'OWNER' && (
								<span className='text-primary '>
									{t('ROLES.OWNER')} {userRoleEmojis[0]}
								</span>
							)}
							{userRole === 'ADMIN' && (
								<span className='text-primary'>
									{t('ROLES.ADMIN')} {userRoleEmojis[1]}
								</span>
							)}
							{userRole === 'CAN_EDIT' && (
								<span className='text-primary'>
									{t('ROLES.EDITOR')} {userRoleEmojis[2]}
								</span>
							)}
							{userRole === 'READ_ONLY' && (
								<span className='text-primary'>
									{t('ROLES.READ_ONLY')} {userRoleEmojis[3]}
								</span>
							)}
						</DialogTitle>
						<DialogDescription>
							{t('DESC', { workspace: worksapceName })}{' '}
							{userRole === 'OWNER' && <span>{t('ROLES.OWNER')}</span>}
							{userRole === 'ADMIN' && <span>{t('ROLES.ADMIN')}</span>}
							{userRole === 'CAN_EDIT' && <span>{t('ROLES.EDITOR')}</span>}
							{userRole === 'READ_ONLY' && <span>{t('ROLES.READ_ONLY')}</span>}
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<p>
							{userRole === 'OWNER' && <>{t('ROLES_DESC.OWNER')}</>}
							{userRole === 'ADMIN' && <>{t('ROLES_DESC.ADMIN')}</>}
							{userRole === 'CAN_EDIT' && <>{t('ROLES_DESC.EDITOR')}</>}
							{userRole === 'READ_ONLY' && <>{t('ROLES_DESC.READ_ONLY')}</>}
						</p>
					</div>
					<DialogFooter>
						<Button
							onClick={() => {
								setOpen(false);
							}}
							className='w-full text-white'
							size={'lg'}>
							{t('BTN')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</HoverCard>
		</Dialog>
	);
};
