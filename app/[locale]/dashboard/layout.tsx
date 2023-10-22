import { DashboardHeader } from '@/components/header/DashboardHeader';
import { Sidebar } from '@/components/sidebar/Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='flex h-0   min-h-screen w-full'>
			<Sidebar />
			<div className='relative p-4 md:p-6 lg:px-10 flex-grow  flex flex-col overflow-y-auto'>
				<DashboardHeader />
				{children}
			</div>
		</main>
	);
};

export default DashboardLayout;
