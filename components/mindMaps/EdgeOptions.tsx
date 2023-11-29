'use client';
import React, { useEffect } from 'react';

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

interface Props {
	clickedEdge: Edge;
	isOpen: boolean;
	onSave: (data: EdgeOptionsSchema) => void;
	onDeleteEdge: (edgeId: string) => void;
}

export const EdgeOptions = ({ clickedEdge, isOpen, onDeleteEdge, onSave }: Props) => {
	const form = useForm<EdgeOptionsSchema>({
		resolver: zodResolver(edgeOptionsSchema),
		defaultValues: {
			edgeId: '',
			label: '',
			type: 'customBezier',
			animated: false,
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
			});
	}, [clickedEdge, form, isOpen]);

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
