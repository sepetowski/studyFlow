'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DeleteAccountSchema, deleteAccountSchema } from '@/schema/deleteAccountSchema';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Warning from '@/components/ui/warning';

export const DeleteAccount = () => {
	const t = useTranslations('SETTINGS.ACCOUNT');

	const form = useForm<DeleteAccountSchema>({
		resolver: zodResolver(deleteAccountSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = (data: DeleteAccountSchema) => {
		console.log(data);
	};
	return (
		<Card className='bg-background border-none shadow-none max-w-2xl'>
			<CardHeader>
				<CardTitle>{t('DELETE_TITLE')}</CardTitle>
				<CardDescription>{t('DELETE_DESC')}</CardDescription>
			</CardHeader>
			<CardContent className='pt-0 sm:pt-0'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full max-w-sm'>
						<div className='space-y-2 sm:space-y-4  w-full'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-muted-foreground uppercase text-xs'>
											{t('DELETE_LABEL')}
										</FormLabel>
										<FormControl>
											<Input placeholder={t('DELETE_PLACEHOLDER')} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Dialog>
							<DialogTrigger asChild>
								<Button
									disabled={!form.formState.isValid}
									variant={'destructive'}
									className=''
									type='button'>
									{t('DELETE_BTN')}
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle className='text-destructive'>{t('DIALOG.TITLE')}</DialogTitle>
									<DialogDescription>{t('DIALOG.DESC')}</DialogDescription>
								</DialogHeader>

								<Warning>
									<p>{t('DIALOG.WARNING')}</p>
								</Warning>

								<Button onClick={form.handleSubmit(onSubmit)} size={'lg'} variant={'destructive'}>
									{t('DIALOG.BUTTON')}
								</Button>
							</DialogContent>
						</Dialog>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
