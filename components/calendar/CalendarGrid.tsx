'use client';
import React, { Fragment } from 'react';
import { Day } from './Day';
import dayjs from 'dayjs';
import { CalendarItem } from '@/types/extended';

interface Props {
	currMonth: dayjs.Dayjs[][];
	monthIndex: number;
	calendarItems: CalendarItem[];
}

export const CalendarGrid = ({ currMonth, monthIndex, calendarItems }: Props) => {
	const daysOfWeek = ['pon', 'wt', 'śr', 'czw', 'pt', 'sob', 'ndz'];

	return (
		<>
			<div className='w-full h-full flex flex-col gap-3 '>
				<div className='w-full grid grid-cols-7 text-right '>
					{daysOfWeek.map((day, index) => (
						<p key={index} className='mr-2 font-semibold text-sm'>
							{day.toLocaleUpperCase()}
						</p>
					))}
				</div>
				<div className='h-full w-full grid grid-cols-7 grid-rows-5'>
					{currMonth.map((row, i) => (
						<Fragment key={i}>
							{row.map((day, idx) => (
								<Day key={idx} day={day} monthIndex={monthIndex} calendarItems={calendarItems} />
							))}
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
};
