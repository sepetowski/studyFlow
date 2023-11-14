'use client';

import React, { useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

export const Ttile = () => {
	const [content, setContent] = useState('');

	const onPasteHandler = (event: React.ClipboardEvent) => {
		console.log(event);
		event.preventDefault();
		const plainText = event.clipboardData.getData('text/plain');

		setContent(plainText);
	};
	const onChangeHandler = (e: ContentEditableEvent) => {
		setContent(e.target.value);
	};

	return (
		<div className='relative text-xl font-semibold'>
			<ContentEditable
				tagName='span'
				className='outline-none inline-block min-h-0 relative z-20 w-full break-words break-all '
				html={content}
				onPaste={onPasteHandler}
				onChange={onChangeHandler}
				spellCheck={false}
			/>

			{!content && (
				<span className='text-muted-foreground pointer-events-none absolute left-0 top-0 min-h-0'>
					Zadanie bez tytułu
				</span>
			)}
		</div>
	);
};
