'use client';
import { useOnboardingForm } from '@/context/OnboardingForm';
import { useTranslations } from 'next-intl';
import React from 'react';

export const Finish = () => {
	const t = useTranslations('ONBOARDING_FORM');
	const { currentStep, workspaceName, workspaceImage } = useOnboardingForm();

	return (
		<>
			<div className='flex flex-col  justify-center items-center gap-4 w-full my-10 text-center'>
				<h2 className='font-bold  text-4xl md:text-5xl  max-w-md'>{t('FOURTH_STEP.TITLE')}</h2>
			</div>
		</>
	);
};
