'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useTuncateText } from '@/hooks/useTruncateText';
import { AditionalResource as AditionalResourceType } from '@/types/extended';
import { AditionalRecourceTypes } from '@prisma/client';
import { FileText } from 'lucide-react';
import Link from 'next-intl/link';
import { LoadingState } from '@/components/ui/loading-state';

interface Props {
	file: AditionalResourceType;
}

export const AditionalResource = ({ file: { id, name, type, url } }: Props) => {
	const [isLoading, setIsLoading] = useState(true);
	return (
		<Link
			className=' w-44 h-44 sm:w-80 sm:h-80 rounded-sm overflow-hidden bg-secondary'
			href={url}
			target='_blank'>
			{isLoading && (
				<div className='w-full h-full flex justify-center items-center'>
					<LoadingState />
				</div>
			)}
			<div className=' w-full h-full flex '>
				{type === AditionalRecourceTypes.IMAGE ? (
					<Image
						onLoad={(e) => {
							setIsLoading(false);
						}}
						className='w-full  h-full   object-cover'
						src={url}
						alt=''
						width={1600}
						height={1600}
					/>
				) : (
					<FileText className='w-8 h-8 sm:w-12 sm:h-12	' />
				)}
			</div>
		</Link>
	);
};
