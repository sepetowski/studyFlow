'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { StarredItem as StarredItemType } from '@/types/saved';
import { useSearchParams } from 'next/navigation';
import { SortSelect } from './SortSelect';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { StarredItem } from './StarredItem';

interface Props {
	userId: string;
}
export const StarredContainer = ({ userId }: Props) => {
	const params = useSearchParams();
	const sortParam = params.get('sort');
	const sortType = sortParam && sortParam === 'asc' ? 'asc' : 'desc';

	const {
		data: starredItems,
		isLoading,
		isError,
		refetch,
	} = useQuery({
		queryFn: async () => {
			const res = await fetch(`/api/saved/get?userId=${userId}&sort=${sortType}`);

			if (!res.ok) throw new Error();

			const data = (await res.json()) as StarredItemType[];
			return data;
		},

		queryKey: ['getStarredItems', userId, sortType],
	});

	if (isLoading) return <LoadingScreen />;

	if (isError) return <p>Ops... sometihn went wrong</p>;

	return (
		<Card className='bg-background border-none shadow-none'>
			<CardHeader className='sm:flex-row sm:items-center sm:justify-between'>
				<div className='flex flex-col space-y-1.5 mb-4 sm:mb-0'>
					<h1 className='text-2xl font-semibold leading-none tracking-tight'>Zapisane elemnty</h1>
					<CardDescription className='text-base'>
						Lorem ipsum dolor sit amet consectetur.
					</CardDescription>
				</div>
				<SortSelect sortType={sortType} refetch={refetch} />
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				{starredItems.map((starredItem) => (
					<StarredItem key={starredItem.id} item={starredItem} />
				))}
			</CardContent>
		</Card>
	);
};
