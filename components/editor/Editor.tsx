import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Ttile } from './header/Ttile';
import { Contener } from './contener/Contener';
import { Header } from './header/Header';

export const Editor = () => {
	return (
		<Card>
			<CardContent className='py-4 sm:py-6'>
				<Header/>
				<Contener />
			</CardContent>
		</Card>
	);
};
