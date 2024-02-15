'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { getMonth } from '@/lib/utils';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import dayjs from 'dayjs';

export const Calendar = () => {
	const [currMonth, setCurrMonth] = useState(getMonth());
	const [monthIndex, setMonthIndex] = useState(dayjs().month());

	useEffect(() => {
		setCurrMonth(getMonth(monthIndex));
	}, [monthIndex]);

	const changeMonthHandler = useCallback((change: 'next' | 'prev') => {
		if (change === 'next') setMonthIndex((prev) => prev + 1);
		else setMonthIndex((prev) => prev - 1);
	}, []);

	const resetMonthHandler = useCallback(() => {
		if (monthIndex === dayjs().month()) return;
		setMonthIndex(dayjs().month());
	}, [monthIndex]);

	return (
		<div className='w-full h-full flex flex-col gap-8 items-center'>
			<CalendarHeader
				monthIndex={monthIndex}
				onChangeMonthHandler={changeMonthHandler}
				onResetMonthHandler={resetMonthHandler}
			/>
			<CalendarGrid currMonth={currMonth} monthIndex={monthIndex} />
		</div>
	);
};
