import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandList,
} from '@/components/ui/command';

import { AssignedToMindMapUser } from '@/types/extended';

import { CommandUser } from './CommandUser';

interface Props {
	users: AssignedToMindMapUser[];
	mindMapId: string;
	workspaceId: string;
}

export const CommandContainer = ({ users, mindMapId, workspaceId }: Props) => {
	return (
		<Command className='w-[15rem]'>
			<CommandInput className='text-xs' placeholder='Filter' />
			<CommandList>
				<CommandEmpty>No user found</CommandEmpty>
				<CommandGroup heading='ASSIGN TO'>
					{users.map((user, i) => (
						<CommandUser
							key={user.user.id}
							user={user}
							mindMapId={mindMapId}
							workspaceId={workspaceId}
						/>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
};
