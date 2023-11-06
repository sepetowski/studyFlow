'use client';

import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown, Link, RefreshCcw, UserPlus2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useToast } from '@/components/ui/use-toast';
import { useLocale, useTranslations } from 'next-intl';
import { Workspace } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next-intl/client';
import { LoadingState } from '@/components/ui/loading-state';
import { domain } from '@/lib/api';

interface Props {
	workspace: Workspace;
}

export const InviteContent = ({
	workspace: { id, adminCode, canEditCode, inviteCode, readOnlyCode },
}: Props) => {
	const { toast } = useToast();
	const [selectedRole, setSelectedRole] = useState<'viewer' | 'admin' | 'editor'>('editor');

	const lang = useLocale();
	const m = useTranslations('MESSAGES');

	const router = useRouter();

	const inviteURL = useMemo(() => {
		const shareCode = () => {
			switch (selectedRole) {
				case 'admin':
					return adminCode;
				case 'editor':
					return canEditCode;
				case 'viewer':
					return readOnlyCode;
			}
		};

		return `${domain}/${lang}/dashboard/invite/${inviteCode}?role=${selectedRole}&shareCode=${shareCode()}`;
	}, [inviteCode, adminCode, readOnlyCode, canEditCode, lang, selectedRole]);

	const copyHanlder = () => {
		navigator.clipboard.writeText(inviteURL);

		toast({
			title: 'Link skopiowany',
		});
	};

	const { mutate: regenerateLink, isLoading } = useMutation({
		mutationFn: async () => {
			await axios.post('/api/workspace/invite/regenerate_link', { id });
		},
		onError: (err: AxiosError) => {
			const error = err?.response?.data ? err.response.data : 'ERRORS.DEAFULT';

			toast({
				title: m(error),
				variant: 'destructive',
			});
		},
		onSuccess: async () => {
			toast({
				title: m('SUCCES.REGENERATED_LINK'),
			});
			router.refresh();
		},
		mutationKey: ['regenerateLink'],
	});

	return (
		<div className='space-y-4 my-6'>
			<div className='h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm  flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<Link className='w-5 h-5' size={18} />
					<HoverCard openDelay={250} closeDelay={250}>
						<HoverCardTrigger asChild>
							<p className=' overflow-hidden h-5 max-w-[22rem]'>{inviteURL}</p>
						</HoverCardTrigger>
						<HoverCardContent>
							<p className='break-words'>{inviteURL}</p>
						</HoverCardContent>
					</HoverCard>
				</div>
				<Button
					disabled={isLoading}
					onClick={() => {
						regenerateLink();
					}}
					className={`px-0 w-5 h-5 hover:bg-background hover:text-muted-foreground `}
					size={'icon'}
					variant={'ghost'}>
					{isLoading ? <LoadingState size={18} /> : <RefreshCcw size={18} />}
				</Button>
			</div>
			<div className=' h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm  flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<UserPlus2 className='w-5 h-5' size={18} />
					<span>Uprawniena</span>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant={'ghost'}
							size={'sm'}
							className='flex gap-1 items-center px-0 h-fit hover:bg-background hover:text-muted-foreground'>
							{selectedRole === 'admin' && (
								<p className='flex gap-1 items-center'>
									<span>😎</span> <span>Admin</span>
								</p>
							)}
							{selectedRole === 'editor' && (
								<p className='flex gap-1 items-center'>
									<span>🫡</span> <span>Wykonawca</span>
								</p>
							)}
							{selectedRole === 'viewer' && (
								<p className='flex gap-1 items-center'>
									<span>🥸</span> <span>Przeglądający</span>
								</p>
							)}

							<ChevronDown size={16} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent sideOffset={15} className='max-w-xs'>
						<DropdownMenuItem
							onClick={() => {
								setSelectedRole('admin');
							}}>
							<div className='flex flex-col gap-1'>
								<div className='flex items-center gap-2'>
									<div className='flex items-center gap-1'>
										<span>😎</span>
										<h3>Admin</h3>
									</div>
									{selectedRole === 'admin' && <Check size={18} />}
								</div>
								<p className='text-muted-foreground '>
									Posiada wszytskie możliwe prawa, również do zmiany ustawień obszaru roboczego, jak
									i zarządzaniem innymi użytkownikami.
								</p>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								setSelectedRole('editor');
							}}>
							<div className='flex flex-col gap-1'>
								<div className='flex items-center gap-2'>
									<div className='flex items-center gap-1'>
										<span>🫡</span>
										<h3>Wykonawca</h3>
									</div>
									{selectedRole === 'editor' && <Check size={18} />}
								</div>
								<p className='text-muted-foreground '>
									Ma pełen dostęp do przestrzeni roboczej, ma prawa do edycji i usuwania treści w
									przestrzeni roboczej. Nie ma jednak dostępu do ustawien obszaru.
								</p>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								setSelectedRole('viewer');
							}}>
							<div className='flex flex-col gap-1'>
								<div className='flex items-center gap-2'>
									<div className='flex gap-1 items-center'>
										<span>🥸</span>
										<h3>Przeglądający</h3>
									</div>
									{selectedRole === 'viewer' && <Check size={18} />}
								</div>
								<p className='text-muted-foreground '>
									Ma pełen dostęp do przestrzeni roboczej, jednak nie może nic edytować jak i
									usuwuać. Nie ma również dostępu do ustawien obszaru.
								</p>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<Button disabled={isLoading} onClick={copyHanlder} className='w-full text-white font-bold'>
				Skopiuj link
			</Button>
		</div>
	);
};
