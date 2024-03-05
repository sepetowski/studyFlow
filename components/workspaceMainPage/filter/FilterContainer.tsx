'use client';
import React, { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { Clear } from './Clear';
import { useUserActivityStatus } from '@/context/UserActivityStatus';
import { FilterUser } from '@/types/extended';
import { ActiveFilteredUser } from './activeFilteredUsersAndTags/ActiveFilteredUser';
import { on } from 'events';
import { useQuery } from '@tanstack/react-query';
import { Tag } from '@prisma/client';
import { ActiveFilteredTag } from './activeFilteredUsersAndTags/ActiveFilteredTag';
import { useFilterByUsersAndTagsInWorkspace } from '@/context/FilterByUsersAndTagsInWorkspace';

interface Props {
	sessionUserId: string;
	workspaceId: string;
}

export const FilterContainer = ({ sessionUserId, workspaceId }: Props) => {
	const { filterAssignedUsers, filterTags } = useFilterByUsersAndTagsInWorkspace();
	return (
		<div className='flex w-full items-center flex-wrap pb-4 gap-2'>
			<Filter sessionUserId={sessionUserId} />
			{filterAssignedUsers.map((user) => (
				<ActiveFilteredUser
					key={user.id}
					id={user.id}
					image={user.image}
					username={user.username}
				/>
			))}
			{filterTags.map((tag) => (
				<ActiveFilteredTag tag={tag} key={tag.id} />
			))}
			{(filterAssignedUsers.length > 0 || filterTags.length > 0) && <Clear />}
		</div>
	);
};
