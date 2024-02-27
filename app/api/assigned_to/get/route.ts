import { db } from '@/lib/db';
import { sortAssignedDataByCreatedAt } from '@/lib/sortAssignedToMeData';
import { AssignedItemType, AssignedToMeTaskAndMindMaps } from '@/types/extended';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const url = new URL(request.url);
	const workspaceFilterParam = url.searchParams.get('workspace');
	const currentType = url.searchParams.get('type');
	const userId = url.searchParams.get('userId');

	if (!userId) return NextResponse.json('ERRORS.WRONG_DATA', { status: 404 });

	try {
		if (workspaceFilterParam && workspaceFilterParam !== 'all') {
			const taskAndMindMaps = await db.workspace.findUnique({
				where: {
					id: workspaceFilterParam,
				},
				include: {
					tasks: {
						where: {
							assignedToTask: {
								some: {
									userId,
								},
							},
						},
						include: {
							updatedBy: {
								select: {
									username: true,
									name: true,
									id: true,
									image: true,
									surname: true,
								},
							},
						},
					},
					mindMaps: {
						where: {
							assignedToMindMap: {
								some: {
									userId,
								},
							},
						},
						include: {
							updatedBy: {
								select: {
									username: true,
									name: true,
									id: true,
									image: true,
									surname: true,
								},
							},
						},
					},
				},
			});

			if (!taskAndMindMaps) return NextResponse.json('ERRORS.NO_WORKSPACE', { status: 404 });

			switch (currentType) {
				case 'tasks':
					const assignedTasksData: AssignedToMeTaskAndMindMaps = {
						tasks: taskAndMindMaps.tasks.map((task) => ({
							id: task.id,
							title: task.title,
							emoji: task.emoji,
							workspaceId: task.workspaceId,
							link: `/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}`,
							workspaceName: taskAndMindMaps.name,
							createdAt: task.createdAt,
							type: 'task',
							updated: {
								at: task.updatedAt,
								by: task.updatedBy,
							},
						})),
						mindMaps: [],
					};
					return NextResponse.json(sortAssignedDataByCreatedAt(assignedTasksData), { status: 200 });
				case 'mind-maps':
					const assignedMindMapsData: AssignedToMeTaskAndMindMaps = {
						tasks: [],
						mindMaps: taskAndMindMaps.mindMaps.map((mindMap) => ({
							id: mindMap.id,
							title: mindMap.title,
							emoji: mindMap.emoji,
							workspaceId: mindMap.workspaceId,
							link: `/dashboard/workspace/${mindMap.workspaceId}/tasks/task/${mindMap.id}`,
							workspaceName: taskAndMindMaps.name,
							createdAt: mindMap.createdAt,
							type: 'mindMap',
							updated: {
								at: mindMap.updatedAt,
								by: mindMap.updatedBy,
							},
						})),
					};
					return NextResponse.json(sortAssignedDataByCreatedAt(assignedMindMapsData), {
						status: 200,
					});

				default:
					const assignedAllData: AssignedToMeTaskAndMindMaps = {
						tasks: taskAndMindMaps.tasks.map((task) => ({
							id: task.id,
							title: task.title,
							emoji: task.emoji,
							workspaceId: task.workspaceId,
							link: `/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}`,
							workspaceName: taskAndMindMaps.name,
							createdAt: task.createdAt,
							type: 'task',
							updated: {
								at: task.updatedAt,
								by: task.updatedBy,
							},
						})),
						mindMaps: taskAndMindMaps.mindMaps.map((mindMap) => ({
							id: mindMap.id,
							title: mindMap.title,
							emoji: mindMap.emoji,
							workspaceId: mindMap.workspaceId,
							link: `/dashboard/workspace/${mindMap.workspaceId}/tasks/task/${mindMap.id}`,
							workspaceName: taskAndMindMaps.name,
							createdAt: mindMap.createdAt,
							type: 'mindMap',
							updated: {
								at: mindMap.updatedAt,
								by: mindMap.updatedBy,
							},
						})),
					};

					return NextResponse.json(sortAssignedDataByCreatedAt(assignedAllData), { status: 200 });
			}
		} else {
			const taskAndMindMaps = await db.workspace.findMany({
				include: {
					tasks: {
						where: {
							assignedToTask: {
								some: {
									userId,
								},
							},
						},

						include: {
							updatedBy: {
								select: {
									username: true,
									name: true,
									id: true,
									image: true,
									surname: true,
								},
							},
						},
					},
					mindMaps: {
						where: {
							assignedToMindMap: {
								some: {
									userId,
								},
							},
						},
						include: {
							updatedBy: {
								select: {
									username: true,
									name: true,
									id: true,
									image: true,
									surname: true,
								},
							},
						},
					},
				},
			});

			if (taskAndMindMaps.length === 0) return NextResponse.json([], { status: 200 });

			const assignedData: AssignedToMeTaskAndMindMaps = {
				tasks: [],
				mindMaps: [],
			};

			switch (currentType) {
				case 'tasks':
					taskAndMindMaps.forEach((item) => {
						assignedData.tasks.push(
							...item.tasks.map((task) => ({
								id: task.id,
								title: task.title,
								emoji: task.emoji,
								workspaceId: task.workspaceId,
								link: `/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}`,
								workspaceName: item.name,
								createdAt: task.createdAt,
								type: 'task' as AssignedItemType,
								updated: {
									at: task.updatedAt,
									by: task.updatedBy,
								},
							}))
						);
					});
					break;
				case 'mind-maps':
					taskAndMindMaps.forEach((item) => {
						assignedData.mindMaps.push(
							...item.mindMaps.map((mindMap) => ({
								id: mindMap.id,
								title: mindMap.title,
								emoji: mindMap.emoji,
								workspaceId: mindMap.workspaceId,
								link: `/dashboard/workspace/${mindMap.workspaceId}/tasks/task/${mindMap.id}`,
								workspaceName: item.name,
								createdAt: mindMap.createdAt,
								type: 'mindMap' as AssignedItemType,
								updated: {
									at: mindMap.updatedAt,
									by: mindMap.updatedBy,
								},
							}))
						);
					});
					break;

				default:
					taskAndMindMaps.forEach((item) => {
						assignedData.tasks.push(
							...item.tasks.map((task) => ({
								id: task.id,
								title: task.title,
								emoji: task.emoji,
								workspaceId: task.workspaceId,
								link: `/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}`,
								workspaceName: item.name,
								createdAt: task.createdAt,
								type: 'task' as AssignedItemType,
								updated: {
									at: task.updatedAt,
									by: task.updatedBy,
								},
							}))
						);

						assignedData.mindMaps.push(
							...item.mindMaps.map((mindMap) => ({
								id: mindMap.id,
								title: mindMap.title,
								emoji: mindMap.emoji,
								workspaceId: mindMap.workspaceId,
								link: `/dashboard/workspace/${mindMap.workspaceId}/tasks/task/${mindMap.id}`,
								workspaceName: item.name,
								createdAt: mindMap.createdAt,
								type: 'mindMap' as AssignedItemType,
								updated: {
									at: mindMap.updatedAt,
									by: mindMap.updatedBy,
								},
							}))
						);
					});
					break;
			}

			return NextResponse.json(sortAssignedDataByCreatedAt(assignedData), { status: 200 });
		}
	} catch (_) {
		return NextResponse.json('ERRORS.DB_ERROR', { status: 405 });
	}
};