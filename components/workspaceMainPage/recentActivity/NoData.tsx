import { Activity } from 'lucide-react';
import React from 'react';

export const NoData = () => {
	return (
		<div className='flex flex-col gap-4 sm:gap-6 w-full mt-16 sm:mt-40 items-center  '>
			<div className='text-primary'>
				<Activity size={66} />
			</div>
			<p className='font-semibold text-lg sm:text-2xl max-w-3xl text-center'>
				Nie znaleziono żadnej aktywoności. Utwórz pierwsze zadania i mapy myśli już teraz!
			</p>
		</div>
	);
};
