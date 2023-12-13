import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';

import { z } from 'zod';

export async function POST(request: Request) {
	const session = await getAuthSession();

	if (!session?.user) return NextResponse.json('ERRORS.UNAUTHORIZED', { status: 400 });

	const newTaskSchema = z.object({
		workspaceId: z.string(),
	});

	const body: unknown = await request.json();
	const result = newTaskSchema.safeParse(body);

	if (!result.success) {
		return NextResponse.json('ERRORS.WRONG_DATA', { status: 401 });
	}

	const { workspaceId } = result.data;

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

		if (
			user.subscriptions[0].userRole === 'CAN_EDIT' ||
			user.subscriptions[0].userRole === 'READ_ONLY'
		)
			return NextResponse.json('ERRORS.NO_PERMISSION', { status: 403 });

		const date = await db.date.create({
			data: {
				from: undefined,
				to: undefined,
			},
		});

		const task = await db.task.create({
			data: {
				title: '',
				creatorId: user.id,
				workspaceId,
				dateId: date.id,
			},
		});

		return NextResponse.json(task, { status: 200 });
	} catch (_) {
		return NextResponse.json('ERRORS.DB_ERROR', { status: 405 });
	}
}
