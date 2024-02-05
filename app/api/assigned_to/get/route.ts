import { db } from '@/lib/db';
import { AssignedToMeTaskAndMindMaps } from '@/types/extended';
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
					},
					mindMaps: {
						where: {
							assignedToMindMap: {
								some: {
									userId,
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
							link: `/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}`,
							workspaceName: taskAndMindMaps.name,
						})),
						mindMaps: [],
					};
					return NextResponse.json(assignedTasksData, { status: 200 });
				case 'mind-maps':
					const assignedMindMapsData: AssignedToMeTaskAndMindMaps = {
						tasks: [],
						mindMaps: taskAndMindMaps.mindMaps.map((mindMap) => ({
							id: mindMap.id,
							title: mindMap.title,
							emoji: mindMap.emoji,
							link: `/dashboard/workspace/${mindMap.workspaceId}/tasks/task/${mindMap.id}`,
							workspaceName: taskAndMindMaps.name,
						})),
					};
					return NextResponse.json(assignedMindMapsData, { status: 200 });

				default:
					const assignedAllData: AssignedToMeTaskAndMindMaps = {
						tasks: taskAndMindMaps.tasks.map((task) => ({
							id: task.id,
							title: task.title,
							emoji: task.emoji,
							link: `/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}`,
							workspaceName: taskAndMindMaps.name,
						})),
						mindMaps: taskAndMindMaps.mindMaps.map((mindMap) => ({
							id: mindMap.id,
							title: mindMap.title,
							emoji: mindMap.emoji,
							link: `/dashboard/workspace/${mindMap.workspaceId}/tasks/task/${mindMap.id}`,
							workspaceName: taskAndMindMaps.name,
						})),
					};
					return NextResponse.json(assignedAllData, { status: 200 });
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
					},
					mindMaps: {
						where: {
							assignedToMindMap: {
								some: {
									userId,
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
								link: `/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}`,
								workspaceName: item.name,
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
								link: `/dashboard/workspace/${mindMap.workspaceId}/tasks/task/${mindMap.id}`,
								workspaceName: item.name,
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
								link: `/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}`,
								workspaceName: item.name,
							}))
						);

						assignedData.mindMaps.push(
							...item.mindMaps.map((mindMap) => ({
								id: mindMap.id,
								title: mindMap.title,
								emoji: mindMap.emoji,
								link: `/dashboard/workspace/${mindMap.workspaceId}/tasks/task/${mindMap.id}`,
								workspaceName: item.name,
							}))
						);
					});
					break;
			}

			return NextResponse.json(assignedData, { status: 200 });
		}
	} catch (_) {
		return NextResponse.json('ERRORS.DB_ERROR', { status: 405 });
	}
};
