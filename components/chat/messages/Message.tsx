'use client';
import React, { useEffect, useRef, useState } from 'react';
import { UserAvatar } from '@/components/ui/user-avatar';
import { ExtendedMessage } from '@/types/extended';
import { MoreHorizontal } from 'lucide-react';
import { useFormatter } from 'next-intl';
import { AditionalResource } from './AditionalResource';
import { Options } from './Options';
import { EditMessage } from './EditMessage';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

interface Props {
	message: ExtendedMessage;
	sessionUserId: string;
}

export const Message = ({
	message: { content, aditionalRecources, createdAt, edited, id, sender },
	sessionUserId,
}: Props) => {
	const messageRef = useRef<HTMLDivElement>(null);

	const [isEditing, setIsEditing] = useState(false);

	useOnClickOutside(messageRef, () => {
		setIsEditing(false);
	});

	const format = useFormatter();
	const dateTime = new Date(createdAt);
	const now = new Date();

	const changeEditModeHandler = (editing: boolean) => {
		setIsEditing(editing);
	};

	return (
		<div ref={messageRef} className='flex justify-between items-start w-full '>
			<div className='flex flex-col gap-1 w-full'>
				<div className='flex gap-2 items-start w-full'>
					<div>
						<UserAvatar className='w-10 h-10' profileImage={sender.image} />
					</div>
					<div className={`flex flex-col  ${isEditing ? 'w-full' : 'w-fit'}`}>
						<div className='flex gap-1 items-center'>
							<p className='text-primary '>{sender.username}</p>
							<p className='text-muted-foreground text-xs'>{format.relativeTime(dateTime, now)}</p>
						</div>
						{!isEditing ? (
							<p className='break-words'>{content}</p>
						) : (
							<EditMessage content={content} messageId={id} onChangeEdit={changeEditModeHandler} />
						)}
						<div className='flex flex-col gap-2 mt-2'>
							{aditionalRecources.map((resource) => (
								<AditionalResource key={resource.id} file={resource} />
							))}
						</div>
					</div>
				</div>
			</div>
			{sender.id === sessionUserId && !isEditing && (
				<div>
					<Options onChangeEdit={changeEditModeHandler} />
				</div>
			)}
		</div>
	);
};
