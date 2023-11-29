import React from 'react';
import { EdgeLabelRenderer, EdgeProps } from 'reactflow';

interface Props {
	label?: string;
	labelX: number;
	labelY: number;
}

export const EdgeLabel = ({ label, labelX, labelY }: Props) => {
	return (
		<EdgeLabelRenderer>
			<div
				style={{
					position: 'absolute',
					transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
				}}
				className='bg-red-400 '>
				<p>{label}</p>
			</div>
		</EdgeLabelRenderer>
	);
};
