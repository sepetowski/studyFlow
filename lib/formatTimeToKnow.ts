import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';

const formatDistanceLocale = {
	lessThanXSeconds: 'just now',
	xSeconds: 'just now',
	halfAMinute: 'just now',
	lessThanXMinutes: '{{count}}m',
	xMinutes: '{{count}}m',
	aboutXHours: '{{count}}h',
	xHours: '{{count}}h',
	xDays: '{{count}} days',
	aboutXWeeks: '{{count}} week',
	xWeeks: '{{count}} weeks',
	aboutXMonths: '{{count}} month',
	xMonths: '{{count}} months',
	aboutXYears: '{{count}} year',
	xYears: '{{count}} years',
	overXYears: '{{count}} years',
	almostXYears: '{{count}} years',
};

const formatDistance = (token: string, count: number, options?: any) => {
	options = options || {};

	const result = formatDistanceLocale[token as keyof typeof formatDistanceLocale].replace(
		'{{count}}',
		count.toString()
	);

	if (options.addSuffix) {
		if (options.comparison > 0) {
			return 'in ' + result;
		} else {
			if (result === 'just now') return result;
			return result + ' ago';
		}
	}

	return result;
};

export const formatTimeToNow = (date: Date) => {
	return formatDistanceToNowStrict(date, {
		addSuffix: true,
		locale: {
			...locale,
			formatDistance,
		},
	});
};
