import { WorkspaceIconColor } from '@prisma/client';

export const getRandomWorkspaceColor = () => {
	const colors: string[] = Object.values(WorkspaceIconColor);
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex] as WorkspaceIconColor;
};

