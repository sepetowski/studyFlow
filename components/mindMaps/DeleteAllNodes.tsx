'use client';
import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import Warning from '@/components/ui/warning';

export const DeleteAllNodes = () => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<HoverCard openDelay={250} closeDelay={250}>
				<DialogTrigger asChild>
					<HoverCardTrigger>
						<Button onClick={() => setOpen(true)} variant={'ghost'} size={'icon'}>
							<Trash size={22} />
						</Button>
					</HoverCardTrigger>
				</DialogTrigger>
				<HoverCardContent align='start'>usun wsyztsko</HoverCardContent>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>usun</DialogTitle>
						<DialogDescription>Lorem, ipsum.</DialogDescription>
					</DialogHeader>
					<Warning>
						<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, accusamus?</p>
					</Warning>
				</DialogContent>
			</HoverCard>
		</Dialog>
	);
};
