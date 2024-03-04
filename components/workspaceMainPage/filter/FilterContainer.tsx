'use client';
import React, { useState } from 'react';
import { Filter } from './Filter';
import { Clear } from './Clear';
import { useUserActivityStatus } from '@/context/UserActivityStatus';
import { FilterUser } from '@/types/extended';
import { ActiveFilteredUser } from './activeFilteredUsersAndTags/ActiveFilteredUser';
import { on } from 'events';

interface Props {
	sessionUserId: string;
}

export const FilterContainer = ({ sessionUserId }: Props) => {
	const { allUsers } = useUserActivityStatus();
	const [currentFilterdAsssigedToUsers, setCurrentFilterdAsssigedToUsers] = useState<FilterUser[]>(
		[]
	);
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

	const onClearUserHandler = (userId: string) => {
		setCurrentFilterdAsssigedToUsers((prevUsers) => {
			return prevUsers.filter((user) => user.id !== userId);
		});
	};

	const onClearAllHandler = () => {
		setCurrentFilterdAsssigedToUsers([]);
	};

	return (
		<div className='flex w-full items-center flex-wrap pb-4 gap-2'>
			<Filter
				sessionUserId={sessionUserId}
				currentFilterdAsssigedToUsers={currentFilterdAsssigedToUsers}
				onChangeAssigedUserToFilter={onChangeAssigedUserToFilterHandler}
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
			{currentFilterdAsssigedToUsers.length > 0 && <Clear onClearAll={onClearAllHandler} />}
		</div>
	);
};
