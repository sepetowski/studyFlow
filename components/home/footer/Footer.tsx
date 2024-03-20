import React from 'react';
import Link from 'next-intl/link';
import { buttonVariants } from '@/components/ui/button';
import { Facebook, Github, Instagram } from 'lucide-react';

export const Footer = () => {
	return (
		<footer className='w-full bg-background border-t border-border mt-52 '>
			<div className='container py-6 sm:py-12    max-w-screen-2xl  border-t border-border flex flex-col-reverse  sm:flex-row sm:justify-between items-center gap-4'>
				<div className='text-center space-y-0.5 sm:text-left'>
					<p className='font-semibold sm:text-lg'>
						Made with <span className='text-primary'>love</span>
					</p>
					<p className='text-muted-foreground'>© 2024 StudyFlow.</p>
				</div>
				<div className='flex items-center gap-2 text-muted-foreground '>
					<Link
						target='_blank'
						href={'/'}
						className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
						<Github />
					</Link>
					<Link
						target='_blank'
						href={'/'}
						className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
						<Instagram />
					</Link>
					<Link
						target='_blank'
						href={'/'}
						className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
						<Facebook />
					</Link>
				</div>
			</div>
		</footer>
	);
};
