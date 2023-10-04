import React from 'react';
import { ProviderSignInBtn } from './ProviderSignInBtn';
import { useTranslations } from 'next-intl';

interface Props {
	signInCard?: boolean;
}

export const ProviderSigInBtns = ({ signInCard }: Props) => {
	const t = useTranslations('AUTH');
	return (
		<div className='flex flex-col gap-2'>
			<ProviderSignInBtn className='w-full rounded-[1.9rem] border  '>
				{signInCard ? t('SIGN_IN.PROVIDERS.GOOGLE') : t('SIGN_UP.PROVIDERS.GOOGLE')}
			</ProviderSignInBtn>
			<ProviderSignInBtn className='w-full text-white bg-black/90 dark:bg-black/70 hover:bg-black/80 dark:hover:bg-black/50 rounded-[1.9rem] '>
				{signInCard ? t('SIGN_IN.PROVIDERS.APPLE') : t('SIGN_UP.PROVIDERS.APPLE')}
			</ProviderSignInBtn>
			<ProviderSignInBtn className='w-full rounded-[1.9rem] border'>
				{signInCard ? t('SIGN_IN.PROVIDERS.GITHUB') : t('SIGN_UP.PROVIDERS.GITHUB')}
			</ProviderSignInBtn>
		</div>
	);
};
