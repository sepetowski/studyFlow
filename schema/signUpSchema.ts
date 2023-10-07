import { z } from 'zod';

export const signUpSchema = z.object({
	email: z.string().email('SCHEMA.EMAIL'),
	password: z
		.string()
		.refine((password) => password.length >= 6, {
			message: 'SCHEMA.PASSWORD.MIN',
		})
		.refine((password) => /[A-Z]/.test(password), {
			message: 'SCHEMA.PASSWORD.UPPERCASE',
		})
		.refine((password) => /[a-z]/.test(password), {
			message: 'SCHEMA.PASSWORD.LOWERCASE',
		})
		.refine((password) => /\d/.test(password), {
			message: 'SCHEMA.PASSWORD.DIGIT',
		}),
	username: z
		.string()
		.min(2, 'SCHEMA.USERNAME.SHORT')
		.refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
			message: 'SCHEMA.USERNAME.SPECIAL_CHARS',
		}),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
