import React from 'react';
import { AppLogo } from '@/components/ui/app-logo';
import Link from 'next-intl/link';
import { LocaleSwitcher } from '@/components/switchers/LocaleSwitcher';
import { ThemeSwitcher } from '@/components/switchers/ThemeSwitcher';
import { buttonVariants } from '@/components/ui/button';
import { LargeNav } from './LargeNav';
import { MobileNav } from './MobileNav';

export const Nav = () => {
	return (
		<nav className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<LargeNav />
			<MobileNav />
		</nav>
	);
};
