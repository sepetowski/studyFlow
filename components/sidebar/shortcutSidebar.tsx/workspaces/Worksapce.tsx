'use client';
import React from 'react';
import ActiveLink from '@/components/ui/active-link';
import Image from 'next/image';
import { Workspace } from '@prisma/client';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useWorkspaceColor } from '@/hooks/useWorkspaceColor';

interface Props {
	workspace: Workspace;
}

export const Worksapce = ({ workspace: { id, image, name, color } }: Props) => {
	const workspaceColor = useWorkspaceColor(color);
	return (
		<HoverCard openDelay={250} closeDelay={250}>
			<HoverCardTrigger asChild>
				<ActiveLink
					workspaceIcon
					className={`text-white font-bold ${workspaceColor}`}
					variant={image ? 'ghost' : 'default'}
					size={'icon'}
					href={`/dashboard/workspace/${id}`}>
					{image ? (
						<Image
							className='w-full h-full object-cover rounded-md'
							src={image}
							alt='worksace image'
							height={300}
							width={300}
						/>
					) : (
						<p>{name[0].toUpperCase()}</p>
					)}
				</ActiveLink>
			</HoverCardTrigger>
			<HoverCardContent align='start'>
				<span>{name}</span>
			</HoverCardContent>
		</HoverCard>
	);
};
