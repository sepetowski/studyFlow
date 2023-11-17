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
import { CustomColors, Tag } from '@prisma/client';
import { LoadingState } from '@/components/ui/loading-state';
import { useRouter } from 'next-intl/client';

interface Props {
	isLoading: boolean;
	tags?: Tag[];
	currentActiveTags: Tag[];
	workspaceId: string;
	onSelectActiveTag: (id: string) => void;
	onUpdateActiveTags: (tagId: string, color: CustomColors, name: string) => void;
	onDeleteActiveTag: (tagId: string) => void;
}

export const TagSelector = ({
	tags,
	currentActiveTags,
	isLoading,
	workspaceId,
	onSelectActiveTag,
	onUpdateActiveTags,
	onDeleteActiveTag,
}: Props) => {
	const router = useRouter();

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
				{isLoading && (
					<div className=' p-3  flex justify-center items-center'>
						<LoadingState />
					</div>
				)}
				{!isLoading && tags ? (
					<CommandContainer
						workspaceId={workspaceId}
						tags={tags}
						currentActiveTags={currentActiveTags}
						onSelectActiveTag={onSelectActiveTag}
						onUpdateActiveTags={onUpdateActiveTags}
						onDeleteActiveTag={onDeleteActiveTag}
					/>
				) : (
					<div className='p-3 text-sm flex justify-center items-center flex-col gap-4 '>
						<p>Ups cos poszlo nie tak</p>
						<Button
							className='w-full'
							size={'sm'}
							variant={'default'}
							onClick={() => router.refresh()}>
							Sprobuj ponownie
						</Button>
					</div>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
