import { AssignedToMeTaskAndMindMaps, HomeRecentTasksAndMindMapsActivity } from '@/types/extended';

export const sortMindMapsAndTasksDataByCreatedAt = (
	data: AssignedToMeTaskAndMindMaps | HomeRecentTasksAndMindMapsActivity
) => {
	const sortedArray = [...data.mindMaps, ...data.tasks].sort((a, b) => {
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});

	return sortedArray;
};
