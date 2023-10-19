'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { LoadingState } from '@/components/ui/loading-state';

interface Props {
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null;
	size?: 'default' | 'sm' | 'lg' | 'icon' | null;
	alignHover?: 'center' | 'start' | 'end';
	alignDropdown?: 'center' | 'start' | 'end';
	textSize?: 'text-lg' | 'text-base';
}

export const LocaleSwitcher = ({
	size = 'default',
	variant = 'default',
	alignHover = 'center',
	alignDropdown = 'center',
	textSize = 'text-base',
}: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isPending, startTransition] = useTransition();
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const t = useTranslations('COMMON');

	function onSelectChange(nextLocale: 'pl' | 'en') {
		setIsLoading(true);
		startTransition(() => {
			router.replace(pathname, { locale: nextLocale });
		});
	}

	return (
		<HoverCard openDelay={250} closeDelay={250}>
			<DropdownMenu>
				<HoverCardTrigger>
					<DropdownMenuTrigger asChild>
						<Button className={textSize} disabled={isPending} variant={variant} size={size}>
							{isLoading ? <LoadingState className='mr-0' /> : locale.toUpperCase()}
							<span className='sr-only'>{t('LANG_HOVER')}</span>
						</Button>
					</DropdownMenuTrigger>
				</HoverCardTrigger>
				<DropdownMenuContent align={alignDropdown}>
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
						className='cursor-pointer '>
						EN
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<HoverCardContent align={alignHover}>
				<span>{t('LANG_HOVER')}</span>
			</HoverCardContent>
		</HoverCard>
	);
};
