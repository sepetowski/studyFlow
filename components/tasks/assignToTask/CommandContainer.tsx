import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandList,
} from '@/components/ui/command';
import { AssignedToTaskUser } from '@/types/extended';
import { CommandUser } from './CommandUser';

interface Props {
	users: AssignedToTaskUser[];
	taskId: string;
	workspaceId: string;
}

export const CommandContainer = ({ users, taskId, workspaceId }: Props) => {
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
