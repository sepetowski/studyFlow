'use client';
import React, { useEffect, useState } from 'react';
import { EmojiSelector } from '@/components/common/EmojiSelector';
import { useDebounce } from 'use-debounce';

interface Props {
	onFormSelect: (emoji: string) => void;
}

export const Emoji = ({ onFormSelect }: Props) => {
	const [selectedEmoji, setSelectedEmoji] = useState('🧠');
	const [debouncedEmoji] = useDebounce(selectedEmoji, 2000);

	useEffect(() => {}, [debouncedEmoji]);

	const selectEmojiHandler = (emoji: string) => {
		setSelectedEmoji(emoji);
		onFormSelect(emoji);
	};

	return (
		<EmojiSelector onSelectedEmoji={selectEmojiHandler}>
			<span className='w-16 h-16 rounded-lg bg-secondary flex justify-center items-center text-3xl'>
				{selectedEmoji}
			</span>
		</EmojiSelector>
	);
};
