'use client';
import { Button } from '@/components/ui/button';
import { Eraser } from 'lucide-react';
import React from 'react';

export const Clear = () => {
	return (
		<Button size={'sm'} variant={'secondary'} className=' flex gap-2 items-center rounded-lg'>
			<Eraser size={16} /> Clear
		</Button>
	);
};
