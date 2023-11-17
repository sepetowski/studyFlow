import { z } from 'zod';

export const linkSchema = z.object({
	link: z.string().url('SCHEMA.LINK'),
});

export type linkSchema = z.infer<typeof linkSchema>;
