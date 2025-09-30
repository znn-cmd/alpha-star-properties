import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import type { Metadata } from 'next';
import AnalyticsProviders from '@/components/AnalyticsProviders';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const messages = (await import(`@/locales/${locale}.json`)).default;
  
  return {
    title: messages.seo.home.title,
    description: messages.seo.home.description,
    alternates: {
      canonical: `/${locale === 'en' ? '' : locale}`,
      languages: {
        en: '/en',
        ar: '/ar',
        ru: '/ru',
      },
    },
    openGraph: {
      title: messages.seo.home.title,
      description: messages.seo.home.description,
      type: 'website',
      locale: locale,
      alternateLocale: locales.filter((l) => l !== locale),
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Alpha Star Properties',
              description: 'Premium real estate agency in Dubai',
              url: process.env.NEXT_PUBLIC_SITE_URL,
              logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'AE',
                addressLocality: 'Dubai',
              },
              sameAs: [
                'https://facebook.com/alphastarproperties',
                'https://instagram.com/alphastarproperties',
                'https://linkedin.com/company/alphastarproperties',
              ],
            }),
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AnalyticsProviders />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
