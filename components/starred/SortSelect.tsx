'use client';
import React from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next-intl/client';
import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
	useQueryClient,
} from '@tanstack/react-query';
import { StarredItem } from '@/types/saved';

interface Props {
	sortType: string | null;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<StarredItem[], unknown>>;
}
export const SortSelect = ({ sortType, refetch }: Props) => {
	const router = useRouter();
	const onSelectHanlder = (type: 'asc' | 'desc') => {
		router.push(`/dashboard/starred?sort=${type}`);
		refetch();
	};
	return (
		<Select
			defaultValue={sortType === 'asc' || sortType === 'desc' ? sortType : 'desc'}
			onValueChange={(filed) => {
				onSelectHanlder(filed as 'asc' | 'desc');
			}}>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Sortuj' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='asc'>asc</SelectItem>
				<SelectItem value='desc'>desc</SelectItem>
			</SelectContent>
		</Select>
	);
};
