'use client';
import React, { useMemo, useRef, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Check, Trash, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { ImageSchema, imageSchema } from '@/schema/imageSchema';
import Image from 'next/image';

interface Props {
	profileImage?: string | null;
}

export const AddUserImage = ({ profileImage }: Props) => {
	const inputRef = useRef<null | HTMLInputElement>(null);
	const [imagePreview, setImagePreview] = useState('');

	const imageOptions = useMemo(() => {
		if (!imagePreview && profileImage) {
			return {
				canDelete: true,
				canSave: false,
			};
		} else if (imagePreview && profileImage) {
			return {
				canDelete: false,
				canSave: true,
			};
		} else if (imagePreview && !profileImage) {
			return {
				canDelete: false,
				canSave: true,
			};
		} else {
			return {
				canDelete: false,
				canSave: false,
			};
		}
	}, [imagePreview, profileImage]);

	const form = useForm<ImageSchema>({
		resolver: zodResolver(imageSchema),
	});

	const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('ok');
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			const result = imageSchema.safeParse({ image: selectedFile });

			if (result.success) {
				form.clearErrors('image');
				form.setValue('image', selectedFile);
				setImagePreview(URL.createObjectURL(e.target.files[0]));
			} else {
				const errors = result.error.flatten().fieldErrors.image;
				errors?.forEach((error) =>
					form.setError('image', {
						message: error,
					})
				);
			}
		}
	};

	return (
		<div className='w-full flex flex-col justify-center items-center gap-2'>
			<p className='text-sm text-muted-foreground'>Dodaj zdjęcie</p>
			<Dialog>
				<DialogTrigger asChild>
					<Button
						onClick={() => {
							setImagePreview('');
						}}
						variant={'secondary'}
						className='bg-muted w-16 md:h-20 md:w-20 h-16 rounded-full flex justify-center items-center text-muted-foreground relative overflow-hidden'>
						{profileImage ? (
							<Image
								priority
								src={profileImage}
								alt=''
								fill
								className='object-cover w-full h-full '
							/>
						) : (
							<User />
						)}
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[28rem] flex flex-col justify-center items-center p-8'>
					<DialogHeader className='items-center justify-center'>
						<DialogTitle>Prześlij zdjęcie</DialogTitle>
					</DialogHeader>
					{imagePreview ? (
						<div className='rounded-full w-52 h-52  relative overflow-hidden my-5'>
							<Image src={imagePreview} alt='' fill className='object-cover w-full h-full ' />
						</div>
					) : (
						<UserAvatar className='w-52 h-52 my-5' size={52} profileImage={profileImage} />
					)}

					<Form {...form}>
						<form>
							<FormField
								control={form.control}
								name='image'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className='flex justify-center items-center'>
												<Button
													onClick={() => {
														inputRef.current?.click();
													}}
													type='button'
													className='dark:text-white mb-1'>
													Wybierz plik
												</Button>
												<Input
													{...field}
													value={undefined}
													onChange={onImageChange}
													ref={inputRef}
													type='file'
													id='image'
													className='hidden'
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='mt-5 w-full flex justify-center items-center gap-4'>
								<Button
									type='button'
									disabled={!imageOptions.canDelete}
									variant={imageOptions.canDelete ? 'default' : 'secondary'}
									className={`rounded-full w-12 h-12 p-2  ${
										imageOptions.canDelete ? 'text-white' : 'text-muted-foreground'
									}`}>
									<Trash size={18} />
								</Button>
								<Button
									type='submit'
									disabled={!imageOptions.canSave}
									variant={imageOptions.canSave ? 'default' : 'secondary'}
									className={`rounded-full w-12 h-12 p-2 ${
										imageOptions.canSave ? 'text-white' : 'text-muted-foreground'
									} `}>
									<Check size={18} />
								</Button>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};
