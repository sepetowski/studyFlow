import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { UserPermisson } from '@prisma/client';

interface Props {
	title: string;
	Icon: LucideIcon;
	userRole: UserPermisson | null;
}

export const ShortcutContainerItemPrivateMessageDialog = ({ Icon, title, userRole }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={'outline'}
					className={`w-40 text-sm md:text-base md:w-52  h-14 p-2 rounded-lg shadow-sm  flex justify-center items-center gap-1 md:gap-2 ${
						userRole !== 'OWNER' ? 'xl:w-1/5' : 'xl:w-1/4'
					}`}>
					<Icon size={16} />
					<h4 className='break-words'>{title}</h4>
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when youre done.
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'></div>
				<DialogFooter>
					<Button type='submit'>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
