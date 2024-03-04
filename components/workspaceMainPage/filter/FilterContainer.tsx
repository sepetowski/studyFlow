'use client';
import React from 'react';
import { Filter } from './Filter';
import { Clear } from './Clear';

export const FilterContainer = () => {
	return (
		<div className='flex w-full  flex-wrap pb-4 gap-2'>
			<Filter />
			<Clear />
		</div>
	);
};
