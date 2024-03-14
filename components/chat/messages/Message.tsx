'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UserAvatar } from '@/components/ui/user-avatar';
import { ExtendedMessage } from '@/types/extended';
import { MoreHorizontal } from 'lucide-react';
import { useFormatter } from 'next-intl';
import { AditionalResource } from './AditionalResource';
import { Options } from './Options';
import { EditMessage } from './EditMessage';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { EditedBadge } from './EditedBadge';

interface Props {
	message: ExtendedMessage;
	sessionUserId: string;
}

export const Message = ({ message, sessionUserId }: Props) => {
	const { content, aditionalRecources, createdAt, edited, id, sender, updatedAt } = message;

	const messageRef = useRef<HTMLDivElement | null>(null);
	const [isEditing, setIsEditing] = useState(false);

	useOnClickOutside(messageRef, () => {
		const emojiBtn = document.getElementById('edit-message-emoji-selector');
		const dataStateValue = emojiBtn?.getAttribute('data-state');

		if (dataStateValue !== 'open') setIsEditing(false);
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
						<div className='flex flex-wrap gap-1 items-center'>
							<p className='text-primary '>{sender.username}</p>
							<p className='text-muted-foreground text-xs'>{format.relativeTime(dateTime, now)}</p>
						</div>
						{!isEditing ? (
							<div className='flex flex-wrap gap-1 items-end'>
								<p className='break-all'>{content}</p>
								{edited && <EditedBadge updatedAt={updatedAt!} />}
							</div>
						) : (
							<EditMessage
								content={content}
								messageInfo={message}
								onChangeEdit={changeEditModeHandler}
							/>
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
					<Options onChangeEdit={changeEditModeHandler} message={message} />
				</div>
			)}
		</div>
	);
};
