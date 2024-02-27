import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { CalendarItem } from '@/types/extended';
import { CalendarTask } from './CalendarTask';
import { ScrollArea } from '@/components/ui/scroll-area';
interface Props {
	calendarItems: CalendarItem[];
	leftItemsAmmount: number;
	small?: boolean;
}

export const ShowMore = ({ calendarItems, leftItemsAmmount, small }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				{small ? (
					<Button
						className='mb-1 text-muted-foreground relative z-10 bg-secondary w-6 h-6 flex shadow-sm rounded-full text-[0.70rem]  '
						size={'icon'}
						variant='ghost'>
						{leftItemsAmmount > 10 ? '+9' : leftItemsAmmount}
					</Button>
				) : (
					<Button
						className='w-fit py-0.5 px-2 h-7 text-muted-foreground relative z-10   '
						size={'sm'}
						variant='ghost'>
						{leftItemsAmmount > 10 ? '+9' : leftItemsAmmount} more
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className='sm:max-w-[600px]'>
				<DialogHeader className='p-1'>
					<DialogTitle>All events</DialogTitle>
					<DialogDescription>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className='max-h-64 '>
					<div className='h-full flex flex-col gap-3 p-1 '>
						{calendarItems.map((calendarItem) => (
							<CalendarTask key={calendarItem.taskId} dayInfo={calendarItem} showMore />
						))}
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};
