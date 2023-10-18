import { SvgProps } from '@/types/props';
import { Loader2, LucideIcon } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
interface Props extends SvgProps {
	loadingText?: string;
	hideLoaderIcon?: boolean;
}

export const LoadingState = ({
	loadingText,
	hideLoaderIcon = false,
	className,
	...props
}: Props) => {
	return (
		<>
			{!hideLoaderIcon && (
				<Loader2
					className={cn(`h-4 w-4 animate-spin ${loadingText && 'mr-2'}`, className)}
					{...props}
				/>
			)}
			{loadingText && <p>{loadingText}</p>}
		</>
	);
};
