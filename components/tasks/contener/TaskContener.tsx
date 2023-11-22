'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Editor } from '../editor/Editor';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import TextareaAutosize from 'react-textarea-autosize';
import { TaskCalendar } from './TaskCalendar';
import { Emoji } from './Emoji';
import { TaskSchema, taskSchema } from '@/schema/taskSchema';
import { DateRange } from 'react-day-picker';
import { CustomColors, Tag } from '@prisma/client';
import { TagSelector } from '../tag/TagSelector';
import { LinkTag } from '@/components/common/LinkTag';
import { useTranslations } from 'next-intl';
import { useDebounce } from 'use-debounce';

interface Props {
	taskId: string;
	title?: string;
	content?: JSON;
	emoji?: string;
	from?: Date;
	to?: Date;
	workspaceId: string;
	initialActiveTags: Tag[];
}

export const TaskContener = ({
	taskId,
	workspaceId,
	initialActiveTags,
	content,
	emoji,
	from,
	title,
	to,
}: Props) => {
	const _titleRef = useRef<HTMLTextAreaElement>(null);
	const [isMounted, setIsMounted] = useState(false);
	const [currentActiveTags, setCurrentActiveTags] = useState(initialActiveTags);
	const [debouncedCurrentActiveTags] = useDebounce(currentActiveTags, 2000);

	const t = useTranslations('TASK');

	const onSelectActiveTagHandler = (tagId: string) => {
		setCurrentActiveTags((prevActiveTags) => {
			const tagIndex = prevActiveTags.findIndex((activeTag) => activeTag.id === tagId);

			if (tagIndex !== -1) {
				const updatedActiveTags = [...prevActiveTags];
				updatedActiveTags.splice(tagIndex, 1);
				return updatedActiveTags;
			} else {
				const selectedTag = tags!.find((tag) => tag.id === tagId);
				if (selectedTag) {
					return [...prevActiveTags, selectedTag];
				}
			}

			return prevActiveTags;
		});
	};

	const onUpdateActiveTagsHandler = (tagId: string, color: CustomColors, name: string) => {
		setCurrentActiveTags((prevActiveTags) => {
			if (prevActiveTags.length === 0) return prevActiveTags;
			const updatedTags = prevActiveTags.map((tag) =>
				tag.id === tagId ? { ...tag, name, color } : tag
			);

			return updatedTags;
		});
	};

	const onDeleteActiveTagHandler = (tagId: string) => {
		setCurrentActiveTags((prevActiveTags) => {
			if (prevActiveTags.length === 0) return prevActiveTags;
			const updatedTags = prevActiveTags.filter((tag) => tag.id !== tagId);

			return updatedTags;
		});
	};

	const form = useForm<TaskSchema>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			icon: emoji ? emoji : '🧠',
			title: title ? title : '',
		},
	});

	const { data: tags, isLoading } = useQuery({
		queryFn: async () => {
			const res = await fetch(`/api/tags/get/get_workspace_tags?workspaceId=${workspaceId}`);

			if (!res.ok) return [];

			const data = await res.json();
			return data as Tag[];
		},
		enabled: isMounted,
		queryKey: ['getWorkspaceTags'],
	});
	const { ref: titleRef, ...rest } = form.register('title');

	const [debouncedTitle] = useDebounce(form.watch('title'), 2000);

	useEffect(() => {
		if (!isMounted) return;

		console.log(debouncedTitle);
	}, [debouncedTitle, isMounted]);
	useEffect(() => {
		if (!isMounted) return;
		const tagsIds = debouncedCurrentActiveTags.map((tag) => tag.id);
	}, [debouncedCurrentActiveTags, isMounted]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onSubmit = (data: TaskSchema) => {
		console.log(data);
	};
	const onFormSelectHandler = (emoji: string) => {
		form.setValue('icon', emoji);
	};
	const onUpdateFormHandler = (date: DateRange | undefined) => {
		form.setValue('date', date);
	};

	if (!isMounted) return null;

	return (
		<Card>
			<form id='task-form' onSubmit={form.handleSubmit(onSubmit)}>
				<CardContent className='py-4 sm:py-6 flex flex-col gap-10'>
					<div className='w-full flex  items-start gap-2 sm:gap-4'>
						<Emoji onFormSelect={onFormSelectHandler} />

						<div className='w-full flex flex-col gap-2'>
							<TextareaAutosize
								ref={(e) => {
									titleRef(e);
									// @ts-ignore
									_titleRef.current = e;
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') e.preventDefault();
								}}
								{...rest}
								placeholder={t('HEADER.PLACEHOLDER')}
								className='w-full resize-none appearance-none overflow-hidden bg-transparent  placeholder:text-muted-foreground text-2xl font-semibold focus:outline-none '
							/>

							<div className='w-full gap-1 flex flex-wrap flex-row'>
								<TaskCalendar
									workspaceId={workspaceId}
									taskId={taskId}
									from={from}
									to={to}
									onUpdateForm={onUpdateFormHandler}
								/>
								<TagSelector
									isLoading={isLoading}
									workspaceId={workspaceId}
									tags={tags}
									currentActiveTags={currentActiveTags}
									onSelectActiveTag={onSelectActiveTagHandler}
									onUpdateActiveTags={onUpdateActiveTagsHandler}
									onDeleteActiveTag={onDeleteActiveTagHandler}
								/>
								{currentActiveTags.map((tag) => (
									<LinkTag disabled key={tag.id} tag={tag} />
								))}
							</div>
						</div>
					</div>
					<Editor content={content} />
				</CardContent>
			</form>
		</Card>
	);
};
