'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next-intl/client';
import { useFormatter } from 'next-intl';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	hideOnMobile?: boolean;
	hideOnDesktop?: boolean;
	showOnlyOnPath?: string;
	username: string;
	name?: string | null;
	surname?: string | null;
}

const Welcoming = React.forwardRef<HTMLDivElement, Props>(
	(
		{
			className,
			hideOnMobile,
			hideOnDesktop,
			showOnlyOnPath,
			username,
			name,
			surname,
			...props
		}: Props,
		ref
	) => {
		const format = useFormatter();
		const dateTime = new Date();

		const day = format.dateTime(dateTime, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});

		const time = format.dateTime(dateTime, {
			hour: 'numeric',
			minute: 'numeric',
			hourCycle: 'h24',
		});

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
						Welocmeback,{' '}
						<span>{name ? (name && surname ? `${name} ${surname}` : name) : username}</span> 👋
					</p>
					<p className='text-muted-foreground  sm:max-w-xl '>
						<span>{day}</span>
						{/* <span className='ml-2'>{time}</span> */}
					</p>
				</div>
			);
	}
);

Welcoming.displayName = 'Welcoming';

export default Welcoming;
