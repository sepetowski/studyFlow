import { LoadingState } from '@/components/ui/loading-state';
import React from 'react';

const Loading = () => {
	return (
		<div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]  flex w-full h-full items-center justify-center'>
			<LoadingState className='w-12 h-12' />
		</div>
	);
};
export default Loading;
