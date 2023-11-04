import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from './imageSchema';

const workspaceName = z
	.string()
	.min(4, 'SCHEMA.WORKSPACE.SHORT')
	.max(20, 'SCHEMA.WORKSPACE.LONG')
	.refine((username) => /^[a-zA-Z0-9 ]+$/.test(username), {
		message: 'SCHEMA.WORKSPACE.SPECIAL_CHARS',
	});

const file = z
	.any()
	.refine((file) => file?.size <= MAX_FILE_SIZE, `SCHEMA.IMAGE.MAX`)
	.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), 'SCHEMA.IMAGE.SUPPORTED')
	.optional()
	.nullable();

const color = z.enum([
	'PURPLE',
	'RED',
	'GREEN',
	'BLUE',
	'PINK',
	'YELLOW',
	'ORANGE',
	'CYAN',
	'FUCHSIA',
	'LIME',
	'EMERALD',
	'INDIGO',
]);

export const workspaceSchema = z.object({
	workspaceName,
	file,
});

export const apiWorkspaceSchema = z.object({
	workspaceName,
	file: z.string().optional().nullable(),
});

export const workspacePicture = z.object({
	file,
});

export const apiWorkspacePicture = z.object({
	picture: z.string(),
	id: z.string(),
});

export const workspaceEditData = z.object({
	workspaceName,
	color,
});

export const apiWorkspaceEditData = z.object({
	id: z.string(),
	workspaceName,
	color,
});

export const apiWorkspaceDeletePicture = z.object({
	id: z.string(),
});

export type ApiWorkspaceSchema = z.infer<typeof apiWorkspaceSchema>;
export type WorkspaceSchema = z.infer<typeof workspaceSchema>;

export type ApiWorkspacePicture = z.infer<typeof apiWorkspacePicture>;
export type WorkspacePicture = z.infer<typeof workspacePicture>;

export type WorkspaceEditData = z.infer<typeof workspaceEditData>;
export type ApiWorkspaceEditData = z.infer<typeof apiWorkspaceEditData>;

export type ApiWorkspaceDeletePicture = z.infer<typeof apiWorkspaceDeletePicture>;
