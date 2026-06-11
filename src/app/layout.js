import './globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { AdminWidget } from '../lib/admin'

export const metadata = {
  metadataBase: new URL('https://omkar2533.netlify.app'),
  title: 'Om Shripad Kapale | GSoC 2026 · Backend Developer',
  description:
    'GSoC 2026 contributor at the PEcAn Project (selected #1 globally). Final-year CSE student building scalable backends with Java, Spring Boot & Python. Open source contributor across 5+ organisations.',
  keywords: ['Om Kapale', 'GSoC 2026', 'PEcAn Project', 'Backend Developer', 'Spring Boot', 'Open Source', 'Portfolio'],
  openGraph: {
    title: 'Om Shripad Kapale | GSoC 2026 · Backend Developer',
    description: 'GSoC 2026 @ PEcAn Project · Backend Developer (Java · Spring Boot · Python) · Open Source Contributor',
    type: 'website',
    images: ['/images/profile.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          background: '#050807',
          color: '#ECF2EF',
          minHeight: '100vh',
        }}
        className="flex flex-col"
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <AdminWidget />
      </body>
    </html>
  )
}
