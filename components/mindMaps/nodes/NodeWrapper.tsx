'use client';
import React, { useCallback, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { MindMapItemColors } from '@/types/enums';
import { Check, MoreHorizontal, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Handle, Position } from 'reactflow';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuSubContent,
	DropdownMenuPortal,
	DropdownMenuSubTrigger,
	DropdownMenuSub,
} from '@/components/ui/dropdown-menu';

interface Props {
	children: React.ReactNode;
	className?: string;
	color?: MindMapItemColors;
	isEditing: boolean;
	onEdit: () => void;
}

const colors = [
	MindMapItemColors.DEFAULT,
	MindMapItemColors.PURPLE,
	MindMapItemColors.GREEN,
	MindMapItemColors.BLUE,
	MindMapItemColors.CYAN,
	MindMapItemColors.EMERALD,
	MindMapItemColors.INDIGO,
	MindMapItemColors.LIME,
	MindMapItemColors.ORANGE,
	MindMapItemColors.FUCHSIA,
	MindMapItemColors.PINK,
	MindMapItemColors.YELLOW,
];

export const NodeWrapper = ({
	children,
	className,
	color = MindMapItemColors.DEFAULT,
	isEditing,
	onEdit,
}: Props) => {
	const [currColor, setCurrColor] = useState<MindMapItemColors | undefined>(color);

	const onColorSelect = useCallback((newColor: MindMapItemColors) => {
		setCurrColor(newColor);
	}, []);

	const nodeColor = useCallback((color: MindMapItemColors) => {
		switch (color) {
			case MindMapItemColors.PURPLE:
				return '!bg-purple-600 hover:bg-purple-500 text-white';

			case MindMapItemColors.GREEN:
				return '!bg-green-600 hover:bg-green-500 text-white';

			case MindMapItemColors.RED:
				return '!bg-red-600 hover:bg-red-500 text-white';

			case MindMapItemColors.BLUE:
				return '!bg-blue-600 hover:bg-blue-500 text-white';

			case MindMapItemColors.CYAN:
				return '!bg-cyan-600 hover:bg-cyan-500 text-white';

			case MindMapItemColors.EMERALD:
				return '!bg-emerald-600 hover:bg-emerald-500 text-white';

			case MindMapItemColors.INDIGO:
				return '!bg-indigo-600 hover:bg-indigo-500 text-white';

			case MindMapItemColors.LIME:
				return '!bg-lime-600 hover:bg-lime-500 text-white';

			case MindMapItemColors.ORANGE:
				return '!bg-orange-600 hover:bg-orange-500 text-white';
			case MindMapItemColors.FUCHSIA:
				return '!bg-fuchsia-600 hover:bg-fuchsia-500 text-white';

			case MindMapItemColors.PINK:
				return '!bg-pink-600 hover:bg-pink-500 text-white';

			case MindMapItemColors.YELLOW:
				return '!bg-yellow-600 hover:bg-yellow-500 text-white';

			default:
				return '!bg-secondary ';
		}
	}, []);

	return (
		<div
			className={cn(
				`min-w-[10rem] max-w-md text-xs px-3 py-1.5  rounded-sm shadow-sm flex items-start justify-between transition-colors duration-200 gap-4 ${nodeColor(
					currColor!
				)}`,
				className
			)}>
			<div className='w-full text-lg'>
				{children}
				<>
					<Handle
						type='target'
						position={Position.Left}
						className={` transition-colors !border-popover duration-200 p-1 ${nodeColor(
							currColor!
						)}`}
					/>
					<Handle
						type='source'
						position={Position.Right}
						className={`transition-colors !border-popover duration-200 p-1  ${nodeColor(
							currColor!
						)}`}
					/>
				</>
			</div>
			{!isEditing && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							className={`w-6 h-6 hover:bg-transparent ${
								currColor === MindMapItemColors.DEFAULT ? '' : 'text-white hover:text-white'
							}  `}
							variant={'ghost'}
							size={'icon'}>
							<MoreHorizontal size={16} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='' sideOffset={-10} align='start'>
						<DropdownMenuItem
							onClick={() => {
								onEdit();
							}}
							className='cursor-pointer gap-2'>
							<Pencil size={16} />
							<span>Edytuj</span>
						</DropdownMenuItem>
						<DropdownMenuGroup>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger className='cursor-pointer'>
									<span>kolor</span>
								</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent className='hover:bg-popover' sideOffset={10}>
										<DropdownMenuItem className='grid grid-cols-4 gap-2 focus:bg-popover  '>
											{colors.map((color, i) => (
												<Button
													onClick={() => {
														onColorSelect(color);
													}}
													key={i}
													className={`w-5 h-5 p-1  rounded-full ${nodeColor(color)} `}
													size={'icon'}
													variant={'ghost'}>
													{color === currColor && (
														<Check
															className={`${
																color !== MindMapItemColors.DEFAULT ? 'text-white' : ''
															}`}
															size={16}
														/>
													)}
												</Button>
											))}
										</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
						</DropdownMenuGroup>
						<DropdownMenuItem className='cursor-pointer gap-2'>
							{/* <LogOut size={16} /> {t('LOG_OUT')} */}
							usun
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
};
