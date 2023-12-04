'use client';
import { useState, useCallback, useEffect } from 'react';
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
	Panel,
	OnInit,
	ReactFlowInstance,
	useReactFlow,
	ReactFlowJsonObject,
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
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { PlusSquare, Save, Trash } from 'lucide-react';

import { DeleteAllNodes } from './DeleteAllNodes';
import { MindMap as MindMapType } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LoadingScreen } from '../common/LoadingScreen';
import { useDebouncedCallback } from 'use-debounce';

const nodeTypes = { textNode: TextNode };
const edgeTypes: EdgeTypes = {
	customBezier: CustomBezier,
	customStraight: CustomStraight,
	customStepSharp: CustomStepSharp,
	customStepRounded: CustomStepRounded,
};

interface Props {
	initialInfo: MindMapType;
	workspaceId: string;
}

export const MindMap = ({ initialInfo, workspaceId }: Props) => {
	const [openSheet, setOpenSheet] = useState(false);
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [clickedEdge, setClickedEdge] = useState<Edge | null>(null);
	const [rfInstance, setRfInstance] = useState<null | ReactFlowInstance>(null);
	const [isMounted, setIsMounted] = useState(false);

	const debouncedCurrentActiveTags = useDebouncedCallback(() => {
		// updateMindMap()
		console.log('ok');
	}, 2000);

	const { mutate: updateMindMap } = useMutation({
		mutationFn: async (flow: ReactFlowJsonObject) => {
			await axios.post('/api/mind_maps/update', {
				content: flow,
				mindMapId: initialInfo.id,
				workspaceId,
			});
		},

		onSuccess: () => {
			console.log('ok');
		},

		onError: () => {
			console.log('nie ok');
		},
	});

	const onSave = useCallback(() => {
		if (rfInstance) {
			const flow = rfInstance.toObject();
			updateMindMap(flow);
			console.log(flow);
		}
	}, [rfInstance, updateMindMap]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const { content } = initialInfo;
		if (content) {
			const { nodes = [], edges = [] } = content as unknown as ReactFlowJsonObject;
			setNodes(nodes);
			setEdges(edges);
		}
	}, [initialInfo]);

	const onAddNode = useCallback(() => {
		const newNode = {
			id: Math.random().toString(),
			type: 'textNode',
			position: { x: 0, y: 0 },
			data: { text: '', color: 12 },
		};

		setNodes((nds) => nds.concat(newNode));
	}, []);

	const onNodesChange: OnNodesChange = useCallback(
		(changes) => {
			setNodes((nds) => {
				return applyNodeChanges(changes, nds);
			});

			debouncedCurrentActiveTags();
		},
		[debouncedCurrentActiveTags]
	);

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

	if (!isMounted) return <LoadingScreen />;

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

			<div className=' h-full'>
				<ReactFlow
					fitView
					onInit={setRfInstance}
					nodes={nodes}
					edgeTypes={edgeTypes}
					nodeTypes={nodeTypes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onEdgeClick={onEdgeClick}>
					<Panel
						position='top-left'
						className='bg-background  z-50 shadow-sm border rounded-sm py-0.5 px-3'>
						<div className=' flex gap-2 w-full'>
							<HoverCard openDelay={250} closeDelay={250}>
								<HoverCardTrigger asChild>
									<Button variant={'ghost'} size={'icon'} onClick={onAddNode}>
										<PlusSquare size={22} />
									</Button>
								</HoverCardTrigger>
								<HoverCardContent align='start'>Dodaj kafelk</HoverCardContent>
							</HoverCard>

							<HoverCard openDelay={250} closeDelay={250}>
								<HoverCardTrigger asChild>
									<Button variant={'ghost'} size={'icon'} onClick={onSave}>
										<Save size={22} />
									</Button>
								</HoverCardTrigger>
								<HoverCardContent align='start'>Zapisz</HoverCardContent>
							</HoverCard>

							<DeleteAllNodes />
						</div>
					</Panel>
					<Background />
				</ReactFlow>
			</div>
		</div>
	);
};
