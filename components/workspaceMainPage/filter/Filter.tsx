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

interface Props {
	sessionUserId: string;
	currentFilterdAsssigedToUsers: FilterUser[];
	onChangeAssigedUserToFilter: (userId: string) => void;
}

export const Filter = ({
	sessionUserId,
	currentFilterdAsssigedToUsers,
	onChangeAssigedUserToFilter,
}: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={'sm'} className='text-white flex gap-2 items-center rounded-lg'>
					<FilterIcon size={16} /> Filter
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-fit' align='start'>
				<CommandContainer
					sessionUserId={sessionUserId}
					currentFilterdAsssigedToUsers={currentFilterdAsssigedToUsers}
					onChangeAssigedUserToFilter={onChangeAssigedUserToFilter}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
