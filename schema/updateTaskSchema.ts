import { z } from 'zod';

export const updateTaskSchema = z.object({
	workspaceId: z.string(),
	taskId: z.string(),
	debouncedDate: z
		.object({
			from: z.string().nullable().optional(),
			to: z.string().nullable().optional(),
		})
		.nullable()
		.optional(),
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
