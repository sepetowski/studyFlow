'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ReadOnlyEmoji } from '../../common/ReadOnlyEmoji';
import { ExtendedTask } from '@/types/extended';
import { ReadOnlyCallendar } from './ReadOnlyCallendar';
import { LinkTag } from '@/components/common/LinkTag';
import { ReadOnlyEditor } from './ReadOnlyEditor';
import { TaskOptons } from './TaskOptons';
import { StarSvg } from '@/components/common/StarSvg';
import { UserPermisson } from '@prisma/client';
import { useTranslations } from 'next-intl';

interface Props {
	task: ExtendedTask;
	isSavedByUser: boolean;
	userRole: UserPermisson | null;
}

export const ReadOnlyContent = ({ task, isSavedByUser, userRole }: Props) => {
	const [isSaved, setIsSaved] = useState(isSavedByUser);
	const t = useTranslations('TASK.EDITOR.READ_ONLY');

	const onSetIsSaved = () => {
		setIsSaved((prev) => !prev);
	};

	return (
		<Card>
			<CardContent className='py-4 sm:py-6 flex flex-col gap-10 relative'>
				<div className='w-full flex flex-col sm:flex-row  items-start gap-2 sm:gap-4'>
					<ReadOnlyEmoji selectedEmoji={task?.emoji} />
					<div className='w-full flex flex-col  gap-2'>
						<div className='w-full flex justify-between items-center'>
							<div className='w-5/6'>
								<p className='text-2xl font-semibold flex items-center gap-2'>
									{task.title ? task.title : t('NO_TITLE')}
									{isSaved && <StarSvg />}
								</p>
							</div>
							<div className='absolute top-5 right-5 sm:static'>
								<TaskOptons
									onSetIsSaved={onSetIsSaved}
									isSaved={isSaved}
									taskId={task.id}
									workspaceId={task.workspaceId}
									userRole={userRole}
								/>
							</div>
						</div>
						<div className='w-full gap-1 flex flex-wrap flex-row'>
							<ReadOnlyCallendar />
							{task.tags && task.tags.map((tag) => <LinkTag key={tag.id} tag={tag} />)}
						</div>
					</div>
				</div>
				<ReadOnlyEditor content={task.content as unknown as JSON} />
			</CardContent>
			<CardFooter className='w-full flex  items-center justify-center gap-2 text-xs'>
				<div>
					<p>Utworozne przez Bush</p>
				</div>
				<p>Ostatnio edytowane przez Bush</p>
			</CardFooter>
		</Card>
	);
};
