'use client';
import React, { useMemo } from 'react';

export const useChangeCodeToEmoji = (...codes: string[]) => {
	const emojis = useMemo(() => {
		return codes.map((code) => {
			const isValidHex = /^[0-9a-fA-F]+$/.test(code);
			return isValidHex ? String.fromCodePoint(parseInt(code, 16)) : '1f9e0';
		});
	}, [codes]);

	return emojis.length === 0 ? emojis[0] : emojis;
};
