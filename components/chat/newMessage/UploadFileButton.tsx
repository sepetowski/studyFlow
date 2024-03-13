'use client';
import React from 'react';
import { UploadButton } from '@/lib/uploadthing';
import { LoadingState } from '@/components/ui/loading-state';
import { Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { AditionalResource } from '@/types/extended';
import { AditionalRecourceTypes } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

interface Props {
	onChangeUploadedFiles: (files: AditionalResource[] | null) => void;
}

export const UploadFilesButton = ({ onChangeUploadedFiles }: Props) => {
	const { toast } = useToast();
	return (
		<UploadButton
			appearance={{
				button({ isUploading }) {
					return `w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-secondary-foreground bg-transparent hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 duration-200 focus-within:ring-primary dark:focus-within:ring-primary/60 ${
						isUploading ? 'custom-button-uploading' : ''
					}`;
				},
				container: '',
				allowedContent: 'hidden',
			}}
			endpoint='addToChatFile'
			content={{
				button({ ready, isUploading }) {
					if (isUploading || !ready) return <LoadingState />;
					else return <Upload className='w-5 h-5 sm:w-auto sm:h-auto' />;
				},
				allowedContent: null,
			}}
			onClientUploadComplete={(results) => {
				const files: AditionalResource[] | null = results
					? results.map((result) => {
							return {
								id: uuidv4(),
								name: result.name,
								type: result.name.endsWith('.pdf')
									? AditionalRecourceTypes.PDF
									: AditionalRecourceTypes.IMAGE,
								url: result.url,
							};
					  })
					: null;

				onChangeUploadedFiles(files);
			}}
			onUploadError={(error: Error) => {
				console.log(error);
				toast({
					title: 'Error',
					variant: 'destructive',
				});
			}}
		/>
	);
};
