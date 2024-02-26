'use client';
import { CalendarItem } from '@/types/extended';
import { CustomColors } from '@prisma/client';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

interface Props {
	dayInfo: CalendarItem;
}

export const CalendarTask = ({
	dayInfo: { taskDate, taskId, title, workspaceColor, workspaceId, workspaceName },
}: Props) => {
	const color = useMemo(() => {
		switch (workspaceColor) {
			case CustomColors.PURPLE:
				return 'bg-purple-600  hover:bg-purple-500';

			case CustomColors.GREEN:
				return 'bg-green-600 hover:bg-green-500';

			case CustomColors.RED:
				return 'bg-red-600 hover:bg-red-500';

			case CustomColors.BLUE:
				return 'bg-blue-600 hover:bg-blue-500';

			case CustomColors.CYAN:
				return 'bg-cyan-600 hover:bg-cyan-500';

			case CustomColors.EMERALD:
				return 'bg-emerald-600 hover:bg-emerald-500';

			case CustomColors.INDIGO:
				return 'bg-indigo-600 hover:bg-indigo-500';

			case CustomColors.LIME:
				return 'bg-lime-600 hover:bg-lime-500';

			case CustomColors.ORANGE:
				return 'bg-orange-600 hover:bg-orange-500';
			case CustomColors.FUCHSIA:
				return 'bg-fuchsia-600 hover:bg-fuchsia-500';

			case CustomColors.PINK:
				return 'bg-pink-600 hover:bg-pink-500';

			case CustomColors.YELLOW:
				return 'bg-yellow-600 hover:bg-yellow-500';

			default:
				return 'bg-green-600 hover:bg-green-500';
		}
	}, [workspaceColor]);

	return (
		<div className={`  relative z-10  py-0.5  px-1 rounded-md    ${color}  `}>CalendarTask</div>
	);
};
