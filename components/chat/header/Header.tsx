import React from 'react';

interface Props {
	workspaceName: string;
}

export const Header = ({ workspaceName }: Props) => {
	return (
		<div className='w-full  border-b border-border shadow-sm p-4  '>
			<h3 className='text-primary text-lg font-semibold'>{workspaceName} chat</h3>
		</div>
	);
};
