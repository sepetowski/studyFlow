'use client';

import { Input } from '@/components/ui/input';
import { useOnboardingForm } from '@/context/OnboardingForm';
import { ArrowRight, User } from 'lucide-react';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AditionalUserInfoFirstPart, aditionalUserInfoFirstPart } from '@/schema/aditionalUserInfo';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { ActionType } from '@/types/onBoardingContext';
import { Button } from '@/components/ui/button';
import { AddUserImage } from '../AddUserImage';

export const FirstStep = () => {
	const { name, surname, currentStep,profileImage, dispatch } = useOnboardingForm();
	const form = useForm<AditionalUserInfoFirstPart>({
		resolver: zodResolver(aditionalUserInfoFirstPart),
		defaultValues: {
			name: name ? name : '',
			surname: surname ? surname : '',
		},
	});

	const onSubmit = (data: AditionalUserInfoFirstPart) => {
		dispatch({ type: ActionType.NAME, payload: data.name });
		dispatch({ type: ActionType.SURNAME, payload: data.surname });
		dispatch({ type: ActionType.CHNAGE_SITE, payload: currentStep + 1 });
	};

	return (
		<>
			<h2 className='font-bold  text-4xl md:text-5xl flex flex-col items-center my-10'>
				<span>Przygotujmy</span>
				<span>Cię!</span>
			</h2>

			<div className='max-w-md w-full space-y-8 '>
				<AddUserImage profileImage={profileImage}/>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<div className='space-y-1.5'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-muted-foreground'>Imię</FormLabel>
										<FormControl
											onChange={() => {
												dispatch({ type: ActionType.NAME, payload: form.getValues('name') });
											}}>
											<Input className='bg-muted' placeholder={'Jan'} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='surname'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-muted-foreground'>Nazwisko</FormLabel>
										<FormControl
											onChange={() => {
												dispatch({ type: ActionType.SURNAME, payload: form.getValues('surname') });
											}}>
											<Input className='bg-muted' placeholder={'Kowalski'} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type='submit' className='mt-10 w-full max-w-md dark:text-white font-semibold '>
							Kontynuj
							<ArrowRight className='ml-2' width={18} height={18} />
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
};
