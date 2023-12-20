'use client';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { LoadingState } from '@/components/ui/loading-state';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { PomodoroSettingsSchema, pomodoroSettingsSchema } from '@/schema/pomodoroSettingsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PomodoroSettings } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Clock, Volume2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
	pomodoroSettings: PomodoroSettings;
}

export const SettingsForm = ({
	pomodoroSettings: {
		id,
		longBreakDuration,
		longBreakInterval,
		rounds,
		shortBreakDuration,
		workDuration,
	},
}: Props) => {
	const m = useTranslations('MESSAGES');

	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<PomodoroSettingsSchema>({
		resolver: zodResolver(pomodoroSettingsSchema),
		defaultValues: {
			workDuration,
			shortBreakDuration,
			longBreakDuration,
			longBreakInterval,
			rounds,
		},
	});

	const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
		mutationFn: async (formData: PomodoroSettingsSchema) => {
			await axios.post('/api/pomodoro/update', formData);
		},
		onError: (err: AxiosError) => {
			const error = err?.response?.data ? err.response.data : 'ERRORS.DEFAULT';

			toast({
				title: m(error),
				variant: 'destructive',
			});
		},
		onSuccess: async () => {
			toast({
				title: m('SUCCES.DELETED_INFO'),
			});
			router.refresh();
		},
		mutationKey: ['updatePomodoroSettings'],
	});

	const { mutate: resetSettings, isLoading: isReseting } = useMutation({
		mutationFn: async () => {
			await axios.post('/api/pomodoro/update', {
				workDuration: 25,
				shortBreakDuration: 5,
				longBreakDuration: 15,
				longBreakInterval: 2,
				rounds: 3,
			});
		},
		onError: (err: AxiosError) => {
			const error = err?.response?.data ? err.response.data : 'ERRORS.DEFAULT';

			toast({
				title: m(error),
				variant: 'destructive',
			});
		},
		onSuccess: async () => {
			toast({
				title: m('SUCCES.DELETED_INFO'),
			});
			router.refresh();
			form.reset({
				workDuration: 25,
				shortBreakDuration: 5,
				longBreakDuration: 15,
				longBreakInterval: 2,
				rounds: 3,
			});
		},
		mutationKey: ['resetPomodoroSettings'],
	});

	const isDeafultValue = useMemo(() => {
		return (
			workDuration === 25 &&
			shortBreakDuration === 5 &&
			longBreakDuration === 15 &&
			longBreakInterval === 2 &&
			rounds === 3
		);
	}, [workDuration, shortBreakDuration, longBreakDuration, longBreakInterval, rounds]);

	const onSubmit = (data: PomodoroSettingsSchema) => {
		console.log(data);
		updateSettings(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<div className='space-y-6  w-full'>
					<div className='flex gap-2 items-center text-muted-foreground'>
						<Clock />
						<p>Timer</p>
					</div>
					<FormField
						control={form.control}
						name='workDuration'
						render={({ field: { value, onChange } }) => (
							<FormItem>
								<FormLabel>Work duration - {value} minutes</FormLabel>
								<FormControl>
									<Slider
										min={15}
										max={60}
										step={1}
										defaultValue={[value]}
										onValueChange={(vals) => {
											onChange(vals[0]);
										}}
										value={[value]}
									/>
								</FormControl>
								<FormDescription>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, tempora!
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='shortBreakDuration'
						render={({ field: { value, onChange } }) => (
							<FormItem>
								<FormLabel>Short break duration - {value} minutes</FormLabel>
								<FormControl>
									<Slider
										min={1}
										max={15}
										step={1}
										defaultValue={[value]}
										onValueChange={(vals) => {
											onChange(vals[0]);
										}}
										value={[value]}
									/>
								</FormControl>
								<FormDescription>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, tempora!
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='longBreakDuration'
						render={({ field: { value, onChange } }) => (
							<FormItem>
								<FormLabel>Long break duration - {value} minutes</FormLabel>
								<FormControl>
									<Slider
										min={10}
										max={45}
										step={1}
										defaultValue={[value]}
										onValueChange={(vals) => {
											onChange(vals[0]);
										}}
										value={[value]}
									/>
								</FormControl>
								<FormDescription>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, tempora!
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='rounds'
						render={({ field: { value, onChange } }) => (
							<FormItem>
								<FormLabel>Rounds - {value}</FormLabel>
								<FormControl>
									<Slider
										min={1}
										max={10}
										step={1}
										defaultValue={[value]}
										onValueChange={(vals) => {
											onChange(vals[0]);
										}}
										value={[value]}
									/>
								</FormControl>
								<FormDescription>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, tempora!
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='longBreakInterval'
						render={({ field: { value, onChange } }) => (
							<FormItem>
								<FormLabel>Long brake intervals - {value}</FormLabel>
								<FormControl>
									<Slider
										min={2}
										max={10}
										step={1}
										defaultValue={[value]}
										onValueChange={(vals) => {
											onChange(vals[0]);
										}}
										value={[value]}
									/>
								</FormControl>
								<FormDescription>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, tempora!
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex gap-2 items-center text-muted-foreground'>
						<Volume2 />
						<p>Sound</p>
					</div>
				</div>
				<div className='flex flex-col-reverse sm:flex-row sm:justify-end items-center gap-4'>
					<Button
						disabled={isUpdating || isDeafultValue}
						type='button'
						onClick={() => {
							resetSettings();
						}}
						className='w-full sm:w-auto'
						variant={'secondary'}>
						{isReseting ? <LoadingState /> : 'Reset settings'}
					</Button>
					<Button disabled={isReseting} className='text-white w-full sm:w-auto' type='submit'>
						{isUpdating ? <LoadingState /> : 'Update settings'}
					</Button>
				</div>
			</form>
		</Form>
	);
};
