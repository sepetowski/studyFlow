'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	hideIcon?: boolean;
	yellow?: boolean;
}

const Warning = React.forwardRef<HTMLDivElement, Props>(
	({ className, children, hideIcon, yellow, ...props }: Props, ref) => {
		const t = useTranslations('COMMON');
		return (
			<div
				className={cn(
					`my-4 px-4 py-2 border-destructive border  rounded-md shadow-sm   text-secondary-foreground flex flex-col gap-2 ${
						yellow ? 'bg-yellow-400/10  border-yellow-400' : 'bg-destructive/10'
					}`,
					className
				)}
				ref={ref}
				{...props}>
				{!hideIcon && (
					<div
						className={`flex items-center gap-2 font-semibold  ${
							yellow ? 'text-yellow-400' : 'text-destructive'
						}`}>
						<AlertTriangle />
						<p>{t('WARNING')}</p>
					</div>
				)}
				<div>{children}</div>
			</div>
		);
	}
);

Warning.displayName = 'Warning';

export default Warning;
