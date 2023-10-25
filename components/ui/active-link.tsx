'use client';
import React from 'react';
import Link from 'next-intl/link';
import { usePathname } from 'next-intl/client';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null;
	size?: 'default' | 'sm' | 'lg' | 'icon' | null;
	include?: string;
}
const ActiveLink = React.forwardRef<HTMLAnchorElement, Props>(
	(
		{ href, className, variant = 'default', size = 'default', children, include, ...props }: Props,
		ref
	) => {
		const pathname = usePathname();

		return (
			<Link
				href={href}
				className={cn(
					`${buttonVariants({ variant, size })} ${
						href === pathname || (include && pathname.includes(include))
							? 'bg-secondary font-semibold'
							: ''
					} `,
					className
				)}
				ref={ref}
				{...props}>
				{children}
			</Link>
		);
	}
);

ActiveLink.displayName = 'ActiveLink';

export default ActiveLink;
