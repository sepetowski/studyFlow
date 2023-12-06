'use client';
import React from 'react';
import { useTags } from '@/hooks/useTags';
import { TagSelector } from '@/components/common/tag/TagSelector';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { LinkTag } from '@/components/common/LinkTag';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAutosaveIndicator } from '@/context/AutosaveIndicator';
import { useDebouncedCallback } from 'use-debounce';
import { Tag } from '@prisma/client';

interface Props {
	mindMapId: string;
	workspaceId: string;
	isMounted: boolean;
	initialActiveTags: Tag[];
}

export const MindMapTagsSelector = ({
	isMounted,
	workspaceId,
	mindMapId,
	initialActiveTags,
}: Props) => {
	const { onSetStatus, status } = useAutosaveIndicator();

	const { mutate: updateMindMapActiveTags } = useMutation({
		mutationFn: async (tagsIds: string[]) => {
			await axios.post('/api/mind_maps/update/tags', {
				workspaceId,
				tagsIds,
				mindMapId,
			});
		},

		onSuccess: () => {
			onSetStatus('saved');
		},

		onError: () => {
			onSetStatus('unsaved');
		},
	});

	const debouncedCurrentActiveTags = useDebouncedCallback(() => {
		onSetStatus('pending');
		const tagsIds = currentActiveTags.map((tag) => tag.id);
		updateMindMapActiveTags(tagsIds);
	}, 2000);

	const {
		tags,
		currentActiveTags,
		isLodingTags,
		onDeleteActiveTagHandler,
		onSelectActiveTagHandler,
		onUpdateActiveTagsHandler,
	} = useTags(workspaceId, isMounted, initialActiveTags, debouncedCurrentActiveTags);

	return (
		<>
			<HoverCard openDelay={250} closeDelay={250}>
				<HoverCardTrigger>
					<TagSelector
						plusIconSize={22}
						className='border-none h-9 px-2.5 py-0 text-base'
						isLoading={isLodingTags}
						workspaceId={workspaceId}
						tags={tags}
						currentActiveTags={currentActiveTags}
						onSelectActiveTag={onSelectActiveTagHandler}
						onUpdateActiveTags={onUpdateActiveTagsHandler}
						onDeleteActiveTag={onDeleteActiveTagHandler}
					/>
				</HoverCardTrigger>
				<HoverCardContent sideOffset={8} align='start'>
					Dodaj tag do mapy myśli
				</HoverCardContent>
			</HoverCard>
			{currentActiveTags.length > 0 && (
				<ScrollArea className='hidden sm:block  max-w-[15rem] md:max-w-[24rem]'>
					<div className='flex w-max space-x-2 py-2'>
						{currentActiveTags.map((tag) => (
							<LinkTag disabled key={tag.id} tag={tag} />
						))}
					</div>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			)}
		</>
	);
};
