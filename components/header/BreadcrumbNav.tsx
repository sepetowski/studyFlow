'use client';
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next-intl/link';
import { useTranslations } from 'next-intl';

const avaibleRoutesWithTranslation = ['dashboard', 'settings', 'security', 'theme'];

interface Props {
	addManualRoutes?: string[];
}

export const BreadcrumbNav = ({ addManualRoutes }: Props) => {
	const paths = usePathname();
	const pathNames = addManualRoutes
		? addManualRoutes
		: paths
				.split('/')
				.filter((path) => path !== 'pl' && path !== 'workspace' && path.trim() !== '');
	const t = useTranslations('ROUTES');

	if (pathNames.length > 1)
		return (
			<div className='flex  flex-col items-start  gap-0.5 sm:items-center sm:flex-row'>
				{pathNames.map((link, i) => {
					const href = `/${pathNames.slice(0, i + 1).join('/')}`;
					return (
						<div className='flex items-center sm:gap-0.5 text-sm sm:text-base' key={i}>
							{i + 1 < pathNames.length ? (
								<>
									<Link
										className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-md py-1 px-1 sm:px-2 transition-colors duration-200 hover:bg-accent'
										href={href}>
										{t(link.toUpperCase())}
									</Link>
									<ChevronRight className='text-primary' />
								</>
							) : (
								<p className='font-bold text-primary px-1 sm:px-2'>
									{avaibleRoutesWithTranslation.includes(link) ? t(link.toUpperCase()) : link}
								</p>
							)}
						</div>
					);
				})}
			</div>
		);
};
