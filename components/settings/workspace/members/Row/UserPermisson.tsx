'use client';
import React from 'react';
import { UserPermisson as UserPermissonType } from '@prisma/client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useTranslations } from 'next-intl';
import { LoadingState } from '@/components/ui/loading-state';
import { useRouter } from 'next-intl/client';
import { SubscriptionUser } from '@/types/extended';

interface Props {
	userRole: UserPermissonType;
	user: {
		id: string;
		image?: string | null | undefined;
		username: string;
	};
	workspaceId: string;
	onSetWorkspacesubscribers: React.Dispatch<React.SetStateAction<SubscriptionUser[]>>;
}

export const UserPermisson = ({
	userRole,
	user,
	workspaceId,
	onSetWorkspacesubscribers,
}: Props) => {
	const t = useTranslations('PERMISSONS');
	const m = useTranslations('MESSAGES');
	const { toast } = useToast();

	const router = useRouter();

	const { mutate: editUserRole, isLoading } = useMutation({
		mutationFn: async (role: UserPermissonType) => {
			const { data } = (await axios.post('/api/workspace/users/edit_role', {
				userId: user.id,
				newRole: role,
				workspaceId,
			})) as AxiosResponse<UserPermissonType>;
			return data;
		},
		onError: (err: AxiosError) => {
			const error = err?.response?.data ? err.response.data : 'ERRORS.DEAFULT';

			toast({
				title: m(error),
				variant: 'destructive',
			});
		},
		onSuccess: async (res: UserPermissonType) => {
			onSetWorkspacesubscribers((current) =>
				current.map((currentSubscribers) => {
					if (currentSubscribers.user.id === user.id) {
						return {
							...currentSubscribers,
							userRole: res,
						};
					}
					return currentSubscribers;
				})
			);
			router.refresh();
		},
		mutationKey: ['editUserRole'],
	});

	return (
		<div>
			{isLoading ? (
				<div className='flex items-center'>
					<LoadingState loadingText={t('WAIT')} />
				</div>
			) : (
				<>
					{userRole === 'OWNER' ? (
						<div className='flex gap-1 h-9 items-center px-3 text-sm font-medium '>
							<span className='hidden sm:inline'>🐲</span> <span>{t('OWNER.TITLE')}</span>
						</div>
					) : (
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<Button variant={'ghost'} size={'sm'} className='flex gap-1 items-center'>
									{userRole === 'ADMIN' && (
										<p className='flex gap-1 items-center'>
											<span className='hidden sm:inline'>😎</span> <span>{t('ADMIN.TITLE')}</span>
										</p>
									)}
									{userRole === 'CAN_EDIT' && (
										<p className='flex gap-1 items-center'>
											<span className='hidden sm:inline'>🫡</span> <span>{t('EDITOR.TITLE')}</span>
										</p>
									)}
									{userRole === 'READ_ONLY' && (
										<p className='flex gap-1 items-center'>
											<span className='hidden sm:inline'>🥸</span> <span>{t('VIEWER.TITLE')}</span>
										</p>
									)}

									<ChevronDown size={16} />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='max-w-xs '>
								<DropdownMenuItem
									onClick={() => {
										editUserRole('ADMIN');
									}}
									className='cursor-pointer'>
									<div className='flex flex-col gap-1'>
										<div className='flex items-center gap-2'>
											<div className='flex items-center gap-1'>
												<span>😎</span>
												<h3>{t('ADMIN.TITLE')}</h3>
											</div>
											{userRole === 'ADMIN' && <Check size={18} />}
										</div>
										<p className='text-muted-foreground text-xs sm:text-sm '>{t('ADMIN.DESC')}</p>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										editUserRole('CAN_EDIT');
									}}
									className='cursor-pointer'>
									<div className='flex flex-col gap-1'>
										<div className='flex items-center gap-2'>
											<div className='flex items-center gap-1'>
												<span>🫡</span>
												<h3>{t('EDITOR.TITLE')}</h3>
											</div>
											{userRole === 'CAN_EDIT' && <Check size={18} />}
										</div>
										<p className='text-muted-foreground text-xs sm:text-sm'>{t('EDITOR.DESC')}</p>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										editUserRole('READ_ONLY');
									}}
									className='cursor-pointer'>
									<div className='flex flex-col gap-1'>
										<div className='flex items-center gap-2'>
											<div className='flex gap-1 items-center'>
												<span>🥸</span>
												<h3>{t('VIEWER.TITLE')}</h3>
											</div>
											{userRole === 'READ_ONLY' && <Check size={18} />}
										</div>
										<p className='text-muted-foreground text-xs sm:text-sm '>{t('VIEWER.DESC')}</p>
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</>
			)}
		</div>
	);
};
