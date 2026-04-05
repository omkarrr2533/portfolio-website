import './globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body
        style={{ background: '#060D1F', color: '#E8F0FE', minHeight: '100vh' }}
        className="flex flex-col"
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}