'use client';
import React, { useMemo } from 'react';
import ActiveLink from '@/components/ui/active-link';
import { Workspace, WorkspaceIconColor } from '@prisma/client';
import Image from 'next/image';

interface Props {
	workspace: Workspace;
	href: string;
}

export const SettingsWorkspace = ({ href, workspace: { color, id, image, name } }: Props) => {
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
		<ActiveLink
			href={`${href}/${id}`}
			variant={'ghost'}
			size={'sm'}
			className='w-full flex justify-start items-center gap-2 overflow-hidden'>
			{image ? (
				<Image
					priority
					className='h-7 w-7  object-cover rounded-md'
					src={image}
					alt='worksace image'
					height={300}
					width={300}
				/>
			) : (
				<div
					className={`rounded-md text-white font-bold h-7 w-7  flex justify-center items-center ${workspaceColor}`}>
					<p>{name[0].toUpperCase()}</p>
				</div>
			)}

			<p>{name}</p>
		</ActiveLink>
	);
};
