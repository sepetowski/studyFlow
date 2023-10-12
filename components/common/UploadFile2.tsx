'use client';
import React from 'react';
import { FormControl, FormMessage, FormItem, FormField } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { UploadCloud } from 'lucide-react';
import { z } from 'zod';
import { useUploadFile } from '@/hooks/useUploadFile';

interface Props<> {
	form: UseFormReturn;
	schema: z.ZodObject<any>;
	getImagePreview?: React.Dispatch<React.SetStateAction<string>>;

	maxFiles?: number;
	zodKey: string;
}

export function UploadFile2({ form, schema, maxFiles = 1, zodKey, getImagePreview }: Props) {
	const {
		inputRef,
		dragActive,
		files,
		handleChange,
		handleDragEnter,
		handleDragLeave,
		handleDragOver,
		handleDrop,
		removeFile,
	} = useUploadFile({ form, schema, maxFiles, zodKey, getImagePreview });

	return (
		<FormField
			control={form.control}
			name='image'
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<div
							className={cn(
								`${
									dragActive ? 'bg-primary/20' : 'bg-muted'
								}    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 p-4 sm:p-6 w-full h-min-[20rem] cursor-pointer hover:bg-muted/90 duration-200 transition-colors ring-offset-background rounded-md relative  border-muted-foreground border border-dashed text-muted-foreground flex flex-col items-center `
							)}
							onDragEnter={handleDragEnter}
							onDrop={handleDrop}
							onDragLeave={handleDragLeave}
							onDragOver={handleDragOver}
							onClick={() => {
								if (inputRef.current) inputRef?.current.click();
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && inputRef.current) {
									inputRef.current.click();
								}
							}}
							tabIndex={0}
							role='presentation'>
							<Input
								{...field}
								placeholder='fileInput'
								className='sr-only'
								tabIndex={-1}
								ref={inputRef}
								value={undefined}
								type='file'
								multiple={true}
								onChange={handleChange}
								accept='image/*'
							/>
							<UploadCloud />
							<p className='text-sm font-semibold uppercase text-primary mt-3'>Upload</p>
							<p className='text-xs'>Only .img, .jpg types</p>
						</div>
					</FormControl>
					<FormMessage />
					<div className='flex flex-col items-center p-3'>
						{files.map((file: File, i: number) => (
							<div key={i} className='flex flex-row space-x-5'>
								<span>{file.name}</span>
								<span
									className='text-red-500 cursor-pointer'
									onClick={() => removeFile(file.name, i)}>
									remove
								</span>
							</div>
						))}
					</div>
				</FormItem>
			)}
		/>
	);
}
