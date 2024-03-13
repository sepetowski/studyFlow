import { UserAvatar } from '@/components/ui/user-avatar';
import { ExtendedMessage } from '@/types/extended';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';

interface Props {
	message: ExtendedMessage;
}

export const Message = ({ message }: Props) => {
	return (
		<div className='flex justify-between items-center '>
			<div className='flex flex-col gap-1'>
				<div className='flex gap-2 items-start'>
					<div>
						<UserAvatar className='w-10 h-10' />
					</div>
					<div className='flex flex-col w-fit'>
						<div className='flex gap-1 items-end'>
							<p className='text-primary '>Bushmeen</p>
							<p className='text-muted-foreground text-xs'>16 minut temu</p>
						</div>
						<p className='break-words'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda omnis quibusdam
							eaque, doloremque
						</p>
					</div>
				</div>
				<div></div>
			</div>
			<div>
				<MoreHorizontal />
			</div>
		</div>
	);
};
