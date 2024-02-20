import { Dayjs } from 'dayjs';

export const getDayNumber = (day: Dayjs) => {
	switch (day.day()) {
		case 0:
			return 7;
		default:
			return day.day();
	}
};

export const createCalendarBlocks = (startDate: Dayjs | null, endDate: Dayjs | null) => {
	if (!startDate) return [];

	const fragments = [];

	console.log(endDate?.format('DD-MM-YYYY'));

	if (!endDate) {
		fragments.push({
			from: startDate.toISOString(),
			to: null,
		});

		return fragments;
	}

	const taskDuration = endDate.diff(startDate, 'day') + 1;

	let avaibleDays = taskDuration;
	let currentFragmentStartDate = startDate;

	while (currentFragmentStartDate.isBefore(endDate)) {
		const currDayNumber = getDayNumber(currentFragmentStartDate);
		const daysUntilSunday = 7 - currDayNumber;

		if (avaibleDays > daysUntilSunday) {
			const currentEndDate = currentFragmentStartDate.clone().add(daysUntilSunday, 'day');

			fragments.push({
				from: currentFragmentStartDate.toISOString(),
				to: currentEndDate.toISOString(),
			});

			currentFragmentStartDate = currentEndDate.clone().add(1, 'day');

			avaibleDays = avaibleDays - daysUntilSunday;
		} else {
			fragments.push({
				from: currentFragmentStartDate.toISOString(),
				to: endDate.toISOString(),
			});

			currentFragmentStartDate = endDate.clone();
		}
	}
	return fragments;
};
