'use client';
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { CalendarDays, Home, BrainCircuit } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ActiveLink from '@/components/ui/active-link';

export const Top = () => {
	const t = useTranslations('SIDEBAR');

	return (
		<div className='flex flex-col items-center gap-3'>
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

			<HoverCard openDelay={250} closeDelay={250}>
				<HoverCardTrigger asChild>
					<ActiveLink
						include='pomodoro'
						variant={'ghost'}
						size={'icon'}
						href={`/dashboard/pomodoro`}>
						<BrainCircuit />
					</ActiveLink>
				</HoverCardTrigger>
				<HoverCardContent align='start'>
					<span>{t('MAIN.POMODORO_HOVER')}</span>
				</HoverCardContent>
			</HoverCard>

			<HoverCard openDelay={250} closeDelay={250}>
				<HoverCardTrigger asChild>
					<ActiveLink variant={'ghost'} size={'icon'} href={`/dashboard/calendar`}>
						<CalendarDays />
					</ActiveLink>
				</HoverCardTrigger>
				<HoverCardContent align='start'>
					<span>{t('MAIN.CALENDAR_HOVER')}</span>
				</HoverCardContent>
			</HoverCard>
		</div>
	);
};
