'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Github, Zap, ShieldCheck, Home, Briefcase, User, Mail } from 'lucide-react'
import { useAdmin } from '@/lib/admin'
import { NavBar } from '@/components/ui/tubelight-navbar'
import { ShiftingDropDown } from '@/components/ui/animated-shifting-tab-component'

const NAV = [
  { name: 'Home',     path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'GitHub',   path: '/github-activities' },
  { name: 'Certs',    path: '/certifications' },
  { name: 'Gallery',  path: '/gallery' },
  { name: 'About',    path: '/about' },
  { name: 'Stuff',    path: '/stuff' },
  { name: 'Contact',  path: '/contact' },
]

/* Primary destinations live in the tubelight nav; the rest move
   into the ShiftingDropDown "Explore" panel. */
const PRIMARY_NAV = [
  { name: 'Home',     url: '/',                  icon: Home },
  { name: 'Projects', url: '/projects',          icon: Briefcase },
  { name: 'GitHub',   url: '/github-activities', icon: Github },
  { name: 'About',    url: '/about',             icon: User },
  { name: 'Contact',  url: '/contact',           icon: Mail },
]

export default function Header() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollPct,setScrollPct]= useState(0)
  const pathname = usePathname()
  const menuRef  = useRef(null)
  const admin    = useAdmin()

  useEffect(() => {
    const fn = () => {
      const h = document.documentElement
      const total = h.scrollHeight - h.clientHeight
      setScrolled(window.scrollY > 20)
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    const fn = e => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = path =>
    path === '/' ? pathname === path : pathname.startsWith(path)

  /* ── Shared active link styles ── */
  const activeStyle = {
    background: 'rgba(16,185,129,0.1)',
    color: '#34D399',
    border: '1px solid rgba(16,185,129,0.25)',
  }
  const inactiveStyle = {
    background: 'transparent',
    color: '#9CAFA7',
    border: '1px solid transparent',
  }

  return (
    <>
      {/* Progress bar */}
      {scrollPct > 0 && (
        <div style={{
          position:'fixed', top:0, left:0, zIndex:1001,
          height:2, width:`${scrollPct}%`,
          background:'linear-gradient(90deg,#10B981,#22D3EE)',
          transition:'width 80ms linear',
          boxShadow:'0 0 8px rgba(16,185,129,0.6)',
        }} />
      )}

      <header style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        backfaceVisibility:'hidden',
        WebkitBackfaceVisibility:'hidden',
        transform:'translateZ(0)',
        transition:'background 250ms ease, box-shadow 250ms ease, border-color 250ms ease',
        ...(scrolled ? {
          background:'rgba(5,8,7,0.85)',
          WebkitBackdropFilter:'blur(20px) saturate(160%)',
          backdropFilter:'blur(20px) saturate(160%)',
          borderBottom:'1px solid rgba(236,242,239,0.07)',
          boxShadow:'0 4px 24px rgba(0,0,0,0.3)',
        } : {
          background:'transparent',
          borderBottom:'1px solid transparent',
        }),
      }}>
        <nav className="container" style={{
          display:'flex', alignItems:'center', justifyContent:'space-between', height:68,
        }}>

          {/* Logo */}
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
            <div style={{
              width:36, height:36, borderRadius:10,
              background:'linear-gradient(135deg,#10B981,#0D9488)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'"Playfair Display",Georgia,serif', fontWeight:700, fontSize:15, color:'#04150F',
              boxShadow:'0 0 18px rgba(16,185,129,0.4)',
              flexShrink:0,
            }}>OK</div>
            <div className="desktop-nav">
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:15, color:'#ECF2EF', lineHeight:1, letterSpacing:'0.01em' }}>Om Kapale</p>
              <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:3 }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:'#34D399', boxShadow:'0 0 5px #34D399', display:'inline-block', flexShrink:0 }} />
                <p style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#34D399', letterSpacing:'0.08em' }}>GSOC 2026 · AVAILABLE</p>
              </div>
            </div>
          </Link>

          {/* Desktop nav: tubelight pills + shifting dropdown */}
          <div style={{ display:'flex', alignItems:'center', gap:10 }} className="desktop-nav">
            <NavBar items={PRIMARY_NAV} fixed={false} />
            <ShiftingDropDown />
            {admin && (
              <span style={{
                display:'inline-flex', alignItems:'center', gap:4,
                padding:'3px 8px',
                background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.25)',
                borderRadius:99, fontSize:10, fontWeight:700, color:'#FBBF24', marginLeft:4,
              }}>
                <ShieldCheck size={11} /> ADMIN
              </span>
            )}
          </div>

          {/* Desktop actions */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }} className="desktop-nav">
            <a
              href="https://github.com/omkarrr2533"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <Github size={14} /> GitHub
            </a>
            <Link href="/contact" className="btn btn-primary btn-sm" style={{
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.03em',
            }}>
              <Zap size={13} /> Hire Me
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={menuRef}
            onClick={() => setOpen(v => !v)}
            className="mobile-only"
            style={{
              display:'flex', alignItems:'center', justifyContent:'center',
              width:44, height:44, borderRadius:10,
              background: open ? 'rgba(16,185,129,0.1)' : 'rgba(10,16,14,0.8)',
              border:`1px solid ${open ? 'rgba(16,185,129,0.3)' : 'rgba(236,242,239,0.1)'}`,
              color: open ? '#34D399' : '#9CAFA7',
              cursor:'pointer',
              transition:'all 150ms ease',
            }}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer backdrop */}
      <div onClick={() => setOpen(false)} style={{
        position:'fixed', inset:0, zIndex:998,
        background:'rgba(3,5,4,0.75)',
        backdropFilter:'blur(4px)',
        transition:'opacity 250ms ease',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
      }} />

      {/* Mobile drawer panel */}
      <div style={{
        position:'fixed', top:0, right:0, bottom:0, width:280, zIndex:999,
        background:'rgba(8,13,11,0.98)',
        backdropFilter:'blur(24px)',
        borderLeft:'1px solid rgba(236,242,239,0.08)',
        boxShadow:'-12px 0 48px rgba(0,0,0,0.6)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition:'transform 300ms cubic-bezier(0.4,0,0.2,1)',
        display:'flex', flexDirection:'column',
      }}>
        {/* Panel header */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'18px 20px',
          borderBottom:'1px solid rgba(236,242,239,0.07)',
        }}>
          <span style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:14, color:'#ECF2EF' }}>
            Navigation
          </span>
          <button onClick={() => setOpen(false)} style={{ color:'#5F7169', cursor:'pointer', padding:8 }} aria-label="Close menu">
            <X size={17} />
          </button>
        </div>

        {/* Links */}
        <div style={{ flex:1, overflowY:'auto', padding:'12px' }}>
          {NAV.map(item => {
            const active = isActive(item.path)
            return (
              <Link key={item.path} href={item.path} style={{
                display:'flex', alignItems:'center', gap:10,
                padding:'11px 14px', borderRadius:10, marginBottom:2,
                fontFamily:'Inter,sans-serif', fontSize:14,
                fontWeight: active ? 600 : 500,
                textDecoration:'none',
                transition:'all 150ms ease',
                ...(active ? activeStyle : { color:'#9CAFA7', background:'transparent', border:'1px solid transparent' }),
              }}>
                <span style={{
                  width:6, height:6, borderRadius:'50%', flexShrink:0,
                  background: active ? '#34D399' : '#36443F',
                  boxShadow: active ? '0 0 6px rgba(52,211,153,0.6)' : 'none',
                }} />
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* Panel footer */}
        <div style={{ padding:16, borderTop:'1px solid rgba(236,242,239,0.07)', display:'flex', flexDirection:'column', gap:8 }}>
          <a
            href="https://github.com/omkarrr2533"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ justifyContent:'center', fontSize:13 }}
          >
            <Github size={14} /> GitHub
          </a>
          <Link href="/contact" className="btn btn-primary" style={{ justifyContent:'center', fontSize:13 }}>
            <Zap size={13} /> GSoC &apos;26 · Hire Me
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) { .mobile-only { display:none!important; } }
        @media (max-width: 1023px) { .desktop-nav { display:none!important; } }
      `}</style>
    </>
  )
}
