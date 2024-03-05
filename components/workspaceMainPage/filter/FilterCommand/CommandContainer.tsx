'use client';
import React from 'react';
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '@/components/ui/command';
import { useUserActivityStatus } from '@/context/UserActivityStatus';
import { CommandUserItem } from './CommandUserItem';
import { FilterUser } from '@/types/extended';
import { Tag } from '@prisma/client';
import { CommandTagItem } from './CommandTagItem';

interface Props {
	sessionUserId: string;
	currentFilterdAsssigedToUsers: FilterUser[];
	tags: Tag[];
	currentFilterdTags: Tag[];
	onChangeAssigedUserToFilter: (userId: string) => void;
	onChangeFilterTags: (tagId: string) => void;
}

export const CommandContainer = ({
	sessionUserId,
	currentFilterdAsssigedToUsers,
	currentFilterdTags,
	tags,
	onChangeAssigedUserToFilter,
	onChangeFilterTags,
}: Props) => {
	const { allUsers } = useUserActivityStatus();

	return (
		<Command className='w-[15rem]'>
			<CommandInput placeholder='Type a command or search...' />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading='ASSIGNED TO'>
					{allUsers.map((user) => {
						const isActive = currentFilterdAsssigedToUsers.some(
							(activeUser) => activeUser.id === user.id
						);
						return (
							<CommandUserItem
								key={user.id}
								sessionUserId={sessionUserId}
								username={user.username}
								image={user.image}
								id={user.id}
								active={isActive}
								onChangeAssigedUserToFilter={onChangeAssigedUserToFilter}
							/>
						);
					})}
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading='TAGS'>
					{tags.map((tag) => {
						const isActive = currentFilterdTags.some((activeTag) => activeTag.id === tag.id);

						return (
							<CommandTagItem
								key={tag.id}
								tag={tag}
								active={isActive}
								onChangeFilterTags={onChangeFilterTags}
							/>
						);
					})}
				</CommandGroup>
			</CommandList>
		</Command>
	);
};
