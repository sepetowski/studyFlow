import { z } from 'zod';

export const mindMapSchema = z.object({
	mindMapId: z.string(),
	workspaceId: z.string(),
	content: z.any(),
});

export const updateMindMaPActiveTagsSchema = z.object({
	workspaceId: z.string(),
	mindMapId: z.string(),
	tagsIds: z.array(z.string()),
});

export type MindMapSchema = z.infer<typeof mindMapSchema>;
export type UpdateMindMaPActiveTagsSchema = z.infer<typeof updateMindMaPActiveTagsSchema>;
