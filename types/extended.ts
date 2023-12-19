import {
	MindMap,
	Tag,
	Task,
	UserPermisson,
	Workspace,
	savedMindMaps,
	savedTask,
} from '@prisma/client';

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
export interface ShortMindMap {
	id: string;
	title: string;
}

export interface WorkspaceShortcuts extends Workspace {
	tasks: ShortTask[];
	mindMaps: ShortMindMap[];
}

export interface UserInfo {
	id: string;
	username: string;
	image?: string | null;
	name?: string | null;
	surname?: string | null;
}

export interface ExtendedTask extends Task {
	tags: Tag[];
	taskDate?: {
		id: string;
		from: Date | undefined;
		to: Date | undefined;
	};
	savedTask?: savedTask[];
	creator: UserInfo;
	updatedBy: UserInfo;
}
export interface ExtendedMindMap extends MindMap {
	tags: Tag[];
	savedMindMaps?: savedMindMaps[];
	creator: UserInfo;
	updatedBy: UserInfo;
}
