import React, { useState } from 'react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { cn } from '@/lib/utils';
import { CalendarItem } from '@/types/extended';
import { CalendarTask } from './CalendarTask';
import moment from 'moment';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

interface Props {
	day: Dayjs;
	monthIndex: number;
	daysInfo: CalendarItem[];
}

export const Day = ({ day, monthIndex, daysInfo }: Props) => {
	const isPreviousMonth = day.month() !== monthIndex;

	// howManyDaysAvaibleInWeek(dayjs('2024-02-21'), dayjs('2024-03-6'));

	return (
		<div
			className={cn(
				`border border-border flex flex-col  transition-opacity duration-200 bg-background ${
					day.format('ddd') === 'Sat' || day.format('ddd') === 'Sun'
						? ' bg-accent dark:bg-popover/50 '
						: ''
				}  ${isPreviousMonth ? 'opacity-50 dark:opacity-25 ' : ''}`
			)}>
			<div className='flex flex-col   items-end mb-2'>
				<p
					className={`text-sm p-1 mt-1 text-center ${
						day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
							? 'transition-colors duration-200 bg-primary text-white w-7 rounded-full'
							: ''
					}`}>
					{day.format('DD')}
				</p>
			</div>

			<div className='relative flex flex-col gap-2 h-full overflow-y-clip'>
				{daysInfo.map((dayInfo, i) => {
					if (dayInfo.taskBlocks) {
						return dayInfo.taskBlocks.map((task, j) => {
							const taskStartDate = dayjs(task.from);

							if (taskStartDate.isSame(day, 'day'))
								return (
									<CalendarTask
										key={dayInfo.taskId}
										dayInfo={dayInfo}
										blockTask={task}
										topOffset={0}
									/>
								);
						});
					}
				})}
			</div>
		</div>
	);
};
