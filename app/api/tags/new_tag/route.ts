import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import bcrypt from 'bcrypt';
import { apiTagSchema } from '@/schema/tagSchema';

export async function POST(request: Request) {
	const session = await getAuthSession();

	if (!session?.user) return NextResponse.json('ERRORS.UNAUTHORIZED', { status: 400 });

	const body: unknown = await request.json();
	const result = apiTagSchema.safeParse(body);

	if (!result.success) {
		return NextResponse.json('ERRORS.WRONG_DATA', { status: 401 });
	}

	const { id, color, tagName, workspaceId } = result.data;

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

		const workspace = await db.workspace.findUnique({
			where: {
				id: workspaceId,
			},
		});

		if (!workspace) return NextResponse.json('ERRORS.NO_WORKSPACE', { status: 404 });

		const newTag = await db.tag.create({
			data: {
				color,
				name: tagName,
				id,
				workspaceId,
			},
		});

		return NextResponse.json(newTag, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json('ERRORS.DB_ERROR', { status: 405 });
	}
}
