'use client';
import { useState, useCallback } from 'react';
import ReactFlow, {
	Controls,
	Background,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
	Edge,
	OnNodesChange,
	OnEdgesChange,
	OnConnect,
	ControlButton,
	Node,
	MiniMap,
	EdgeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { TextNode } from './nodes/TextNode';
import { Button } from '@/components/ui/button';
import { EdgeOptions } from './EdgeOptions';
import { Sheet } from '@/components/ui/sheet';
import { EdgeOptionsSchema } from '@/schema/edgeOptionsSchema';
import { CustomStraight } from './labels/CustomStraight';
import { CustomStepSharp } from './labels/CustomStepSharp';
import { CustomStepRounded } from './labels/CustomStepRounded';
import { CustomBezier } from './labels/CustomBezier';
import { EdgeColor } from '@/types/enums';

const nodeTypes = { textNode: TextNode };
const edgeTypes: EdgeTypes = {
	customBezier: CustomBezier,
	customStraight: CustomStraight,
	customStepSharp: CustomStepSharp,
	customStepRounded: CustomStepRounded,
};

const initialNodes: Node[] = [
	{ id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
	{ id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
	{ id: 'node-1', type: 'textNode', position: { x: 0, y: 0 }, data: { value: 123 } },
];

const initialEdges: Edge[] = [
	{
		id: 'node-1-2',
		source: 'node-1',
		target: '2',
		data: {
			label: 'to the',
		},
		type: 'customStraight',
	},
];

export const MindMap = () => {
	const [openSheet, setOpenSheet] = useState(false);
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);
	const [clickedEdge, setClickedEdge] = useState<Edge | null>(null);

	const onAddNode = useCallback(() => {
		const newNode = {
			id: Math.random().toString(),
			type: 'textNode',
			position: { x: 0, y: 0 },
			data: { label: 'yo', color: EdgeColor.DEFAULT },
		};

		setNodes((nds) => nds.concat(newNode));
	}, []);

	const onNodesChange: OnNodesChange = useCallback((changes) => {
		setNodes((nds) => {
			return applyNodeChanges(changes, nds);
		});
	}, []);

	const onEdgesChange: OnEdgesChange = useCallback((changes) => {
		setEdges((eds) => {
			return applyEdgeChanges(changes, eds);
		});
	}, []);

	const onEdgeClick = useCallback((e: React.MouseEvent, edge: Edge) => {
		setClickedEdge(edge);
		setOpenSheet(true);
	}, []);

	const onSaveEdge = useCallback((data: EdgeOptionsSchema) => {
		const { animated, edgeId, label, color, type } = data;
		setEdges((prevEdges) => {
			const edges = prevEdges.map((edge) =>
				edge.id === edgeId
					? {
							...edge,
							data: label ? { label, color } : undefined,
							type,
							animated,
					  }
					: edge
			);

			return edges;
		});
		setOpenSheet(false);
	}, []);

	const onDeleteEdge = useCallback((edgeId: string) => {
		setEdges((prevEdges) => {
			const edges = prevEdges.filter((edge) => edge.id !== edgeId);
			return edges;
		});
		setOpenSheet(false);
	}, []);

	const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
	return (
		<div className='w-full h-full flex flex-col'>
			{clickedEdge && (
				<Sheet open={openSheet} onOpenChange={setOpenSheet}>
					<EdgeOptions
						clickedEdge={clickedEdge}
						isOpen={openSheet}
						onSave={onSaveEdge}
						onDeleteEdge={onDeleteEdge}
					/>
				</Sheet>
			)}
			<div className='bg-red-300 w-12 h-12 z-50'>
				<Button onClick={onAddNode}>sad</Button>
			</div>
			<div className=' h-full'>
				<ReactFlow
					fitView
					nodes={nodes}
					edgeTypes={edgeTypes}
					nodeTypes={nodeTypes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onEdgeClick={onEdgeClick}>
					<Background />

					{/* <MiniMap />
				<Controls>
				<ControlButton onClick={() => alert('Something magical just happened. ✨')}>
				<Plus />
				</ControlButton>
			</Controls> */}
				</ReactFlow>
			</div>
		</div>
	);
};
