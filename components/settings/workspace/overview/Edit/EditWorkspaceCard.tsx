import React from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { EditWorkspaceDataForm } from './EditWorkspaceDataForm';
import { SettingsWorkspace } from '@/types/extended';
import { EditWorkspaceImage } from './EditWorkspaceImage';

interface Props {
	workspace: SettingsWorkspace;
}

export const EditWorkspaceCard = ({ workspace }: Props) => {
	return (
		<Card className='bg-background border-none shadow-none max-w-3xl'>
			<CardHeader>
				<h1 className='text-2xl font-semibold leading-none tracking-tight'>Edit workspace</h1>
				<CardDescription className='text-base  break-words'>
					Lorem ipsum dolor sit amet.
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-4'>
				<EditWorkspaceImage workspace={workspace} />
				<EditWorkspaceDataForm workspace={workspace} />
			</CardContent>
		</Card>
	);
};
