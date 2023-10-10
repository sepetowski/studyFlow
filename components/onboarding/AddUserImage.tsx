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
import { Input } from '@/components/ui/input';
import { ImageSchema, imageSchema } from '@/schema/imageSchema';
import Image from 'next/image';
import { useUploadThing } from '@/lib/uploadthing';
import { LoadingState } from '../ui/loading-state';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next-intl/client';
import { User as UserType } from '@prisma/client';

interface Props {
	profileImage?: string | null;
}

export const AddUserImage = ({ profileImage }: Props) => {
	const [open, setOpen] = useState(false);
	const inputRef = useRef<null | HTMLInputElement>(null);
	const [imagePreview, setImagePreview] = useState('');
	const router = useRouter();
	const { update } = useSession();
	const { startUpload, isUploading } = useUploadThing('profilePictureUploader', {
		onUploadError: (error) => {
			alert(error);
		},
	});
	const { mutate: updateProfileImage, isLoading } = useMutation({
		mutationFn: async (profileImage: string) => {
			console.log(profileImage);
			const { data } = await axios.post('/api/profile/profileImage', { profileImage });
			console.log(data);
			return data as UserType;
		},
		onError: (err) => {
			console.log(err);
		},
		onSuccess: async () => {
			setOpen(false);
			await update();
			router.refresh();
		},
	});

	const form = useForm<ImageSchema>({
		resolver: zodResolver(imageSchema),
	});

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

	const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

	const onSubmit = async (data: ImageSchema) => {
		const image: File = data.image;
		try {
			const res = await startUpload([image]);
			if (!res) throw new Error('sda');

			updateProfileImage(res[0].url);
		} catch (err) {}
	};

	return (
		<div className='w-full flex flex-col justify-center items-center gap-2'>
			<p className='text-sm text-muted-foreground'>Dodaj zdjęcie</p>
			<Dialog open={open} onOpenChange={setOpen}>
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
						<form onSubmit={form.handleSubmit(onSubmit)}>
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
									disabled={!imageOptions.canSave || isUploading || isLoading}
									variant={imageOptions.canSave ? 'default' : 'secondary'}
									className={`rounded-full w-12 h-12 p-2 ${
										imageOptions.canSave ? 'text-white' : 'text-muted-foreground'
									} `}>
									{isUploading || isLoading ? <LoadingState /> : <Check size={18} />}
								</Button>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};
