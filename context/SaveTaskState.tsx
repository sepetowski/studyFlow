'use client';

import React, { useContext, useState } from 'react';
import { createContext } from 'react';

interface Props {
	children: React.ReactNode;
}
interface SaveTaskStateContex {
	status: 'unsaved' | 'saved' | 'pending';
	onSetStatus: (status: 'unsaved' | 'saved' | 'pending') => void;
}

export const SaveTaskStateCtx = createContext<SaveTaskStateContex | null>(null);

export const SaveTaskStateProvider = ({ children }: Props) => {
	const [status, setStatus] = useState<'unsaved' | 'saved' | 'pending'>('saved');

	const onSetStatus = (status: 'unsaved' | 'saved' | 'pending') => {
		setStatus(status);
	};

	return (
		<SaveTaskStateCtx.Provider value={{ status, onSetStatus }}>
			{children}
		</SaveTaskStateCtx.Provider>
	);
};

export const useSaveTaskState = () => {
	const ctx = useContext(SaveTaskStateCtx);
	if (!ctx) throw new Error('invalid use');

	return ctx;
};
