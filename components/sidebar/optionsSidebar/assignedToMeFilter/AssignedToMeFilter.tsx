'use client';
import { Workspace } from '@prisma/client';
import React, { useMemo } from 'react';
import { AssignedToMeWorkspace } from './AssignedToMeWorkspace';
import ActiveLink from '@/components/ui/active-link';
import { useRouter } from 'next-intl/client';
import { useSearchParams } from 'next/navigation';
import { LayoutGrid } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props {
	userWorkspaces: Workspace[];
}

const RADIO_OPTIONS = [
	{
		id: 'all',
		label: 'Wszytskie',
	},
	{
		id: 'tasks',
		label: 'Zadania',
	},
	{
		id: 'mind-maps',
		label: 'Mapy myśli',
	},
] as const;

export const AssignedToMeFilter = ({ userWorkspaces }: Props) => {
	const searchParams = useSearchParams();

	const typeParams = searchParams.get('type');
	const workspaceFilterParam = searchParams.get('workspace');

	const router = useRouter();
	const currentType = useMemo(
		() =>
			typeParams && (typeParams === 'all' || typeParams === 'mind-maps' || typeParams === 'tasks')
				? typeParams
				: 'all',
		[typeParams]
	);

	const handleRadioChange = (value: 'all' | 'tasks' | 'mind-maps') => {
		let link = '/dashboard/assigned-to-me';

		workspaceFilterParam
			? (link = `/dashboard/assigned-to-me?workspace=${workspaceFilterParam}&type=${value}`)
			: (link = `/dashboard/assigned-to-me?workspace=all&type=${value}`);

		router.replace(link);
	};

	return (
		<div className='flex flex-col gap-6 w-full'>
			<div>
				<p className='text-xs sm:text-sm uppercase text-muted-foreground '>Typ</p>
				<div className='flex flex-col gap-2 w-full mt-2   '>
					<RadioGroup
						value={currentType}
						onValueChange={handleRadioChange}
						defaultValue={currentType}>
						{RADIO_OPTIONS.map((radio) => (
							<div
								key={radio.id}
								className='flex items-center space-x-2 h-9 rounded-md px-3 transition-colors duration-200 hover:bg-accent hover:text-accent-foreground cursor-pointer'
								onClick={(e) => {
									const button = e.currentTarget?.firstChild as HTMLButtonElement;
									const id = button.id as 'all' | 'mind-maps' | 'tasks' | null;
									id && handleRadioChange(id);
								}}>
								<RadioGroupItem className='scale-75 md:scale-90 ' value={radio.id} id={radio.id} />
								<Label className='cursor-pointer' htmlFor={radio.id}>
									{radio.label}
								</Label>
							</div>
						))}
					</RadioGroup>
				</div>
			</div>

			<div>
				<p className='text-xs sm:text-sm uppercase text-muted-foreground '>Obszar roboczy</p>
				<div className='flex flex-col gap-2 w-full mt-2 '>
					<ActiveLink
						disableActiveStateColor
						variant={'ghost'}
						size={'sm'}
						href={`/dashboard/assigned-to-me?workspace=all&type=${currentType}`}
						className={`w-full flex justify-start items-center gap-2 overflow-hidden  ${
							!workspaceFilterParam || workspaceFilterParam === 'all'
								? 'bg-secondary font-semibold'
								: ''
						}`}>
						<div
							className={`rounded-md bg-primary text-white font-bold h-7 w-7  flex justify-center items-center`}>
							<LayoutGrid size={18} />
						</div>
						<p>Wszystkie</p>
					</ActiveLink>

					{userWorkspaces.map((workspace) => (
						<AssignedToMeWorkspace
							currentType={currentType}
							workspaceFilterParam={workspaceFilterParam}
							key={workspace.id}
							href='/dashboard/assigned-to-me'
							workspace={workspace}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
