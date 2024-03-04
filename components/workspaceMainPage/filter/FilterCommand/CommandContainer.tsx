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

export const CommandContainer = () => {
	return (
		<Command className='w-[15rem]'>
			<CommandInput placeholder='Type a command or search...' />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading='Suggestions'>
					<CommandItem>Calendar</CommandItem>
					<CommandItem>Search Emoji</CommandItem>
					<CommandItem>Calculator</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading='Settings'>
					<CommandItem>Profile</CommandItem>
					<CommandItem>Billing</CommandItem>
					<CommandItem>Settings</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	);
};
