import { Tag, Task, UserPermisson, Workspace } from '@prisma/client';

export interface SubscriptionUser {
	userRole: UserPermisson;
	user: {
		id: string;
		image?: string | null;
		username: string;
	};
}

export interface SettingsWorkspace extends Workspace {
	subscribers: SubscriptionUser[];
}

export interface ShortTask {
	id: string;
	emoji: string;
	title: string;
}

export interface WorkspaceShortcuts extends Workspace {
	tasks: ShortTask[];
}

export interface ExtendedTask extends Task {
	tags: Tag[];
	date?: {
		id: string;
		from: Date | undefined;
		to: Date | undefined;
	};
}
