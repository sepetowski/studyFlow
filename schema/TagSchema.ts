import { z } from 'zod';
import { color } from '@/lib/utils';

const id = z.string();
const tagName = z
	.string()
	.min(2, 'SCHEMA.WORKSPACE.SHORT')
	.max(20, 'SCHEMA.WORKSPACE.LONG')
	.refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
		message: 'SCHEMA.WORKSPACE.SPECIAL_CHARS',
	});

export const tagSchema = z.object({
	id,
	tagName,
	color,
});

export const apiTagSchema = z.object({
	id,
	workspaceId: id,
	tagName,
	color,
});

export const apiDeleteTagSchema = z.object({
	id,
	workspaceId: id,
});

export type TagSchema = z.infer<typeof tagSchema>;
export type ApiTagSchema = z.infer<typeof apiTagSchema>;
export type ApiDeleteTagSchema = z.infer<typeof apiDeleteTagSchema>;
