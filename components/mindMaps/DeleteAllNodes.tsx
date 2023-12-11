'use client';
import React, { useCallback, useState } from 'react';
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
import { LoadingState } from '@/components/ui/loading-state';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAutosaveIndicator } from '@/context/AutosaveIndicator';
import { useToast } from '@/components/ui/use-toast';
import { useReactFlow } from 'reactflow';

interface Props {
	mindMapId: string;
	workspaceId: string;
}

export const DeleteAllNodes = ({ mindMapId, workspaceId }: Props) => {
	const [open, setOpen] = useState(false);
	const { setNodes, getNodes } = useReactFlow();

	const { onSetStatus, status } = useAutosaveIndicator();
	const { toast } = useToast();

	const { mutate: updateMindMap, isLoading } = useMutation({
		mutationFn: async () => {
			onSetStatus('pending');
			await axios.post('/api/mind_maps/update', {
				content: null,
				mindMapId,
				workspaceId,
			});
		},

		onSuccess: () => {
			onSetStatus('saved');
			setNodes([]);
			toast({
				title: 'Zresetowano satn',
			});
			setOpen(false);
		},

		onError: () => {
			onSetStatus('unsaved');
			toast({
				title: 'blad zapisywania',
				variant: 'destructive',
			});
		},
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<HoverCard openDelay={250} closeDelay={250}>
				<DialogTrigger asChild>
					<HoverCardTrigger>
						<Button
							disabled={!getNodes().length || status !== 'saved'}
							onClick={() => setOpen(true)}
							variant={'ghost'}
							size={'icon'}>
							<Trash size={20} />
						</Button>
					</HoverCardTrigger>
				</DialogTrigger>
				<HoverCardContent sideOffset={8} align='start'>
					Usuń wszytskie kafelki
				</HoverCardContent>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Usuń wszytskie kafelki</DialogTitle>
						<DialogDescription>Zresetuj układ mapy mysli do początkowego stanu</DialogDescription>
					</DialogHeader>
					<Warning>
						<p>
							Przywrócenie stanu początkowego, usunie wszytskie obecne kafelki i połączenia. Kliknij
							„Zresetuj stan”, aby usunąć wszytskie kafelki i połączenia.
						</p>
					</Warning>

					<Button
						disabled={isLoading}
						onClick={() => updateMindMap()}
						size={'lg'}
						variant={'destructive'}>
						{isLoading ? <LoadingState loadingText={'resetowanie'} /> : 'Zresetuj stan'}
					</Button>
				</DialogContent>
			</HoverCard>
		</Dialog>
	);
};
