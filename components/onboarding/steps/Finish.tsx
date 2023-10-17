'use client';
import { useOnboardingForm } from '@/context/OnboardingForm';
import React from 'react';

export const Finish = () => {
	const { currentStep, workspaceName, workspaceImage } = useOnboardingForm();

	console.log(currentStep, workspaceName, workspaceImage);
	return <div>Finish</div>;
};
