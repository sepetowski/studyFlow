import React from 'react';
import { Frown } from 'lucide-react';

export const NoFilteredData = () => {
	return (
		<div className='w-full mt-20 sm:mt-32 gap-4  flex  flex-col justify-center items-center'>
			<Frown size={100} />
			<h5 className='font-semibold text-lg sm:text-xl text-center'>
				No tasks and mind maps to be shown for the chosen filter.
			</h5>
		</div>
	);
};
