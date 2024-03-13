'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/lib/supabase';
import React, { useEffect, useRef, useState } from 'react';
import { Message } from './Message';
import { useMessage } from '@/store/conversation/messages';
import { LoadingState } from '@/components/ui/loading-state';

interface Props {
	workspaceId: string;
	chatId: string;
}

export const MessagesContainer = ({ chatId, workspaceId }: Props) => {
	const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const [userScrolled, setUserScrolled] = useState(false);

	const { messages, initialMessagesLoading } = useMessage((state) => state);

	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (scrollContainer && !userScrolled) {
			scrollContainer.scrollTop = scrollContainer.scrollHeight;
		}
	}, [messages, userScrolled]);

	// useEffect(() => {
	//     const supabaseClient = supabase();
	// 	const channel = supabaseClient
	// 		.channel(`chat-${chatId}`)
	// 		.on(
	// 			'postgres_changes',
	// 			{ event: 'INSERT', schema: 'public', table: 'Message' },
	// 			(payload) => {
	// 				console.log('Change received!', payload);
	// 			}
	// 		)
	// 		.subscribe();

	// 	return () => {
	// 		channel.unsubscribe();
	// 	};
	// }, [chatId]);

	if (initialMessagesLoading)
		<div className='h-full flex flex-col items-center  justify-center'>
			<LoadingState />
		</div>;
	return (
		<div
			ref={scrollRef}
			className='h-full flex flex-col gap-2 px-4 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-background '>
			{messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
		</div>
	);
};
