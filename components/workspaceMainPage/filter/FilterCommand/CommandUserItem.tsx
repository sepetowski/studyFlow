'use client';
import React from 'react';
import { CommandItem } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Check } from 'lucide-react';
import { useTuncateText } from '@/hooks/useTruncateText';
import { FilterUser } from '@/types/extended';

interface Props extends FilterUser {
	sessionUserId: string;
	active: boolean;
	onChangeAssigedUserToFilter: (userId: string) => void;
}

export const CommandUserItem = ({
	username,
	id,
	image,
	sessionUserId,
	active,
	onChangeAssigedUserToFilter,
}: Props) => {
	const text = useTuncateText(username, 25, 0);

	return (
		<CommandItem className='p-0'>
			<Button
				onClick={() => {
					onChangeAssigedUserToFilter(id);
				}}
				size={'sm'}
				variant={'ghost'}
				className='w-full h-fit justify-between px-2 py-1.5 text-xs'>
				<div className='flex items-center gap-2'>
					<UserAvatar className='w-8 h-8' size={10} profileImage={image} />

					<p className='text-secondary-foreground'>
						{sessionUserId === id ? 'Przypisane do mnie' : text}
					</p>
				</div>

				{active && <Check className='text-primary' size={16} />}
			</Button>
		</CommandItem>
	);
};