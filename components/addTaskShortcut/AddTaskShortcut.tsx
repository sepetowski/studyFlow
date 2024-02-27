'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { ExternalLink, PencilRuler } from 'lucide-react';
import { Task, Workspace } from '@prisma/client';
import { ChevronLeft } from 'lucide-react';
import { useChangeCodeToEmoji } from '@/hooks/useChangeCodeToEmoji';
import { MainTab } from './MainTab';
import { Workspaces } from './Workspaces';
import { DateRange } from 'react-day-picker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next-intl/client';
import { useToast } from '@/components/ui/use-toast';
import { useTranslations } from 'next-intl';
import { LoadingState } from '../ui/loading-state';
import Link from 'next-intl/link';
interface Props {
	userEditableWorkspaces: Workspace[];
	userId: string;
}

export const AddTaskShortcut = ({ userEditableWorkspaces, userId }: Props) => {
	const t = useTranslations('TASK_SHORTCUT');
	const m = useTranslations('MESSAGES');

	const queryClient = useQueryClient();

	const [currentTab, setCurrentTab] = useState<'main' | 'workspaces'>('main');
	const [open, setOpen] = useState(false);

	const [selectedEmoji, setSelectedEmoji] = useState('1f9e0');
	const renderedEmoji = useChangeCodeToEmoji(selectedEmoji);

	const router = useRouter();
	const { toast } = useToast();

	const [newTaskLink, setNewTaskLink] = useState<null | string>(null);

	const [activeWorkspace, setActiveWorksapce] = useState(
		userEditableWorkspaces.length >= 0 ? userEditableWorkspaces[0] : null
	);

	const [date, setDate] = useState<DateRange | undefined>({
		from: undefined,
		to: undefined,
	});

	const [title, setTitle] = useState('');

	const selectedDateHandler = (date: DateRange | undefined) => {
		setDate(date);
	};

	const changeTitleHandler = (title: string) => {
		setTitle(title);
	};

	const selectEmojiHandler = (emoji: string) => {
		setSelectedEmoji(emoji);
	};

	const changeTabHandler = (tab: 'main' | 'workspaces') => {
		setCurrentTab(tab);
	};

	const onSelectActiveWorkspace = (workspace: Workspace) => {
		setActiveWorksapce(workspace);
		setCurrentTab('main');
	};

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		if (!open) {
			timeoutId = setTimeout(() => {
				setCurrentTab('main');
				setNewTaskLink(null);
			}, 200);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [open]);

	const { mutate: newShortTask, isLoading } = useMutation({
		mutationFn: async () => {
			const { data } = await axios.post('/api/task/create_short_task', {
				workspaceId: activeWorkspace?.id,
				icon: selectedEmoji,
				title,
				date,
			});
			return data as Task;
		},

		onSuccess: async (data: Task) => {
			await queryClient.refetchQueries(['getCalendarItems', userId]);

			toast({
				title: m('SUCCES.TASK_ADDED'),
			});

			setNewTaskLink(`/dashboard/workspace/${data.workspaceId}/tasks/task/${data.id}/edit`);
			setTitle('');
			setSelectedEmoji('1f9e0');
			setActiveWorksapce(userEditableWorkspaces.length >= 0 ? userEditableWorkspaces[0] : null);
			setDate({
				from: undefined,
				to: undefined,
			});

			router.refresh();
		},

		onError: (err: AxiosError) => {
			const error = err?.response?.data ? err.response.data : 'ERRORS.DEFAULT';

			toast({
				title: m(error),
				variant: 'destructive',
			});
		},
		onMutate: () => {},

		mutationKey: ['newShortTask'],
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					size={'icon'}
					className=' sm:bg-primary/10 sm:text-primary sm:font-semibold sm:hover:bg-primary sm:hover:text-white sm:h-9 sm:rounded-md sm:px-3 sm:w-auto sm:space-x-2 text-primary'
					variant='ghost'>
					<span className='hidden sm:inline'>{t('TITLE')}</span>
					<PencilRuler size={16} />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[600px]'>
				<DialogHeader>
					<div className='flex flex-col items-start gap-2'>
						{newTaskLink && (
							<Link target='_blank' className='w-full cursor-pointer' href={newTaskLink}>
								<div className='mt-6  mb-4 p-2 border border-primary rounded-md bg-primary/10 w-full text-primary font-semibold flex justify-between items-center '>
									<p>{t('ADDED_TASK')}</p>
									<ExternalLink />
								</div>
							</Link>
						)}
						<div className='flex items-center gap-2'>
							{currentTab === 'workspaces' && (
								<Button
									onClick={() => {
										changeTabHandler('main');
									}}
									className='h-8 w-8'
									variant={'ghost'}
									size={'icon'}>
									<ChevronLeft />
								</Button>
							)}
							<DialogTitle>
								{currentTab === 'main' ? t('TITLE') : t('CHOOSE_WORKSPACE')}
							</DialogTitle>
						</div>
					</div>
					{currentTab === 'main' && (
						<DialogDescription className='text-left'>{t('DESC')}</DialogDescription>
					)}
				</DialogHeader>
				<div className='flex flex-col w-full my-4 gap-6'>
					{currentTab === 'main' ? (
						<MainTab
							date={date}
							title={title}
							renderedEmoji={renderedEmoji}
							activeWorkspace={activeWorkspace}
							onChangeTitle={changeTitleHandler}
							onSelectedDate={selectedDateHandler}
							onChangeTabHandler={changeTabHandler}
							onSelectEmojiHandler={selectEmojiHandler}
						/>
					) : (
						<Workspaces
							workspaces={userEditableWorkspaces}
							onSelectActiveWorkspace={onSelectActiveWorkspace}
						/>
					)}
				</div>
				{currentTab === 'main' && (
					<DialogFooter className='w-full'>
						{!activeWorkspace ? (
							<Button
								onClick={() => newShortTask()}
								disabled={!activeWorkspace || title.length === 0 || isLoading}
								size={'lg'}
								className='w-full text-white'>
								{isLoading ? <LoadingState loadingText={t('BTN_PENDING')} /> : t('BTN_ADD')}
							</Button>
						) : (
							<Button
								onClick={() => {
									setOpen(false);
								}}
								size={'lg'}
								className='w-full text-white'>
								{t('BTN_NO_WORKSPACES')}
							</Button>
						)}
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
};
