'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Github } from 'lucide-react'

const NAV = [
  { name: 'Home',        path: '/' },
  { name: 'Projects',   path: '/projects' },
  { name: 'GitHub',     path: '/github-activities' },
  { name: 'Certs',      path: '/certifications' },
  { name: 'Gallery',    path: '/gallery' },
  { name: 'Stuff',      path: '/stuff' },
  { name: 'Resume',     path: '/resume' },
  { name: 'About',      path: '/about' },
  { name: 'Contact',    path: '/contact' },
]

export default function Header() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(6,13,31,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(99,120,162,0.12)' : 'none',
      }}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-800"
            style={{ background:'linear-gradient(135deg,#3B82F6,#8B5CF6)', color:'#fff' }}
          >
            OK
          </span>
          <span className="font-display font-700 text-sm text-[#E8F0FE] group-hover:text-white transition-colors hidden sm:block">
            Om Kapale
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV.map(item => {
            const active = pathname === item.path
            return (
              <Link key={item.path} href={item.path}
                className="px-3 py-1.5 rounded-lg text-sm transition-all"
                style={{
                  color:      active ? '#60A5FA' : '#8EA4C8',
                  background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
                  fontWeight: active ? 600 : 400,
                }}
                onMouseEnter={e => { if (!active) e.target.style.color='#E8F0FE' }}
                onMouseLeave={e => { if (!active) e.target.style.color='#8EA4C8' }}
              >
                {item.name}
              </Link>
            )
          })}

          <a href="https://github.com/omkarrr2533" target="_blank" rel="noopener noreferrer"
            className="ml-3 btn-secondary px-3 py-1.5 text-sm"
          >
            <Github size={14} /> GitHub
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-lg text-[#8EA4C8] hover:text-white transition-colors"
          style={{ background:'rgba(15,26,46,0.7)', border:'1px solid rgba(99,120,162,0.2)' }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden animate-slide-down px-4 pb-4"
          style={{
            background:'rgba(6,13,31,0.98)',
            borderBottom:'1px solid rgba(99,120,162,0.12)',
          }}
        >
          <div className="flex flex-col gap-1">
            {NAV.map(item => {
              const active = pathname === item.path
              return (
                <Link key={item.path} href={item.path}
                  className="px-3 py-2.5 rounded-lg text-sm transition-all"
                  style={{
                    color:      active ? '#60A5FA' : '#8EA4C8',
                    background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}