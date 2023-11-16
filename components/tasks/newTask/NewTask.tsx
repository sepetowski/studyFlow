import React from 'react';
import { Editor } from '@/components/editor/Editor';

interface Props {
	workspaceId: string;
}

export const NewTask = ({ workspaceId }: Props) => {
	return <Editor workspaceId={workspaceId} initialActiveTags={[]} />;
};
