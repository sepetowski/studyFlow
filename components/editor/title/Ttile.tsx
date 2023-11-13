import { Badge } from '@/components/ui/badge';
import React from 'react';
import { Logo } from './Logo';

export const Ttile = () => {
	return (
		<div className='w-full flex items-start gap-2 sm:gap-4'>
			<Logo />
			<div className='w-full flex flex-col gap-2'>
				<div className='w-full'>
					<span></span>
				</div>
				<div className='w-full space-x-2'>
					<Badge variant={'outline'}>sada</Badge>
				</div>
			</div>
		</div>
	);
};
