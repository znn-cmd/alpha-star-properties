import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin', 'cyrillic'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Alpha Star Properties - Elite Real Estate in Dubai',
  description: 'Premium properties in Dubai with full legal support. Access exclusive off-market deals.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://alphastardubai.ae'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
