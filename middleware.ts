import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
	locales: ['pl', 'en'],
	defaultLocale: 'en',
	localeDetection: false,
});

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
