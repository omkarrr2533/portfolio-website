'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Github, ExternalLink, Zap } from 'lucide-react'

const NAV = [
  { name: 'Home',        path: '/',                 short: 'Home'   },
  { name: 'Projects',    path: '/projects',         short: 'Work'   },
  { name: 'GitHub',      path: '/github-activities',short: 'GitHub' },
  { name: 'Certs',       path: '/certifications',   short: 'Certs'  },
  { name: 'Gallery',     path: '/gallery',          short: 'Gallery'},
  { name: 'Stuff',       path: '/stuff',            short: 'Stuff'  },
  { name: 'Resume',      path: '/resume',           short: 'Resume' },
  { name: 'About',       path: '/about',            short: 'About'  },
  { name: 'Contact',     path: '/contact',          short: 'Hire'   },
]

export default function Header() {
  const [open,      setOpen]      = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const pathname = usePathname()
  const menuRef  = useRef(null)

  /* scroll listener */
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement
      const total = h.scrollHeight - h.clientHeight
      const pct   = total > 0 ? (window.scrollY / total) * 100 : 0
      setScrolled(window.scrollY > 24)
      setScrollPct(pct)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* close on route change */
  useEffect(() => { setOpen(false) }, [pathname])

  /* close on outside click */
  useEffect(() => {
    if (!open) return
    const fn = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [open])

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (path) => path === '/' ? pathname === path : pathname.startsWith(path)

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(4,9,26,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(99,125,175,0.1)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        {/* ── Progress bar ── */}
        <div
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-100"
          style={{
            width: `${scrollPct}%`,
            background: 'linear-gradient(90deg, #3B82F6, #6366F1, #8B5CF6)',
            opacity: scrolled ? 1 : 0,
          }}
        />

        <nav className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="logo-mark group-hover:scale-105 transition-transform duration-200">
              OK
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-[#EDF2FF] leading-none tracking-tight"
                 style={{ fontFamily:'Syne, sans-serif' }}>
                Om Kapale
              </p>
              <p className="text-[10px] text-[#4A6090] leading-none mt-0.5 font-mono tracking-widest">
                PORTFOLIO
              </p>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV.map(item => {
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 group"
                  style={{
                    color:      active ? '#EDF2FF' : '#4A6090',
                    background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#8EA8D8' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#4A6090' }}
                >
                  {active && (
                    <span
                      className="absolute inset-0 rounded-lg"
                      style={{ boxShadow: 'inset 0 1px 0 rgba(59,130,246,0.2)' }}
                    />
                  )}
                  {item.name}
                  {active && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* ── Desktop right actions ── */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="https://github.com/omkarrr2533"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm flex items-center gap-1.5"
            >
              <Github size={14} />
              GitHub
              <ExternalLink size={10} className="opacity-40" />
            </a>
            <Link href="/contact" className="btn btn-primary btn-sm">
              <Zap size={13} />
              Hire Me
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            ref={menuRef}
            onClick={() => setOpen(!open)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
            style={{
              background: open ? 'rgba(59,130,246,0.1)' : 'rgba(12,21,40,0.7)',
              border: '1px solid rgba(99,125,175,0.2)',
              color: open ? '#60A5FA' : '#8EA8D8',
            }}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile menu ── */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-all duration-300"
        style={{
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: 'rgba(4,9,26,0.7)',
            backdropFilter: 'blur(8px)',
            opacity: open ? 1 : 0,
          }}
          onClick={() => setOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className="absolute top-0 right-0 bottom-0 w-72 flex flex-col transition-transform duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(8,15,34,0.98), rgba(12,21,40,0.98))',
            borderLeft: '1px solid rgba(99,125,175,0.15)',
            backdropFilter: 'blur(24px)',
            transform: open ? 'translateX(0)' : 'translateX(100%)',
            boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between p-5 border-b"
               style={{ borderColor: 'rgba(99,125,175,0.12)' }}>
            <div className="flex items-center gap-2.5">
              <div className="logo-mark" style={{ width:30, height:30, fontSize:12, borderRadius:8 }}>OK</div>
              <span className="text-sm font-bold text-[#EDF2FF]" style={{ fontFamily:'Syne, sans-serif' }}>
                Om Kapale
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4A6090] hover:text-[#EDF2FF] hover:bg-white/5 transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            {NAV.map((item, i) => {
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200"
                  style={{
                    background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
                    color:      active ? '#60A5FA' : '#8EA8D8',
                    border:     active ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                    animationDelay: `${i * 30}ms`,
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '14px',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all"
                    style={{
                      background: active ? '#3B82F6' : '#2A3A55',
                    }}
                  />
                  {item.name}
                  {active && (
                    <span className="ml-auto text-[10px] font-mono text-[#4A6090]">active</span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Panel footer */}
          <div className="p-4 border-t space-y-2" style={{ borderColor: 'rgba(99,125,175,0.12)' }}>
            <a
              href="https://github.com/omkarrr2533"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary w-full justify-center text-sm"
            >
              <Github size={14} />
              View GitHub
            </a>
            <Link href="/contact" className="btn btn-primary w-full justify-center text-sm">
              <Zap size={13} />
              Hire Me
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}