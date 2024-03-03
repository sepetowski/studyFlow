import { Sidebar } from '@/components/sidebar/Sidebar';
import { ToggleSidebarProvider } from '@/context/ToggleSidebar';
import { UserActivityStatusProvider } from '@/context/UserActivityStatus';
import { UserEditableWorkspacesProvider } from '@/context/UserEditableWorkspaces';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<UserActivityStatusProvider>
			<UserEditableWorkspacesProvider>
				<ToggleSidebarProvider>
					<div className='flex h-0   min-h-screen w-full overflow-hidden'>
						<Sidebar />
						<div className='relative p-4 md:p-6 lg:px-10 flex-grow  flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-background '>
							{children}
						</div>
					</div>
				</ToggleSidebarProvider>
			</UserEditableWorkspacesProvider>
		</UserActivityStatusProvider>
	);
};

export default DashboardLayout;
