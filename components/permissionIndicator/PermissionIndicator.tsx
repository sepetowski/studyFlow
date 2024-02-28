'use client';
import React from 'react';
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

interface Props {
	userRole: UserPermisson | null;
}

export const PermissionIndicator = ({ userRole }: Props) => {
	const userRoleEmojis = useChangeCodeToEmoji('1f432', '1f60e', '1f920', '1f913');

	return (
		<Dialog>
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
					<span>hit</span>
				</HoverCardContent>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when youre done.
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'></div>
					<DialogFooter>
						<Button type='submit'>Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</HoverCard>
		</Dialog>
	);
};
