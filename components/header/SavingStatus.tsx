'use client';
import { useSaveTaskState } from '@/context/SaveTaskState';
import { FileWarning, Save } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { LoadingState } from '@/components/ui/loading-state';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export const SavingStatus = () => {
	const { status } = useSaveTaskState();
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<HoverCard openDelay={250} closeDelay={250}>
			<HoverCardTrigger asChild>
				<div
					className={cn(
						`px-3 h-9 flex justify-center items-center rounded-md  font-semibold gap-2 text-sm bg-primary text-white ${
							status === 'pending' ? 'bg-yellow-400' : ''
						} ${status === 'unsaved' ? 'bg-red-500' : ''}`
					)}>
					{status === 'saved' && (
						<>
							<Save size={18} />
							<p>Saved</p>
						</>
					)}
					{status === 'pending' && (
						<>
							<LoadingState />
							<p>Zapisywanie</p>
						</>
					)}
					{status === 'unsaved' && (
						<>
							<FileWarning size={18} />
							<p>nie zapsiano</p>
						</>
					)}
				</div>
			</HoverCardTrigger>
			<HoverCardContent align='start'>Zapisujemy Twoje pliki automatycznie </HoverCardContent>
		</HoverCard>
	);
};
