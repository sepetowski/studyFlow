'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignInSchema, signInSchema } from '@/schema/signInSchema';
import { CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';
import { ProviderSigInBtns } from './ProviderSigInBtns';

export const SignInCardContent = () => {
	const t = useTranslations('AUTH');
	const form = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: SignInSchema) => {
		console.log(data);
		// reset();
	};

	return (
		<CardContent>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
					<ProviderSigInBtns signInCard />
					<div className='space-y-1.5'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder={t('EMAIL')} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder={t('PASSWORD')} type='password' {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-2'>
						<Button className='w-full font-bold text-white ' type='submit'>
							{t('SIGN_IN.SUBMIT_BTN')}
						</Button>
						<p className='text-xs text-center text-muted-foreground'>
							{t('SIGN_IN.FORGOT_PASSWORD')}
						</p>
					</div>
				</form>
			</Form>
		</CardContent>
	);
};
