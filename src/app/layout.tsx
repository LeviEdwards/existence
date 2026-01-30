import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EXISTENCE',
  description: 'Your life, quantified.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="gradient-mesh" />
        <div className="noise-overlay" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
