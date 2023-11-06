import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UserPlus2 } from 'lucide-react';
import { Workspace } from '@prisma/client';
import { InviteContent } from './InviteContent';

interface Props {
	workspace: Workspace;
}

export const InviteUsers = ({ workspace }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'icon'}
					className=' sm:bg-primary/10 sm:text-primary sm:font-semibold sm:hover:bg-primary sm:hover:text-white sm:h-9 sm:rounded-md sm:px-3 sm:w-auto sm:space-x-2'
					variant='ghost'>
					<span className='hidden sm:inline'>Zaproś</span>
					<UserPlus2 className='' size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Zaproś do <span>{workspace.name}</span>
					</DialogTitle>
					<DialogDescription>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, voluptatibus!
					</DialogDescription>
				</DialogHeader>
				<InviteContent workspace={workspace} />
			</DialogContent>
		</Dialog>
	);
};
