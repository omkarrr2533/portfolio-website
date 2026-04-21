import './globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { AdminWidget } from '../lib/admin'

export const metadata = {
  title: 'Om Shripad Kapale | Backend Developer & AI/ML Enthusiast',
  description:
    'Top 5% CSE student building scalable backends, exploring AI/ML, and contributing to open source. Spring Boot · Python · PyTorch · REST APIs.',
  keywords: ['Om Kapale', 'Backend Developer', 'Spring Boot', 'AI ML', 'Portfolio'],
  openGraph: {
    title: 'Om Shripad Kapale | Developer Portfolio',
    description: 'Backend Developer · AI/ML Enthusiast · Open Source Contributor',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          background: '#060D1F',
          color: '#E8F0FE',
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