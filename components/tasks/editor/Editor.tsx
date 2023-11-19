'use client';
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { BubbleMenu } from '@tiptap/react';
import { ToolsContainer } from './tools/ToolsContainer';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import CharacterCount from '@tiptap/extension-character-count';
import { FloatingContainer } from './tools/FloatingContainer';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const limit = 600;

export const Editor = () => {
	const t = useTranslations('TASK');

	const editor = useEditor({
		editorProps: {
			handleDrop: () => {
				return false;
			},
			attributes: {
				class:
					'focus:outline-none prose prose-headings:text-secondary-foreground prose-p:text-secondary-foreground prose-strong:text-secondary-foreground prose-a:text-primary prose-a:no-underline prose-a:cursor-pointer   w-full focus-visible:outline-none rounded-md max-w-none prose-code:text-secondary-foreground prose-code:bg-muted  prose-ol:text-secondary-foreground prose-ul:text-secondary-foreground prose-li:marker:text-secondary-foreground prose-li:marker:font-bold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl  prose-h5:text-xl prose-h6:text-lg prose-p:text-base prose-headings:line-clamp-1 prose-headings:mt-0 prose-p:my-2',
			},
		},
		extensions: [
			StarterKit.configure({
				dropcursor: {
					class: 'text-primary',
				},
			}),
			Underline,
			Link,
			Color,
			TextStyle,
			Image,
			CharacterCount.configure({
				limit,
			}),
			Placeholder.configure({
				emptyNodeClass: 'before:text-muted-foreground',
				placeholder: t('EDITOR.PLACEHOLDER'),
			}),
		],
		content: '',
	});

	return (
		<div>
			{editor && (
				<>
					<FloatingContainer editor={editor} />

					<BubbleMenu
						tippyOptions={{
							zIndex: 20,
							maxWidth: 10000,
						}}
						className='bg-transparent'
						editor={editor}>
						<ToolsContainer editor={editor} />
					</BubbleMenu>
				</>
			)}
			<EditorContent className='' spellCheck={false} editor={editor} />
			{editor && (
				<div className=' mt-10 flex  justify-between items-center  text-muted-foreground text-sm py-4 '>
					<Button className='w-fit self-start' variant={'secondary'} type='submit'>
						{t('BTN.SAVE_TASK')}
					</Button>
					<div className='flex  flex-col items-end '>
						<p>
							{t('EDITOR.WORDS')} {editor.storage.characterCount.words()}
						</p>
						<p>
							{editor.storage.characterCount.characters()}/{limit} {t('EDITOR.CHARS')}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};
