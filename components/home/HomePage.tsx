import React from 'react';
import { Nav } from './nav/Nav';
import { Header } from './header/Header';
import { Section } from './section/Section';
import { TextSection } from './section/TextSection';

export const HomePage = () => {
	return (
		<>
			<Nav />
			<div className='w-full mx-auto max-w-screen-xl px-4 sm:px-6  '>
				<Header />
				<main>
					<TextSection
						title='Your new best friend'
						desc='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, repellat'
					/>
					<Section />
					<Section reverse />
					<Section />
					<Section reverse />
					<Section />
					<TextSection
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						desc='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam fuga, voluptates animi beatae praesentium natus'
					/>
					<Section />
					<Section reverse />
					<Section />
					<Section reverse />
					<Section />
				</main>
			</div>
		</>
	);
};
