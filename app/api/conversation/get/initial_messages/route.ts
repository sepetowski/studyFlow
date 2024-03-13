import { MESSAGES_LIMIT } from '@/lib/constants';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const url = new URL(request.url);
	const userId = url.searchParams.get('userId');
	const chatId = url.searchParams.get('chatId');

	if (!userId || !chatId) return NextResponse.json('ERRORS.WRONG_DATA', { status: 404 });

	try {
		const messages = await db.message.findMany({
			where: {
				conversationId: chatId,
			},
			include: {
				sender: {
					select: {
						id: true,
						username: true,
						image: true,
					},
				},
				aditionalRecources: {
					select: {
						id: true,
						name: true,
						type: true,
						url: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: MESSAGES_LIMIT,
		});

		if (!messages)
			return NextResponse.json([], {
				status: 200,
			});

		return NextResponse.json(messages, {
			status: 200,
		});
	} catch (_) {
		return NextResponse.json('ERRORS.DB_ERROR', { status: 405 });
	}
};
