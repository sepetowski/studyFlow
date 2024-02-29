'use client';
import { useMediaQuery } from '@react-hook/media-query';

export const useTuncateText = (text: string, maxLength: number) => {
	const isSmallScreen = useMediaQuery('(max-width: 640px)');

	const length = isSmallScreen ? maxLength - 5 : maxLength;

	if (text.length <= length) {
		return text;
	} else {
		return text.slice(0, length) + '...';
	}
};
