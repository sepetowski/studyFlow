import { z } from 'zod';

export const taskSchema = z.object({
	icon: z.string(),
	title: z.string().optional(),
	date: z.any(),
	content: z.any(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
