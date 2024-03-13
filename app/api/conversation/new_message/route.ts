import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { newMessageSchema } from '@/schema/newMessageSchema';

export async function POST(request: Request) {
	const session = await getAuthSession();

	if (!session?.user) return NextResponse.json('ERRORS.UNAUTHORIZED', { status: 400 });

	const body: unknown = await request.json();
	const result = newMessageSchema.safeParse(body);

	if (!result.success) {
		return NextResponse.json('ERRORS.WRONG_DATA', { status: 401 });
	}

	const { workspaceId, attachments, chatId, message } = result.data;

	if (message.length === 0 && !attachments)
		return NextResponse.json('ERRORS.WRONG_DATA', { status: 401 });

	try {
		const chat = await db.conversation.findUnique({
			where: { id: chatId, workspaceId },
		});
		if (!chat) return NextResponse.json('ERRORS.NO_CHAT', { status: 200 });

		const newMessage = await db.message.create({
			data: {
				senderId: session.user.id,
				content: message,
				conversationId: chat.id,
			},
		});
		if (attachments) {
			for (const attachment of attachments) {
				await db.aditionalRecource.create({
					data: {
						messageId: newMessage.id,
						name: attachment.name,
						url: attachment.url,
						type: attachment.type,
					},
				});
			}
		}
		return NextResponse.json('ok', { status: 200 });
	} catch (_) {
		return NextResponse.json('ERRORS.DB_ERROR', { status: 405 });
	}
}
