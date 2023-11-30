'use client';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/loading-state';
import { useToast } from '@/components/ui/use-toast';
import { Task } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import React from 'react';

interface Props {
	workspaceId: string;
}

export const NewTask = ({ workspaceId }: Props) => {
	const m = useTranslations('MESSAGES');
	const t = useTranslations('SIDEBAR.WORKSPACE_OPTIONS');

	const { toast } = useToast();
	const router = useRouter();

	const { mutate: newTask, isLoading } = useMutation({
		mutationFn: async () => {
			const { data } = await axios.post('/api/task/new/', {
				workspaceId,
			});
			return data;
		},

		onSuccess: (data: Task) => {
			toast({
				title: m('SUCCES.TASK_ADDED'),
			});
			router.push(`/dashboard/workspace/${workspaceId}/tasks/task/${data.id}/edit`);
		},

		onError: (err: AxiosError) => {
			const error = err?.response?.data ? err.response.data : 'ERRORS.DEFAULT';

			toast({
				title: m(error),
				variant: 'destructive',
			});
		},

		mutationKey: ['newTask'],
	});
	return (
		<Button
			disabled={isLoading}
			onClick={() => {
				newTask();
			}}
			className='justify-start items-center gap-2'
			variant={'ghost'}
			size={'sm'}>
			<Plus size={16} />
			{isLoading ? <LoadingState loadingText={t('ADD_TASK_PENDING')} /> : t('ADD_TASK')}
		</Button>
	);
};
