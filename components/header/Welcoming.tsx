'use client';
import { usePathname } from 'next-intl/client';
import React from 'react';

export const Welcoming = () => {
	const pathname = usePathname();
	if (pathname === '/dashboard')
		return (
			<div className='space-y-1'>
				<p className='font-bold text-3xl'>
					Hey, <span>Jakub</span> 👋
				</p>
				<p className='text-muted-foreground max-w-sm sm:max-w-xl'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, ad!
				</p>
			</div>
		);
};
