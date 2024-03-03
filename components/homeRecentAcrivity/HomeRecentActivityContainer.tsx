'use client';
import React, { useEffect, useRef, useState } from 'react';
import { HomeRecentActivityItem } from './HomeRecentActivityItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { HomeRecentActivity } from '@/types/extended';
import { useIntersection } from '@mantine/hooks';
import { LoadingState } from '../ui/loading-state';

interface Props {
	userId: string;
}

export const HomeRecentActivityContainer = ({ userId }: Props) => {
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
			const res = await fetch(`/api/home-page/get?userId=${userId}&page=${pageParam}&take=${1}`);
			const posts = (await res.json()) as HomeRecentActivity[];
			return posts;
		},
		{
			getNextPageParam: (_, pages) => {
				return pages.length + 1;
			},
		}
	);

	useEffect(() => {
		const activityItems = data?.pages.flatMap((page) => page) ?? [];
		if (data?.pages[data.pages.length - 1].length === 0) setIsAllFetched(true);
		setActivityItems(activityItems);
	}, [data?.pages]);

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
						<div key={i} ref={ref}>
							<HomeRecentActivityItem />
						</div>
					);
				} else {
					return <HomeRecentActivityItem key={i} />;
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
