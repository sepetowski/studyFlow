'use client';
import React, { useEffect, useRef, useState } from 'react';
import {  NodeProps} from 'reactflow';
import { NodeWrapper } from './NodeWrapper';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { TextNodeSchema, textNodeSchema } from '@/schema/nodesSchema';
import { zodResolver } from '@hookform/resolvers/zod';
type NodeData = {
	value: number;
};

export const TextNode = ({ data }: NodeProps<NodeData>) => {
	console.log(data);

	const [isEditing, setIsEditing] = useState(false);
	const _nodeText = useRef<HTMLTextAreaElement>(null);

	const form = useForm<TextNodeSchema>({
		resolver: zodResolver(textNodeSchema),
		defaultValues: {
			text: 'Add new text',
		},
	});

	const { ref: nodeText, ...rest } = form.register('text');

	const onEdit = () => {
		setIsEditing((prev) => !prev);
	};
	const onSubmit = (data: TextNodeSchema) => {
		console.log(data);
	};

	useEffect(() => {
		form.reset({
			text: data.value ? data.value.toString() : 'Add new text',
		});
	}, [data.value, form, isEditing]);

	return (
		<NodeWrapper isEditing={isEditing} onEdit={onEdit}>
			<div className='w-full py-1.5'>
				{isEditing ? (
					<form id='node-text-form' onSubmit={form.handleSubmit(onSubmit)}>
						<TextareaAutosize
							{...rest}
							ref={(e) => {
								nodeText(e);
								// @ts-ignore
								_nodeText.current = e;
							}}
							className='w-96 min-h-[4rem] resize-none appearance-none overflow-hidden bg-transparent  placeholder:text-muted-foreground  font-semibold focus:outline-none '
						/>
						<div className='w-full flex justify-end mt-4  gap-2'>
							<Button
								type='button'
								onClick={onEdit}
								variant={'outline'}
								className='text-white py-1.5 sm:py-1.5 h-fit'
								size={'sm'}>
								Cancel
							</Button>
							<Button type='submit' className='text-white py-1.5 sm:py-1.5 h-fit' size={'sm'}>
								Save changes
							</Button>
						</div>
					</form>
				) : (
					<p className='w-full  '>{data.value}</p>
				)}
			</div>
		</NodeWrapper>
	);
};
