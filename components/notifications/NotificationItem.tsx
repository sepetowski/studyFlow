'use client';
import React from 'react';
import { UserAvatar } from '../ui/user-avatar';
import { BellDot } from 'lucide-react';
import { Button } from '../ui/button';
import { useTuncateText } from '@/hooks/useTruncateText';

export const NotificationItem = () => {
	const name = useTuncateText('Username', 20);
	return (
		<div className='flex gap-4'>
			<div>
				<UserAvatar className='w-10 h-10' size={12} />
			</div>
			<div className='flex gap-4'>
				<div className='w-full text-sm flex flex-col gap-1'>
					<p>
						<span className='font-bold'>{name}</span> dołączył do Twojej przestrzeni roboczej
						Universe
					</p>
					<p className='text-xs text-muted-foreground'>1 Godizne temu</p>
				</div>
				{false && (
					<div>
						<Button className='h-6 w-6' variant={'ghost'} size={'icon'}>
							<BellDot size={16} />
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};
