'use client';
import React from 'react';
import { UserAvatar } from '@/components/ui/user-avatar';
import { ExtendedMessage } from '@/types/extended';
import { MoreHorizontal } from 'lucide-react';
import { useFormatter } from 'next-intl';
import { AditionalResource } from './AditionalResource';

interface Props {
	message: ExtendedMessage;
}

export const Message = ({
	message: { content, aditionalRecources, createdAt, edited, id, sender },
}: Props) => {
	const format = useFormatter();
	const dateTime = new Date(createdAt);
	const now = new Date();

	return (
		<div className='flex justify-between items-start '>
			<div className='flex flex-col gap-1'>
				<div className='flex gap-2 items-start'>
					<div>
						<UserAvatar className='w-10 h-10' profileImage={sender.image} />
					</div>
					<div className='flex flex-col w-fit'>
						<div className='flex gap-1 items-center'>
							<p className='text-primary '>{sender.username}</p>
							<p className='text-muted-foreground text-xs'>{format.relativeTime(dateTime, now)}</p>
						</div>
						<p className='break-words'>{content}</p>
						<div className='flex flex-col gap-2 mt-2'>
							{aditionalRecources.map((resource) => (
								<AditionalResource key={resource.id} file={resource} />
							))}
						</div>
					</div>
				</div>
			</div>
			<div>
				<MoreHorizontal />
			</div>
		</div>
	);
};
