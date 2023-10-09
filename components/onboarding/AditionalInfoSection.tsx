'use client';

import React from 'react';
import { AppLogo } from '@/components/ui/app-logo';
import { useOnboardingForm } from '@/context/OnboardingForm';
import { FormStepsInfo } from './FormStepsInfo';
import { FirstStep } from './steps/FirstStep';
import { ThirdStep } from './steps/ThirdStep';
import { SecondStep } from './steps/SecondStep';

export const AditionalInfoSection = () => {
	const { currentStep } = useOnboardingForm();
	return (
		<section className='w-full lg:w-1/2 bg-card min-h-full flex flex-col justify-between items-center p-4 md:p-6 '>
			<div className='mt-12 sm:mt-8 mb-16 w-full flex flex-col items-center '>
				<div className='flex justify-center items-center gap-2'>
					<AppLogo height={50} width={50} />
					<h1 className='text-2xl'>
						Study<span className='text-primary font-semibold'>Flow</span>
					</h1>
				</div>

				{currentStep === 1 && <FirstStep />}
				{currentStep === 2 && <SecondStep />}
				{currentStep === 3 && <ThirdStep />}
			</div>
			<FormStepsInfo />
		</section>
	);
};
