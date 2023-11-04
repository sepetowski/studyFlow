import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditWorkspaceCard } from './overview/Edit/EditWorkspaceCard';
import { Layers, Users2 } from 'lucide-react';
import { SettingsWorkspace } from '@/types/extended';

interface Props {
	workspace: SettingsWorkspace;
}

export const WorkspaceTab = ({ workspace }: Props) => {
	return (
		<Tabs defaultValue='overview'>
			<TabsList className='mb-6'>
				<TabsTrigger className='mr-2 flex items-center gap-2' value='overview'>
					<Layers size={18} />
					Overview
				</TabsTrigger>
				<TabsTrigger className='flex items-center gap-2' value='mebmers'>
					<Users2 size={18} /> Members
				</TabsTrigger>
			</TabsList>
			<TabsContent tabIndex={-1} value='overview'>
				<EditWorkspaceCard workspace={workspace} />
			</TabsContent>
			<TabsContent value='mebmers'>Change your password here.</TabsContent>
		</Tabs>
	);
};
