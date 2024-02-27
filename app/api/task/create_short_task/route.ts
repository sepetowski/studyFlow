import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';

import { z } from 'zod';
import { shortTaskSchema } from '@/schema/shortTaskSchema';
import { DateRange } from 'react-day-picker';

export async function POST(request: Request) {
	const session = await getAuthSession();

	if (!session?.user) return NextResponse.json('ERRORS.UNAUTHORIZED', { status: 400 });

	const body: unknown = await request.json();
	const result = shortTaskSchema.safeParse(body);

	if (!result.success) {
		return NextResponse.json('ERRORS.WRONG_DATA', { status: 401 });
	}

	const { workspaceId, icon, title, date: calendarDate } = result.data;

	try {
		const user = await db.user.findUnique({
			where: {
				id: session.user.id,
			},
			include: {
				subscriptions: {
					where: {
						workspaceId: workspaceId,
					},
					select: {
						userRole: true,
					},
				},
			},
		});

		if (!user) return NextResponse.json('ERRORS.NO_USER_API', { status: 404 });

		if (user.subscriptions[0].userRole === 'READ_ONLY')
			return NextResponse.json('ERRORS.NO_PERMISSION', { status: 403 });

		const date = await db.taskDate.create({
			data: {
				from: calendarDate?.from ? calendarDate.from : undefined,
				to: calendarDate?.to ? calendarDate.to : undefined,
			},
		});

		const task = await db.task.create({
			data: {
				title,
				creatorId: user.id,
				workspaceId,
				dateId: date.id,
				emoji: icon,
			},
		});

		await db.task.update({
			where: {
				id: task.id,
			},
			data: {
				updatedUserId: session.user.id,
			},
		});

		return NextResponse.json(task, { status: 200 });
	} catch (_) {
		return NextResponse.json('ERRORS.DB_ERROR', { status: 405 });
	}
}