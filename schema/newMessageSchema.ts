import { AditionalRecourceTypes } from '@prisma/client';
import { z } from 'zod';

export const newMessageSchema = z.object({
	id: z.string(),
	edited: z.boolean(),
	content: z.string(),
	aditionalRecources: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			url: z.string(),
			type: z.union([
				z.literal(AditionalRecourceTypes.PDF),
				z.literal(AditionalRecourceTypes.IMAGE),
			]),
		})
	),
	conversationId: z.string(),
	createdAt: z.string(),
	sender: z.object({
		id: z.string(),
		image: z.string().nullable().optional(),
		username: z.string(),
	}),
	senderId: z.string(),
});

export type NewMessageSchema = z.infer<typeof newMessageSchema>;
