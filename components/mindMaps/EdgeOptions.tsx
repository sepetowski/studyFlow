'use client';
import React from 'react';
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Edge } from 'reactflow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
	clickedEdge: Edge | null;
}

export const EdgeOptions = ({}: Props) => {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Are you sure absolutely sure?</DialogTitle>
				<DialogDescription>
					This action cannot be undone. This will permanently delete your account and remove your
					data from our servers.
				</DialogDescription>
			</DialogHeader>
		</DialogContent>
	);
};
