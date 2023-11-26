import React from 'react';

interface Props {
	selectedEmoji?: string;
}

export const ReadOnlyEmoji = ({ selectedEmoji }: Props) => {
	return (
		<div className='w-16 h-16 rounded-lg bg-secondary flex justify-center items-center text-3xl px-3'>
			{selectedEmoji}
		</div>
	);
};
