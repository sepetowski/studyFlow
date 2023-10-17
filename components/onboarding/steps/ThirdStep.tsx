'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormField,
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { WorkspaceSchema, workspaceSchema } from '@/schema/workspaceSchema';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { UploadFile } from '@/components/common/UploadFile';
import { useUploadThing } from '@/lib/uploadthing';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/ui/use-toast';
import { LoadingState } from '@/components/ui/loading-state';
import { useOnboardingForm } from '@/context/OnboardingForm';
import { ActionType } from '@/types/onBoardingContext';

export const ThirdStep = () => {
	const { currentStep, dispatch } = useOnboardingForm();
	const m = useTranslations('MESSAGES');
	const { toast } = useToast();

	const form = useForm<WorkspaceSchema>({
		resolver: zodResolver(workspaceSchema),
		defaultValues: {
			name: '',
		},
	});

	const { startUpload, isUploading } = useUploadThing('imageUploader', {
		onUploadError: () => {
			toast({
				title: m('ERRORS.UPLOAD_FAILE'),
				variant: 'destructive',
			});
		},
		onClientUploadComplete: (data) => {
			if (data) {
				dispatch({ type: ActionType.WORKSPACE_IMAGE, payload: data[0].url });
			} else
				toast({
					title: m('ERRORS.IMAGE_PROFILE_UPDATE'),
					variant: 'destructive',
				});
		},
	});

	const onSubmit = async (data: WorkspaceSchema) => {
		const image: File | undefined | null = data.file;
		if (image) await startUpload([image]);

		dispatch({ type: ActionType.WORKSPACE_NAME, payload: data.name });
		dispatch({ type: ActionType.CHNAGE_SITE, payload: currentStep + 1 });
	};

	return (
		<>
			<div className='flex flex-col  justify-center items-center gap-4 w-full my-10 text-center'>
				<h2 className='font-bold  text-4xl md:text-5xl  max-w-md'>Utwórz obszar roboczy</h2>
			</div>

			<Form {...form}>
				<form className='max-w-md w-full space-y-8 mt-12 ' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='space-y-1.5'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-muted-foreground'>Nazwa obszaru roboczego</FormLabel>
									<FormControl>
										<Input className='bg-muted' placeholder='np. My space' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<UploadFile
						ContainerClassName='w-full'
						LabelClassName='text-muted-foreground mb-1.5 self-start'
						LabelText='Ikona obszaru roboczego'
						form={form}
						schema={workspaceSchema}
						inputAccept='image/*'
						typesDescription={['.jpeg', '.jpg', '.png', '.webp', '.gif']}
					/>
					<Button
						disabled={isUploading}
						type='submit'
						className='mt-10 w-full max-w-md dark:text-white font-semibold '>
						{/* {t('NEXT_BTN')} */}

						{isUploading ? (
							<LoadingState />
						) : (
							<>
								KONTURNUJ
								<ArrowRight className='ml-2' width={18} height={18} />
							</>
						)}
					</Button>
				</form>
			</Form>
		</>
	);
};
