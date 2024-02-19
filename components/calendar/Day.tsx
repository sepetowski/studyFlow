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

	console.log(daysInfo);

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
					if (!dayInfo.taskDate) return;
					const taskStartDate = dayjs(dayInfo.taskDate.from);
					const taskEndDate = dayjs(dayInfo.taskDate.to);
					const taskLength = taskEndDate.diff(taskStartDate, 'day') + 1;

					if (taskStartDate.isSame(day, 'day') && taskLength <= 7) {
						return <CalendarTask key={dayInfo.taskId} dayInfo={dayInfo} topOffset={i * 20} />;
					} else if (taskLength > 7) {
						let currentFragmentStartDate = taskStartDate;
						const fragments: CalendarItem[] = [];

						let allTaskDays = taskLength;

						while (currentFragmentStartDate.isBefore(taskEndDate)) {
							let currentFragmentEndDate: Dayjs;

							if (allTaskDays === taskLength)
								currentFragmentEndDate = currentFragmentStartDate
									.clone()
									.add(6, 'days')
									.endOf('day');
							else {
								currentFragmentEndDate = currentFragmentStartDate
									.clone()
									.add(allTaskDays > 7 ? 6 : allTaskDays - 1, 'days')
									.endOf('day');
							}

							allTaskDays = allTaskDays - 7;

							fragments.push({
								...dayInfo,
								taskDate: {
									...dayInfo.taskDate!,
									to: new Date(currentFragmentEndDate.toDate()),
									from: new Date(currentFragmentStartDate.toDate()),
								},
							});

							currentFragmentStartDate = currentFragmentEndDate.add(1, 'day').startOf('day');
						}

						return fragments.map((dayFragment, i) => {
							const taskStartDate = dayjs(dayFragment.taskDate?.from);

							if (taskStartDate.isSame(day, 'day')) {
								return (
									<CalendarTask key={dayFragment.taskId + i} dayInfo={dayFragment} topOffset={0} />
								);
							}
						});
					}
				})}
			</div>
		</div>
	);
};
