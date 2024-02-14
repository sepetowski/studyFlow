'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { ReadOnlyEmoji } from '../common/ReadOnlyEmoji';
import { AssignedToMeDataItem } from '@/types/extended';
import { useFormatter, useTranslations } from 'next-intl';
import { UserHoverInfoCard } from '@/components/common/UserHoverInfoCard';
import Link from 'next-intl/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface Props {
	info: AssignedToMeDataItem;
}

export const AssignedToMeItem = ({
	info: { emoji, id, link, title, workspaceName, type, updated, workspaceId },
}: Props) => {
	const t = useTranslations('ASSIGNED_TO_ME');
	const c = useTranslations('COMMON');

	const format = useFormatter();
	const dateTime = new Date(updated.at);
	const now = new Date();

	const itemTypeSentence =
		type === 'mindMap' ? c('EDITED_ITEM_SENTENCE.MIND_MAP') : c('EDITED_ITEM_SENTENCE.TASK');

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
				</CardContent>
			</Card>
		</Link>
	);
};
