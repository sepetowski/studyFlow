import React from 'react';

export const Header = () => {
	return (
		<div className='w-full  border-b border-border shadow-sm  '>
			<div className='px-4 py-2 flex flex-col'>
				<h3 className='text-primary text-lg font-semibold'>Universe chat</h3>
				<div className='flex items-center gap-1'>
					<div className='w-3.5 h-3.5 rounded-full  border-border shadow-sm border bg-primary'></div>
					<p className='text-sm'>4 online</p>
				</div>
			</div>
		</div>
	);
};
