const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='flex flex-col gap-3 justify-center items-center min-h-screen w-full p-4 md:p-6'>
			{children}
		</main>
	);
};

export default AuthLayout;
