'use client';

import React, { useState } from 'react';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { AddWorkspaceForm } from './AddWorkspaceForm';
import { useTranslations } from 'next-intl';

export const AddWorkspace = () => {
	const [open, setOpen] = useState(false);
	const t = useTranslations('SIDEBAR');
	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<HoverCard openDelay={250} closeDelay={250}>
					<DialogTrigger asChild>
						<HoverCardTrigger>
							<Button onClick={() => setOpen(true)} variant={'ghost'} size={'icon'}>
								<Plus />
							</Button>
						</HoverCardTrigger>
					</DialogTrigger>
					<HoverCardContent align='start'>{t('MAIN.NEW_WORKSAPCE_HOVER')}</HoverCardContent>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{t('MAIN.NEW_WORKSAPCE_DIALOG_TITLE')}</DialogTitle>
							<DialogDescription>{t('MAIN.NEW_WORKSAPCE_DIALOG_DESC')}</DialogDescription>
						</DialogHeader>
						<AddWorkspaceForm onSetOpen={setOpen} />
					</DialogContent>
				</HoverCard>
			</Dialog>
		</div>
	);
};
