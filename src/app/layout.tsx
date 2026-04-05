import type { Metadata } from 'next';
import { Bebas_Neue, Poppins } from 'next/font/google';
import './globals.css';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import Providers from './providers';

const fontSans = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});
const fontDisplay = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'RecipeFinder',
    template: '%s | RecipeFinder',
  },
  description: 'Search and discover delicious meals from around the world.',
  icons: {
    icon: [
      {
        url: '/images/recipe%20finder.jpg',
        type: 'image/jpeg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} min-h-dvh bg-bg-main font-sans text-text-main antialiased`}
      >
        <Providers>
          <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
