'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboardingForm } from '@/context/OnboardingForm';
import { ActionType } from '@/types/onBoardingContext';
import { ArrowRight, User } from 'lucide-react';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	AditionalUserInfoFirstPart,
	aditionalUserInfoFirstPart,
} from '@/schema/aditionalUserInfoFirstPart';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

export const FirstStep = () => {
	const { currentStep, name, surname, dispatch } = useOnboardingForm();
	const form = useForm<AditionalUserInfoFirstPart>({
		resolver: zodResolver(aditionalUserInfoFirstPart),
		defaultValues: {
			name: name ? name : '',
			surname: surname ? surname : '',
		},
	});
	return (
		<div className='max-w-md w-full space-y-8 '>
			<div className='flex flex-col justify-center items-center gap-2'>
				<p className='text-sm text-muted-foreground'>Dodaj zdjęcie</p>
				<div className='bg-muted w-16 md:h-20 md:w-20 h-16 rounded-full flex justify-center items-center text-muted-foreground'>
					<User />
				</div>
			</div>
			<Form {...form}>
				<form className='space-y-1.5'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-muted-foreground'>Imię</FormLabel>
								<FormControl>
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
								<FormControl>
									<Input className='bg-muted' placeholder={'Kowalski'} {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<Button
				onClick={() => dispatch({ type: ActionType.CHNAGE_SITE, payload: currentStep + 1 })}
				className='w-full max-w-md dark:text-white font-semibold '>
				Kontynuj
				<ArrowRight className='ml-2' width={18} height={18} />
			</Button>
		</div>
	);
};
