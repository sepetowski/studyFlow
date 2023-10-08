import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export const SummarySection = () => {
	return (
		<section className=' hidden lg:w-1/2 bg-primary lg:flex justify-center items-center'>
			<Card >
				<CardHeader>
					<CardTitle>Card Title</CardTitle>
					<CardDescription>Card Description</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Card Content</p>
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
		</section>
	);
};
