import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CommandContainer } from './FilterCommand/CommandContainer';
import { FilterIcon } from 'lucide-react';
import { FilterUser } from '@/types/extended';
import { LoadingState } from '@/components/ui/loading-state';
import { ClientError } from '@/components/error/ClientError';
import { Tag } from '@prisma/client';

interface Props {
	sessionUserId: string;
	currentFilterdAsssigedToUsers: FilterUser[];
	currentFilterdTags: Tag[];
	tags: Tag[] | undefined;
	isError: boolean;
	isLoding: boolean;
	onChangeAssigedUserToFilter: (userId: string) => void;
	onChangeFilterTags: (tagId: string) => void;
}

export const Filter = ({
	sessionUserId,
	currentFilterdAsssigedToUsers,
	currentFilterdTags,
	tags,
	isError,
	isLoding,
	onChangeAssigedUserToFilter,
	onChangeFilterTags,
}: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={'sm'} className='text-white flex gap-2 items-center rounded-lg'>
					<FilterIcon size={16} /> Filter
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-fit' align='start'>
				{isLoding ? (
					<div className='h-16 flex items-center justify-center'>
						<LoadingState size={22} />
					</div>
				) : isError ? (
					<ClientError
						className='bg-popover mt-0 sm:mt-0 md:mt-0'
						message='nie udało sie załadować danych filtracji'
					/>
				) : (
					<CommandContainer
						sessionUserId={sessionUserId}
						tags={tags!}
						currentFilterdAsssigedToUsers={currentFilterdAsssigedToUsers}
						currentFilterdTags={currentFilterdTags}
						onChangeAssigedUserToFilter={onChangeAssigedUserToFilter}
						onChangeFilterTags={onChangeFilterTags}
					/>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
