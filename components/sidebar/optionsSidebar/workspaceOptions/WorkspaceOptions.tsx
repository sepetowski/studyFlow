'use client';

import React, { useMemo } from 'react';
import {
	User2,
	PencilRuler,
	Plus,
	PlusSquare,
	Map,
	Files,
	Brain,
	CalendarRange,
	ChevronDown,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import ActiveLink from '@/components/ui/active-link';
import { Button } from '@/components/ui/button';
import { WorkspaceOption } from './WorkspaceOption';
import { useQuery } from '@tanstack/react-query';
import { WorkspaceShortcuts } from '@/types/extended';
import { LoadingState } from '@/components/ui/loading-state';
import { NewTask } from './actions/NewTask';

interface Props {
	workspaceId: string;
}

export const WorkspaceOptions = ({ workspaceId }: Props) => {
	const t = useTranslations('SIDEBAR.WORKSPACE_OPTIONS');

	const { data: workspaceShortcuts, isLoading } = useQuery({
		queryFn: async () => {
			const res = await fetch(`/api/workspace/get/workspace_shortcuts?workspaceId=${workspaceId}`);

			if (!res.ok) return null;

			const data = await res.json();
			return data as WorkspaceShortcuts;
		},

		queryKey: ['getWorkspaceShortcuts'],
	});

	// const workspaceOptionsFields = useMemo(
	// 	() => [
	// 		{
	// 			href: `/dashboard/workspace/${workspaceId}/tasks`,
	// 			icon: <PencilRuler size={16} />,
	// 			title: `${t('TASKS')}`,
	// 		},
	// 		{
	// 			href: `/dashboard/workspace/${workspaceId}/mind-maps`,
	// 			icon: <Map size={16} />,
	// 			title: `${t('MIND_MAPS')}`,
	// 		},
	// 		{
	// 			href: `/dashboard/workspace/${workspaceId}/schedules`,
	// 			icon: <CalendarRange size={16} />,
	// 			title: `${t('SCHEDULES')}`,
	// 		},
	// 		{
	// 			href: `/dashboard/workspace/${workspaceId}/study`,
	// 			icon: <Brain size={16} />,
	// 			title: `${t('STUDY')}`,
	// 		},
	// 		{
	// 			href: `/dashboard/workspace/${workspaceId}/files`,
	// 			icon: <Files size={16} />,
	// 			title: `${t('FILES')}`,
	// 		},
	// 	],
	// 	[workspaceId, t]
	// );

	return (
		<div className='w-full flex flex-col gap-6 '>
			<div>
				<p className='text-xs sm:text-sm uppercase text-muted-foreground '>{t('SHORTCUTS')}</p>
				{!isLoading && workspaceShortcuts && (
					<div className='flex flex-col gap-2 w-full mt-2'>
						<WorkspaceOption
							deafultName={t('DEAFULT_NAME')}
							workspaceId={workspaceId}
							href={`tasks/task`}
							fields={workspaceShortcuts.tasks}>
							<PencilRuler size={16} />
							{t('TASKS')}
						</WorkspaceOption>
					</div>
				)}
				{isLoading && (
					<div className='flex justify-center items-center w-full mt-2 h-28'>
						<LoadingState />
					</div>
				)}
			</div>
			<div>
				<p className='text-xs sm:text-sm uppercase text-muted-foreground '>{t('ACTIONS')}</p>
				<div className='flex flex-col gap-2 w-full mt-2 '>
					<NewTask workspaceId={workspaceId} />
				</div>
			</div>
		</div>
	);
};
