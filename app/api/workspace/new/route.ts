import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { apiWorkspaceSchema } from '@/schema/workspaceSchema';
import { MAX_USER_WORKSPACES } from '@/lib/options';

export async function POST(request: Request) {
	const session = await getAuthSession();

	if (!session?.user) return new Response('ERRORS.UNAUTHORIZED', { status: 400 });

	const body: unknown = await request.json();
	const result = apiWorkspaceSchema.safeParse(body);

	if (!result.success) {
		return NextResponse.json('ERRORS.WRONG_DATA', { status: 401 });
	}

	const { workspaceName, file } = result.data;

	try {
		const user = await db.user.findUnique({
			where: {
				id: session.user.id,
			},
			include: {
				createdWorkspaces: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});

		if (!user) return new NextResponse('ERRORS.NO_USER_API', { status: 404 });

		if (user.createdWorkspaces.length === MAX_USER_WORKSPACES) {
			return new NextResponse('ERRORS.TOO_MANY_WORKSPACES', { status: 402 });
		}

		const theSameWorksapceName = user.createdWorkspaces.find(
			(workspace) => workspace.name.toLowerCase() === workspaceName.toLowerCase()
		);

		if (theSameWorksapceName)
			return new NextResponse('ERRORS.SAME_NAME_WORKSPACE', { status: 403 });

		const workspace = await db.workspace.create({
			data: {
				creatorId: user.id,
				name: workspaceName,
				image: file,
			},
		});

		return NextResponse.json(workspace, { status: 200 });
	} catch (_) {
		return NextResponse.json('ERRORS.DB_ERROR', { status: 405 });
	}
}
