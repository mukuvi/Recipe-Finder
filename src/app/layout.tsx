import type { Metadata } from 'next';
import './globals.css';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import Providers from './providers';

export const metadata: Metadata = {
  title: {
    default: 'RecipeFinder',
    template: '%s | RecipeFinder',
  },
  description: 'Search and discover delicious meals from around the world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-dvh bg-bg-main text-text-main antialiased">
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
