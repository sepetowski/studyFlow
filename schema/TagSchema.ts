import { z } from 'zod';
import { color } from '@/lib/utils';

export const tagSchema = z.object({
	id: z.string(),
	tagName: z
		.string()
		.min(2, 'SCHEMA.WORKSPACE.SHORT')
		.max(20, 'SCHEMA.WORKSPACE.LONG')
		.refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
			message: 'SCHEMA.WORKSPACE.SPECIAL_CHARS',
		}),
	color,
});

export type TagSchema = z.infer<typeof tagSchema>;
