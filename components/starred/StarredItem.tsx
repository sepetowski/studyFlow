'use client';
import React, { useMemo } from 'react';
import { StarredItem as StarredItemType } from '@/types/saved';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next-intl/link';
import { ReadOnlyEmoji } from '../common/ReadOnlyEmoji';
import { MoreHorizontal, Star, StarOff } from 'lucide-react';
import { useFormatter } from 'next-intl';
import { UserHoverInfoCard } from '../common/UserHoverInfoCard';
import { Button } from '../ui/button';
interface Props {
	item: StarredItemType;
}

export const StarredItem = ({
	item: { emoji, id, link, title, type, updated, workspaceName },
}: Props) => {
	const format = useFormatter();
	const dateTime = new Date(updated.at);
	const now = new Date();

	const itemType = type === 'mindMap' ? 'Mapa myśli edytowana' : 'Zadanie edytowane';

	return (
		<Link href={link}>
			<Card>
				<CardContent className='flex w-full justify-between items-center pt-4'>
					<div className='flex gap-4 items-center'>
						<ReadOnlyEmoji className='sm:h-16 sm:w-16 h-12 w-12' selectedEmoji={emoji} />
						<div>
							<div className='flex items-center'>
								<h2 className='text-lg sm:text-2xl font-semibold'>{title}</h2>
								<Star size={22} className='ml-2' />
							</div>
							{updated.by && (
								<div className='flex items-center'>
									<p className='text-muted-foreground'>
										<span>{itemType}</span> {format.relativeTime(dateTime, now)} przez
									</p>
									<UserHoverInfoCard user={updated.by} />
									<p>- w {workspaceName}</p>
								</div>
							)}
						</div>
					</div>
					<Button variant={'ghost'}>
						<StarOff /> <span className='ml-2'>Unstar</span>
					</Button>
				</CardContent>
			</Card>
		</Link>
	);
};
