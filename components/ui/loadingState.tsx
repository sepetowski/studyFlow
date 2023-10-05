import { Loader2 } from 'lucide-react';
import React from 'react';

interface Props {
	loadingText: string;
	hideLoaderIcon?: boolean;
}

export const LoadingState = ({ loadingText, hideLoaderIcon = false }: Props) => {
	return (
		<>
			{!hideLoaderIcon && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
			<p>{loadingText}</p>
		</>
	);
};
