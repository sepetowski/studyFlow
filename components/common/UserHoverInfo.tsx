'use client';
import React from 'react';
import { CalendarDays } from 'lucide-react';

import { UserAvatar } from '@/components/ui/user-avatar';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export const UserHoverInfo = () => {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant='link'>Bush dasasd</Button>
			</HoverCardTrigger>
			<HoverCardContent className='w-80'>
				<div className='flex justify-between space-x-4'>
					<UserAvatar />

					<div className='space-y-1'>
						<h4 className='text-sm font-semibold'>@nextjs</h4>
						<p className='text-sm'>The React Framework – created and maintained by @vercel.</p>
						<div className='flex items-center pt-2'>
							<CalendarDays className='mr-2 h-4 w-4 opacity-70' />{' '}
							<span className='text-xs text-muted-foreground'>Joined December 2021</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
};
