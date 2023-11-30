'use client';
import React, { useCallback, useEffect } from 'react';

import { Edge } from 'reactflow';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EdgeOptionsSchema, edgeOptionsSchema } from '@/schema/edgeOptionsSchema';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { EdgeColor } from '@/types/enums';

interface Props {
	clickedEdge: Edge;
	isOpen: boolean;
	onSave: (data: EdgeOptionsSchema) => void;
	onDeleteEdge: (edgeId: string) => void;
}

const colors: EdgeColor[] = [
	EdgeColor.DEFAULT,
	EdgeColor.PURPLE,
	EdgeColor.GREEN,
	EdgeColor.BLUE,
	EdgeColor.CYAN,
	EdgeColor.EMERALD,
	EdgeColor.INDIGO,
	EdgeColor.LIME,
	EdgeColor.ORANGE,
	EdgeColor.FUCHSIA,
	EdgeColor.PINK,
	EdgeColor.YELLOW,
];

export const EdgeOptions = ({ clickedEdge, isOpen, onDeleteEdge, onSave }: Props) => {
	const form = useForm<EdgeOptionsSchema>({
		resolver: zodResolver(edgeOptionsSchema),
		defaultValues: {
			edgeId: '',
			label: '',
			type: 'customBezier',
			animated: false,
			color: EdgeColor.DEFAULT,
		},
	});

	useEffect(() => {
		if (isOpen)
			form.reset({
				edgeId: clickedEdge.id,
				label: clickedEdge.data?.label?.toString() ?? '',
				type:
					(clickedEdge.type as
						| 'customBezier'
						| 'customStraight'
						| 'customStepSharp'
						| 'customStepRounded') ?? 'customBezier',
				animated: clickedEdge.animated ?? false,
				color: clickedEdge.data?.color ?? EdgeColor.DEFAULT,
			});
	}, [clickedEdge, form, isOpen]);

	const workspaceColor = useCallback((providedColor: EdgeColor) => {
		switch (providedColor) {
			case EdgeColor.PURPLE:
				return 'bg-purple-600 border-purple-600 hover:bg-purple-500 hover:border-purple-500';

			case EdgeColor.GREEN:
				return 'bg-green-600 border-green-600 hover:bg-green-500 hover:border-green-500';

			case EdgeColor.RED:
				return 'bg-red-600 border-red-600 hover:bg-red-500 hover:border-red-500';

			case EdgeColor.BLUE:
				return 'bg-blue-600 border-blue-600 hover:bg-blue-500 hover:border-blue-500';

			case EdgeColor.CYAN:
				return 'bg-cyan-600 border-cyan-600 hover:bg-cyan-500 hover:border-cyan-500';

			case EdgeColor.EMERALD:
				return 'bg-emerald-600 border-emerald-600 hover:bg-emerald-500 hover:border-emerald-500';

			case EdgeColor.INDIGO:
				return 'bg-indigo-600 border-indigo-600 hover:bg-indigo-500 hover:border-indigo-500';

			case EdgeColor.LIME:
				return 'bg-lime-600 border-lime-600 hover:bg-lime-500 hover:border-lime-500';

			case EdgeColor.ORANGE:
				return 'bg-orange-600 border-orange-600 hover:bg-orange-500 hover:border-orange-500';
			case EdgeColor.FUCHSIA:
				return 'bg-fuchsia-600 border-fuchsia-600 hover:bg-fuchsia-500 hover:border-fuchsia-500';

			case EdgeColor.PINK:
				return 'bg-pink-600 border-pink-600 hover:bg-pink-500 hover:border-pink-500';

			case EdgeColor.YELLOW:
				return 'bg-yellow-600 border-yellow-600 hover:bg-yellow-500 hover:border-yellow-500';

			default:
				return 'bg-secondary border-secondary hover:bg-secondary/90 hover:border-secondary/90';
		}
	}, []);

	const onSubmit = (data: EdgeOptionsSchema) => {
		onSave(data);
	};

	return (
		<SheetContent className=' md:w-[26rem] md:max-w-md'>
			<SheetHeader>
				<SheetTitle>Edge settings</SheetTitle>
				<SheetDescription>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, fugiat.
				</SheetDescription>
			</SheetHeader>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6 mt-6 '>
					<div className='space-y-2 sm:space-y-4'>
						<div className='space-y-1.5'>
							<FormField
								control={form.control}
								name='label'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Label</FormLabel>
										<FormControl>
											<Input className='bg-muted' placeholder='Add label' {...field} />
										</FormControl>
										<FormDescription>This is your public display name.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='space-y-1.5'>
							<FormField
								control={form.control}
								name='type'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Edge type</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select a verified email to display' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='customBezier'>bezier</SelectItem>
												<SelectItem value='customStraight'>straight</SelectItem>
												<SelectItem value='customStepSharp'>step</SelectItem>
												<SelectItem value='customStepRounded'>smooth step</SelectItem>
											</SelectContent>
										</Select>
										<FormDescription>You can manage email addresses in your </FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='space-y-1.5'>
							<FormField
								control={form.control}
								name='color'
								render={({ field }) => (
									<FormItem className='space-y-1.5'>
										<FormLabel>Colors</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className='grid grid-cols-10 grid-rows-2'>
												{colors.map((color) => (
													<FormItem key={color} className='flex items-center space-x-3 space-y-0'>
														<FormControl>
															<RadioGroupItem
																useCheckIcon
																className={`transition-colors duration-200 ${workspaceColor(
																	color
																)}`}
																value={color}
															/>
														</FormControl>
													</FormItem>
												))}
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='space-y-1.5'>
							<FormField
								control={form.control}
								name='animated'
								render={({ field }) => (
									<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
										<FormControl>
											<Checkbox
												className='text-white'
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className='leading-none'>
											<FormLabel>Animate edge</FormLabel>
										</div>
									</FormItem>
								)}
							/>
						</div>
					</div>
					<Button className='text-white w-full' type='submit'>
						Save
					</Button>

					<Button
						onClick={() => {
							onDeleteEdge(form.getValues('edgeId'));
						}}
						variant={'secondary'}
						className='text-white w-full'
						type='button'>
						Delete edge
					</Button>
				</form>
			</Form>
		</SheetContent>
	);
};
