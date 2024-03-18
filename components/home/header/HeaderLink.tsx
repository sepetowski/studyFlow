import React from 'react';
import Link from 'next-intl/link';
import { LucideIcon } from 'lucide-react';

interface Props {
	Icon: LucideIcon;
	title: string;
	href: string;
}

export const HeaderLink = ({ Icon, href, title }: Props) => {
	return (
		<Link className='group' href={href}>
			<div className='p-4 h-24 w-40 rounded-md gap-4 group-hover:bg-accent/50 flex flex-col justify-center items-center bg-transparent transition-colors duration-200 '>
				<Icon />
				<p>{title}</p>
			</div>
		</Link>
	);
};
