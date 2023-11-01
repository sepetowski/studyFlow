import ActiveLink from '@/components/ui/active-link';
import { Workspace } from '@prisma/client';
import React from 'react';
import { Worksapce } from './Worksapce';
interface Props {
	userWorkspaces: Workspace[];
}

export const Workspaces = ({ userWorkspaces }: Props) => {
	return (
		<div className=' flex flex-col gap-3'>
			{userWorkspaces.map((woksapce) => (
				<Worksapce key={woksapce.id} workspace={woksapce} />
			))}
		</div>
	);
};
