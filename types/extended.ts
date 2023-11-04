import {  UserPermison, Workspace } from '@prisma/client';

export interface SubscriptionUser {
	userRole: UserPermison;
	user: {
		id: string;
		image?: string | null;
		username: string;
	};
}

export interface SettingsWorkspace extends Workspace {
	subscribers: SubscriptionUser[];
}
