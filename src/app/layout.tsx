import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CivicSolve',
  description: 'AI-powered civic issue reporting platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
