'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/ui/user-avatar';
import { useTuncateText } from '@/hooks/useTruncateText';
import { FilterUser } from '@/types/extended';

interface Props extends FilterUser {
	onClearUser: (userId: string) => void;
}

export const ActiveFilteredUser = ({ username, id, image, onClearUser }: Props) => {
	const text = useTuncateText(username, 25, 0);

	return (
		<Button
			onClick={() => {
				onClearUser(id);
			}}
			size={'sm'}
			variant={'outline'}
			className='w-fit h-fit flex gap-2 items-center px-2 py-1.5 text-xs rounded-lg'>
			<UserAvatar className='w-6 h-6' size={10} profileImage={image} />
			<p className='text-secondary-foreground'>{text}</p>
		</Button>
	);
};
