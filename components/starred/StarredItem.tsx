'use client';
import React, { useMemo } from 'react';
import { StarredItem as StarredItemType } from '@/types/saved';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next-intl/link';
import { ReadOnlyEmoji } from '../common/ReadOnlyEmoji';
import { MoreHorizontal, Star, StarOff } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { UserHoverInfoCard } from '../common/UserHoverInfoCard';
import { Button, buttonVariants } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUnstarItem } from '@/hooks/useUnstarItem';
import { cn } from '@/lib/utils';

interface Props {
	item: StarredItemType;
	sortType: 'asc' | 'desc';
	userId: string;
}

export const StarredItem = ({
	item: { emoji, id, link, title, type, updated, workspaceName, itemId, workspaceId },
	sortType,
	userId,
}: Props) => {
	const t = useTranslations('STARRED');
	const c = useTranslations('COMMON');

	const onUnstar = useUnstarItem({ id, itemId, sortType, type, userId });

	const format = useFormatter();
	const dateTime = new Date(updated.at);
	const now = new Date();

	const itemTypeSentence =
		type === 'mindMap' ? c('EDITED_ITEM_SENTENCE.MIND_MAP') : c('EDITED_ITEM_SENTENCE.TASK');

	const unstarHanlder = (e: React.MouseEvent) => {
		e.preventDefault();
		onUnstar();
	};

	return (
		<Link href={link}>
			<Card>
				<CardContent className='flex w-full justify-between sm:items-center pt-4'>
					<div className='flex flex-col sm:flex-row gap-4 sm:items-center w-full'>
						<ReadOnlyEmoji className='sm:h-16 sm:w-16 h-12 w-12' selectedEmoji={emoji} />
						<div className='w-full'>
							<div className='flex items-center'>
								<h2 className='text-lg sm:text-2xl font-semibold'>
									{!title && type === 'mindMap' && t('DEAFULT_NAME.MIND_MAP')}
									{!title && type === 'task' && t('DEAFULT_NAME.TASK')}
									{title && title}
								</h2>
								<Star size={22} className='ml-2' />
							</div>
							{updated.by && (
								<div className='flex flex-col md:flex-row md:items-center md:gap-1'>
									<p className='text-muted-foreground'>
										<span>{itemTypeSentence}</span> {format.relativeTime(dateTime, now)}{' '}
										{c('EDITED_ITEM_SENTENCE.BY')}
									</p>
									<div className='flex items-center gap-1'>
										<UserHoverInfoCard className='px-0' user={updated.by} />
										<p>
											{c('EDITED_ITEM_SENTENCE.IN')}{' '}
											<Link
												className={cn(`${buttonVariants({ variant: 'link' })} px-0 `)}
												href={`/dashboard/workspace/${workspaceId}`}>
												{workspaceName}
											</Link>
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={'ghost'} size={'icon'}>
								<MoreHorizontal />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem onClick={unstarHanlder} className='cursor-pointer'>
								<StarOff size={18} /> <span className='ml-2'>{t('UNSTAR')}</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardContent>
			</Card>
		</Link>
	);
};
