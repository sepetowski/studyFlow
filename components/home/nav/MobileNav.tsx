import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { AppLogo } from '@/components/ui/app-logo';
import Link from 'next-intl/link';
import { LocaleSwitcher } from '@/components/switchers/LocaleSwitcher';
import { ThemeSwitcher } from '@/components/switchers/ThemeSwitcher';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export const MobileNav = () => {
	return (
		<div className='md:hidden py-2 px-2 w-full flex items-center justify-between'>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='ghost' size={'icon'}>
						<Menu />
					</Button>
				</SheetTrigger>
				<SheetContent side={'left'} className='h-full flex flex-col justify-between '>
					<SheetHeader>
						<SheetTitle asChild>
							<Link href={'/'}>
								<div className='flex items-center gap-2 '>
									<AppLogo className='w-10 h-10' />
									<p className='text-2xl font-semibold'>
										Study<span className='text-primary'>Flow</span>
									</p>
								</div>
							</Link>
						</SheetTitle>
					</SheetHeader>

					<ScrollArea className='my-4 flex-grow'>
						<div className='h-full'>
							<p>lorem</p>
							<p>lorem</p>
							<p>lorem</p>
							<p>lorem</p>
							<p>lorem</p>
							<p>lorem</p>
						</div>
					</ScrollArea>
					<div className='w-full flex flex-col gap-2'>
						<Link href={'/'} className={`${buttonVariants({ variant: 'default' })}`}>
							Sign up for free
						</Link>
						<Link href={'/'} className={`${buttonVariants({ variant: 'outline' })}`}>
							Log in
						</Link>
					</div>
				</SheetContent>
			</Sheet>

			<div className=' flex items-center gap-2'>
				<LocaleSwitcher alignHover='end' alignDropdown='end' size={'icon'} variant={'outline'} />
				<ThemeSwitcher alignHover='end' alignDropdown='end' size={'icon'} variant={'outline'} />
			</div>
		</div>
	);
};
