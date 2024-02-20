'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { getMonth } from '@/lib/utils';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { CalendarItem } from '@/types/extended';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { ClientError } from '@/components/error/ClientError';
import { createCalendarBlocks } from '@/lib/createCalendarBlocks';

interface Props {
	userId: string;
}

export const Calendar = ({ userId }: Props) => {
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

	const {
		data: calendarItems,
		isLoading,
		isError,
	} = useQuery({
		queryFn: async () => {
			const res = await fetch(`/api/calendar/get?userId=${userId}`);

			if (!res.ok) throw new Error();

			const data = (await res.json()) as CalendarItem[];

			console.log(data);
			const calendarItems = data.map((dataItem) => {
				return {
					...dataItem,

					taskBlocks: createCalendarBlocks(
						dataItem.taskDate?.from ? dayjs(dataItem.taskDate?.from) : null,
						dataItem.taskDate?.to ? dayjs(dataItem.taskDate?.to) : null
					),
				};
			});
			console.log(calendarItems);
			return calendarItems;
		},

		queryKey: ['getCalendarItems', userId],
	});

	if (isLoading) return <LoadingScreen />;

	if (isError) return <ClientError hrefToGoOnReset='/dashboard/calendar' message={'error'} />;

	return (
		<div className='w-full h-full flex flex-col gap-8 items-center'>
			<CalendarHeader
				monthIndex={monthIndex}
				onChangeMonthHandler={changeMonthHandler}
				onResetMonthHandler={resetMonthHandler}
			/>
			<CalendarGrid currMonth={currMonth} monthIndex={monthIndex} calendarItems={calendarItems} />
		</div>
	);
};
