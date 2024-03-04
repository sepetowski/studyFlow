'use client';
import { Button } from '@/components/ui/button';
import { Eraser } from 'lucide-react';
import React from 'react';

interface Props {
	onClearAll: () => void;
}

export const Clear = ({ onClearAll }: Props) => {
	return (
		<Button
			onClick={onClearAll}
			size={'sm'}
			variant={'secondary'}
			className=' flex gap-2 items-center rounded-lg'>
			<Eraser size={16} /> Clear
		</Button>
	);
};
