import { z } from 'zod';

const getEmail = async () => {
	return 'email@gmail.pl';
};

export const deleteAccountSchema = z.object({
	email: z.string().email('SCHEMA.EMAIL'),
});

export type DeleteAccountSchema = z.infer<typeof deleteAccountSchema>;
