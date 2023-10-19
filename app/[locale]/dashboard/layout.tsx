import { Sidebar } from '@/components/sidebar/Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='flex h-0   min-h-screen w-full'>
			<Sidebar />
			<div className='p-4 md:p-6'>{children}</div>
		</main>
	);
};

export default DashboardLayout;
