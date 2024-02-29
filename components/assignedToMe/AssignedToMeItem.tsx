'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ReadOnlyEmoji } from '@/components/common/ReadOnlyEmoji';
import { AssignedToMeDataItem } from '@/types/extended';
import { useFormatter, useTranslations } from 'next-intl';
import { UserHoverInfoCard } from '@/components/common/UserHoverInfoCard';
import Link from 'next-intl/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next-intl/client';

interface Props {
	info: AssignedToMeDataItem;
}

export const AssignedToMeItem = ({
	info: { emoji, link, title, workspaceName, type, updated, workspaceId },
}: Props) => {
	const t = useTranslations('ASSIGNED_TO_ME');
	const c = useTranslations('COMMON');

	const router = useRouter();

	const format = useFormatter();
	const dateTime = new Date(updated.at);
	const now = new Date();

	const itemTypeSentence =
		type === 'mindMap' ? c('EDITED_ITEM_SENTENCE.MIND_MAP') : c('EDITED_ITEM_SENTENCE.TASK');

	return (
		<Link className='hover:scale-[1.01] transition-transform duration-200' href={link}>
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
											<Button
												variant={'link'}
												onClick={(e) => {
													e.preventDefault();
													router.push(`/dashboard/workspace/${workspaceId}`);
												}}
												className='px-0'>
												{workspaceName}
											</Button>
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