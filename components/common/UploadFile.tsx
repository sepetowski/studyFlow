'use client';

import React from 'react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { UploadDropzone } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';
import { UseMutateFunction } from '@tanstack/react-query';
import { UploadthingComponentProps } from '@uploadthing/react';
import { UploadFileResponse } from 'uploadthing/client';
import { LoadingState } from '../ui/loading-state';
import { useTranslations } from 'next-intl';

type UploadInterface<T, L, K> = {
	containerStyles?: string;
	buttonStyles?: string;
	uploadIconStyles?: string;
	labelStyles?: string;
	allowedContentStyles?: string;
	label: string;
	allowedContent: string;
	button: string;

	onSuccess?: UseMutateFunction<T, L | unknown, UploadFileResponse[] | undefined, K | unknown>;
};

type Props<T, L, K> = UploadInterface<T, L, K> & UploadthingComponentProps<OurFileRouter>;

export function UploadFile<T, L, K>({
	endpoint,
	containerStyles,
	buttonStyles,
	uploadIconStyles,
	labelStyles,
	allowedContentStyles,
	label,
	allowedContent,
	button,
	onSuccess,
}: Props<T, L, K>) {
	const t = useTranslations('UPLOAD');

	const containerStyle = cn(
		'bg-muted border-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 p-4 sm:p-6 w-72 h-52 cursor-pointer hover:bg-muted/90 duration-200 transition-colors',
		containerStyles
	);
	const buttonStyle = cn(
		'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 duration-200 bg-primary text-white hover:bg-primary/90',
		buttonStyles
	);
	const uploadIconStyle = cn('text-muted-foreground', uploadIconStyles);
	const labelStyle = cn(
		'text-primary font-semibold hover:text-primary/90 transition-colors duration-200',
		labelStyles
	);
	const allowedContentStyle = cn('text-muted-foreground', allowedContentStyles);
	return (
		<UploadDropzone
			appearance={{
				container({ isDragActive, isUploading, uploadProgress }) {
					return cn(
						containerStyle,
						isDragActive && 'bg-primary/20 border-primary',
						(isUploading || uploadProgress) && 'pointer-events-none'
					);
				},
				uploadIcon: uploadIconStyle,
				label: labelStyle,
				button({ isUploading, uploadProgress }) {
					return cn(
						buttonStyle,
						(isUploading || uploadProgress) && 'bg-primary pointer-events-none after:bg-green-400'
					);
				},
				allowedContent: allowedContentStyle,
			}}
			endpoint={endpoint}
			content={{
				allowedContent: t(allowedContent),
				label: t(label),
				button({ isUploading, uploadProgress, fileTypes }) {
					if (uploadProgress || isUploading) return <LoadingState className='z-20 relative' />;

					return (
						<>
							{fileTypes.length === 1 ? (
								<span>{button}</span>
							) : (
								<span>
									{t('')} {fileTypes.length} {t('')}
								</span>
							)}
						</>
					);
				},
			}}
			onClientUploadComplete={(res) => {
				// onSuccess(res);
				console.log(res);
			}}
			onUploadError={(error: Error) => {
				// Do something with the error.
			}}
		/>
	);
}
