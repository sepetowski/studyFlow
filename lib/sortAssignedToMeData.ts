import { AssignedToMeTaskAndMindMaps } from '@/types/extended';

export const sortAssignedDataByCreatedAt = (assignedAllData: AssignedToMeTaskAndMindMaps) => {
	const sortedArray = [...assignedAllData.mindMaps, ...assignedAllData.tasks].sort((a, b) => {
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});

	return sortedArray;
};
