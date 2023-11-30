'use client';

import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

export const useOnEditNode = () => {
	const { setNodes } = useReactFlow();

	const onEdit = useCallback(
		(nodeId: string, nodeText: string) => {
			setNodes((prevNodes) => {
				const nodes = prevNodes.map((node) =>
					node.id === nodeId ? { ...node, data: { text: nodeText } } : node
				);
				return nodes;
			});
		},
		[setNodes]
	);

	return { onEdit };
};
