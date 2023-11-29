import React from 'react';
import { EdgeProps, EdgeLabelRenderer, BaseEdge, getSmoothStepPath } from 'reactflow';
import { EdgeLabel } from './EdgeLabel';

interface Props extends EdgeProps {}

export const CustomStepSharp = ({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	markerEnd,
	data,
}: Props) => {
	const [edgePath, labelX, labelY] = getSmoothStepPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});

	return (
		<>
			<BaseEdge path={edgePath} id={id} markerEnd={markerEnd} style={style} />
			<EdgeLabelRenderer>
				<EdgeLabel labelY={labelY} labelX={labelX} label={data.label} />
			</EdgeLabelRenderer>
		</>
	);
};
