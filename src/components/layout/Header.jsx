'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Github, ExternalLink, Zap, ShieldCheck } from 'lucide-react'
import { useAdmin } from '@/lib/admin'

const NAV = [
  { name: 'Home',        path: '/' },
  { name: 'Projects',    path: '/projects' },
  { name: 'GitHub',      path: '/github-activities' },
  { name: 'Certs',       path: '/certifications' },
  { name: 'Gallery',     path: '/gallery' },
  { name: 'About',       path: '/about' },
  { name: 'Stuff',       path: '/stuff' },
  { name: 'Contact',     path: '/contact' },
]

export default function Header() {
  const [open,      setOpen]      = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const pathname = usePathname()
  const menuRef  = useRef(null)
  const admin    = useAdmin()

  useEffect(() => {
    const fn = () => {
      const h = document.documentElement
      const total = h.scrollHeight - h.clientHeight
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0
      setScrolled(window.scrollY > 20)
      setScrollPct(pct)
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    const fn = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (path) =>
    path === '/' ? pathname === path : pathname.startsWith(path)

  return (
    <>
      {/* ── Top progress bar ── */}
      {scrollPct > 0 && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: 3,
            width: `${scrollPct}%`,
            background: 'linear-gradient(90deg,#4F46E5,#7C3AED)',
            zIndex: 1001,
            transition: 'width 80ms linear',
            borderRadius: '0 2px 2px 0',
          }}
        />
      )}

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          /* FIX: backface-visibility prevents subpixel blurring */
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          transition: 'background 250ms cubic-bezier(0.4,0,0.2,1), box-shadow 250ms cubic-bezier(0.4,0,0.2,1)',
          ...(scrolled
            ? {
                background: 'rgba(248,250,252,0.88)',
                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                backdropFilter: 'blur(12px) saturate(180%)',
                borderBottom: '1px solid rgba(226,232,240,.9)',
                boxShadow: '0 1px 3px rgba(15,23,42,.06)',
              }
            : {
                background: 'transparent',
                borderBottom: '1px solid transparent',
              }),
        }}
      >
        <nav
          className="container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="9" fill="#4F46E5"/>
    <path d="M9 16C9 12.134 12.134 9 16 9s7 3.134 7 7-3.134 7-7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="20.5" cy="11.5" r="1.5" fill="#A5B4FC"/>
  </svg>
  <div style={{ display: 'none' }} className="sm-show">
    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#1E293B', lineHeight: 1 }}>
      Om Kapale
    </p>
    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94A3B8', letterSpacing: '0.08em', marginTop: 2 }}>
      DEV · AI/ML
    </p>
  </div>
</div>
          </Link>

          {/* ── Desktop nav ── */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 2 }}
            className="desktop-nav"
          >
            {NAV.map(item => {
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  style={{
                    position: 'relative',
                    padding: '7px 14px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: active ? 600 : 500,
                    color: active ? '#4F46E5' : '#475569',
                    background: active ? '#EEF2FF' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 150ms ease',
                    letterSpacing: '-0.01em',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  {item.name}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 3,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 16,
                        height: 2,
                        borderRadius: 2,
                        background: '#4F46E5',
                      }}
                    />
                  )}
                </Link>
              )
            })}
            {admin && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '3px 8px',
                  background: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  borderRadius: 99,
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#92400E',
                  marginLeft: 4,
                  letterSpacing: '0.04em',
                }}
              >
                <ShieldCheck size={11} />
                ADMIN
              </span>
            )}
          </div>

          {/* ── Desktop right ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
            <a
              href="https://github.com/omkarrr2533"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex' }}
            >
              <Github size={14} />
              GitHub
            </a>
            <Link href="/contact" className="btn btn-primary btn-sm">
              <Zap size={13} />
              Hire Me
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            ref={menuRef}
            onClick={() => setOpen(v => !v)}
            className="mobile-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 38,
              height: 38,
              borderRadius: 9,
              background: open ? '#EEF2FF' : '#F1F5F9',
              border: '1px solid #E2E8F0',
              color: open ? '#4F46E5' : '#475569',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile drawer ── */}
      <>
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 998,
            background: 'rgba(15,23,42,.4)',
            WebkitBackdropFilter: 'blur(4px)',
            backdropFilter: 'blur(4px)',
            transition: 'opacity 250ms ease',
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'auto' : 'none',
          }}
        />
        {/* Panel */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: 280,
            zIndex: 999,
            background: '#fff',
            borderLeft: '1px solid #E2E8F0',
            boxShadow: '-8px 0 24px rgba(15,23,42,.12)',
            transform: open ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 280ms cubic-bezier(0.4,0,0.2,1)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Panel header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 20px',
              borderBottom: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 800,
                  fontSize: 12,
                  color: '#fff',
                }}
              >
                OK
              </div>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#1E293B' }}>
                Om Kapale
              </span>
            </div>
            <button onClick={() => setOpen(false)} style={{ color: '#94A3B8', cursor: 'pointer' }}>
              <X size={17} />
            </button>
          </div>

          {/* Links */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px' }}>
            {NAV.map(item => {
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '11px 14px',
                    borderRadius: 9,
                    marginBottom: 2,
                    color: active ? '#4F46E5' : '#475569',
                    background: active ? '#EEF2FF' : 'transparent',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    textDecoration: 'none',
                    transition: 'all 150ms ease',
                    border: active ? '1px solid #C7D2FE' : '1px solid transparent',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: active ? '#4F46E5' : '#CBD5E1',
                      flexShrink: 0,
                    }}
                  />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Panel footer */}
          <div style={{ padding: '16px', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a
              href="https://github.com/omkarrr2533"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ justifyContent: 'center', fontSize: 13 }}
            >
              <Github size={14} /> GitHub
            </a>
            <Link href="/contact" className="btn btn-primary" style={{ justifyContent: 'center', fontSize: 13 }}>
              <Zap size={13} /> Hire Me
            </Link>
          </div>
        </div>
      </>

      {/* Responsive helpers */}
      <style>{`
        @media (min-width: 1024px) { .mobile-only { display:none!important; } }
        @media (max-width: 1023px) { .desktop-nav { display:none!important; } }
        @media (min-width: 640px)  { .sm-show { display:block!important; } }
        @media (max-width: 639px)  { .sm-show { display:none; } }
      `}</style>
    </>
  )
}