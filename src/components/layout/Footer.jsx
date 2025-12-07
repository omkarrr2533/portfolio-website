'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/yourusername' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/yourusername' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/yourusername' },
    { name: 'Email', icon: Mail, url: 'mailto:your.email@example.com' },
  ]

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Building digital experiences with modern web technologies.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> by Your Name
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}