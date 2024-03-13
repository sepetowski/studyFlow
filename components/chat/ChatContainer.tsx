import React from 'react';
import { NewMessageContainer } from './newMessage/NewMessageContainer';

interface Props {
	workspaceId: string;
	chatId: string;
}

export const ChatContainer = ({ chatId, workspaceId }: Props) => {
	return (
		<div className='w-full h-full flex flex-col justify-between p-4 border border-border rounded-md shadow-sm'>
			<p>top</p>
			<div className='flex-grow '>cialo</div>
			<NewMessageContainer chatId={chatId} workspaceId={workspaceId} />
		</div>
	);
};
