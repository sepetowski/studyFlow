'use client';

import React, { useEffect } from 'react';
import { useOnboardingForm } from '@/context/OnboardingForm';
import { FormStepsInfo } from './FormStepsInfo';
import { FirstStep } from './steps/FirstStep';
import { ThirdStep } from './steps/ThirdStep';
import { SecondStep } from './steps/SecondStep';
import { AppTitle } from '../ui/app-title';
import { UploadFile } from '../common/UploadFile';
import { UploadFile2 } from '../common/UploadFile2';
import { useForm } from 'react-hook-form';
import { ImageSchema, imageSchema } from '@/schema/imageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
interface Props {
	profileImage?: string | null;
}

export const AditionalInfoSection = ({ profileImage }: Props) => {
	const { currentStep } = useOnboardingForm();
	const form = useForm<ImageSchema>({
		resolver: zodResolver(imageSchema),
	});

	const onSubmit = async (data: ImageSchema) => {
		console.log(data);
	};
	return (
		<section className='w-full lg:w-1/2 bg-card min-h-full flex flex-col justify-between items-center p-4 md:p-6 '>
			<div className='mt-12 sm:mt-8 mb-16 w-full flex flex-col items-center '>
				<AppTitle size={50} />
				{currentStep === 1 && <FirstStep profileImage={profileImage} />}
				{/* <UploadFile endpoint='profilePictureUploader' /> */}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<UploadFile2 form={form} schema={imageSchema} zodKey={'image'} />
						<button type='submit'>add</button>
					</form>
				</Form>
				{currentStep === 2 && <SecondStep />}
				{currentStep === 3 && <ThirdStep />}
			</div>
			<FormStepsInfo />
		</section>
	);
};
