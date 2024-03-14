'use client';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useFormatter } from 'next-intl';

interface Props {
	updatedAt: Date;
}

export const EditedBadge = ({ updatedAt }: Props) => {
	const format = useFormatter();
	const dateTime = new Date(updatedAt);
	const now = new Date();

	return (
		<HoverCard openDelay={250} closeDelay={250}>
			<HoverCardTrigger asChild>
				<span className=' text-[0.6rem] text-muted-foreground'>(edytowane)</span>
			</HoverCardTrigger>
			<HoverCardContent align='center' side='top'>
				<span>{format.relativeTime(dateTime, now)}</span>
			</HoverCardContent>
		</HoverCard>
	);
};
