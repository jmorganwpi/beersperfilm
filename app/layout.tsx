import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beers Per Film | Movie Ratings for the Drinking Cinephile',
  description: 'How many beers does it take to understand Inception? Find out with our dual-axis rating system measuring confusion and enhancement.',
  keywords: ['movies', 'beer', 'film ratings', 'movie reviews', 'drinking games'],
  openGraph: {
    title: 'Beers Per Film',
    description: 'Movie ratings for the drinking cinephile',
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
        {children}
      </body>
    </html>
  )
}
