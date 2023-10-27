'use client';
import { cn } from '@/lib/utils';
import { usePathname } from 'next-intl/client';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	hideOnMobile?: boolean;
	hideOnDesktop?: boolean;
	showOnlyOnPath?: string;
}

const Welcoming = React.forwardRef<HTMLDivElement, Props>(
	({ className, hideOnMobile, hideOnDesktop, showOnlyOnPath, ...props }: Props, ref) => {
		const pathname = usePathname();
		if (showOnlyOnPath && pathname !== showOnlyOnPath) return null;
		else
			return (
				<div
					ref={ref}
					className={cn(
						`space-y-1 ${hideOnDesktop ? ' lg:hidden' : ''}  ${
							hideOnMobile ? 'hidden lg:block' : ''
						} `,
						className
					)}
					{...props}>
					<p className='font-bold text-3xl'>
						Hey, <span>Jakub</span> 👋
					</p>
					<p className='text-muted-foreground  sm:max-w-xl'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, ad!
					</p>
				</div>
			);
	}
);

Welcoming.displayName = 'Welcoming';

export default Welcoming;
