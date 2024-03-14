import { MESSAGES_LIMIT } from '@/lib/constants';
import { ExtendedMessage } from '@/types/extended';
import { create } from 'zustand';

interface MessageState {
	initialMessagesLoading: boolean;
	page: number;
	hasMore: boolean;
	messages: ExtendedMessage[];
	messageToDelete: null | ExtendedMessage;
	addMessage: (message: ExtendedMessage) => void;
	setMesssages: (messages: ExtendedMessage[]) => void;
	deleteMessage: (messageId: string) => void;
	editMessage: (messageId: string, content: string) => void;
	setMessageToDelete: (messageToDelete: null | ExtendedMessage) => void;
}

export const useMessage = create<MessageState>()((set) => ({
	initialMessagesLoading: true,
	messages: [],
	ammountOfNewMessages: 0,
	hasMore: true,
	page: 1,
	messageToDelete: null,
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
	editMessage: (messageId, content) => {
		set((state) => {
			const updatedMessages = state.messages.map((message) => {
				if (message.id === messageId) {
					return { ...message, content, edited: true, updatedAt: new Date() };
				} else {
					return message;
				}
			});

			return {
				messages: updatedMessages,
			};
		});
	},
	setMessageToDelete: (message) => {
		set((state) => {
			return {
				messageToDelete: message,
			};
		});
	},
}));
