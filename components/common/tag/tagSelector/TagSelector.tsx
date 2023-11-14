'use client';
import React from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, Plus, Tag } from 'lucide-react';
import { CommandContainer } from './CommandContainer ';

export const TagSelector = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className='w-fit h-fit text-xs justify-start text-left font-normal px-2.5 py-0.5 text-muted-foreground'
					variant={'outline'}
					size={'sm'}>
					<Plus size={16} className='mr-1 w-3 h-3' />
					<span className='hidden sm:inline'>New tag</span>
					<span className='sm:hidden'>Tag</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<CommandContainer/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
