import React, { useState } from 'react';
import { Logo } from './Logo';
import { Ttile } from './Ttile';
import { Badge } from '@/components/ui/badge';
import { TaskCalendar } from './TaskCalendar';
import { TagSelector } from '@/components/common/tag/tagSelector/TagSelector';
import { LinkTag } from '@/components/common/tag/LinkTag';

export const Header = () => {
	return (
		<div className='w-full flex  items-start gap-2 sm:gap-4'>
			<Logo />
			<div className='w-full flex flex-col gap-2'>
				<Ttile />
				<div className='w-full gap-1 flex flex-wrap flex-row'>
					<TaskCalendar />
					<TagSelector />
					<LinkTag />
				</div>
			</div>
		</div>
	);
};
