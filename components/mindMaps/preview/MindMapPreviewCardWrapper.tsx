'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExtendedMindMap, ExtendedTask } from '@/types/extended';
import { LinkTag } from '@/components/common/LinkTag';
import { StarSvg } from '@/components/common/StarSvg';
import { UserPermisson } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { ReadOnlyEmoji } from '../../common/ReadOnlyEmoji';
import { MindMapCardPreviewOptions } from './MindMapCardPreviewOptions';
import { Info } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface Props {
	mindMap: ExtendedMindMap;
	children: React.ReactNode;
	isSavedByUser: boolean;
	userRole: UserPermisson | null;
}

export const MindMapPreviewCardWrapper = ({
	mindMap,
	children,
	isSavedByUser,
	userRole,
}: Props) => {
	const [isSaved, setIsSaved] = useState(isSavedByUser);
	const t = useTranslations('MIND_MAP.PREVIEW');

	const onSetIsSaved = () => {
		setIsSaved((prev) => !prev);
	};

	return (
		<Card className='h-full'>
			<CardContent className='py-4 sm:py-6 flex flex-col gap-10 relative h-full'>
				<div className='w-full flex flex-col sm:flex-row  items-start gap-2 sm:gap-4'>
					<ReadOnlyEmoji selectedEmoji={mindMap?.emoji} />
					<div className='w-full flex flex-col  gap-2'>
						<div className='w-full flex justify-between items-center'>
							<div className='w-5/6'>
								<p className='text-2xl font-semibold flex items-center gap-2'>
									{mindMap.title ? mindMap.title : t('NO_TITLE')}
									{isSaved && <StarSvg />}
								</p>
							</div>
							<div className='absolute top-5 right-5 sm:static'>
								<MindMapCardPreviewOptions
									isSaved={isSaved}
									mindMapId={mindMap.id}
									workspaceId={mindMap.workspaceId}
									onSetIsSaved={onSetIsSaved}
									userRole={userRole}
								/>
							</div>
						</div>
						<div className='w-full gap-1 flex flex-wrap flex-row items-center'>
							<div>
								<HoverCard openDelay={250} closeDelay={250}>
									<HoverCardTrigger>
										<Info size={16} className='w-4 h-4 ' />
									</HoverCardTrigger>
									<HoverCardContent
										className='max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-full'
										align='start'>
										{t('INFO')}
									</HoverCardContent>
								</HoverCard>
							</div>
							{mindMap.tags && mindMap.tags.map((tag) => <LinkTag key={tag.id} tag={tag} />)}
						</div>
					</div>
				</div>
				<div className='h-full w-full'>{children}</div>
			</CardContent>
		</Card>
	);
};
