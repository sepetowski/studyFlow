import { Button } from '@/components/ui/button';
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
import { UserAvatar } from '@/components/ui/user-avatar';
import { AssignedToTaskUser } from '@/types/extended';
import { Check } from 'lucide-react';
import { CommandUser } from './CommandUser';

interface Props {
	users: AssignedToTaskUser[];
	taskId: string;
	workspaceId: string;
}

export const CommandContainer = ({ users, taskId, workspaceId }: Props) => {
	console.log(users);
	return (
		<Command className='w-[15rem]'>
			<CommandInput className='text-xs' placeholder='Filter' />
			<CommandList>
				<CommandEmpty>No user found</CommandEmpty>
				<CommandGroup heading='ASSIGN TO'>
					{users.map((user, i) => (
						<CommandUser key={user.user.id} user={user} taskId={taskId} workspaceId={workspaceId} />
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
};
