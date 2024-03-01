import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Bell } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { NotificationItem } from './NotificationItem';

export const NotificationContainer = () => {
	return (
		<Popover>
			<HoverCard openDelay={250} closeDelay={250}>
				<PopoverTrigger asChild>
					<HoverCardTrigger>
						<Button className='w-6 h-6 sm:h-9 sm:w-9 relative' size={'icon'} variant='ghost'>
							<Bell size={16} />
							<div className='absolute top-0 right-0 bg-primary rounded-full border border-border w-3.5 h-3.5 sm:w-4 sm:h-4 flex justify-center items-center text-xs'>
								9
							</div>
						</Button>
					</HoverCardTrigger>
				</PopoverTrigger>
				<HoverCardContent>
					<span>Powiadomienia</span>
				</HoverCardContent>
				<PopoverContent
					side='bottom'
					align='end'
					className='w-fit max-w-[300px] sm:max-w-[390px] p-2 sm:p-4'>
					<div className='flex flex-col gap-6'>
						<div className='flex gap-2  sm:gap-6  items-center'>
							<h4 className='font-medium leading-none'>Powiadomienia</h4>
							<Button className='text-xs ' size={'sm'} variant={'secondary'}>
								Oznacz wszytskie jako przeczytane
							</Button>
						</div>
						<ScrollArea className='max-h-96 '>
							<div className='flex flex-col gap-3 h-full'>
								<NotificationItem />
								<NotificationItem />
								<NotificationItem />
							</div>
						</ScrollArea>
					</div>
				</PopoverContent>
			</HoverCard>
		</Popover>
	);
};
