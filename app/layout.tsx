import type { Metadata, Viewport } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NOIR | Преміальний барбершоп у Миколаєві',
  description:
    'NOIR — преміальний барбершоп у Миколаєві. Класичні та сучасні стрижки, оформлення бороди, догляд. Запишіться онлайн.',
  keywords: ['барбершоп', 'стрижка', 'барбер', 'Миколаїв', 'NOIR', 'борода', 'чоловічі стрижки'],
  authors: [{ name: 'NOIR Barbershop' }],
  robots: 'index, follow',
  openGraph: {
    title: 'NOIR | Преміальний барбершоп',
    description: 'Ми створюємо не просто стрижки — ми створюємо образи.',
    type: 'website',
    locale: 'uk_UA',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080808',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-bg text-text-primary antialiased">{children}</body>
    </html>
  );
}
