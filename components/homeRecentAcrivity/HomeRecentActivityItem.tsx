'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ReadOnlyEmoji } from '@/components/common/ReadOnlyEmoji';
import { Star } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { UserHoverInfoCard } from '@/components/common/UserHoverInfoCard';
import { Button } from '@/components/ui/button';
import { useTuncateText } from '@/hooks/useTruncateText';
import Link from 'next-intl/link';

export const HomeRecentActivityItem = () => {
	const title = useTuncateText('Jakis tytul', 40, 10);
	return (
		<Card className='bg-background border-none hover:bg-accent transition-colors duration-200 p-2'>
			<CardContent className='flex w-full justify-between sm:items-center p-2 sm:p-2 pt-0 '>
				<div className='flex flex-row gap-2 sm:gap-4  w-full'>
					<ReadOnlyEmoji className='sm:h-16 sm:w-16 h-12 w-12' selectedEmoji={undefined} />
					<div className='w-full'>
						<div className='flex items-center'>
							<h2 className='text-lg sm:text-2xl font-semibold'>{title}</h2>
							<Star size={22} className='ml-2' />
						</div>
						{/* {updated.by && (
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
						)} */}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
