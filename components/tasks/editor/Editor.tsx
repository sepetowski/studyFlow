'use client';
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import History from '@tiptap/extension-history';
import { BubbleMenu } from '@tiptap/react';
import { ToolsContainer } from './tools/ToolsContainer';

export const Editor = () => {
	const editor = useEditor({
		editorProps: {
			attributes: {
				class:
					'focus:outline-none prose prose-headings:text-secondary-foreground prose-p:text-secondary-foreground prose-strong:text-secondary-foreground prose-a:text-primary prose-a:no-underline prose-a:cursor-pointer   w-full focus-visible:outline-none rounded-md max-w-none prose-code:text-secondary-foreground prose-code:bg-muted  prose-ol:text-secondary-foreground prose-ul:text-secondary-foreground prose-li:marker:text-secondary-foreground prose-li:marker:font-bold ',
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
			Color,
			TextStyle,
			History,
		],
		content: `
    <h1 class="text-4xl ">This is a 1st level heading</h1>
    <h2 class="text-3xl  ">This is a 2nd level heading</h2>
    <h3 class="text-2xl   ">This is a 3rd level heading</h3>
    <p >lafasadasdasasdaas</p>
	<p><code>This is code.</code></p>
	<span>test</span>
	<ul>
	<li>This is a bullet list.</li>
	<li>And it has three list items.</li>
	<li>Here is the third one.</li>
  </ul>
  <p>
	Do you want to see one more? I bet! Here is another one:
  </p>
  <ol>
	<li>That’s a different list, actually it’s an ordered list.</li>
	<li>It also has three list items.</li>
	<li>And all of them are numbered.</li>
  </ol>
  `,
	});

	return (
		<>
			{editor && (
				<BubbleMenu
					tippyOptions={{
						zIndex: 20,
						maxWidth: 10000,
					}}
					className='bg-transparent'
					editor={editor}>
					<ToolsContainer editor={editor} />
				</BubbleMenu>
			)}
			<EditorContent spellCheck={false} editor={editor} />
		</>
	);
};
