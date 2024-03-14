'use client';
import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useMessage } from '@/store/conversation/messages';
import { ExtendedMessage } from '@/types/extended';

interface Props {
	onChangeEdit: (editing: boolean) => void;
	message: ExtendedMessage;
}

export const Options = ({ onChangeEdit, message }: Props) => {
	const { setMessageToDelete } = useMessage((state) => state);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={'ghost'} size={'icon'}>
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem
					onClick={() => {
						onChangeEdit(true);
					}}
					className='cursor-pointer'>
					Edytuj wiadomość
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						setMessageToDelete(message);
						document.getElementById('trigger-delete')?.click();
					}}
					className='text-destructive focus:bg-destructive focus:text-white cursor-pointer'>
					Usuń wiadomość
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
