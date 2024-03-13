'use client';
import React, { useState } from 'react';
import { EmojiSelector } from '@/components/common/EmojiSelector';
import { Button } from '@/components/ui/button';
import { Send, Smile } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
	messageId: string;
	content: string;
	onChangeEdit: (editing: boolean) => void;
}

export const EditMessage = ({ content, messageId, onChangeEdit }: Props) => {
	const [message, setMessage] = useState(content);

	const onSelectEmojiHandler = (emojiCode: string) => {
		const emoji = String.fromCodePoint(parseInt(emojiCode, 16));
		setMessage((prevMessage) => prevMessage + emoji);
	};

	return (
		<div className='mt-2  flex flex-col gap-1'>
			<div className=' flex justify-between items-center gap-2  px-2 py-1 w-full   bg-popover rounded-md  shadow-sm border border-border'>
				<TextareaAutosize
					value={message}
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					placeholder='Nowa wiadomosc'
					className='w-full flex-grow resize-none appearance-none overflow-hidden bg-transparent  placeholder:text-muted-foreground text-sm focus:outline-none max-h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-background  '
				/>

				<div className='hidden sm:block'>
					<EmojiSelector asChild slide='right' align='end' onSelectedEmoji={onSelectEmojiHandler}>
						<Button className='w-8 h-8 sm:w-10 sm:h-10' size={'icon'} variant={'ghost'}>
							<Smile className='w-5 h-5 sm:w-auto sm:h-auto' />
						</Button>
					</EmojiSelector>
				</div>
			</div>
			<div className='text-xs text-muted-foreground'>
				<p>
					Naciśnij klawisz{' '}
					<span
						onClick={() => {
							onChangeEdit(false);
						}}
						className='text-primary font-semibold border-transparent inline-block hover:border-primary transition-colors border-b cursor-pointer'>
						esc
					</span>
					, aby anulować • klawisz{' '}
					<span className='text-primary font-semibold border-transparent inline-block hover:border-primary transition-colors border-b cursor-pointer'>
						enter
					</span>
					, aby zapisać
				</p>
			</div>
		</div>
	);
};
