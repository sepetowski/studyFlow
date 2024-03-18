import React from 'react';
import { AppLogo } from '@/components/ui/app-logo';
import Link from 'next-intl/link';
import { LocaleSwitcher } from '@/components/switchers/LocaleSwitcher';
import { ThemeSwitcher } from '@/components/switchers/ThemeSwitcher';
import { buttonVariants } from '@/components/ui/button';

export const LargeNav = () => {
	return (
		<div className='container py-4 md:flex  max-w-screen-2xl items-center justify-between hidden'>
			<div className='flex items-center'>
				<Link className='group' href={'/'}>
					<div className='flex items-center gap-2 group-hover:scale-105 transition-transform duration-200'>
						<AppLogo className='w-10 h-10' />
						<p className='text-2xl font-semibold'>
							Study<span className='text-primary'>Flow</span>
						</p>
					</div>
				</Link>
				<div className='ml-10 flex gap-2 items-center'>
					<p>lorem</p>
					<p>lorem</p>
					<p>lorem</p>
				</div>
			</div>
			<div className='flex items-center gap-4'>
				<div className='flex items-center gap-4'>
					<Link
						href={'/'}
						className='border-b inline-block border-transparent hover:border-primary duration-200 transition-colors'>
						Log in
					</Link>
					<Link href={'/'} className={`${buttonVariants({ variant: 'default' })}`}>
						Sign up for free
					</Link>
				</div>
				<div className=' flex items-center gap-2'>
					<LocaleSwitcher alignHover='end' alignDropdown='end' size={'icon'} variant={'outline'} />
					<ThemeSwitcher alignHover='end' alignDropdown='end' size={'icon'} variant={'outline'} />
				</div>
			</div>
		</div>
	);
};
