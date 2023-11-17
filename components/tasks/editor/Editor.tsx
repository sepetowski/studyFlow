'use client';
import React, { useCallback, useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Link2, List, Strikethrough, UnderlineIcon } from 'lucide-react';
import { OptionBtn } from './tools/OptionBtn';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { Separator } from '@/components/ui/separator';
import { AddLink } from './tools/AddLink';

export const Editor = () => {
	const editor = useEditor({
		editorProps: {
			attributes: {
				class:
					'focus:outline-none prose prose-headings:text-secondary-foreground prose-p:text-secondary-foreground prose-strong:text-secondary-foreground prose-a:text-primary prose-a:no-underline prose-a:cursor-pointer   w-full focus-visible:outline-none rounded-md max-w-none',
			},
		},
		extensions: [
			StarterKit.configure({
				history: false,

				heading: {
					levels: [1, 2, 3, 4],
				},
			}),
			Underline,
			Link,
		],
		content: `
    <h1 class="text-4xl    ">This is a 1st level heading</h1>
    <h2 class="text-3xl  ">This is a 2nd level heading</h2>
    <h3 class="text-2xl   ">This is a 3rd level heading</h3>
    <p >lafasadasdasasdaas</p>
  `,
	});

	return (
		<>
			{editor && (
				<BubbleMenu
					tippyOptions={{
						zIndex: 20,
					}}
					className=' rounded-md  shadow-sm border bg-popover p-1 text-popover-foreground flex items-center gap-2 '
					editor={editor}>
					<OptionBtn
						icon={<Bold size={16} />}
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={editor.isActive('bold') ? 'bg-accent text-secondary-foreground' : ''}
					/>
					<OptionBtn
						icon={<Italic size={16} />}
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={editor.isActive('italic') ? 'bg-accent text-secondary-foreground' : ''}
					/>
					<OptionBtn
						icon={<Strikethrough size={16} />}
						onClick={() => editor.chain().focus().toggleStrike().run()}
						className={editor.isActive('strike') ? 'bg-accent text-secondary-foreground' : ''}
					/>
					<OptionBtn
						icon={<UnderlineIcon size={16} />}
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						className={editor.isActive('underline') ? 'bg-accent text-secondary-foreground' : ''}
					/>
					<Separator className='h-6' orientation='vertical' />
					<AddLink editor={editor} />
				</BubbleMenu>
			)}
			<EditorContent spellCheck={false} editor={editor} />
		</>
	);
};
