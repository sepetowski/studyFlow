import { z } from 'zod';

export const mindMapSchema = z.object({
	mindMapId: z.string(),
	workspaceId: z.string(),
	content: z.any(),
});

export type MindMapSchema = z.infer<typeof mindMapSchema>;
