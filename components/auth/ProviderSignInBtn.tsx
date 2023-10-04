import React from 'react';
import { Button } from '../ui/button';


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children:React.ReactNode
}

export const ProviderSignInBtn = ({ children ,...props}: Props) => {
	return (
		<Button variant={'secondary'} type='button' {...props}>
			{children}
		</Button>
	);
};
