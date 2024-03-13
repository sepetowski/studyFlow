import { MESSAGES_LIMIT } from '@/lib/constants';
import { ExtendedMessage } from '@/types/extended';
import { create } from 'zustand';

interface MessageState {
	initialMessagesLoading: boolean;
	page: number;
	hasMore: boolean;
	messages: ExtendedMessage[];
	addMessage: (message: ExtendedMessage) => void;
	setMesssages: (messages: ExtendedMessage[]) => void;
	deleteMessage: (messageId: string) => void;
}

export const useMessage = create<MessageState>()((set) => ({
	initialMessagesLoading: true,
	messages: [],
	hasMore: true,
	page: 1,
	setMesssages: (messages) =>
		set((state) => ({
			messages: [...messages, ...state.messages],
			page: state.page + 1,
			hasMore: messages.length >= MESSAGES_LIMIT,
			initialMessagesLoading: false,
		})),

	addMessage: (newMessages) =>
		set((state) => ({
			messages: [...state.messages, newMessages],
		})),
	deleteMessage: (messageId) =>
		set((state) => {
			return {
				messages: state.messages.filter((message) => message.id !== messageId),
			};
		}),
}));
