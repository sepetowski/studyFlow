'use client';
import React, { useEffect, useRef, useState } from 'react';
import { HomeRecentActivityItem } from './HomeRecentActivityItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { HomeRecentActivity } from '@/types/extended';
import { useIntersection } from '@mantine/hooks';
import { LoadingState } from '../ui/loading-state';
import { ACTIVITY_PER_PAGE } from '@/lib/constants';

interface Props {
	userId: string;
	initialData: HomeRecentActivity[];
}

export const HomeRecentActivityContainer = ({ userId, initialData }: Props) => {
	const [activityItems, setActivityItems] = useState<HomeRecentActivity[]>([]);
	const [isAllFetched, setIsAllFetched] = useState(false);

	const lastActivityItem = useRef<null | HTMLDivElement>(null);
	const { entry, ref } = useIntersection({
		root: lastActivityItem.current,
		threshold: 1,
	});

	const { data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
		['getHomeRecentActivity'],
		async ({ pageParam = 1 }) => {
			const res = await fetch(
				`/api/home-page/get?userId=${userId}&page=${pageParam}&take=${ACTIVITY_PER_PAGE}`
			);
			const posts = (await res.json()) as HomeRecentActivity[];
			return posts;
		},
		{
			getNextPageParam: (_, pages) => {
				return pages.length + 1;
			},
			initialData: { pages: [initialData], pageParams: [1] },
			cacheTime: 0,
		}
	);

	useEffect(() => {
		const activityItems = data?.pages.flatMap((page) => page) ?? initialData;
		if (data?.pages[data.pages.length - 1].length === 0) setIsAllFetched(true);
		setActivityItems(activityItems);
	}, [data?.pages, initialData]);

	useEffect(() => {
		if (!isAllFetched && entry?.isIntersecting) {
			fetchNextPage();
		}
	}, [entry, isAllFetched, fetchNextPage]);

	return (
		<div className='w-full flex flex-col gap-2 mt-10'>
			{activityItems.map((activityItem, i) => {
				if (i === activityItems.length - 1) {
					return (
						<div key={activityItem.id} ref={ref}>
							<HomeRecentActivityItem activityItem={activityItem} />
						</div>
					);
				} else {
					return <HomeRecentActivityItem key={activityItem.id} activityItem={activityItem} />;
				}
			})}
			{isFetchingNextPage && (
				<div className='flex justify-center items-center mt-2'>
					<LoadingState />
				</div>
			)}
		</div>
	);
};
