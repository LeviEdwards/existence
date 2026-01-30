import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Existence | Your Life in Real-Time',
  description: 'A meditative visualization of your existence. Every second counts.',
  openGraph: {
    title: 'Existence',
    description: 'Your life, visualized in real-time.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
