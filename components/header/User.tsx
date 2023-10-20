'use client';

import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuSubContent,
	DropdownMenuPortal,
	DropdownMenuSubTrigger,
	DropdownMenuSub,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Button } from '../ui/button';
import { Check, SunMoon, Laptop, Moon, Sun, Globe, Settings2, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next-intl/link';
import { signOut } from 'next-auth/react';
import { useChangeLocale } from '@/hooks/useChangeLocale';

export const User = () => {
	const { setTheme, theme } = useTheme();
	const { onSelectChange } = useChangeLocale();
	const t = useTranslations('COMMON');
	const lang = useLocale();
	const logOutHandler = () => {
		signOut({
			callbackUrl: `${window.location.origin}/${lang}`,
		});
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  ring-offset-background'>
				<UserAvatar className='w-10 h-10' />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='' align='end' sideOffset={10}>
				<div className='flex items-center gap-1 px-2 '>
					<UserAvatar className='w-8 h-8' />
					<div>
						<DropdownMenuLabel className='py-0 pt-1.5'>Bushmeen</DropdownMenuLabel>
						<DropdownMenuLabel className='py-0  pb-1.5 pt-0.5 text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							bushmeen@gmial.com
						</DropdownMenuLabel>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger className='cursor-pointer gap-2'>
							<Moon size={16} className='hidden dark:inline-block' />
							<Sun size={16} className='dark:hidden' />

							<span>Theme</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent sideOffset={10}>
								<DropdownMenuItem
									onClick={() => {
										setTheme('dark');
									}}
									className='flex justify-between items-center cursor-pointer'>
									<span>Dark</span>
									{theme === 'dark' && <Check size={14} />}
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										setTheme('light');
									}}
									className='flex justify-between items-center cursor-pointer'>
									<span>Light</span>
									{theme === 'light' && <Check size={14} />}
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										setTheme('system');
									}}
									className='flex justify-between items-center cursor-pointer'>
									<span>System</span>
									{theme === 'system' && <Check size={14} />}
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger className='cursor-pointer gap-2'>
							<Globe size={16} />
							<span>Change language</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent sideOffset={10}>
								<DropdownMenuItem
									onClick={() => {
										onSelectChange('en');
									}}
									className='flex justify-between items-center cursor-pointer'>
									<span>English</span>
									{lang === 'en' && <Check size={14} />}
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										onSelectChange('pl');
									}}
									className='flex justify-between items-center cursor-pointer'>
									<span>Polski</span>
									{lang === 'pl' && <Check size={14} />}
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>

					<DropdownMenuItem className='cursor-pointer gap-2' asChild>
						<Link href={'/dashboard/settings'}>
							<Settings2 size={16} /> Settings
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={logOutHandler} className='cursor-pointer gap-2'>
					<LogOut size={16} /> Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
