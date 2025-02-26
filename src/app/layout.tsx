import { I } from '@/shared/interface';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../style/global.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'John Vincent Calma',
  description: 'My Portfolio',
};

export default function RootLayout({ children }: Readonly<I.IChild>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
