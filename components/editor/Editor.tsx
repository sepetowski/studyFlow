import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Ttile } from './title/Ttile';
import { Contener } from './contener/Contener';

export const Editor = () => {
	return (
		<Card>
			<CardContent className='py-4 sm:py-6'>
				<Ttile />
				<Contener />
			</CardContent>
		</Card>
	);
};
