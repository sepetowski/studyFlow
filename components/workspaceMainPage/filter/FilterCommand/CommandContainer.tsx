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

interface Props {
	sessionUserId: string;
	currentFilterdAsssigedToUsers: FilterUser[];
	onChangeAssigedUserToFilter: (userId: string) => void;
}

export const CommandContainer = ({
	sessionUserId,
	currentFilterdAsssigedToUsers,
	onChangeAssigedUserToFilter,
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
					<CommandItem>Profile</CommandItem>
					<CommandItem>Billing</CommandItem>
					<CommandItem>Settings</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	);
};
