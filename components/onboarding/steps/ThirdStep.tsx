'use client';

import { useForm } from 'react-hook-form';
import { ImageSchema, imageSchema } from '@/schema/imageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { UploadFile } from '@/components/common/UploadFile';

export const ThirdStep = () => {
	const form = useForm<ImageSchema>({
		resolver: zodResolver(imageSchema),
	});
	console.log(form.getValues());
	const onSubmit = async (data: ImageSchema) => {
		console.log('ala');
		console.log(data);
	};
	return (
		<>
			<div className='flex flex-col  justify-center items-center gap-4 w-full my-10 text-center'>
				<h2 className='font-bold  text-4xl md:text-5xl  max-w-md'>Utwórz obszar roboczy</h2>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<UploadFile form={form} schema={imageSchema} zodKey={'image'} />
					<button type='submit'>add</button>
				</form>
			</Form>
		</>
	);
};
