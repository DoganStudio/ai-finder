import type { Metadata } from 'next';
import { Syne, DM_Mono } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SaaS Fikir Motoru',
  description: 'Almanya B2B pazarı için AI destekli SaaS fikir üreticisi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${syne.variable} ${dmMono.variable}`}>
      <body
        className="bg-grid"
        style={{
          fontFamily: 'var(--font-syne), sans-serif',
          background: 'var(--bg)',
          color: 'var(--text)',
          minHeight: '100vh',
        }}
      >
        {children}
      </body>
    </html>
  );
}
