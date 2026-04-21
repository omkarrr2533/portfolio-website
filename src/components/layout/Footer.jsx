'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, ExternalLink, Code2, ArrowUpRight, MapPin, Zap } from 'lucide-react'

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
  { icon: Github,       label: 'GitHub',   url: 'https://github.com/omkarrr2533' },
  { icon: Linkedin,     label: 'LinkedIn', url: 'https://www.linkedin.com/in/om-kapale-b861a228a' },
  { icon: Mail,         label: 'Email',    url: 'mailto:omshripadkapale@gmail.com' },
  { icon: ExternalLink, label: 'LeetCode', url: 'https://leetcode.com/u/omi_/' },
]

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(5,10,23,0.9)',
      borderTop: '1px solid rgba(148,163,184,0.07)',
      backdropFilter: 'blur(20px)',
    }}>
      <div className="container">

        {/* CTA strip */}
        <div style={{
          display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between',
          gap:14, padding:'24px 0',
          borderBottom:'1px solid rgba(148,163,184,0.06)',
        }}>
          <div>
            <p style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontWeight:700, fontSize:15, color:'#E8F0FE', marginBottom:2 }}>
              Open to Collaboration
            </p>
            <p style={{ fontSize:13, color:'#4A6080' }}>Backend · AI/ML · Open Source</p>
          </div>
          <Link href="/contact" className="btn btn-primary btn-sm">
            <Zap size={13} /> Let's Build Together <ArrowUpRight size={12} />
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
                background:'linear-gradient(135deg,#4F46E5,#7C3AED)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'Plus Jakarta Sans,sans-serif', fontWeight:800, fontSize:12, color:'#fff',
                boxShadow:'0 0 14px rgba(79,70,229,0.35)',
              }}>OK</div>
              <div>
                <p style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontWeight:700, fontSize:14, color:'#E8F0FE' }}>
                  Om Shripad Kapale
                </p>
                <p style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'#4A6080', letterSpacing:'0.08em', marginTop:1 }}>
                  BACKEND · AI/ML · OPEN SOURCE
                </p>
              </div>
            </div>

            <p style={{ fontSize:13, color:'#4A6080', lineHeight:1.75, maxWidth:280, marginBottom:16 }}>
              CSE student in the top 5% of college, building scalable backend systems and exploring AI/ML frontiers.
            </p>

            <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'#4A6080', marginBottom:16, fontFamily:'JetBrains Mono,monospace' }}>
              <MapPin size={11} />
              <span>Mumbai, Maharashtra, India</span>
              <span style={{ margin:'0 4px' }}>·</span>
              <span className="ping-dot">
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#10B981', display:'block' }} />
              </span>
              <span style={{ color:'#10B981' }}>Available</span>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              {SOCIAL.map(s => (
                <a key={s.label} href={s.url}
                  target={s.url.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width:32, height:32, borderRadius:8,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background:'rgba(13,21,38,0.8)', border:'1px solid rgba(148,163,184,0.1)',
                    color:'#4A6080', transition:'all 150ms ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(79,70,229,0.4)'; e.currentTarget.style.color='#818CF8'; e.currentTarget.style.boxShadow='0 0 10px rgba(79,70,229,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(148,163,184,0.1)'; e.currentTarget.style.color='#4A6080'; e.currentTarget.style.boxShadow='none' }}
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
                color:'#2A3F60', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:14,
              }}>
                {group.title}
              </h4>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                {group.links.map(link => (
                  <li key={link.path}>
                    <Link href={link.path} style={{
                      fontSize:13, color:'#4A6080', textDecoration:'none',
                      transition:'color 150ms ease', fontFamily:'Plus Jakarta Sans,sans-serif',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color='#8EA4C8' }}
                      onMouseLeave={e => { e.currentTarget.style.color='#4A6080' }}
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
          borderTop:'1px solid rgba(148,163,184,0.06)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#2A3F60', fontFamily:'JetBrains Mono,monospace' }}>
            <Code2 size={11} />
            <span>Built with Next.js · GitHub API · Framer Motion</span>
          </div>
          <p style={{ fontSize:11, color:'#2A3F60', fontFamily:'JetBrains Mono,monospace' }}>
            © {new Date().getFullYear()} Om Shripad Kapale
          </p>
        </div>
      </div>
    </footer>
  )
}