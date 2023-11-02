'use client';
import React, { useMemo } from 'react';
import ActiveLink from '@/components/ui/active-link';
import Image from 'next/image';
import { Workspace, WorkspaceIconColor } from '@prisma/client';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface Props {
	workspace: Workspace;
}

export const Worksapce = ({ workspace: { id, image, name, color } }: Props) => {
	const workspaceColor = useMemo(() => {
		switch (color) {
			case WorkspaceIconColor.PURPLE:
				return 'bg-purple-600 hover:bg-purple-500';

			case WorkspaceIconColor.GREEN:
				return 'bg-green-600 hover:bg-green-500';

			case WorkspaceIconColor.RED:
				return 'bg-red-600 hover:bg-red-500';

			case WorkspaceIconColor.BLUE:
				return 'bg-blue-600 hover:bg-blue-500';

			case WorkspaceIconColor.CYAN:
				return 'bg-cyan-600 hover:bg-cyan-500';

			case WorkspaceIconColor.EMERALD:
				return 'bg-emerald-600 hover:bg-emerald-500';

			case WorkspaceIconColor.INDIGO:
				return 'bg-indigo-600 hover:bg-indigo-500';

			case WorkspaceIconColor.LIME:
				return 'bg-lime-600 hover:bg-lime-500';

			case WorkspaceIconColor.ORANGE:
				return 'bg-orange-600 hover:bg-orange-500';
			case WorkspaceIconColor.FUCHSIA:
				return 'bg-fuchsia-600 hover:bg-fuchsia-500';

			case WorkspaceIconColor.PINK:
				return 'bg-pink-600 hover:bg-pink-500';

			case WorkspaceIconColor.YELLOW:
				return 'bg-yellow-600 hover:bg-yellow-500';

			default:
				return 'bg-green-600 hover:bg-green-500';
		}
	}, [color]);

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
