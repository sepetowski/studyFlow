'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ReadOnlyEmoji } from './ReadOnlyEmoji';
import { ExtendedTask } from '@/types/extended';
import { Badge } from '@/components/ui/badge';
import { ReadOnlyCallendar } from './ReadOnlyCallendar';
import { LinkTag } from '@/components/common/LinkTag';
import { Editor } from '../editable/editor/Editor';
import { ReadOnlyEditor } from './ReadOnlyEditor';
import { TaskOptons } from './TaskOptons';
import { Star } from 'lucide-react';
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

	console.log(isSaved);
	return (
		<Card>
			<CardContent className='py-4 sm:py-6 flex flex-col gap-10'>
				<div className='w-full flex  items-start gap-2 sm:gap-4'>
					<ReadOnlyEmoji selectedEmoji={task?.emoji} />
					<div className='w-full flex flex-col gap-2'>
						<div className='w-full flex justify-between items-center'>
							<div className='w-5/6'>
								<p className='text-2xl font-semibold flex items-center gap-2'>
									{task.title ? task.title : t('NO_TITLE')}
									{isSaved && <StarSvg />}
								</p>
							</div>
							<div>
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
		</Card>
	);
};
