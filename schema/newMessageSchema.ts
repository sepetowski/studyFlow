import { AditionalRecourceTypes } from '@prisma/client';
import { z } from 'zod';

export const newMessageSchema = z.object({
	workspaceId: z.string(),
	chatId: z.string(),
	message: z.string(),
	attachments: z.union([
		z.array(
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
		z.null(),
	]),
});

export type NewMessageSchema = z.infer<typeof newMessageSchema>;
