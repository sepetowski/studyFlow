'use client';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/loading-state';
import { useToast } from '@/components/ui/use-toast';
import { MindMap } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import React from 'react';

interface Props {
	workspaceId: string;
}

export const NewMindMap = ({ workspaceId }: Props) => {
	const m = useTranslations('MESSAGES');
	const t = useTranslations('SIDEBAR.WORKSPACE_OPTIONS');

	const { toast } = useToast();
	const router = useRouter();




	const { mutate: newMindMap, isLoading } = useMutation({
		mutationFn: async () => {
			const { data } = await axios.post('/api/mind_maps/new', {
				workspaceId,
			});
			return data;
		},

		onSuccess: (data: MindMap) => {
			toast({
				title: m('SUCCES.TASK_ADDED'),
			});
			router.push(`/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${data.id}`);
		},

		onError: (err: AxiosError) => {
			const error = err?.response?.data ? err.response.data : 'ERRORS.DEFAULT';

			toast({
				title: m(error),
				variant: 'destructive',
			});
		},

		mutationKey: ['newMindMap'],
	});
	return (
		<Button
			disabled={isLoading}
			onClick={() => {
				newMindMap();
			}}
			className='justify-start items-center gap-2'
			variant={'ghost'}
			size={'sm'}>
			<Plus size={16} />
			{isLoading ? <LoadingState loadingText={'ladowanie'} /> : 'Nowa mapa mysli'}
		</Button>
	);
};
