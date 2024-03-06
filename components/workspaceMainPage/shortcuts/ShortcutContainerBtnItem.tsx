'use client';
import React from 'react';
import Link from 'next-intl/link';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserPermisson } from '@prisma/client';

interface Props {
	title: string;
	Icon: LucideIcon;
	userRole: UserPermisson | null;
}

export const ShortcutContainerBtnItem = ({ Icon, title, userRole }: Props) => {
	return (
		<Button
			variant={'outline'}
			className={`w-40 text-sm md:text-base md:w-52  h-14 p-2 rounded-lg shadow-sm  flex justify-center items-center gap-1 md:gap-2 ${
				userRole !== 'OWNER' ? 'xl:w-1/5' : 'xl:w-1/4'
			}`}>
			<Icon size={16} />
			<h4 className='break-words'>{title}</h4>
		</Button>
	);
};
