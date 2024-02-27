'use client';
import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DoorOpen } from 'lucide-react';
import Warning from '@/components/ui/warning';
import { Workspace } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next-intl/client';
import { LoadingState } from '@/components/ui/loading-state';

interface Props {
	workspace: Workspace;
}

export const LeaveWorkspace = ({ workspace: { id, name } }: Props) => {
	const [open, setOpen] = useState(false);

	const t = useTranslations('LEAVE_FROM_WORKSAPCE');
	const m = useTranslations('MESSAGES');

	const { toast } = useToast();
	const router = useRouter();

	const { mutate: leaveFromWorkspace, isLoading } = useMutation({
		mutationFn: async () => {
			await axios.post('/api/workspace/leave', {
				id,
			});
		},
		onError: (err: AxiosError) => {
			const error = err?.response?.data ? err.response.data : 'ERRORS.DEFAULT';

			toast({
				title: m(error),
				variant: 'destructive',
			});
		},
		onSuccess: async () => {
			toast({
				title: m('SUCCES.LEAVE_FROM_WORKSAPCE'),
			});
			router.push('/dashboard');
			router.refresh();
		},
		mutationKey: ['leaveFromWorkspace', id],
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className='sm:h-9 sm:rounded-md sm:px-3 sm:w-auto sm:space-x-2 sm:bg-destructive/10 sm:hover:bg-destructive text-destructive hover:text-white'
					onClick={() => setOpen(true)}
					variant={'ghost'}
					size={'icon'}>
					<span className='hidden sm:inline'>{t('LEAVE')}</span>
					<DoorOpen size={18} />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<span>{t('TITLE')}</span> <span>{name}</span>
					</DialogTitle>
					<DialogDescription>{t('DESC')}</DialogDescription>
				</DialogHeader>
				<Warning>
					<p>{t('WARNING')}</p>
				</Warning>

				<Button
					disabled={isLoading}
					onClick={() => {
						leaveFromWorkspace();
					}}
					className='flex gap-1 items-center'
					size={'lg'}
					variant={'destructive'}>
					{isLoading ? (
						<LoadingState size={18} loadingText={t('LOADING_BTN')} />
					) : (
						<>
							<DoorOpen size={18} />
							{t('LEAVE')}
						</>
					)}
				</Button>
			</DialogContent>
		</Dialog>
	);
};