'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Github, Linkedin, Mail, ExternalLink, MapPin, Download,
  ArrowRight, Star, GitFork, Camera, Edit2, Save, X,
  Code2, Cpu, Terminal, Layers, Zap, Award, TrendingUp,
} from 'lucide-react'

// ── Admin hook ─────────────────────────────────
function useAdminMode() {
  const [admin, setAdmin] = useState(false)
  useEffect(() => {
    const saved = localStorage.getItem('portfolioAdmin') === 'true'
    setAdmin(saved)
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        setAdmin(v => { localStorage.setItem('portfolioAdmin', !v); return !v })
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  return [admin, setAdmin]
}

// ── Editable text field ─────────────────────────
function Editable({ value, onChange, admin, tag: Tag = 'span', className = '', multiline = false }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const save = () => { onChange(draft); setEditing(false) }
  if (!admin) return <Tag className={className}>{value}</Tag>
  if (editing) {
    return multiline
      ? <textarea value={draft} onChange={e => setDraft(e.target.value)} onBlur={save}
          autoFocus rows={4}
          className={`bg-transparent border border-blue-500/50 rounded px-2 py-1 text-sm w-full resize-none outline-none ${className}`}
        />
      : <input value={draft} onChange={e => setDraft(e.target.value)} onBlur={save}
          autoFocus className={`bg-transparent border-b border-blue-500 outline-none ${className}`}
        />
  }
  return (
    <Tag className={`${className} cursor-pointer group relative`} onClick={() => setEditing(true)}>
      {value}
      <Edit2 size={12} className="inline ml-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Tag>
  )
}

// ── Profile photo ───────────────────────────────
function ProfilePhoto({ photo, onUpload, admin }) {
  const ref = useRef(null)
  const [hov, setHov] = useState(false)
  return (
    <div className="relative w-52 h-52 sm:w-64 sm:h-64 mx-auto lg:mx-0"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      {/* Glow rings */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 blur-xl opacity-30 animate-pulse" />
      <div className="absolute inset-0 rounded-2xl border border-blue-500/30" />
      <div className="absolute -inset-0.5 rounded-2xl border border-blue-500/10" />

      {/* Photo */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F1A2E] to-[#1a2744]">
        {photo
          ? <img src={photo} alt="Profile" className="w-full h-full object-cover" />
          : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white mb-2">
                OK
              </div>
              <span className="text-xs text-[#4A6080] font-mono">Om Kapale</span>
            </div>
          )
        }
        {/* Upload overlay */}
        {admin && hov && (
          <div onClick={() => ref.current?.click()}
            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center cursor-pointer transition-opacity"
          >
            <Camera size={28} className="text-white mb-2" />
            <span className="text-white text-xs font-mono">Upload Photo</span>
          </div>
        )}
      </div>

      {/* Decorative corner accent */}
      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-blue-500/50 rounded-br" />
      <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-purple-500/50 rounded-tl" />

      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = ev => onUpload(ev.target.result)
        reader.readAsDataURL(file)
      }} />
    </div>
  )
}

// ── Stat counter ────────────────────────────────
function StatBadge({ icon: Icon, value, label, accent = '#3B82F6' }) {
  return (
    <div className="glass-card px-4 py-3 flex items-center gap-3 min-w-[120px]">
      <Icon size={16} style={{ color: accent }} />
      <div>
        <div className="text-sm font-700 text-[#E8F0FE] font-mono">{value}</div>
        <div className="text-xs text-[#4A6080]">{label}</div>
      </div>
    </div>
  )
}

// ── Mini repo card ──────────────────────────────
function MiniRepoCard({ repo }) {
  const LANG_CLR = { JavaScript:'#F1E05A', TypeScript:'#3178C6', Python:'#3572A5', Java:'#B07219', Go:'#00ADD8', CSS:'#563D7C', HTML:'#E34C26', 'C++':'#F34B7D' }
  return (
    <a href={repo.url} target="_blank" rel="noopener noreferrer"
      className="glass-card p-4 group hover:border-blue-500/30 transition-all block"
    >
      <div className="flex items-start justify-between mb-2">
        <Code2 size={14} className="text-[#4A6080] mt-0.5" />
        <ExternalLink size={12} className="text-[#4A6080] group-hover:text-[#60A5FA]" />
      </div>
      <h3 className="font-mono text-sm font-700 text-[#60A5FA] group-hover:text-white mb-1 truncate">{repo.name}</h3>
      <p className="text-xs text-[#8EA4C8] line-clamp-2 mb-3 min-h-[32px]">{repo.description || 'No description'}</p>
      <div className="flex items-center gap-3 text-xs text-[#4A6080]">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: LANG_CLR[repo.language] || '#8b949e' }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1"><Star size={10} />{repo.stars}</span>
        <span className="flex items-center gap-1"><GitFork size={10} />{repo.forks}</span>
      </div>
    </a>
  )
}

// ── Typewriter ──────────────────────────────────
function useTypewriter(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState('')
  const [wi, setWi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const cur = words[wi]
    let t
    if (!del && ci <= cur.length) t = setTimeout(() => setCi(c => c + 1), speed)
    else if (!del && ci > cur.length) t = setTimeout(() => setDel(true), pause)
    else if (del && ci > 0) t = setTimeout(() => setCi(c => c - 1), speed / 2)
    else { setDel(false); setWi(i => (i + 1) % words.length) }
    setDisplay(cur.substring(0, ci))
    return () => clearTimeout(t)
  }, [ci, del, wi, words, speed, pause])
  return display
}

// ═══════════════════════════════════════════════
export default function HomePage() {
  const [admin, setAdmin] = useAdminMode()
  const [photo, setPhoto] = useState(null)
  const [ghStats, setGhStats] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  // Editable fields
  const [info, setInfo] = useState({
    name: 'Om Shripad Kapale',
    title: 'Backend Developer & AI/ML Enthusiast',
    location: 'Mumbai, India · Open to Opportunities',
    bio: 'CSE 3rd year B.Tech student in the top 5% of college with 8.11 CGPA. I build scalable backend systems, explore AI/ML frontiers, and contribute to open source across 6+ organisations.',
    badge: '// backend · ai/ml · open source',
    stack: 'Java · Spring Boot · Python · PyTorch · PostgreSQL · REST API',
  })

  const save = (key) => (val) => {
    setInfo(p => {
      const next = { ...p, [key]: val }
      localStorage.setItem('portfolioInfo', JSON.stringify(next))
      return next
    })
  }

  const handlePhoto = (base64) => {
    setPhoto(base64)
    localStorage.setItem('profilePhoto', base64)
  }

  useEffect(() => {
    const p = localStorage.getItem('profilePhoto')
    if (p) setPhoto(p)
    const i = localStorage.getItem('portfolioInfo')
    if (i) { try { setInfo(JSON.parse(i)) } catch {} }
  }, [])

  useEffect(() => {
    Promise.all([
      fetch('/api/github/status').then(r => r.json()),
      fetch('/api/github/repos?sort=stars&per_page=20').then(r => r.json()),
    ]).then(([stats, rp]) => {
      if (stats.success) setGhStats(stats.data)
      if (rp.success) setRepos(rp.data.filter(r => !r.isFork).slice(0, 6))
    }).finally(() => setLoading(false))
  }, [])

  const roles = ['Backend Developer', 'AI/ML Enthusiast', 'Open Source Contributor', 'Problem Solver', 'Data Science Learner']
  const role = useTypewriter(roles)

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg,#060D1F 0%,#0B1325 100%)' }}>

      {/* Admin pill */}
      {admin && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
          style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#34D399' }}
        >
          <Edit2 size={11} /> Edit Mode ON · Ctrl+Shift+E to exit
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        {/* Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(59,130,246,0.08),transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(139,92,246,0.06),transparent 70%)', filter: 'blur(60px)' }} />

        <div className="container mx-auto px-4 sm:px-6 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

            {/* Left: Info */}
            <div className="animate-fade-in">
              <div className="section-badge mb-5 inline-flex">
                <Editable value={info.badge} onChange={save('badge')} admin={admin} />
              </div>

              <h1 className="font-display font-800 leading-tight mb-3"
                style={{ fontSize: 'clamp(38px,6vw,72px)' }}>
                <span className="text-[#8EA4C8] text-lg block mb-1 font-400 font-mono tracking-widest uppercase">
                  Hello World, I'm
                </span>
                <Editable value={info.name} onChange={save('name')} admin={admin}
                  className="gradient-text block"
                />
              </h1>

              {/* Typewriter */}
              <div className="flex items-center gap-2 mb-5">
                <Terminal size={16} className="text-[#3B82F6]" />
                <p className="font-mono text-[#8EA4C8] text-base sm:text-lg">
                  <span className="text-[#60A5FA]">~/om $</span>{' '}
                  <span className="text-[#E8F0FE]">{role}</span>
                  <span className="cursor-blink" />
                </p>
              </div>

              <Editable value={info.bio} onChange={save('bio')} admin={admin}
                tag="p" multiline
                className="text-[#8EA4C8] text-base leading-relaxed mb-6 max-w-lg"
              />

              {/* Location */}
              <div className="flex items-center gap-2 text-xs text-[#4A6080] font-mono mb-6">
                <MapPin size={12} />
                <Editable value={info.location} onChange={save('location')} admin={admin} />
              </div>

              {/* Stack */}
              <div className="mb-8">
                <p className="text-xs text-[#4A6080] font-mono uppercase tracking-widest mb-2">Stack</p>
                <Editable value={info.stack} onChange={save('stack')} admin={admin}
                  tag="p" className="text-xs text-[#8EA4C8] font-mono"
                />
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/projects" className="btn-primary group">
                  View Projects <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="/resume.pdf" download className="btn-secondary group">
                  <Download size={15} /> Resume
                </a>
                <Link href="/contact" className="btn-secondary">
                  Hire Me
                </Link>
              </div>

              {/* Social row */}
              <div className="flex items-center gap-5">
                {[
                  { icon: Github, url: 'https://github.com/omkarrr2533', label: 'GitHub' },
                  { icon: Linkedin, url: 'https://www.linkedin.com/in/om-kapale-b861a228a', label: 'LinkedIn' },
                  { icon: Mail, url: 'mailto:omshripadkapale@gmail.com', label: 'Email' },
                ].map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="text-[#4A6080] hover:text-[#60A5FA] transition-colors group flex items-center gap-1.5"
                  >
                    <s.icon size={17} className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono hidden sm:block">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Photo */}
            <div className="flex flex-col items-center gap-6 animate-slide-up delay-300">
              <ProfilePhoto photo={photo} onUpload={handlePhoto} admin={admin} />

              {/* Live stat chips */}
              {!loading && ghStats && (
                <div className="flex flex-wrap gap-2 justify-center">
                  <StatBadge icon={Award} value="8.11 CGPA" label="Academic" accent="#10B981" />
                  <StatBadge icon={Star} value={ghStats.totalStars} label="Stars" accent="#F59E0B" />
                  <StatBadge icon={Code2} value={ghStats.totalRepos} label="Repos" accent="#3B82F6" />
                  <StatBadge icon={TrendingUp} value={ghStats.followers} label="Followers" accent="#8B5CF6" />
                </div>
              )}

              {/* Terminal card */}
              <div className="glass-card w-full max-w-xs p-4 font-mono text-xs">
                <div className="flex gap-1.5 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="text-[#4A6080]">$ whoami</div>
                <div className="text-[#34D399]">om-kapale</div>
                <div className="text-[#4A6080] mt-1">$ cat skills.txt</div>
                <div className="text-[#60A5FA]">Java · Spring Boot · Python</div>
                <div className="text-[#60A5FA]">PyTorch · PostgreSQL · DSA</div>
                <div className="text-[#4A6080] mt-1">$ status</div>
                <div className="text-[#F59E0B]">🟡 Open to opportunities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top,#060D1F,transparent)' }} />
      </section>

      {/* ── FEATURED REPOS ── */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="section-badge mb-3 block w-fit">// github · live sync</span>
              <h2 className="font-display font-800 text-[#E8F0FE]" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
                Top <span className="gradient-text">Repositories</span>
              </h2>
            </div>
            <Link href="/projects" className="btn-secondary text-sm hidden sm:inline-flex">
              All Projects <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6).fill(0).map((_,i) => (
                <div key={i} className="glass-card p-4"><div className="skeleton h-28 rounded" /></div>
              ))}
            </div>
          ) : repos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((r, i) => (
                <div key={r.id} className="animate-slide-up" style={{ animationDelay: `${i*60}ms`, animationFillMode:'both' }}>
                  <MiniRepoCard repo={r} />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center text-[#4A6080]">
              <Github size={32} className="mx-auto mb-3 opacity-30" />
              <p className="font-mono text-sm mb-3">Add GITHUB_TOKEN & GITHUB_USERNAME to .env.local</p>
              <code className="text-xs bg-[#0F1A2E] px-2 py-1 rounded">
                GITHUB_USERNAME=omkarrr2533{'\n'}GITHUB_TOKEN=ghp_...
              </code>
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link href="/projects" className="btn-secondary text-sm inline-flex">All Projects <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ── QUICK SKILLS ── */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <span className="section-badge mb-4 block w-fit mx-auto">// tech stack</span>
          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
            {[
              { label: 'Java', icon: '☕', accent: '#b07219' },
              { label: 'Spring Boot', icon: '🌱', accent: '#6DB33F' },
              { label: 'Python', icon: '🐍', accent: '#3572A5' },
              { label: 'PyTorch', icon: '🔥', accent: '#EE4C2C' },
              { label: 'PostgreSQL', icon: '🐘', accent: '#336791' },
              { label: 'REST API', icon: '⚡', accent: '#F59E0B' },
              { label: 'Socket.io', icon: '🔌', accent: '#010101' },
              { label: 'DSA', icon: '🧠', accent: '#8B5CF6' },
              { label: 'Git', icon: '📦', accent: '#F05032' },
              { label: 'LLMs', icon: '🤖', accent: '#10B981' },
            ].map(t => (
              <div key={t.label} className="glass-card px-4 py-2 flex items-center gap-2 group hover:scale-105 transition-transform cursor-default">
                <span className="text-base">{t.icon}</span>
                <span className="font-mono text-sm font-600" style={{ color: t.accent }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="glass-card p-10 text-center max-w-2xl mx-auto"
            style={{ background: 'linear-gradient(135deg,rgba(59,130,246,0.1),rgba(139,92,246,0.1))', borderColor: 'rgba(59,130,246,0.2)' }}>
            <Zap size={36} className="text-[#60A5FA] mx-auto mb-4" />
            <h3 className="text-2xl font-800 text-[#E8F0FE] mb-3">Open to Collaboration</h3>
            <p className="text-[#8EA4C8] text-sm mb-6">
              Interested in backend projects, AI/ML experiments, or open source? Let's build something together.
            </p>
            <Link href="/contact" className="btn-primary">
              Get In Touch <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}