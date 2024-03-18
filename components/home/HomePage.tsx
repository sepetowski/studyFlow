import React from 'react';
import { Nav } from './nav/Nav';
import { Header } from './header/Header';

export const HomePage = () => {
	return (
		<>
			<Nav />
			<div className='w-full mx-auto max-w-screen-xl px-2 sm:px-6  '>
				<Header />
			</div>
		</>
	);
};
