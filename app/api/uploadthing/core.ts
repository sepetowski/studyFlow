import { getToken } from 'next-auth/jwt';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
	profilePictureUploader: f({ image: { maxFileSize: '4MB' } })
		.middleware(async (req) => {
			const user = await getToken(req);
			if (!user) throw new Error('Unauthorized');
			return { userId: user.id };
		})
		.onUploadComplete(async () => {}),
	pdfUploader: f({ pdf: { maxFileSize: '8MB' } })
		.middleware(async (req) => {
			const user = await getToken(req);
			if (!user) throw new Error('Unauthorized');
			return { userId: user.id };
		})
		.onUploadComplete(async () => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
