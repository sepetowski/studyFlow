import React from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { ReadOnlyEmoji } from '../common/ReadOnlyEmoji';
import { AssignedToMeDataItem } from '@/types/extended';

interface Props {
	info: AssignedToMeDataItem;
}

export const AssignedToMeItem = ({
	info: { emoji, id, link, title, workspaceName, type, createdAt },
}: Props) => {
	return (
		<Card>
			<CardContent className='flex w-full justify-between sm:items-center pt-4'>
				<div className='flex flex-col sm:flex-row gap-4 sm:items-center w-full'>
					<ReadOnlyEmoji className='sm:h-16 sm:w-16 h-12 w-12' selectedEmoji={emoji} />
					<div className='w-full'>
						<div className='flex items-center'>
							<h2 className='text-lg sm:text-2xl font-semibold'>
								{!title && type === 'mindMap' && 'DEAFULT_NAME.MIND_MAP'}
								{!title && type === 'task' && 'DEAFULT_NAME.TASK'}
								{title && title}
							</h2>
						</div>
						{/* {updated.by && (
							<div className='flex flex-col md:flex-row md:items-center md:gap-1'>
								<p className='text-muted-foreground'>
									<span>{itemTypeSentence}</span> {format.relativeTime(dateTime, now)}{' '}
									{t('ITEM_SENTENCE.BY')}
								</p>
								<div className='flex items-center gap-1'>
									<UserHoverInfoCard className='px-0' user={updated.by} />
									<p>
										{t('ITEM_SENTENCE.IN')} {workspaceName}
									</p>
								</div>
							</div>
						)} */}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
