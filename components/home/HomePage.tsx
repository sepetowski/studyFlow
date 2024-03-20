import React from 'react';
import { Nav } from './nav/Nav';
import { Header } from './header/Header';
import { Section } from './section/Section';
import { TextSection } from './section/TextSection';
import {
	homePageAssigmentFilterAndStarredImgs,
	homePageCalendarImgs,
	homePageChatImgs,
	homePageHeaderImgs,
	homePageMindMapsImgs,
	homePagePomodoroImgs,
	homePageRolesAndSettingsImgs,
	homePageTasksImgs,
} from '@/lib/constants';
import { Footer } from './Footer/Footer';

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

					<Section
						id='Mind-Maps'
						title='Mind Maps'
						desc='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam fuga, voluptates animi beatae praesentium natus'
						images={homePageMindMapsImgs}
						reverse
					/>
					<Section
						id='Tasks'
						title='Tasks'
						desc='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam fuga, voluptates animi beatae praesentium natus'
						images={homePageTasksImgs}
					/>
					<Section
						id='Roles'
						title='Roles & Settings'
						desc='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam fuga, voluptates animi beatae praesentium natus'
						images={homePageRolesAndSettingsImgs}
					/>
					<Section
						id='Pomodoro'
						title='Pomodoro'
						desc='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam fuga, voluptates animi beatae praesentium natus'
						images={homePagePomodoroImgs}
						reverse
					/>

					<TextSection
						title='Lorem ipsum dolor sit amet consectetur adipisicing elit'
						desc='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam fuga, voluptates animi beatae praesentium natus'
					/>

					<Section
						id='Chat'
						title='Chat & notifiactions'
						desc='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam fuga, voluptates animi beatae praesentium natus'
						images={homePageChatImgs}
					/>
					<Section
						id='Calendar'
						title='Integraed Calendar'
						desc='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam fuga, voluptates animi beatae praesentium natus'
						images={homePageCalendarImgs}
						reverse
					/>
					<Section
						title='Easy to find anything you need'
						desc='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam fuga, voluptates animi beatae praesentium natus'
						images={homePageAssigmentFilterAndStarredImgs}
					/>
				</main>
			</div>
			<Footer />
		</>
	);
};
