'use client';
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Home } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ActiveLink from '@/components/ui/active-link';

export const Top = () => {
	const t = useTranslations('SIDEBAR');

	return (
		<div className='flex flex-col items-center gap-4'>
			<HoverCard openDelay={250} closeDelay={250}>
				<HoverCardTrigger asChild>
					<ActiveLink variant={'ghost'} size={'icon'} href={`/dashboard`}>
						<Home />
					</ActiveLink>
				</HoverCardTrigger>
				<HoverCardContent align='start'>
					<span>{t('MAIN.HOME_HOVER')}</span>
				</HoverCardContent>
			</HoverCard>
		</div>
	);
};
