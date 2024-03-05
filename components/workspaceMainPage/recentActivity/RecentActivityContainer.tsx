'use client';
import { WorkspaceRecentActivity } from '@/types/extended';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface Props {
	workspaceId: string;
	userId: string;
}

export const RecentActivityContainer = ({ userId, workspaceId }: Props) => {
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

	console.log(recentActivity);

	return <div>RecentActivityContainer</div>;
};
