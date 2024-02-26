'use client';
import React, { useMemo } from 'react';
import { CalendarItem } from '@/types/extended';
import { CalendarTask } from './CalendarTask';

interface Props {
	calendarItems: CalendarItem[];
}

export const CalendarTasks = ({ calendarItems }: Props) => {
	const visibleItems = useMemo(() => {
		return calendarItems.slice(0, 2);
	}, [calendarItems]);

	return (
		<div className='relative flex flex-col gap-2 h-full overflow-y-clip'>
			{visibleItems.map((calendarItem) => (
				<CalendarTask key={calendarItem.taskId} dayInfo={calendarItem} />
			))}
			{calendarItems.length > 3 && (
				<button>{calendarItems.length - visibleItems.length} more</button>
			)}
		</div>
	);
};
