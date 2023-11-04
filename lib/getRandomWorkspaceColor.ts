import { WorkspaceIconColor } from '@prisma/client';

export const colors = Object.values(WorkspaceIconColor);

export const getRandomWorkspaceColor = () => {
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex] as WorkspaceIconColor;
};
