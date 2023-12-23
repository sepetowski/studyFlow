'use client';
import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { UserPlus2, Users2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LoadingState } from '@/components/ui/loading-state';
import { CommandContainer } from './CommandContainer';
import { useRouter } from 'next-intl/client';
import { useQuery } from '@tanstack/react-query';
import { UsersAssingedToTaskInfo } from '@/types/extended';

interface Props {
	className?: string;
	plusIconSize?: number;
	dropDownSizeOffset?: number;
	workspaceId: string;
	taskId: string;
}

export const AssignedToTaskSelector = ({
	className,
	dropDownSizeOffset,
	plusIconSize = 16,
	taskId,
	workspaceId,
}: Props) => {
	const router = useRouter();

	console.log(workspaceId, taskId);

	const { data: assgingedUsersInfo, isLoading: isLodingInfo } = useQuery({
		queryFn: async () => {
			const res = await fetch(
				`/api/assigned_to/tasks/get?workspaceId=${workspaceId}&taskId=${taskId}`
			);

			if (!res.ok) return {} as UsersAssingedToTaskInfo;

			const data = await res.json();
			return data as UsersAssingedToTaskInfo;
		},

		queryKey: ['getAssignedToTaskInfo'],
	});

	console.log(assgingedUsersInfo);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className={cn(
						`w-fit h-fit text-xs justify-start text-left font-normal px-2.5 py-0.5 `,
						className
					)}
					variant={'outline'}
					size={'sm'}>
					<Users2 size={plusIconSize} className='mr-1 ' />
					<span>Przypisz</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent sideOffset={dropDownSizeOffset && dropDownSizeOffset}>
				{isLodingInfo && (
					<div className=' p-3  flex justify-center items-center'>
						<LoadingState />
					</div>
				)}
				{!isLodingInfo && assgingedUsersInfo ? (
					<CommandContainer
						users={assgingedUsersInfo.subscribers}
						taskId={taskId}
						workspaceId={workspaceId}
					/>
				) : (
					<div className='p-3 text-sm flex justify-center items-center flex-col gap-4 '>
						<p>error</p>
						<Button
							className='w-full'
							size={'sm'}
							variant={'default'}
							onClick={() => router.refresh()}>
							reset
						</Button>
					</div>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
