import React from 'react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { cn } from '@/lib/utils';

interface Props {
	day: Dayjs;
	monthIndex: number;
}

export const Day = ({ day, monthIndex }: Props) => {
	const isPreviousMonth = day.month() !== monthIndex;

	return (
		<div
			className={cn(
				`border border-border flex flex-col overflow-y-auto noscroll p-1 transition-opacity duration-200 bg-background ${
					day.format('ddd') === 'Sat' || day.format('ddd') === 'Sun'
						? ' bg-accent dark:bg-popover/50 '
						: ''
				}  ${isPreviousMonth ? 'opacity-50 dark:opacity-25 ' : ''}`
			)}>
			<div className='flex flex-col   items-end'>
				<p
					className={`text-sm p-1 mt-1 text-center ${
						day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
							? 'transition-colors duration-200 bg-primary text-white w-7 rounded-full'
							: ''
					}`}>
					{day.format('DD')}
				</p>
			</div>
		</div>
	);
};
