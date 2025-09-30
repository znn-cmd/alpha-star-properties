import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/', '/(ar|en|ru)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
