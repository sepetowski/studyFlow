import React from 'react';
import { User } from './User';

export const DashboardHeader = () => {
	return (
		<header className='w-full flex justify-between items-center mb-4'>
			<div>Lorem, ipsum.</div>
			<User />
		</header>
	);
};
