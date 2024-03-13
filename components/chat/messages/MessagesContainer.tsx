'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/lib/supabase';
import React, { useEffect } from 'react';
import { Message } from './Message';

interface Props {
	workspaceId: string;
	chatId: string;
}

export const MessagesContainer = ({ chatId, workspaceId }: Props) => {
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
	return (
		<ScrollArea className='h-full'>
			<div className='h-full flex flex-col gap-2 px-4 py-2 '></div>
		</ScrollArea>
	);
};
