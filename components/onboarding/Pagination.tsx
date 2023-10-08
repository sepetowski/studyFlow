'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useOnboardingForm } from '@/context/OnboardingForm';
import { ActionType } from '@/types/onBoardingContext';

const steps = [1, 2, 3];

export const Pagination = () => {
	const { currentStep, dispatch } = useOnboardingForm();
	return (
		<div className='flex justify-center items-center gap-2 w-full'>
			{steps.map((step) => (
				<Button
					onClick={() => dispatch({ type: ActionType.CHNAGE_SITE, payload: step })}
					variant={currentStep === step ? 'default' : 'secondary'}
					key={step}
					className='h-3 w-6 px-6 py-1 border'
				/>
			))}
		</div>
	);
};
