import React from 'react';
import { CommandItem } from '@/components/ui/command';
import { Check, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CommandTagItem = () => {
	return (
		<CommandItem className='p-0'>
			<Button
				size={'sm'}
				variant={'ghost'}
				className='w-full h-fit justify-between px-2 py-1.5 text-xs text-blue-600 hover:text-blue-500 '>
				<p className='flex'>
					<Tag className='mr-2' size={16} />
					<span className='text-secondary-foreground'>Critical</span>
				</p>
				<Check size={16} />
			</Button>
		</CommandItem>
	);
};
