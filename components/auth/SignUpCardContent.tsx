'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignUpSchema, signUpSchema } from '@/schema/signUpSchema';
import { CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';
import { ProviderSigInBtns } from './ProviderSigInBtns';

export const SignUpCardContent = () => {
	const t = useTranslations('AUTH');
	const form = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: '',
			password: '',
			username: '',
		},
	});

	const onSubmit = async (data: SignUpSchema) => {
		console.log(data);
		// reset();
	};

	return (
		<CardContent>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
					<ProviderSigInBtns />
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
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder={t('USERNAME')} {...field} />
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
							{t('SIGN_UP.SUBMIT_BTN')}
						</Button>
						<p className='text-xs text-center text-muted-foreground'>
							{t('SIGN_UP.TERMS.FIRST')}{' '}
							<Link className='font-bold' href={'/'}>
								{t('SIGN_UP.TERMS.SECOND')}
							</Link>
						</p>
					</div>
				</form>
			</Form>
		</CardContent>
	);
};
