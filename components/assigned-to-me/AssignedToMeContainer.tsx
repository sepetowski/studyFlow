'use client';

import React from 'react';
import { useGetAssignedToMeParams } from '@/hooks/useGetAssignedToMeParams';
import { useQuery } from '@tanstack/react-query';

interface Props {
	userId: string;
}

export const AssignedToMeContainer = ({ userId }: Props) => {
	const { currentType, workspaceFilterParam } = useGetAssignedToMeParams();
	console.log(currentType, workspaceFilterParam);

	const {
		data: assgingedInfo,
		isLoading: isLodingInfo,
		isError,
	} = useQuery({
		queryFn: async () => {
			const res = await fetch(
				`/api/assigned_to/get?workspace=${workspaceFilterParam}&type=${currentType}&userId=${userId}`
			);

			if (!res.ok) throw new Error();

			const data = await res.json();
			return data;
		},

		queryKey: ['getAssignedToMeInfo', userId, workspaceFilterParam, currentType],
	});

	console.log(assgingedInfo);

	return <div>AssignedToMeContainer</div>;
};
