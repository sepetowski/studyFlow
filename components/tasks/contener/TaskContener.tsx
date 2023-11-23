'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Editor } from '../editor/Editor';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import TextareaAutosize from 'react-textarea-autosize';
import { TaskCalendar } from './TaskCalendar';
import { Emoji } from './Emoji';
import { TaskSchema, taskSchema } from '@/schema/taskSchema';
import { DateRange } from 'react-day-picker';
import { CustomColors, Tag } from '@prisma/client';
import { TagSelector } from '../tag/TagSelector';
import { LinkTag } from '@/components/common/LinkTag';
import { useTranslations } from 'next-intl';
import { useDebouncedCallback } from 'use-debounce';
import axios from 'axios';
import { useSaveTaskState } from '@/context/SaveTaskState';

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

	const { onSetStatus, status } = useSaveTaskState();
	const t = useTranslations('TASK');

	const onSelectActiveTagHandler = (tagId: string) => {
		if (status !== 'unsaved') onSetStatus('unsaved');
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
		debouncedCurrentActiveTags();
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
		if (status !== 'unsaved') onSetStatus('unsaved');
		setCurrentActiveTags((prevActiveTags) => {
			if (prevActiveTags.length === 0) return prevActiveTags;
			const updatedTags = prevActiveTags.filter((tag) => tag.id !== tagId);

			return updatedTags;
		});
		debouncedCurrentActiveTags();
	};

	const form = useForm<TaskSchema>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			icon: emoji ? emoji : '🧠',
			title: title ? title : '',
		},
	});

	const { mutate: updateTaskTitle } = useMutation({
		mutationFn: async (title: string) => {
			await axios.post('/api/task/update/title', {
				workspaceId,
				title,
				taskId,
			});
		},

		onSuccess: () => {
			onSetStatus('saved');
		},

		onError: () => {
			onSetStatus('unsaved');
		},
	});
	const { mutate: updateTaskActiveTags } = useMutation({
		mutationFn: async (tagsIds: string[]) => {
			await axios.post('/api/task/update/active_tags', {
				workspaceId,
				tagsIds,
				taskId,
			});
		},

		onSuccess: () => {
			onSetStatus('saved');
		},

		onError: () => {
			onSetStatus('unsaved');
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

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const debouncedCurrentActiveTags = useDebouncedCallback(() => {
		onSetStatus('pending');
		const tagsIds = currentActiveTags.map((tag) => tag.id);
		updateTaskActiveTags(tagsIds);
	}, 2000);

	const debouncedTitle = useDebouncedCallback(
		useCallback((value: string) => {
			onSetStatus('pending');
			updateTaskTitle(value);
		}, []),
		2000
	);

	const onFormSelectHandler = (emoji: string) => {
		form.setValue('icon', emoji);
	};
	const onUpdateFormHandler = (date: DateRange | undefined) => {
		form.setValue('date', date);
	};

	if (!isMounted) return null;

	return (
		<Card>
			<form id='task-form'>
				<CardContent className='py-4 sm:py-6 flex flex-col gap-10'>
					<div className='w-full flex  items-start gap-2 sm:gap-4'>
						<Emoji
							emoji={emoji ? emoji : '🧠'}
							workspaceId={workspaceId}
							taskId={taskId}
							onFormSelect={onFormSelectHandler}
						/>

						<div className='w-full flex flex-col gap-2'>
							<TextareaAutosize
								{...rest}
								ref={(e) => {
									titleRef(e);
									// @ts-ignore
									_titleRef.current = e;
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') e.preventDefault();
								}}
								onChange={(e) => {
									if (status !== 'unsaved') onSetStatus('unsaved');
									debouncedTitle(e.target.value);
								}}
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
					<Editor taskId={taskId} workspaceId={workspaceId} content={content} />
				</CardContent>
			</form>
		</Card>
	);
};
