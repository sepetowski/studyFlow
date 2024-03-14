'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/lib/supabase';
import React, { useEffect, useRef, useState } from 'react';
import { Message } from './Message';
import { useMessage } from '@/store/conversation/messages';
import { LoadingState } from '@/components/ui/loading-state';
import { DeleteMessage } from './DeleteMessage';
import axios, { AxiosError } from 'axios';
import { ExtendedMessage } from '@/types/extended';
import { domain } from '@/lib/api';
import {
	RealtimePostgresDeletePayload,
	RealtimePostgresInsertPayload,
	RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js';

interface Props {
	workspaceId: string;
	chatId: string;
	sessionUserId: string;
}

export const MessagesContainer = ({ chatId, workspaceId, sessionUserId }: Props) => {
	const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const [userScrolled, setUserScrolled] = useState(false);

	const [notification, setNotification] = useState(0);

	const { messages, initialMessagesLoading, addMessage, editMessage, deleteMessage } = useMessage(
		(state) => state
	);

	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (scrollContainer && !userScrolled) {
			scrollContainer.scrollTop = scrollContainer.scrollHeight;
		}
	}, [messages, userScrolled]);

	useEffect(() => {
		const supabaseClient = supabase();

		const handleAddMessage = async (
			payload: RealtimePostgresInsertPayload<{
				[key: string]: any;
			}>
		) => {
			if (sessionUserId !== payload.new.senderId) {
				try {
					const { data, status } = await axios.get<ExtendedMessage>(
						`${domain}/api/conversation/get/new_message?messageId=${payload.new.id}`
					);
					if (data) addMessage(data);

					const scrollContainer = scrollRef.current;
					if (
						scrollContainer.scrollTop <
						scrollContainer.scrollHeight - scrollContainer.clientHeight - 10
					) {
						setNotification((current) => current + 1);
					}
				} catch (err) {
					console.log('error');
				}
			}
		};

		const handleUpdateMessage = (
			payload: RealtimePostgresUpdatePayload<{
				[key: string]: any;
			}>
		) => {
			if (sessionUserId !== payload.new.senderId) {
				editMessage(payload.new.id, payload.new.content);
			}
		};

		const handleDeleteMessage = (
			payload: RealtimePostgresDeletePayload<{
				[key: string]: any;
			}>
		) => {
			const messageExists = messages.find((message) => message.id === payload.old.id);
			if (messageExists) deleteMessage(payload.old.id);
		};

		const channel = supabaseClient
			.channel(`chat-${chatId}`)
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'Message' },
				handleAddMessage
			)
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'Message' },
				handleUpdateMessage
			)
			.on(
				'postgres_changes',
				{ event: 'DELETE', schema: 'public', table: 'Message' },
				handleDeleteMessage
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};

		// eslint-disable-next-line
	}, [chatId, messages, sessionUserId]);

	const handleOnScroll = () => {
		const scrollContainer = scrollRef.current;
		if (scrollContainer) {
			const isScroll =
				scrollContainer.scrollTop <
				scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
			setUserScrolled(isScroll);
			if (
				scrollContainer.scrollTop ===
				scrollContainer.scrollHeight - scrollContainer.clientHeight
			) {
				setNotification(0);
			}
		}
	};

	console.log(notification);
	if (initialMessagesLoading)
		<div className='h-full flex flex-col items-center  justify-center'>
			<LoadingState />
		</div>;
	return (
		<div
			ref={scrollRef}
			onScroll={handleOnScroll}
			className='h-full flex flex-col gap-2 px-4 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-background '>
			{messages.map((message) => (
				<Message key={message.id} message={message} sessionUserId={sessionUserId} />
			))}
			<DeleteMessage />
		</div>
	);
};
