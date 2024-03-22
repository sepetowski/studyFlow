import { AddTaskShortcut } from '@/components/addTaskShortcut/AddTaskShortcut';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { DashboardHeader } from '@/components/header/DashboardHeader';
import { InviteUsers } from '@/components/inviteUsers/InviteUsers';
import { getInitialMessages, getUserWorkspaceRole, getWorkspaceWithChatId } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { notFound } from 'next/navigation';

interface Params {
	params: {
		workspace_id: string;
		chat_id: string;
	};
}

const Chat = async ({ params: { workspace_id, chat_id } }: Params) => {
	const session = await checkIfUserCompletedOnboarding(
		`/dashboard/workspace/${workspace_id}/chat/${chat_id}`
	);

	const [workspace, userRole, initialMessages] = await Promise.all([
		getWorkspaceWithChatId(workspace_id, session.user.id),
		getUserWorkspaceRole(workspace_id, session.user.id),
		getInitialMessages(session.user.id, chat_id),
	]);

	if (!workspace) return notFound();

	const conversationId = workspace.conversation.id;

	if (conversationId !== chat_id) notFound();

	return (
		<>
			<DashboardHeader
				addManualRoutes={[
					{
						name: 'DASHBOARD',
						href: '/dashboard',
						useTranslate: true,
					},
					{
						name: workspace.name,
						href: `/dashboard/workspace/${workspace_id}`,
					},
					{
						name: 'CHAT',
						href: `/dashboard/workspace/${workspace_id}/chat/${chat_id}`,
						useTranslate: true,
					},
				]}>
				{(userRole === 'ADMIN' || userRole === 'OWNER') && <InviteUsers workspace={workspace} />}
				<AddTaskShortcut userId={session.user.id} />
			</DashboardHeader>
			<main className='w-full h-[90%]'>
				<ChatContainer
					workspaceName={workspace.name}
					chatId={conversationId}
					initialMessages={initialMessages ? initialMessages : []}
					sessionUserId={session.user.id}
				/>
			</main>
		</>
	);
};
export default Chat;
