import React, { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

interface Props {
	form: UseFormReturn;
	schema: z.ZodObject<any>;
	getImagePreview?: React.Dispatch<React.SetStateAction<string>>;

	zodKey: string;
	maxFiles: number;
}
export function useUploadFile({ form, schema, maxFiles, zodKey, getImagePreview }: Props) {
	const [dragActive, setDragActive] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [files, setFiles] = useState<File[]>([]);

	const oneFileHandler = (file: File, zodKey: string) => {
		const result = schema.safeParse({ zodKey: file });
		if (result.success) {
			form.clearErrors(zodKey);
			form.setValue(zodKey, file);
			setFiles([file]);
			if (maxFiles === 1 && getImagePreview) getImagePreview(URL.createObjectURL(file));
		} else {
			const errors = result.error.flatten().fieldErrors.image;
			errors?.forEach((error) =>
				form.setError(zodKey, {
					message: error,
				})
			);
		}
	};

	const multipleFilesHandler = (files: FileList) => {
		const filesArray: File[] = [];
		const length = files.length >= maxFiles ? maxFiles : files.length;

		for (let i = 0; i < length; i++) {
			const file = files.item(i);
			if (file) filesArray.push(file);
		}

		filesArray.forEach((file, i) => oneFileHandler(file, `${zodKey}_${i + 1}`));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files[0]) {
			if (files.length === 1 || maxFiles === 1) oneFileHandler(files[0], zodKey);
			else {
				multipleFilesHandler(files);
			}
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		const files = e.dataTransfer.files;
		if (files && files[0]) {
			if (files.length === 1 || maxFiles === 1) oneFileHandler(files[0], zodKey);
			else {
				multipleFilesHandler(files);
			}
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

	const removeFile = (fileName: string, idx: number) => {
		const newArr = [...files];
		newArr.splice(idx, 1);
		setFiles([]);
		setFiles(newArr);
	};

	return {
		dragActive,
		inputRef,
		files,
		handleChange,
		handleDragEnter,
		handleDragLeave,
		removeFile,
		handleDrop,
		handleDragOver,
	};
}
