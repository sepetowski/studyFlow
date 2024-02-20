import {
	CustomColors,
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

export interface AssignedToTaskUser {
	user: {
		id: string;
		image: string | null;
		username: string;
		assignedToTask: {
			userId: string;
		}[];
	};
}

export interface UsersAssingedToTaskInfo extends Workspace {
	subscribers: AssignedToTaskUser[];
}

export interface AssignedToMindMapUser {
	user: {
		id: string;
		image: string | null;
		username: string;
		assignedToMindMap: {
			userId: string;
		}[];
	};
}

export interface UsersAssingedToMindMapInfo extends Workspace {
	subscribers: AssignedToMindMapUser[];
}

export type AssignedItemType = 'task' | 'mindMap';

export interface AssignedToMeDataItem {
	id: string;
	title: string;
	emoji: string;
	link: string;
	workspaceName: string;
	createdAt: Date;
	type: AssignedItemType;
	updated: {
		at: Date;
		by?: UserInfo | null;
	};
	workspaceId: string;
}

export interface AssignedToMeTaskAndMindMaps {
	tasks: AssignedToMeDataItem[];
	mindMaps: AssignedToMeDataItem[];
}

export interface CalendarItem {
	title: string;
	taskBlocks?: {
		from: string;
		to: string | null;
	}[];
	taskDate: {
		id: string;
		from: Date | undefined;
		to: Date | undefined;
	} | null;
	workspaceId: string;
	workspaceName: string;
	workspaceColor: CustomColors;
	taskId: string;
}
