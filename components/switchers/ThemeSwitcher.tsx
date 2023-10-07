'use client';

import * as React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ThemeSwitcher = () => {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem className='cursor-pointer' onClick={() => setTheme('light')}>
					<Sun className='mr-2' /> Light
				</DropdownMenuItem>
				<DropdownMenuItem className='cursor-pointer' onClick={() => setTheme('dark')}>
					<Moon className='mr-2' /> Dark
				</DropdownMenuItem>
				<DropdownMenuItem className='cursor-pointer' onClick={() => setTheme('system')}>
					<Laptop className='mr-2' /> System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
