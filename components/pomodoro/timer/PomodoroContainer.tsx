'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SkipForward } from 'lucide-react';
import { PomodoroSettings } from '@prisma/client';
import { Howl } from 'howler';
import { pathsToSoundEffects } from '@/lib/utils';

interface Props {
	pomodoroSettings: PomodoroSettings;
}

export const PomodoroContainer = ({
	pomodoroSettings: {
		longBreakDuration,
		longBreakInterval,
		rounds,
		shortBreakDuration,
		soundEffect,
		soundEffectVloume,
		workDuration,
	},
}: Props) => {
	const [timer, setTimer] = useState({ minutes: workDuration, seconds: 0 });
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [completedIntervals, setCompletedIntervals] = useState(1);

	const [isBreakTime, setIsBreakTime] = useState(false);
	const [currentRounds, setCurrentRounds] = useState(1);

	const handleTimer = useCallback(() => {
		setIsTimerRunning(false);

		if (isBreakTime) {
			setTimer({ minutes: workDuration, seconds: 0 });
			setIsBreakTime(false);
			setCompletedIntervals((prev) => prev + 1);
		} else {
			setIsBreakTime(true);
			if (completedIntervals === longBreakInterval) {
				setTimer({ minutes: longBreakDuration, seconds: 0 });
				setCompletedIntervals(0);
				setCurrentRounds((prev) => prev + 1);
			} else {
				setTimer({ minutes: shortBreakDuration, seconds: 0 });
			}
		}

		const currentPath = pathsToSoundEffects[soundEffect];

		const sound = new Howl({
			src: currentPath,
			html5: true,
			volume: soundEffectVloume,
		});

		sound.play();
	}, [
		isBreakTime,
		completedIntervals,
		shortBreakDuration,
		longBreakDuration,
		longBreakInterval,
		workDuration,
		soundEffectVloume,
		soundEffect,
	]);

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (isTimerRunning) {
			interval = setInterval(() => {
				if (timer.minutes === 0 && timer.seconds === 0) {
					clearInterval(interval);
					handleTimer();
				} else {
					if (timer.seconds === 0) {
						setTimer((prev) => {
							return {
								...prev,
								minutes: prev.minutes - 1,
							};
						});
						setTimer((prev) => {
							return {
								...prev,
								seconds: 59,
							};
						});
					} else {
						setTimer((prev) => {
							return {
								...prev,
								seconds: prev.seconds - 1,
							};
						});
					}
				}
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [
		isTimerRunning,
		timer,
		isBreakTime,
		completedIntervals,
		shortBreakDuration,
		longBreakDuration,
		longBreakInterval,
		workDuration,
		handleTimer,
	]);

	const formattedMinutes = useMemo(
		() => (timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes),
		[timer.minutes]
	);

	const formattedSeconds = useMemo(
		() => (timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds),
		[timer.seconds]
	);

	return (
		<Card className='mt-6 w-full sm:w-auto sm:min-w-[40rem] py-10 '>
			<CardHeader className='justify-center items-center'>
				<CardTitle className='text-7xl sm:text-9xl'>
					{formattedMinutes}:{formattedSeconds}
				</CardTitle>
				<CardDescription className='text-lg sm:text-2xl mt-6 '>
					{isBreakTime ? 'Time for a break!' : 'Time for focus!'}
				</CardDescription>
			</CardHeader>
			<CardContent className='flex justify-center items-center mt-4 gap-4'>
				<Button
					onClick={() => {
						setIsTimerRunning((prev) => !prev);
					}}
					size={'lg'}
					className='text-white text-2xl uppercase'>
					{isTimerRunning ? 'Stop' : 'Start'}
				</Button>
				{isTimerRunning && (
					<Button
						onClick={handleTimer}
						size={'icon'}
						variant={'ghost'}
						className='text-white text-2xl uppercase h-11 w-11'>
						<SkipForward />
					</Button>
				)}
			</CardContent>
		</Card>
	);
};
