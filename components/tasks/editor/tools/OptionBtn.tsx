import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const OptionBtn = ({ onClick, children, className, ...props }: Props) => {
	return (
		<Button
			className={cn(
				'w-7  h-7 flex justify-center items-center rounded-sm text-muted-foreground',
				className
			)}
			type='button'
			size={'icon'}
			variant={'ghost'}
			onClick={onClick}
			{...props}>
			{children}
		</Button>
	);
};
