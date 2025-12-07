import './globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export const metadata = {
  title: 'Portfolio | Your Name',
  description: 'Dynamic portfolio website showcasing my projects, skills, and GitHub activities',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}