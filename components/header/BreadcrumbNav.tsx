'use client';
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next-intl/link';
import { useTranslations } from 'next-intl';

const avaibleRoutesWithTranslation = ['dashboard', 'settings', 'security', 'theme'];

export const BreadcrumbNav = () => {
	const paths = usePathname();
	const pathNames = paths
		.split('/')
		.filter((path) => path !== 'pl' && path !== 'workspace' && path.trim() !== '');
	const t = useTranslations('ROUTES');

	if (pathNames.length > 1)
		return (
			<div className='flex flex-wrap  gap-0.5 items-center'>
				{pathNames.map((link, i) => {
					const href = `/${pathNames.slice(0, i + 1).join('/')}`;
					return (
						<div className='flex items-center gap-0.5' key={i}>
							{i + 1 < pathNames.length ? (
								<>
									<Link
										className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-md py-1 px-2 transition-colors duration-200 hover:bg-accent'
										href={href}>
										{t(link.toUpperCase())}
									</Link>
									<ChevronRight className='text-primary' />
								</>
							) : (
								<p className='font-bold text-primary px-2'>
									{avaibleRoutesWithTranslation.includes(link) ? t(link.toUpperCase()) : link}
								</p>
							)}
						</div>
					);
				})}
			</div>
		);
};
