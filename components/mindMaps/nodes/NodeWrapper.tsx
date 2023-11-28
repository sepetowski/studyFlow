'use client';
import React, { useCallback, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { NodeColors } from '@/types/enums';
import { Check, MoreHorizontal } from 'lucide-react';
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
	color?: NodeColors;
}

const colors = [
	NodeColors.DEAFULT,
	NodeColors.PURPLE,
	NodeColors.GREEN,
	NodeColors.BLUE,
	NodeColors.CYAN,
	NodeColors.EMERALD,
	NodeColors.INDIGO,
	NodeColors.LIME,
	NodeColors.ORANGE,
	NodeColors.FUCHSIA,
	NodeColors.PINK,
	NodeColors.YELLOW,
];

export const NodeWrapper = ({ children, className, color = NodeColors.DEAFULT }: Props) => {
	const [currColor, setCurrColor] = useState<NodeColors | undefined>(color);

	const onColorSelect = useCallback((newColor: NodeColors) => {
		setCurrColor(newColor);
	}, []);

	const nodeColor = useCallback((color: NodeColors) => {
		switch (color) {
			case NodeColors.PURPLE:
				return '!bg-purple-600 hover:bg-purple-500 text-white';

			case NodeColors.GREEN:
				return '!bg-green-600 hover:bg-green-500 text-white';

			case NodeColors.RED:
				return '!bg-red-600 hover:bg-red-500 text-white';

			case NodeColors.BLUE:
				return '!bg-blue-600 hover:bg-blue-500 text-white';

			case NodeColors.CYAN:
				return '!bg-cyan-600 hover:bg-cyan-500 text-white';

			case NodeColors.EMERALD:
				return '!bg-emerald-600 hover:bg-emerald-500 text-white';

			case NodeColors.INDIGO:
				return '!bg-indigo-600 hover:bg-indigo-500 text-white';

			case NodeColors.LIME:
				return '!bg-lime-600 hover:bg-lime-500 text-white';

			case NodeColors.ORANGE:
				return '!bg-orange-600 hover:bg-orange-500 text-white';
			case NodeColors.FUCHSIA:
				return '!bg-fuchsia-600 hover:bg-fuchsia-500 text-white';

			case NodeColors.PINK:
				return '!bg-pink-600 hover:bg-pink-500 text-white';

			case NodeColors.YELLOW:
				return '!bg-yellow-600 hover:bg-yellow-500 text-white';

			default:
				return '!bg-secondary hover:bg-secondary-500 ';
		}
	}, []);

	return (
		<div
			className={cn(
				`max-w-md text-xs px-3 py-1.5    rounded-sm shadow-sm flex items-start justify-between transition-colors duration-200 gap-2 ${nodeColor(
					currColor!
				)}`,
				className
			)}>
			<div className='w-full'>
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
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						className={`w-6 h-6 hover:bg-transparent ${
							currColor === NodeColors.DEAFULT ? '' : 'text-white hover:text-white'
						}  `}
						variant={'ghost'}
						size={'icon'}>
						<MoreHorizontal size={16} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='' sideOffset={-10} align='start'>
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
														className={`${color !== NodeColors.DEAFULT ? 'text-white' : ''}`}
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
					<DropdownMenuSeparator />
					<DropdownMenuItem className='cursor-pointer gap-2'>
						{/* <LogOut size={16} /> {t('LOG_OUT')} */}
						usun
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
