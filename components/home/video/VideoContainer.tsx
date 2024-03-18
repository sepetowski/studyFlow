import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
	className?: string;
}

export const VideoContainer = ({ className }: Props) => {
	return (
		<div
			className={cn(
				`w-full h-full bg-secondary rounded-3xl border border-border `,
				className
			)}></div>
	);
};
