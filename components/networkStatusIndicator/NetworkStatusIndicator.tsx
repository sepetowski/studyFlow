'use client';
import React from 'react';
import { useNavigatorOnLine } from '@/hooks/useNavigatorOnline';
import { useToast } from '../ui/use-toast';
import { useTranslations } from 'next-intl';

export const NetworkStatusIndicator = () => {
	const t = useTranslations('NETWORK_INDICAOTR');
	const { toast } = useToast();
	const isOnline = useNavigatorOnLine();
	const firstUpdate = React.useRef(true);

	React.useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		const title = isOnline ? t('ONLINE') : t('OFLINE');
		toast({
			title,
			variant: isOnline ? 'default' : 'destructive',
		});
	}, [isOnline, toast, t]);

	return null;
};
