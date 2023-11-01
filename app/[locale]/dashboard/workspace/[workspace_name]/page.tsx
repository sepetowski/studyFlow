import { getWorkspace } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';

interface Params {
	params: {
		workspace_name: string;
	};
}

const Workspace = async ({ params: { workspace_name } }: Params) => {
	const session = await checkIfUserCompletedOnboarding(`/dashboard/workspace/${workspace_name}`);
	const workspace = await getWorkspace(workspace_name, session.user.id);

	return <div>{workspace_name}</div>;
};
export default Workspace;
