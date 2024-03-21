import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// export default getRequestConfig(async ({locale}) => ({
//   if (!locales.includes(locale as any)) notFound();

//   messages: (await import(`./messages/${locale}.json`)).default
// }));

export const locales = ['en', 'pl'] as const;

export default getRequestConfig(async ({ locale }) => {
	// Validate that the incoming `locale` parameter is valid
	if (!locales.includes(locale as any)) notFound();

	return {
		messages: (await import(`./messages/${locale}.json`)).default,
	};
});
