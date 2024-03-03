import { db } from '@/lib/db';
import { sortMindMapsAndTasksDataByCreatedAt } from '@/lib/sortMindMapsAndTasksDataByCreatedAt';
import { HomeRecentActivity } from '@/types/extended';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const url = new URL(request.url);
	const userId = url.searchParams.get('userId');
	const take = url.searchParams.get('take');
	const page = url.searchParams.get('page');

	if (!userId || !take || !page) return NextResponse.json('ERRORS.WRONG_DATA', { status: 404 });
	try {
		const taskAndMindMaps = await db.workspace.findMany({
			where: {
				subscribers: {
					some: {
						userId,
					},
				},
			},
			include: {
				tasks: {
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
						savedTask: {
							where: {
								userId,
							},
							select: {
								taskId: true,
							},
						},
					},
				},
				mindMaps: {
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
						savedMindMaps: {
							where: {
								userId,
							},
							select: {
								mindMapId: true,
							},
						},
					},
				},
			},
			orderBy: {
				updatedAt: 'desc',
			},
			take: parseInt(take ? take : ''),
			skip: (parseInt(page ? page : '') - 1) * parseInt(take ? take : ''),
		});

		const tasks: HomeRecentActivity[] = taskAndMindMaps.flatMap((workspace) =>
			workspace.tasks.map((task) => ({
				id: task.id,
				title: task.title,
				emoji: task.emoji,
				link: `/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}`,
				workspaceName: workspace.name,
				createdAt: new Date(task.createdAt),
				type: 'task',
				updated: {
					at: new Date(task.updatedAt),
					by: task.updatedBy,
				},
				workspaceId: workspace.id,
				starred: task.savedTask.length > 0,
			}))
		);

		const mindMaps: HomeRecentActivity[] = taskAndMindMaps.flatMap((workspace) =>
			workspace.mindMaps.map((mindMap) => ({
				id: mindMap.id,
				title: mindMap.title,
				emoji: mindMap.emoji,
				link: `/dashboard/workspace/${mindMap.workspaceId}/mind-maps/mind-map/${mindMap.id}`,
				workspaceName: workspace.name,
				createdAt: new Date(mindMap.createdAt),
				type: 'mindMap',
				updated: {
					at: new Date(mindMap.updatedAt),
					by: mindMap.updatedBy,
				},
				workspaceId: workspace.id,
				starred: mindMap.savedMindMaps.length > 0,
			}))
		);

		return NextResponse.json(sortMindMapsAndTasksDataByCreatedAt({ tasks, mindMaps }), {
			status: 200,
		});
	} catch (_) {
		return NextResponse.json('ERRORS.DB_ERROR', { status: 405 });
	}
};
