
import { Sidebar } from '@/components/sidebar/Sidebar';
import { ToggleSidebarProvider } from '@/context/ToggleSidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<ToggleSidebarProvider>
			<div className='flex h-0   min-h-screen w-full overflow-hidden'>
				<Sidebar />
				<div className='relative p-4 md:p-6 lg:px-10 flex-grow  flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-secondary '>
					{children}
				</div>
			</div>
		</ToggleSidebarProvider>
	);
};

export default DashboardLayout;
