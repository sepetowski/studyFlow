'use client';
import React, { useState } from 'react';
import { EmojiSelector } from '@/components/common/EmojiSelector';

export const Logo = () => {
	const [selectedEmoji, setSelectedEmoji] = useState('🧠');

	const selectEmojiHandler = (emoji: string) => {
		setSelectedEmoji(emoji);
	};

	return (
		<EmojiSelector onSelectedEmoji={selectEmojiHandler}>
			<span
				role='img'
				aria-label='emoji'
				className='w-16 h-16 rounded-lg bg-secondary flex justify-center items-center text-3xl'>
				{selectedEmoji}
			</span>
		</EmojiSelector>
	);
};
