'use client';
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { CalendarDays, Home, BrainCircuit, LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ActiveLink from '@/components/ui/active-link';

interface Props {
	href: string;
	Icon: LucideIcon;
	hoverTextKey: string;
}

export const SidebarLink = ({ hoverTextKey, href, Icon }: Props) => {
	const t = useTranslations('SIDEBAR.MAIN');

	return (
		<HoverCard openDelay={250} closeDelay={250}>
			<HoverCardTrigger asChild>
				<ActiveLink variant={'ghost'} size={'icon'} href={href}>
					<Icon />
				</ActiveLink>
			</HoverCardTrigger>
			<HoverCardContent align='start'>
				<span>{t(hoverTextKey)}</span>
			</HoverCardContent>
		</HoverCard>
	);
};
