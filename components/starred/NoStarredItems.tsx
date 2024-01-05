import React from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { StarredItemsList } from '../svg/StarredItemsList';

export const NoStarredItems = () => {
	return (
		<Card className='bg-background border-none shadow-none flex flex-col items-center mt-12 sm:mt-16 md:mt-32 text-center overflow-hidden'>
			<CardHeader className='sm:flex-row sm:items-center sm:justify-between'>
				<div className='flex flex-col space-y-1.5'>
					<h1 className='text-2xl font-semibold leading-none tracking-tight'>
						There are no starred projects
					</h1>
					<CardDescription className='text-base mt-4'>
						Any task od mind map you star will show up here.
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className='mt-4 sm:mt-0'>
				<StarredItemsList />
			</CardContent>
		</Card>
	);
};
