import React, { useState } from 'react';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import { NutOffIcon, Plus } from 'lucide-react';
import { CommandTagItem } from './CommandTagItem';
import { CreateNewTagOrEditTag } from './CreateNewTagOrEditTag';
import { EditTag } from './EditTag';
import { Button } from '@/components/ui/button';
import { CustomColors, Tag } from '@prisma/client';

interface Props {
	tags: Tag[];
	currentActiveTags: Tag[];
	workspaceId: string;
	onSelectActiveTag: (id: string) => void;
	onUpdateActiveTags: (tagId: string, color: CustomColors, name: string) => void;
	onDeleteActiveTag: (tagId: string) => void;
}

export const CommandContainer = ({
	tags,
	currentActiveTags,
	workspaceId,
	onSelectActiveTag,
	onUpdateActiveTags,
	onDeleteActiveTag,
}: Props) => {
	const [tab, setTab] = useState<'list' | 'newTag' | 'editTag'>('list');
	const [editedTagInfo, setEditedTagInfo] = useState<null | Tag>(null);

	const onEditTagInfoHandler = (tag: Tag) => {
		setEditedTagInfo(tag);
		setTab('editTag');
	};

	const onSetTab = (tab: 'list' | 'newTag' | 'editTag') => {
		setTab(tab);
	};

	return (
		<Command className='w-[15rem]'>
			{tab === 'list' && (
				<>
					<CommandInput className='text-xs' placeholder='Filter' />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						{tags.length > 0 && (
							<>
								<CommandGroup heading='TAGS'>
									{tags.map((tag) => (
										<CommandTagItem
											key={tag.id}
											tag={tag}
											currentActiveTags={currentActiveTags}
											onSelectActiveTag={onSelectActiveTag}
											onEditTagInfo={onEditTagInfoHandler}
										/>
									))}
								</CommandGroup>
								<CommandSeparator />
							</>
						)}
						<CommandGroup heading='NEW'>
							<CommandItem className='p-0'>
								<Button
									size={'sm'}
									variant={'ghost'}
									className='w-full h-fit justify-start px-2 py-1.5 text-xs  '
									onClick={() => {
										setTab('newTag');
									}}>
									<Plus className='mr-1' size={16} />
									Add tag
								</Button>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</>
			)}
			{tab === 'newTag' && <CreateNewTagOrEditTag onSetTab={onSetTab} workspaceId={workspaceId} />}
			{tab === 'editTag' && (
				<CreateNewTagOrEditTag
					edit
					currentActiveTags={currentActiveTags}
					workspaceId={workspaceId}
					color={editedTagInfo?.color}
					id={editedTagInfo?.id}
					tagName={editedTagInfo?.name}
					onSetTab={onSetTab}
					onSelectActiveTag={onSelectActiveTag}
					onUpdateActiveTags={onUpdateActiveTags}
					onDeleteActiveTag={onDeleteActiveTag}
				/>
			)}
		</Command>
	);
};
