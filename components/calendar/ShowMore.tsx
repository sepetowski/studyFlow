import React from 'react';
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
}

export const ShowMore = ({ calendarItems, leftItemsAmmount }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className='w-fit py-0.5 px-2 h-7 text-muted-foreground   '
					size={'sm'}
					variant='ghost'>
					{leftItemsAmmount} more
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
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
