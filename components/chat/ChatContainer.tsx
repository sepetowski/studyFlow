'use client';
import React from 'react';
import { NewMessageContainer } from './newMessage/NewMessageContainer';
import { MessagesContainer } from './messages/MessagesContainer';
import { Header } from './header/Header';
import { ExtendedMessage } from '@/types/extended';

interface Props {
	workspaceId: string;
	chatId: string;
	initialMessages: ExtendedMessage[];
}

export const ChatContainer = ({ chatId, workspaceId, initialMessages }: Props) => {
	console.log(initialMessages);
	return (
		<div className='w-full h-full flex flex-col justify-between  border border-border rounded-md shadow-sm '>
			<Header />
			<MessagesContainer chatId={chatId} workspaceId={workspaceId} />
			<NewMessageContainer chatId={chatId} workspaceId={workspaceId} />
		</div>
	);
};
