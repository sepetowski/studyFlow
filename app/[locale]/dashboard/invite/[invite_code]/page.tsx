import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import { db } from '@/lib/db';
import { redirect } from 'next-intl/server';

interface Params {
	params: {
		invite_code: string;
	};
	searchParams: {
		[key: string]: string | undefined;
	};
}

const Workspace = async ({ params: { invite_code }, searchParams }: Params) => {
	const session = await checkIfUserCompletedOnboarding(`/dashboard/invite/${invite_code}`);

	const role = searchParams.role as 'editor' | 'admin' | 'viewer' | null | undefined;
	const shareCode = searchParams.shareCode;
	if (!role || !shareCode || !invite_code) redirect('/dashboard/errors?error=no-data');

	const inviteCodeValid = await db.workspace.findUnique({
		where: {
			inviteCode: invite_code,
		},
	});

	if (!inviteCodeValid) redirect('/dashboard/errors?error=outdated-invite-code');

	const existingWorkspace = await db.workspace.findFirst({
		where: {
			inviteCode: invite_code,
			subscribers: {
				some: {
					userId: session.user.id,
				},
			},
		},
	});

	if (existingWorkspace) redirect(`/dashboard/workspace/${existingWorkspace.id}`);

	if (role !== 'admin' && role !== 'editor' && role !== 'viewer')
		redirect('/dashboard/errors?error=wrong-role');

	const userRole = () => {
		switch (role) {
			case 'admin':
				return 'ADMIN';
			case 'editor':
				return 'CAN_EDIT';
			case 'viewer':
				return 'READ_ONLY';

			default:
				return 'READ_ONLY';
		}
	};

	await db.subscription.create({
		data: {
			userId: session.user.id,
			workspaceId: inviteCodeValid.id,
			userRole: userRole(),
		},
	});

	redirect(`/dashboard/workspace/${inviteCodeValid.id}`);

	return null;
};
export default Workspace;
