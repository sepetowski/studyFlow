'use client';
import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { EmojiSelector } from '@/components/common/EmojiSelector';
import { Send, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilePreview } from './FilePreview';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/ui/use-toast';
import { UploadFilesButton } from './UploadFileButton';
import { AditionalResource } from '@/types/extended';

interface Props {
	workspaceId: string;
	chatId: string;
}

export const NewMessageContainer = ({ chatId, workspaceId }: Props) => {
	const m = useTranslations('MESSAGES');
	const { toast } = useToast();

	const [uploadedFiles, setUploadedFiles] = useState<AditionalResource[] | null>(null);
	const [message, setMessage] = useState('');

	const onSelectEmojiHandler = (emojiCode: string) => {
		const emoji = String.fromCodePoint(parseInt(emojiCode, 16));
		setMessage((prevMessage) => prevMessage + emoji);
	};

	const onChangeUploadedFilesHandler = (files: AditionalResource[] | null) => {
		setUploadedFiles(files);
	};

	const onRemoveFileHandler = (fileId: string) => {
		setUploadedFiles((prevFiles) => {
			return prevFiles?.filter((file) => file.id !== fileId) || null;
		});
	};

	const { mutate: newMessage, isLoading } = useMutation({
		mutationFn: async () => {
			const text = message;
			const attachments = uploadedFiles;

			setUploadedFiles(null);
			setMessage('');

			await axios.post('/api/conversation/new_message', {
				workspaceId,
				chatId,
				message: text,
				attachments,
			});
		},

		onSuccess: async () => {
			toast({
				title: m('SUCCES.TASK_ADDED'),
			});
		},

		onError: (err: AxiosError) => {
			const error = err?.response?.data ? err.response.data : 'ERRORS.DEFAULT';

			toast({
				title: m(error),
				variant: 'destructive',
			});
		},
		onMutate: () => {},

		mutationKey: ['newMessage'],
	});

	return (
		<div className='p-2 w-full flex flex-col gap-2 bg-popover rounded-md'>
			{uploadedFiles && uploadedFiles.length > 0 && (
				<ScrollArea className='w-full '>
					<div className=' flex gap-4 pb-4  border-b border-border'>
						{uploadedFiles.map((file) => (
							<FilePreview key={file.id} file={file} onRemoveFile={onRemoveFileHandler} />
						))}
					</div>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			)}
			<div className='w-full flex justify-between items-center gap-4'>
				<div className='flex gap-0.5  sm:gap-1'>
					<UploadFilesButton onChangeUploadedFiles={onChangeUploadedFilesHandler} />

					<EmojiSelector asChild slide='right' align='end' onSelectedEmoji={onSelectEmojiHandler}>
						<Button className='w-8 h-8 sm:w-10 sm:h-10' size={'icon'} variant={'ghost'}>
							<Smile className='w-5 h-5 sm:w-auto sm:h-auto' />
						</Button>
					</EmojiSelector>
				</div>

				<TextareaAutosize
					value={message}
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					placeholder='Nowa wiadomosc'
					className='w-full flex-grow resize-none appearance-none overflow-hidden bg-transparent  placeholder:text-muted-foreground text-lg font-semibold focus:outline-none max-h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-background  '
				/>

				<div>
					<Button
						onClick={() => {
							newMessage();
						}}
						className='w-8 h-8 sm:w-10 sm:h-10'
						size={'icon'}
						variant={'ghost'}>
						<Send className='w-5 h-5 sm:w-auto sm:h-auto' />
					</Button>
				</div>
			</div>
		</div>
	);
};
