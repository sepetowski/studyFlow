'use client';
import ActiveLink from '@/components/ui/active-link';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
	workspaceId: string;
	children: React.ReactNode;
	deafultName: string;
	href: string;
	fields: {
		title: string;
		id: string;
		emoji?: string;
	}[];
}

export const WorkspaceOption = ({ children, fields, href, workspaceId, deafultName }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			<Button
				disabled={!fields}
				onClick={() => {
					setIsOpen((prev) => !prev);
				}}
				variant={'ghost'}
				size={'sm'}
				className='w-full justify-between'>
				<div className='flex items-center gap-2'>{children}</div>

				<ChevronDown
					className={` transition-all duration-200     ${isOpen ? 'rotate-180 ' : ''}`}
				/>
			</Button>
			<div className='ml-4 text-sm my-1'>
				{fields &&
					isOpen &&
					fields.map((filed, i) => (
						<ActiveLink
							key={i}
							href={`/dashboard/workspace/${workspaceId}/${href}/${filed.id}`}
							variant={'ghost'}
							size={'sm'}
							className='w-full flex justify-start items-center gap-2 font-normal '>
							{filed.emoji && <span>{filed.emoji}</span>}
							<span>{filed.title ? filed.title : deafultName}</span>
						</ActiveLink>
					))}
			</div>
		</div>
	);
};
