import { z } from 'zod';

export const edgeOptionsSchema = z.object({
	edgeId: z.string(),
	label: z.string(),
	type: z.enum(['customBezier', 'customStraight', 'customStepSharp', 'customStepRounded']),
	animated: z.boolean(),
});

export type EdgeOptionsSchema = z.infer<typeof edgeOptionsSchema>;
