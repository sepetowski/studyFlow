'use client';
import React, { useCallback, useState } from 'react';
import { Handle, Position, Node, NodeProps } from 'reactflow';
import { NodeWrapper } from './NodeWrapper';
import TextareaAutosize from 'react-textarea-autosize';
type NodeData = {
	value: number;
};

export const TextNode = ({ data }: NodeProps<NodeData>) => {
	return (
		<NodeWrapper>
			<div className=''>
				{/* <TextareaAutosize
					value={"lorem asdadj asd adasjd ajsd jas jasd jn nasdsahduiasd hasdi uuhdashijd absd"}
					onKeyDown={(e) => {
						if (e.key === 'Enter') e.preventDefault();
					}}
					className='w-full resize-none appearance-none overflow-hidden bg-transparent  placeholder:text-muted-foreground  focus:outline-none '
				/> */}
				<p className='p-1.5'>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad atque distinctio obcaecati?
					Quia omnis libero id quam officiis tempora alias modi velit nisi rerum incidunt,
					perferendis quas recusandae itaque voluptate illum sit eius labore facere blanditiis
					laboriosam quod quasi esse. Cupiditate veniam odio dolores ipsam, corporis a similique
					eos. Error!
				</p>
			</div>
		</NodeWrapper>
	);
};
