import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';

export async function POST(request: Request) {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 400, statusText: 'Unauthorized User' });

	try {
		const user = await db.user.findUnique({
			where: {
				id: session.user.id,
			},
		});

		if (!user)
			return new NextResponse('User not Found', { status: 404, statusText: 'User not Found' });

		const upadtedUser = await db.user.update({
			where: {
				id: session.user.id,
			},
			data: {
				image: null,
			},
		});

		return NextResponse.json(upadtedUser, { status: 200 });
	} catch (_) {
		return NextResponse.json('ERRORS.DB_ERROR', { status: 405 });
	}
}
