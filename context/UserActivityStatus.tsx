'use client';

import React, { useContext, useEffect, useState } from 'react';
import { UserPermisson } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createContext } from 'react';
import { UserActiveItemList } from '@/types/extended';
import { useParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useTranslations } from 'next-intl';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';

interface Props {
	children: React.ReactNode;
}

interface UserActivityStatus {
	isLoading: boolean;
	isError: boolean;

	allUsers: UserActiveItemList[];
	allActiveUsers: UserActiveItemList[];
	allInactiveUsers: UserActiveItemList[];

	getActiveUsersRoleType: (role: UserPermisson) => UserActiveItemList[];
	findUserById: (id: string) => UserActiveItemList | null;
	refetch: () => void;
}

export const UserActivityStatusCtx = createContext<UserActivityStatus | null>(null);

export const UserActivityStatusProvider = ({ children }: Props) => {
	const { toast } = useToast();
	const m = useTranslations('MESSAGES');

	const [allInactiveUsers, setAllInactiveUsers] = useState<UserActiveItemList[]>([]);
	const [allActiveUsers, setAllActiveUsers] = useState<UserActiveItemList[]>([]);

	const params = useParams();
	const worksapceId = params.workspace_id ? params.workspace_id : null;

	const {
		data: users,
		isError,
		isLoading,
		refetch,
	} = useQuery<UserActiveItemList[], Error>({
		queryFn: async () => {
			const res = await fetch(`/api/users/get-users?workspaceId=${worksapceId}`);

			if (!res.ok) {
				const error = (await res.json()) as string;
				throw new Error(error);
			}

			const resposne = await res.json();

			return resposne;
		},
		enabled: !!worksapceId,
		refetchInterval: 6000,
		cacheTime: 1 * 60 * 1000,
		queryKey: ['getUserActivityStatus', worksapceId],
	});

	const { mutate: updateUserActivity } = useMutation({
		mutationFn: async () => {
			const currentTime = new Date().toISOString();

			await axios.post('/api/users/update-activity', { currentTime });
		},

		onError: (err: AxiosError) => {
			const error = err?.response?.data ? err.response.data : 'ERRORS.CANT_GET_USERS';
			toast({
				title: m(error),
				variant: 'destructive',
			});
		},
	});
	useEffect(() => {
		updateUserActivity();

		const updateAndRefetch = async () => {
			updateUserActivity();
			await refetch();
		};

		const intervalId = setInterval(() => {
			updateAndRefetch();
		}, 3 * 60 * 1000);

		return () => clearInterval(intervalId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!users) return;

		const currentTime = dayjs();

		const activeUsers = users.filter((user) => {
			const lastActiveTime = dayjs(user.lastTimeActive);
			const timeDifference = currentTime.diff(lastActiveTime, 'minute');
			return timeDifference < 4;
		});

		const inactiveUsers = users.filter((user) => !activeUsers.includes(user));

		setAllActiveUsers(activeUsers);
		setAllInactiveUsers(inactiveUsers);
	}, [users]);

	const getActiveUsersRoleType = (role: UserPermisson) => {
		return allActiveUsers.filter((user) => user.userRole === role);
	};

	const findUserById = (id: string) => {
		const user = users?.find((user) => user.id === id);
		return user ? user : null;
	};

	const info: UserActivityStatus = {
		isLoading,
		isError,
		allUsers: users ?? [],
		allActiveUsers,
		allInactiveUsers,
		getActiveUsersRoleType,
		findUserById,
		refetch,
	};

	return <UserActivityStatusCtx.Provider value={info}>{children}</UserActivityStatusCtx.Provider>;
};

export const useUserActivityStatus = () => {
	const ctx = useContext(UserActivityStatusCtx);
	if (!ctx) throw new Error('invalid use');

	return ctx;
};
