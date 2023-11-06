import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { apiWorkspaceDelete } from '@/schema/workspaceSchema';

export async function POST(request: Request) {
	const session = await getAuthSession();

	if (!session?.user) return NextResponse.json('ERRORS.UNAUTHORIZED', { status: 400 });

	const body: unknown = await request.json();

	const result = apiWorkspaceDelete.safeParse(body);

	if (!result.success) {
		return NextResponse.json('ERRORS.WRONG_DATA', { status: 401 });
	}
	const { id, workspaceName } = result.data;

	try {
		const user = await db.user.findUnique({
			where: {
				id: session.user.id,
			},
		});

		if (!user) return NextResponse.json('ERRORS.NO_USER_API', { status: 404 });

		const workspace = await db.workspace.findUnique({
			where: {
				id,
			},
		});

		if (!workspace) return NextResponse.json('ERRORS.NO_WORKSPACE', { status: 404 });

		if (workspace.name !== workspaceName)
			return NextResponse.json('ERRORS.WRONG_WORKSPACE_NAME', { status: 403 });

		await db.workspace.delete({
			where: {
				id,
			},
		});

		return NextResponse.json('OK', { status: 200 });
	} catch (_) {
		return NextResponse.json('ERRORS.DB_ERROR', { status: 405 });
	}
}
