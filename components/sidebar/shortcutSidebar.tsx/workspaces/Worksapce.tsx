import React from 'react';
import ActiveLink from '@/components/ui/active-link';
import Image from 'next/image';
import { Workspace } from '@prisma/client';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
interface Props {
	workspace: Workspace;
}

export const Worksapce = ({ workspace: { image, name } }: Props) => {
	return (
		<HoverCard openDelay={250} closeDelay={250}>
			<HoverCardTrigger asChild>
				<ActiveLink
					className='text-white font-bold'
					variant={image ? 'ghost' : 'default'}
					size={'icon'}
					href={`/dashboard/workspace/${name}`}>
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
