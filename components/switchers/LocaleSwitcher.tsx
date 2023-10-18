'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { LoadingState } from '@/components/ui/loading-state';

export const LocaleSwitcher = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isPending, startTransition] = useTransition();
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	function onSelectChange(nextLocale: 'pl' | 'en') {
		setIsLoading(true);
		startTransition(() => {
			router.replace(pathname, { locale: nextLocale });
		});
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button disabled={isPending} variant='outline' size='icon'>
					{isLoading ? <LoadingState className='mr-0' /> : locale.toUpperCase()}
					<span className='sr-only'>Chnage language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem
					onClick={() => {
						onSelectChange('pl');
					}}
					className='cursor-pointer'>
					PL
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						onSelectChange('en');
					}}
					className='cursor-pointer'>
					EN
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
