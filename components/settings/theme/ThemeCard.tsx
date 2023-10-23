'use client';
import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Laptop, Moon, Sun } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Props {
	theme: 'light' | 'dark' | 'system';
	activeTheme?: string;
	onTheme: (theme: string) => void;
}

export const ThemeCard = ({ theme, activeTheme, onTheme }: Props) => {
	return (
		<Card
			tabIndex={1}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					onTheme(theme);
				}
			}}
			onClick={() => onTheme(theme)}
			className={`w-72  hover:bg-accent hover:text-accent-foreground duration-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background ${
				activeTheme === theme ? 'border-primary/50' : ''
			}`}>
			<CardHeader className='flex flex-row items-center justify-between  space-x-0 space-y-0 '>
				<div className='flex items-center gap-2'>
					{theme === 'light' && <Sun size={20} />}
					{theme === 'dark' && <Moon size={20} />}
					{theme === 'system' && <Laptop size={20} />}
					<CardTitle className='text-xl'>{theme[0].toUpperCase() + theme.slice(1)} theme</CardTitle>
				</div>
				{activeTheme === theme && <Badge variant={'default'}>Active</Badge>}
			</CardHeader>
			<CardContent className='h-44'></CardContent>
			<CardFooter>
				<p>Deafult {theme}</p>
			</CardFooter>
		</Card>
	);
};
