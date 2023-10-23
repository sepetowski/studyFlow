'use client';

import React, { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeCard } from './ThemeCard';
import { LoadingState } from '@/components/ui/loading-state';
import { useTheme } from 'next-themes';

export const Theme = () => {
	const [isMounted, setIsMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted)
		return (
			<div className='w-full h-full flex justify-center items-center'>
				<LoadingState className='w-12 h-12' />
			</div>
		);
	return (
		<Card className='bg-background border-none shadow-none'>
			<CardHeader>
				<CardTitle>Theme</CardTitle>
				<CardDescription className='text-base'>
					Select how you would like your interface to look. Select theme from dark, light or system.
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-row gap-6'>
				<ThemeCard onTheme={setTheme} theme='light' activeTheme={theme} />
				<ThemeCard onTheme={setTheme} theme='dark' activeTheme={theme} />
				<ThemeCard onTheme={setTheme} theme='system' activeTheme={theme} />
			</CardContent>
		</Card>
	);
};
