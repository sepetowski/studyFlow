'use client';
import { useFilterByUsersAndTagsInWorkspace } from '@/context/FilterByUsersAndTagsInWorkspace';
import { WorkspaceRecentActivity } from '@/types/extended';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { RecentActivityItem } from './RecentActivityItem';

interface Props {
	workspaceId: string;
	userId: string;
}

export const RecentActivityContainer = ({ userId, workspaceId }: Props) => {
	const [filteredRecentActivity, setFilteredRecentActivity] = useState<WorkspaceRecentActivity[]>(
		[]
	);

	const { filterAssignedUsers, filterTags } = useFilterByUsersAndTagsInWorkspace();

	const {
		data: recentActivity,
		isError,
		isLoading,
	} = useQuery<WorkspaceRecentActivity[]>({
		queryFn: async () => {
			const res = await fetch(
				`/api/workspace/get/workspace_home_page?userId=${userId}&workspaceId=${workspaceId}`
			);

			if (!res.ok) {
				const error = (await res.json()) as string;
				throw new Error(error);
			}

			const resposne = await res.json();

			return resposne;
		},

		queryKey: ['getWorkspaceRecentActivity', workspaceId],
	});

	return (
		<div className='w-full flex flex-col gap-2 '>
			{recentActivity?.map((activity) => (
				<RecentActivityItem key={activity.id} activity={activity} />
			))}
		</div>
	);
};
