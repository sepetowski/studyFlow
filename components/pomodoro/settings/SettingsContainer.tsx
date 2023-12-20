import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import React from 'react';
import { SettingsForm } from './SettingsForm';
import { PomodoroSettings } from '@prisma/client';

interface Props {
	pomodoroSettings: PomodoroSettings;
}

export const SettingsContainer = ({ pomodoroSettings }: Props) => {
	return (
		<Card className='bg-background border-none shadow-none'>
			<CardHeader>
				<h1 className='text-2xl font-semibold leading-none tracking-tight'>Ustawienia pomodoro</h1>
				<CardDescription className='text-base'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, ipsa.
				</CardDescription>
			</CardHeader>
			<CardContent className='max-w-2xl'>
				<SettingsForm pomodoroSettings={pomodoroSettings} />
			</CardContent>
		</Card>
	);
};
