'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, ExternalLink, Code2, ArrowUpRight, MapPin, Zap } from 'lucide-react'

const NAV_GROUPS = [
  {
    title: 'Portfolio',
    links: [
      { name: 'Projects',      path: '/projects' },
      { name: 'GitHub Stats',  path: '/github-activities' },
      { name: 'Certifications',path: '/certifications' },
      { name: 'Gallery',       path: '/gallery' },
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
  {
    icon: Github,
    label: 'GitHub',
    url: 'https://github.com/omkarrr2533',
    color: '#EDF2FF',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/om-kapale-b861a228a',
    color: '#60A5FA',
  },
  {
    icon: Mail,
    label: 'Email',
    url: 'mailto:omshripadkapale@gmail.com',
    color: '#34D399',
  },
  {
    icon: ExternalLink,
    label: 'LeetCode',
    url: 'https://leetcode.com/u/omi_/',
    color: '#FCD34D',
  },
]

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(99,125,175,0.1)', background: 'rgba(4,9,26,0.98)' }}
    >
      {/* ── Ambient glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(59,130,246,0.05), transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* ── CTA strip ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 mb-8"
          style={{ borderBottom: '1px solid rgba(99,125,175,0.08)' }}
        >
          <div>
            <p className="text-base font-bold text-[#EDF2FF] mb-0.5" style={{ fontFamily:'Syne, sans-serif' }}>
              Open to Collaboration
            </p>
            <p className="text-sm text-[#4A6090]">
              Backend · AI/ML · Open Source
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary btn-sm flex-shrink-0">
            <Zap size={13} /> Let's Build Together
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* ── Main footer grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="logo-mark" style={{ width:32, height:32, fontSize:12, borderRadius:9 }}>OK</div>
              <div>
                <p className="text-sm font-bold text-[#EDF2FF]" style={{ fontFamily:'Syne, sans-serif' }}>
                  Om Shripad Kapale
                </p>
                <p className="text-[10px] font-mono text-[#4A6090] tracking-widest mt-0.5">
                  BACKEND · AI/ML · OPEN SOURCE
                </p>
              </div>
            </div>

            <p className="text-sm text-[#4A6090] leading-relaxed mb-4 max-w-xs">
              CSE student in the top 5% of college, building scalable backend systems
              and exploring AI/ML frontiers. Always open to exciting projects.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-[#4A6090] mb-4">
              <MapPin size={11} />
              <span>Mumbai, Maharashtra, India</span>
              <span className="mx-1">·</span>
              <span className="ping-dot">
                <span
                  className="w-2 h-2 rounded-full block"
                  style={{ background: '#10B981' }}
                />
              </span>
              <span className="text-[#34D399]">Available for opportunities</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.url.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  title={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(12,21,40,0.8)',
                    border: '1px solid rgba(99,125,175,0.15)',
                    color: '#4A6090',
                  }}
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {NAV_GROUPS.map(group => (
            <div key={group.title}>
              <h4
                className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: '#2A3A55', fontFamily: 'JetBrains Mono, monospace' }}
              >
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map(link => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="text-sm text-[#4A6090] hover:text-[#8EA8D8] transition-colors duration-150 flex items-center gap-1.5 group"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      <ArrowUpRight
                        size={11}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500"
                      />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5"
          style={{ borderTop: '1px solid rgba(99,125,175,0.08)' }}
        >
          <div className="flex items-center gap-1.5 text-xs text-[#2A3A55]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <Code2 size={11} />
            <span>Built with Next.js · GitHub API · Framer Motion</span>
          </div>
          <p className="text-xs text-[#2A3A55]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            © {new Date().getFullYear()} Om Shripad Kapale — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}