import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
	onClick?: () => void;
	icon: React.ReactNode;
	className?: string;
}
export const OptionBtn = ({ onClick, icon, className }: Props) => {
	return (
		<Button
			className={cn(
				'w-7  h-7 flex justify-center items-center rounded-sm text-muted-foreground',
				className
			)}
			type='button'
			size={'icon'}
			variant={'ghost'}
			onClick={onClick}>
			{icon}
		</Button>
	);
};
