'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { pl } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Props {
	onUpdateForm: (e: DateRange | undefined) => void;
}

export function TaskCalendar({
	className,
	onUpdateForm,
}: React.HTMLAttributes<HTMLDivElement> & Props) {
	const [date, setDate] = React.useState<DateRange | undefined>(undefined);

	const onSelectedDate = (date: DateRange | undefined) => {
		setDate(date);
		onUpdateForm(date);
	};

	return (
		<div className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id='date'
						size={'sm'}
						variant={'outline'}
						className={cn('w-fit h-fit text-xs justify-start text-left font-normal px-2.5 py-0.5')}>
						<CalendarIcon size={16} className='mr-2 w-3 h-3' />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'dd LLL y', {
										locale: pl,
									})}{' '}
									-{' '}
									{format(date.to, 'dd LLL y', {
										locale: pl,
									})}
								</>
							) : (
								format(date.from, 'dd LLL y', {
									locale: pl,
								})
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='center'>
					<Calendar
						initialFocus
						mode='range'
						defaultMonth={date?.from}
						selected={date}
						onSelect={onSelectedDate}
						locale={pl}
						numberOfMonths={1}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
