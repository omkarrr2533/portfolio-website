'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Code2, ArrowUpRight, MapPin, Zap } from 'lucide-react'

const NAV_GROUPS = [
  {
    title: 'Portfolio',
    links: [
      { name: 'Projects',       path: '/projects' },
      { name: 'GitHub Stats',   path: '/github-activities' },
      { name: 'Certifications', path: '/certifications' },
      { name: 'Gallery',        path: '/gallery' },
    ],
  },
  {
    title: 'More',
    links: [
      { name: 'Resume',  path: '/resume' },
      { name: 'About',   path: '/about' },
      { name: 'Stuff',   path: '/stuff' },
      { name: 'Contact', path: '/contact' },
    ],
  },
]

const SOCIAL = [
  { icon: Github,   label: 'GitHub',   url: 'https://github.com/omkarrr2533' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/om-kapale-b861a228a' },
  { icon: Mail,     label: 'Email',    url: 'mailto:omshripadkapale@gmail.com' },
  { icon: Code2,    label: 'LeetCode', url: 'https://leetcode.com/u/omii_/' },
]

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(3,5,4,0.9)',
      borderTop: '1px solid rgba(236,242,239,0.07)',
      backdropFilter: 'blur(20px)',
    }}>
      <div className="container">

        {/* CTA strip */}
        <div style={{
          display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between',
          gap:14, padding:'24px 0',
          borderBottom:'1px solid rgba(236,242,239,0.06)',
        }}>
          <div>
            <p style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:15, color:'#ECF2EF', marginBottom:2 }}>
              Open to Collaboration
            </p>
            <p style={{ fontSize:13, color:'#5F7169' }}>Backend · Open Source · AI/ML</p>
          </div>
          <Link href="/contact" className="btn btn-primary btn-sm">
            <Zap size={13} /> Let&apos;s Build Together <ArrowUpRight size={12} />
          </Link>
        </div>

        {/* Main grid */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',
          gap:40, padding:'40px 0 32px',
        }}>

          {/* Brand */}
          <div style={{ gridColumn:'span 2', minWidth:220 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
              <div style={{
                width:32, height:32, borderRadius:9,
                background:'linear-gradient(135deg,#10B981,#0D9488)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'"Playfair Display",Georgia,serif', fontWeight:700, fontSize:13, color:'#04150F',
                boxShadow:'0 0 14px rgba(16,185,129,0.35)',
              }}>OK</div>
              <div>
                <p style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:14, color:'#ECF2EF' }}>
                  Om Shripad Kapale
                </p>
                <p style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#5F7169', letterSpacing:'0.08em', marginTop:1 }}>
                  GSOC 2026 · BACKEND · OPEN SOURCE
                </p>
              </div>
            </div>

            <p style={{ fontSize:13, color:'#5F7169', lineHeight:1.75, maxWidth:280, marginBottom:16 }}>
              GSoC 2026 contributor at the PEcAn Project — final-year CSE student building
              scalable backend systems and shipping open-source pull requests.
            </p>

            <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'#5F7169', marginBottom:16, fontFamily:'JetBrains Mono,monospace' }}>
              <MapPin size={11} />
              <span>Chh. Sambhajinagar, India</span>
              <span style={{ margin:'0 4px' }}>·</span>
              <span className="ping-dot">
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#10B981', display:'block' }} />
              </span>
              <span style={{ color:'#34D399' }}>Available</span>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              {SOCIAL.map(s => (
                <a key={s.label} href={s.url}
                  target={s.url.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  title={s.label}
                  aria-label={s.label}
                  style={{
                    width:34, height:34, borderRadius:8,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background:'rgba(10,16,14,0.8)', border:'1px solid rgba(236,242,239,0.1)',
                    color:'#5F7169', transition:'all 150ms ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(16,185,129,0.4)'; e.currentTarget.style.color='#34D399'; e.currentTarget.style.boxShadow='0 0 10px rgba(16,185,129,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(236,242,239,0.1)'; e.currentTarget.style.color='#5F7169'; e.currentTarget.style.boxShadow='none' }}
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {NAV_GROUPS.map(group => (
            <div key={group.title}>
              <h4 style={{
                fontFamily:'JetBrains Mono,monospace', fontSize:10, fontWeight:600,
                color:'#36443F', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:14,
              }}>
                {group.title}
              </h4>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                {group.links.map(link => (
                  <li key={link.path}>
                    <Link href={link.path} style={{
                      fontSize:13, color:'#5F7169', textDecoration:'none',
                      transition:'color 150ms ease', fontFamily:'Inter,sans-serif',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color='#9CAFA7' }}
                      onMouseLeave={e => { e.currentTarget.style.color='#5F7169' }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between',
          gap:10, padding:'14px 0',
          borderTop:'1px solid rgba(236,242,239,0.06)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#36443F', fontFamily:'JetBrains Mono,monospace' }}>
            <Code2 size={11} />
            <span>Built with Next.js · Three.js · Framer Motion</span>
          </div>
          <p style={{ fontSize:11, color:'#36443F', fontFamily:'JetBrains Mono,monospace' }}>
            © {new Date().getFullYear()} Om Shripad Kapale
          </p>
        </div>
      </div>
    </footer>
  )
}
