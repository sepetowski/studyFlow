import { z } from 'zod';

export const textNodeSchema = z.object({
	text: z.string().min(4, 'SCHEMA.USERNAME.SHORT'),
});

export type TextNodeSchema = z.infer<typeof textNodeSchema>;
