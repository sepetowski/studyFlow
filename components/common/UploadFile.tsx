'use client';
import React, { useRef, useState } from 'react';
import { FormControl, FormMessage, FormItem, FormField } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { UploadCloud, Trash2 } from 'lucide-react';
import { z } from 'zod';
import { Button } from '../ui/button';

interface Props<> {
	form: UseFormReturn;
	schema: z.ZodObject<any>;
	getImagePreview?: React.Dispatch<React.SetStateAction<string>>;

	maxFiles?: number;
	zodKey: string;
}

export function UploadFile({ form, schema, zodKey, getImagePreview }: Props) {
	const [dragActive, setDragActive] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [file, setFile] = useState<File | null>(null);

	const oneFileHandler = (file: File) => {
		const result = schema.safeParse({ image: file });

		if (result.success) {
			form.clearErrors(zodKey);
			form.setValue(zodKey, file);
			setFile(file);
			if (getImagePreview) getImagePreview(URL.createObjectURL(file));
		} else {
			const errors = result.error.flatten().fieldErrors.image;
			errors?.forEach((error) =>
				form.setError(zodKey, {
					message: error,
				})
			);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;

		if (files && files[0]) {
			oneFileHandler(files[0]);
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		const files = e.dataTransfer.files;
		if (files && files[0]) {
			oneFileHandler(files[0]);
		}
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
	};
	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);
	};

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);
	};

	const removeFile = () => {
		setFile(null);
		form.setValue(zodKey, null);
	};

	return (
		<FormField
			control={form.control}
			name='image'
			render={({ field }) => (
				<FormItem className='flex flex-col justify-center items-center'>
					<FormControl>
						<div
							className={cn(
								`${
									dragActive ? 'bg-primary/20' : 'bg-muted'
								}    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 p-4 sm:p-6 h-min-0 h-40 cursor-pointer hover:bg-muted/90 duration-200 transition-colors ring-offset-background rounded-md relative  border-muted-foreground border border-dashed text-muted-foreground flex flex-col  items-center w-[15rem] justify-center`
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
								value={undefined}
								ref={inputRef}
								type='file'
								multiple={true}
								onChange={handleChange}
								accept='image/*'
							/>
							<UploadCloud size={30} />
							<p className='text-sm font-semibold uppercase text-primary mt-5'>Upload</p>
							<p className='text-xs mt-1'>Only .img, .jpg types</p>
						</div>
					</FormControl>
					<FormMessage />
					{file && (
						<div className='flex items-center flex-row space-x-5 text-sm mt-4 '>
							<p>{file.name}</p>
							<Button
								className='h-8 w-8 text-destructive hover:text-destructive'
								variant='ghost'
								size='icon'
								onClick={() => removeFile()}>
								<Trash2 size={18} />
							</Button>
						</div>
					)}
				</FormItem>
			)}
		/>
	);
}
