import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { pomodoroSettingsSchema } from '@/schema/pomodoroSettingsSchema';
import { id } from 'date-fns/locale';

export async function POST(request: Request) {
	const session = await getAuthSession();

	if (!session?.user) return NextResponse.json('ERRORS.UNAUTHORIZED', { status: 400 });

	const body: unknown = await request.json();
	const result = pomodoroSettingsSchema.safeParse(body);

	if (!result.success) {
		result.error;
		return NextResponse.json('ERRORS.WRONG_DATA', { status: 401 });
	}

	const { longBreakDuration, longBreakInterval, rounds, shortBreakDuration, workDuration } =
		result.data;

	try {
		const user = await db.user.findUnique({
			where: {
				id: session.user.id,
			},
			include: {
				pomodoroSettings: {
					select: {
						userId: true,
						id: true,
					},
				},
			},
		});

		if (!user) return NextResponse.json('ERRORS.NO_USER_API', { status: 404 });

		const pomodoro = user.pomodoroSettings.find((settings) => settings.userId === user.id);

		if (!pomodoro) return NextResponse.json('ERRORS.NO_POMODORO_SETTINGS', { status: 404 });

		await db.pomodoroSettings.update({
			where: {
				id: pomodoro.id,
			},
			data: {
				longBreakDuration,
				longBreakInterval,
				rounds,
				shortBreakDuration,
				workDuration,
			},
		});

		return NextResponse.json('OK', { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json('ERRORS.DB_ERROR', { status: 405 });
	}
}
