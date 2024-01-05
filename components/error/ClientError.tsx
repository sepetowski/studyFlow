'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next-intl/client';
import { useTranslations } from 'next-intl';

interface Props {
	message: string;
}

export const ClientError = ({ message }: Props) => {
	const t = useTranslations('CLIENT_ERROR');
	const router = useRouter();

	return (
		<Card className='bg-background border-none shadow-none flex flex-col items-center mt-12 sm:mt-16 md:mt-32 text-center overflow-hidden'>
			<CardHeader className='sm:flex-row sm:items-center sm:justify-between'>
				<div className='flex flex-col space-y-1.5'>
					<h1 className='text-2xl font-semibold leading-none tracking-tight'>{t('TITLE')}</h1>
					<CardDescription className='text-base mt-4'>{message}</CardDescription>
				</div>
			</CardHeader>
			<CardContent className='mt-4 sm:mt-0'>
				<Button
					size={'lg'}
					className='text-white'
					onClick={() => {
						router.refresh();
					}}>
					{t('BTN')}
				</Button>
			</CardContent>
		</Card>
	);
};
