import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CommandContainer } from './FilterCommand/CommandContainer';
import { FilterIcon } from 'lucide-react';

export const Filter = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={'sm'} className='text-white flex gap-2 items-center rounded-lg'>
					<FilterIcon size={16} /> Filter
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-fit' align='start'>
				<CommandContainer />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
