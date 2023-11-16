'use client';
import React from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CommandContainer } from './CommandContainer ';
import { Tag } from '@prisma/client';
import { LoadingState } from '@/components/ui/loading-state';

interface Props {
	tags?: Tag[];
	currentActiveTags: Tag[];
	onSelectActiveTag: (id: string) => void;
	workspaceId: string;
}

export const TagSelector = ({ tags, currentActiveTags, onSelectActiveTag, workspaceId }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className='w-fit h-fit text-xs justify-start text-left font-normal px-2.5 py-0.5 '
					variant={'outline'}
					size={'sm'}>
					<Plus size={16} className='mr-1 w-3 h-3' />
					<span className='hidden sm:inline'>New tag</span>
					<span className='sm:hidden'>Tag</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{tags ? (
					<CommandContainer
						workspaceId={workspaceId}
						tags={tags}
						currentActiveTags={currentActiveTags}
						onSelectActiveTag={onSelectActiveTag}
					/>
				) : (
					<div className=' p-3  flex justify-center items-center'>
						<LoadingState />
					</div>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
