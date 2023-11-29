import React from 'react';
import { EdgeLabelRenderer, EdgeProps } from 'reactflow';

interface Props {
	label?: string;
	labelX: number;
	labelY: number;
}

export const EdgeLabel = ({ label, labelX, labelY }: Props) => {
	if (!label) return null;

	return (
		<EdgeLabelRenderer>
			<div
				style={{
					position: 'absolute',
					transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
				}}
				className='bg-indigo-400 text-white text-sm px-3 py-1.5 rounded-sm shadow-sm max-w-[13rem] '>
				<p>{label}</p>
			</div>
		</EdgeLabelRenderer>
	);
};
