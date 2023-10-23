import React from 'react';
import { User } from './User';
import { BreadcrumbNav } from './BreadcrumbNav';
import { Welcoming } from './Welcoming';

export const DashboardHeader = () => {
	return (
		<header className='w-full flex justify-between items-center mb-10'>
			<Welcoming />
			<BreadcrumbNav />
			<User />
		</header>
	);
};
