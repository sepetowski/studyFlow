'use client';
import React, { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { Clear } from './Clear';
import { useUserActivityStatus } from '@/context/UserActivityStatus';
import { FilterUser } from '@/types/extended';
import { ActiveFilteredUser } from './activeFilteredUsersAndTags/ActiveFilteredUser';
import { on } from 'events';
import { useQuery } from '@tanstack/react-query';
import { Tag } from '@prisma/client';
import { ActiveFilteredTag } from './activeFilteredUsersAndTags/ActiveFilteredTag';

interface Props {
	sessionUserId: string;
	workspaceId: string;
}

export const FilterContainer = ({ sessionUserId, workspaceId }: Props) => {
	const [currentFilterdAsssigedToUsers, setCurrentFilterdAsssigedToUsers] = useState<FilterUser[]>(
		[]
	);
	const [currentFilterdTags, setCurrentFilterdTags] = useState<Tag[]>([]);

	const [isLoding, setIsLoding] = useState(true);
	const [isError, setIsError] = useState(true);

	const { allUsers, isLoading: isUsersLoding, isError: isUsersError } = useUserActivityStatus();

	const {
		data: tags,
		isLoading: isTagsLoding,
		isError: isTagsError,
	} = useQuery({
		queryFn: async () => {
			const res = await fetch(`/api/tags/get/get_workspace_tags?workspaceId=${workspaceId}`);

			if (!res.ok) throw new Error();

			const data = await res.json();
			return data as Tag[];
		},
		queryKey: ['getWorkspaceFilterTags'],
	});

	useEffect(() => {
		if (isTagsError || isUsersError) setIsError(true);
		else setIsError(false);
	}, [isUsersError, isTagsError]);

	useEffect(() => {
		if (isUsersLoding || isTagsLoding) setIsLoding(true);
		else setIsLoding(false);
	}, [isUsersLoding, isTagsLoding]);

	const onChangeAssigedUserToFilterHandler = (userId: string) => {
		const isAlreadyFiltered = currentFilterdAsssigedToUsers.some(
			(currentUser) => currentUser.id === userId
		);

		if (isAlreadyFiltered) {
			setCurrentFilterdAsssigedToUsers((prevUsers) => {
				return prevUsers.filter((user) => user.id !== userId);
			});
		} else {
			const userToAdd = allUsers.find((user) => user.id === userId);
			if (userToAdd) {
				setCurrentFilterdAsssigedToUsers((prevUsers) => {
					return [
						...prevUsers,
						{
							id: userToAdd.id,
							image: userToAdd.image,
							username: userToAdd.username,
						},
					];
				});
			}
		}
	};

	const onChangeFilterTagsHandler = (tagId: string) => {
		if (!tags) return;

		const isAlreadyFiltered = currentFilterdTags.some((tag) => tag.id === tagId);

		if (isAlreadyFiltered) {
			setCurrentFilterdTags((prevTags) => {
				return prevTags.filter((tag) => tag.id !== tagId);
			});
		} else {
			const tagToAdd = tags.find((tag) => tag.id === tagId);
			if (tagToAdd) {
				setCurrentFilterdTags((prevTags) => {
					return [...prevTags, tagToAdd];
				});
			}
		}
	};
	const onClearUserHandler = (userId: string) => {
		setCurrentFilterdAsssigedToUsers((prevUsers) => {
			return prevUsers.filter((user) => user.id !== userId);
		});
	};

	const onClearTagHandler = (tagId: string) => {
		setCurrentFilterdTags((prevTags) => {
			return prevTags.filter((tag) => tag.id !== tagId);
		});
	};

	const onClearAllHandler = () => {
		setCurrentFilterdAsssigedToUsers([]);
		setCurrentFilterdTags([]);
	};

	return (
		<div className='flex w-full items-center flex-wrap pb-4 gap-2'>
			<Filter
				sessionUserId={sessionUserId}
				tags={tags}
				currentFilterdAsssigedToUsers={currentFilterdAsssigedToUsers}
				currentFilterdTags={currentFilterdTags}
				isError={isError}
				isLoding={isLoding}
				onChangeAssigedUserToFilter={onChangeAssigedUserToFilterHandler}
				onChangeFilterTags={onChangeFilterTagsHandler}
			/>
			{currentFilterdAsssigedToUsers.length > 0 &&
				currentFilterdAsssigedToUsers.map((user) => (
					<ActiveFilteredUser
						key={user.id}
						id={user.id}
						image={user.image}
						username={user.username}
						onClearUser={onClearUserHandler}
					/>
				))}
			{currentFilterdTags.length > 0 &&
				currentFilterdTags.map((tag) => (
					<ActiveFilteredTag tag={tag} onClearTag={onClearTagHandler} key={tag.id} />
				))}
			{(currentFilterdAsssigedToUsers.length > 0 || currentFilterdTags.length > 0) && (
				<Clear onClearAll={onClearAllHandler} />
			)}
		</div>
	);
};
