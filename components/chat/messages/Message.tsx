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
import { useUserActivityStatus } from '@/context/UserActivityStatus';

interface Props {
	message: ExtendedMessage;
	sessionUserId: string;
}

export const Message = ({ message, sessionUserId }: Props) => {
	const { chekIfUserIsActive } = useUserActivityStatus();
	const { content, aditionalRecources, createdAt, edited, sender, updatedAt } = message;
	const isActive = chekIfUserIsActive(sender.id);

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
					<div className='relative'>
						<UserAvatar className='w-10 h-10' profileImage={sender.image} />
						{isActive && (
							<div className='absolute bottom-0 right-0 w-3 h-3 rounded-full  border-border shadow-sm border-2 bg-primary'></div>
						)}
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
