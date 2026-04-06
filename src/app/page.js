'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Github, Linkedin, Mail, ExternalLink, Download,
  ArrowRight, Star, GitFork, Camera, Code2, Terminal,
  Zap, Award, TrendingUp, Lock, Globe, Cpu, BusFront,
  ChevronDown, MapPin, Edit3, Check, X,
} from 'lucide-react'

/* ── Typewriter ─────────────────────────────────────────────── */
function useTypewriter(words, speed = 75, pause = 2200) {
  const [display, setDisplay] = useState('')
  const [wi, setWi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const cur = words[wi]
    let t
    if (!del && ci <= cur.length)      t = setTimeout(() => setCi(c => c + 1), speed)
    else if (!del && ci > cur.length)  t = setTimeout(() => setDel(true), pause)
    else if (del && ci > 0)            t = setTimeout(() => setCi(c => c - 1), speed / 2)
    else { setDel(false); setWi(i => (i + 1) % words.length) }
    setDisplay(cur.substring(0, ci))
    return () => clearTimeout(t)
  }, [ci, del, wi, words, speed, pause])

  return display
}

/* ── Counter animation ──────────────────────────────────────── */
function useCounter(target, duration = 1800, delay = 0, started = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    const id = setTimeout(() => {
      const t0 = Date.now()
      const step = () => {
        const p = Math.min((Date.now() - t0) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setCount(Math.round(eased * target))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(id)
  }, [started, target, duration, delay])
  return count
}

/* ── Language colours ───────────────────────────────────────── */
const LANG_CLR = {
  JavaScript: '#F1E05A', TypeScript: '#3178C6', Python: '#3572A5',
  Java: '#B07219', Go: '#00ADD8', CSS: '#563D7C', HTML: '#E34C26',
  'C++': '#F34B7D', Rust: '#DEA584',
}

/* ── Editable inline text ───────────────────────────────────── */
function Editable({ value, onChange, tag: Tag = 'span', className = '', multiline = false }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef(null)

  useEffect(() => { if (editing) inputRef.current?.focus() }, [editing])

  const save = () => { onChange(draft); setEditing(false) }
  const cancel = () => { setDraft(value); setEditing(false) }

  if (!editing) {
    return (
      <Tag
        onClick={() => { setDraft(value); setEditing(true) }}
        className={`cursor-pointer group relative inline-block rounded px-0.5 -mx-0.5 transition-colors hover:bg-blue-500/10 hover:outline hover:outline-1 hover:outline-blue-500/30 ${className}`}
        title="Click to edit"
      >
        {value}
        <Edit3 size={10} className="inline ml-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Tag>
    )
  }

  return (
    <span className="inline-flex flex-col gap-1">
      {multiline ? (
        <textarea
          ref={inputRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          rows={3}
          className={`input-dark text-sm resize-none ${className}`}
          onKeyDown={e => { if (e.key === 'Escape') cancel() }}
        />
      ) : (
        <input
          ref={inputRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          className={`input-dark text-sm ${className}`}
          onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') cancel() }}
        />
      )}
      <span className="flex gap-1">
        <button onClick={save}   className="btn btn-primary btn-sm py-1 px-2 text-xs"><Check size={11}/> Save</button>
        <button onClick={cancel} className="btn btn-ghost  btn-sm py-1 px-2 text-xs"><X size={11}/></button>
      </span>
    </span>
  )
}

/* ── Profile photo uploader ─────────────────────────────────── */
function ProfilePhoto({ photo, onUpload }) {
  const ref = useRef(null)
  const [hov, setHov] = useState(false)

  return (
    <div
      className="relative mx-auto lg:mx-0"
      style={{ width: 260, height: 260 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Outer glow rings */}
      <div className="absolute inset-0 rounded-2xl"
        style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(99,102,241,0.2))', filter: 'blur(20px)', transform: 'scale(1.1)' }} />
      <div className="absolute inset-0 rounded-2xl border-2"
        style={{ borderColor: 'rgba(59,130,246,0.25)' }} />

      <div className="absolute inset-[2px] rounded-[14px] overflow-hidden bg-[#0C1528] flex items-center justify-center">
        {photo ? (
          <img src={photo} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)', fontFamily: 'Syne, sans-serif' }}
            >
              OK
            </div>
            <span className="text-xs text-[#4A6090] font-mono">Click to upload</span>
          </div>
        )}

        {/* Upload overlay */}
        <div
          onClick={() => ref.current?.click()}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300"
          style={{
            background: 'rgba(4,9,26,0.6)',
            backdropFilter: 'blur(4px)',
            opacity: hov ? 1 : 0,
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <Camera size={18} className="text-blue-400" />
          </div>
          <span className="text-xs text-white font-mono font-medium">Upload Photo</span>
        </div>
      </div>

      {/* Corner deco */}
      <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-blue-500/40 rounded-br-lg" />
      <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-violet-500/40 rounded-tl-lg" />

      {/* Animated dot */}
      <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0C1528] animate-pulse-glow" />

      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => {
          const f = e.target.files?.[0]
          if (!f) return
          const reader = new FileReader()
          reader.onload = ev => onUpload(ev.target.result)
          reader.readAsDataURL(f)
        }}
      />
    </div>
  )
}

/* ── Mini stat pill ─────────────────────────────────────────── */
function StatPill({ icon: Icon, value, label, accent, delay = 0, started }) {
  const n = parseInt(value)
  const isNum = !isNaN(n)
  const cnt = useCounter(isNum ? n : 0, 1600, delay, started)
  const display = isNum ? cnt + (value.includes('+') ? '+' : '') : value

  return (
    <div
      className="stat-card flex items-center gap-3 animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${accent}14`, border: `1px solid ${accent}25` }}
      >
        <Icon size={15} style={{ color: accent }} />
      </div>
      <div>
        <div className="text-sm font-bold font-mono text-[#EDF2FF]">{isNum ? display : value}</div>
        <div className="text-[10px] text-[#4A6090] leading-none mt-0.5">{label}</div>
      </div>
    </div>
  )
}

/* ── Repo card ──────────────────────────────────────────────── */
function RepoCard({ repo, index }) {
  const langColor = LANG_CLR[repo.language] || '#8b949e'
  const d = repo.pushedAt
    ? Math.floor((Date.now() - new Date(repo.pushedAt)) / 86400000)
    : null
  const ago = d === null ? '' : d === 0 ? 'today' : d === 1 ? '1d ago' : d < 30 ? `${d}d ago` : `${Math.floor(d/30)}mo ago`

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card glass-card-interactive p-4 block card-shine animate-slide-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-1.5">
          {repo.isPrivate ? <Lock size={12} className="text-[#4A6090]" /> : <Globe size={12} className="text-[#4A6090]" />}
          <span className="font-mono text-sm font-semibold text-[#60A5FA] truncate max-w-[140px]">{repo.name}</span>
        </div>
        <ArrowRight size={12} className="text-[#4A6090] flex-shrink-0 mt-0.5" />
      </div>
      <p className="text-xs text-[#4A6090] line-clamp-2 mb-3 min-h-[32px] leading-relaxed">
        {repo.description || 'No description provided'}
      </p>
      <div className="flex items-center gap-3 text-[11px] text-[#4A6090]">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: langColor }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1"><Star size={10} />{repo.stars}</span>
        <span className="flex items-center gap-1"><GitFork size={10} />{repo.forks}</span>
        {ago && <span className="ml-auto">{ago}</span>}
      </div>
    </a>
  )
}

/* ── Hardcoded featured projects ────────────────────────────── */
const FEATURED = [
  {
    id: 'fp1',
    tag: 'Computer Vision · AI',
    name: 'Hand Sign Detection',
    headline: 'Real-time gesture recognition via deep learning',
    desc: 'Detects & classifies hand gestures from live webcam feed using MediaPipe for landmark detection and a custom CNN trained with PyTorch — supports full ASL alphabet.',
    tech: ['Python', 'PyTorch', 'MediaPipe', 'OpenCV'],
    github: 'https://github.com/omkarrr2533/Hand_Sign_Detection_Using_Python.git',
    accent: '#3B82F6',
    gradient: 'from-blue-600/20 to-indigo-600/20',
    icon: Cpu,
  },
  {
    id: 'fp2',
    tag: 'Full Stack · Real-time',
    name: 'City Bus Tracking',
    headline: 'Live bus location tracking for public transport',
    desc: 'Real-time tracking with WebSocket location updates, Leaflet Map integration for route visualisation, and a Spring Boot REST backend managing API and data flow.',
    tech: ['Java', 'Spring Boot', 'WebSocket', 'Leaflet.js'],
    github: 'https://github.com/omkarrr2533/BUS-ETA.git',
    accent: '#10B981',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    icon: BusFront,
  },
]

function FeaturedCard({ project, index }) {
  const Icon = project.icon
  return (
    <div
      className="glass-card glass-card-interactive overflow-hidden card-shine animate-slide-up"
      style={{ animationDelay: `${index * 120}ms`, animationFillMode: 'both' }}
    >
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }} />
      <div className={`h-28 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: `${project.accent}18`, border: `1px solid ${project.accent}30` }}
        >
          <Icon size={26} style={{ color: project.accent }} />
        </div>
      </div>
      <div className="p-5">
        <span
          className="inline-block text-[10px] font-mono font-semibold mb-2 px-2 py-0.5 rounded"
          style={{ background: `${project.accent}14`, color: project.accent, border: `1px solid ${project.accent}25` }}
        >
          {project.tag}
        </span>
        <h3 className="font-bold text-base text-[#EDF2FF] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{project.name}</h3>
        <p className="text-[13px] font-semibold mb-2" style={{ color: project.accent }}>{project.headline}</p>
        <p className="text-xs text-[#4A6090] leading-relaxed mb-3">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-semibold text-[#4A6090] hover:text-[#EDF2FF] transition-colors group"
        >
          <Github size={13} />
          View Source
          <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </a>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [photo,            setPhoto]            = useState(null)
  const [info,             setInfo]             = useState({
    name: 'Om Shripad Kapale',
    title: 'Backend Developer & AI/ML Enthusiast',
    location: 'Mumbai, India · Open to Opportunities',
    bio: 'CSE 3rd year B.Tech student in the top 5% of college with 8.11 CGPA. I build scalable backend systems, explore AI/ML frontiers, and contribute to open source across 6+ organisations.',
    stack: 'Java · Spring Boot · Python · PyTorch · PostgreSQL · REST API',
  })
  const [repos,            setRepos]            = useState([])
  const [ghStats,          setGhStats]          = useState(null)
  const [loading,          setLoading]          = useState(true)
  const [githubOk,         setGithubOk]         = useState(true)
  const [statsVisible,     setStatsVisible]     = useState(false)
  const statsRef = useRef(null)

  /* Load saved data */
  useEffect(() => {
    try {
      const p = localStorage.getItem('profilePhoto')
      if (p) setPhoto(p)
      const i = localStorage.getItem('portfolioInfo')
      if (i) setInfo(JSON.parse(i))
    } catch {}
  }, [])

  /* Save info on change */
  const updateInfo = useCallback((key, val) => {
    setInfo(prev => {
      const next = { ...prev, [key]: val }
      try { localStorage.setItem('portfolioInfo', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  /* Fetch GitHub */
  useEffect(() => {
    Promise.all([
      fetch('/api/github/status').then(r => r.json()),
      fetch('/api/github/repos?sort=stars&per_page=12').then(r => r.json()),
    ]).then(([st, rp]) => {
      if (st.success && st.data) { setGhStats(st.data); setGithubOk(true) }
      else setGithubOk(false)
      if (rp.success && rp.data?.length) setRepos(rp.data.filter(r => !r.isFork).slice(0, 6))
    }).catch(() => setGithubOk(false)).finally(() => setLoading(false))
  }, [])

  /* Intersection observer for counter animation */
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const roles = ['Backend Developer', 'AI/ML Enthusiast', 'Open Source Contributor', 'Problem Solver', 'Data Scientist']
  const role = useTypewriter(roles)

  const STATS = ghStats ? [
    { icon: Award,      value: '8.11',               label: 'CGPA',      accent: '#10B981', delay: 0   },
    { icon: Star,       value: String(ghStats.totalStars), label: 'GitHub Stars', accent: '#F59E0B', delay: 80  },
    { icon: Code2,      value: String(ghStats.totalRepos), label: 'Repositories', accent: '#3B82F6', delay: 160 },
    { icon: TrendingUp, value: String(ghStats.followers),  label: 'Followers',    accent: '#8B5CF6', delay: 240 },
  ] : [
    { icon: Award,      value: '8.11', label: 'CGPA',          accent: '#10B981', delay: 0   },
    { icon: Star,       value: 'Top 5%', label: 'College Rank', accent: '#F59E0B', delay: 80  },
    { icon: Code2,      value: '6+',   label: 'Certifications', accent: '#3B82F6', delay: 160 },
    { icon: TrendingUp, value: '6+',   label: 'OSS Orgs',      accent: '#8B5CF6', delay: 240 },
  ]

  const handlePhoto = (b64) => {
    setPhoto(b64)
    try { localStorage.setItem('profilePhoto', b64) } catch {}
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #04091A 0%, #080F22 60%, #04091A 100%)' }}>

      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">

        {/* Background layers */}
        <div className="absolute inset-0 bg-grid opacity-70 pointer-events-none" />
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(59,130,246,0.09), transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(139,92,246,0.07), transparent 65%)' }}
        />

        <div className="container mx-auto px-4 sm:px-6 py-24 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center max-w-6xl mx-auto">

            {/* ── Left: Text ── */}
            <div>
              {/* Badge */}
              <div className="section-badge mb-6 animate-fade-in" style={{ animationFillMode: 'both' }}>
                // open to opportunities · mumbai, india
              </div>

              {/* Name */}
              <div className="animate-slide-up delay-100" style={{ animationFillMode: 'both' }}>
                <p className="text-sm font-mono text-[#4A6090] mb-2 tracking-widest uppercase">Hello World, I'm</p>
                <h1 className="text-hero gradient-text mb-4 text-glow-blue" style={{ fontSize: 'clamp(40px,7vw,76px)' }}>
                  <Editable value={info.name} onChange={v => updateInfo('name', v)} />
                </h1>
              </div>

              {/* Typewriter */}
              <div className="flex items-center gap-2.5 mb-6 animate-slide-up delay-200" style={{ animationFillMode: 'both' }}>
                <Terminal size={15} className="text-blue-500 flex-shrink-0" />
                <p className="font-mono text-base sm:text-lg text-[#8EA8D8]">
                  <span className="text-[#60A5FA]">~/om $ </span>
                  <span className="text-[#EDF2FF]">{role}</span>
                  <span className="cursor-blink" />
                </p>
              </div>

              {/* Bio */}
              <p className="text-[#4A6090] text-base leading-relaxed mb-2 max-w-lg animate-slide-up delay-300" style={{ animationFillMode: 'both' }}>
                <Editable value={info.bio} onChange={v => updateInfo('bio', v)} multiline className="w-full max-w-lg" />
              </p>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs text-[#2A3A55] font-mono mb-4 animate-slide-up delay-350" style={{ animationFillMode: 'both' }}>
                <MapPin size={11} />
                <Editable value={info.location} onChange={v => updateInfo('location', v)} className="text-xs" />
              </div>

              {/* Stack */}
              <div className="mb-8 animate-slide-up delay-400" style={{ animationFillMode: 'both' }}>
                <p className="text-[10px] font-mono text-[#2A3A55] uppercase tracking-widest mb-2">Current Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {info.stack.split('·').map(t => t.trim()).filter(Boolean).map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8 animate-slide-up delay-500" style={{ animationFillMode: 'both' }}>
                <Link href="/projects" className="btn btn-primary btn-lg group">
                  View Projects
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="/resume.pdf" download className="btn btn-secondary btn-lg">
                  <Download size={15} /> Resume
                </a>
                <Link href="/contact" className="btn btn-ghost btn-lg">
                  Hire Me
                </Link>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4 animate-slide-up delay-600" style={{ animationFillMode: 'both' }}>
                {[
                  { icon: Github,       url: 'https://github.com/omkarrr2533',                   label: '@omkarrr2533' },
                  { icon: Linkedin,     url: 'https://www.linkedin.com/in/om-kapale-b861a228a', label: 'Om Kapale' },
                  { icon: Mail,         url: 'mailto:omshripadkapale@gmail.com',                label: 'Email' },
                  { icon: ExternalLink, url: 'https://leetcode.com/u/omi_/',                    label: 'LeetCode' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target={s.url.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    title={s.label}
                    className="flex items-center gap-1.5 text-[#4A6090] hover:text-[#60A5FA] transition-colors duration-200 group"
                  >
                    <s.icon size={16} className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* ── Right: Photo + Terminal ── */}
            <div className="flex flex-col items-center gap-6 animate-slide-up delay-300" style={{ animationFillMode: 'both' }}>
              <ProfilePhoto photo={photo} onUpload={handlePhoto} />

              {/* Stats pills */}
              <div ref={statsRef} className="grid grid-cols-2 gap-2 w-full max-w-xs">
                {STATS.map(s => (
                  <StatPill key={s.label} {...s} started={statsVisible} />
                ))}
              </div>

              {/* Terminal card */}
              <div className="terminal w-full max-w-xs animate-slide-up delay-700" style={{ animationFillMode: 'both' }}>
                <div className="terminal-header">
                  <div className="terminal-dot" style={{ background: '#FF5F56' }} />
                  <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
                  <div className="terminal-dot" style={{ background: '#27C93F' }} />
                  <span className="ml-2 text-[10px] font-mono text-[#4A6090]">om@portfolio ~ bash</span>
                </div>
                <div className="terminal-body text-[12px]">
                  <div><span className="t-muted">$ </span><span className="t-blue">whoami</span></div>
                  <div className="t-green">om-shripad-kapale</div>
                  <div className="mt-1"><span className="t-muted">$ </span><span className="t-blue">cat skills.txt</span></div>
                  <div className="t-violet">Java · Spring Boot · Python</div>
                  <div className="t-violet">PyTorch · PostgreSQL · DSA</div>
                  <div className="mt-1"><span className="t-muted">$ </span><span className="t-blue">echo $STATUS</span></div>
                  <div><span className="t-amber">🟡 </span><span className="t-white">Open to opportunities</span></div>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="t-muted">$ </span>
                    <span className="cursor-blink" style={{ width: '7px', height: '13px', display: 'inline-block' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="flex justify-center mt-16 animate-float">
            <div className="flex flex-col items-center gap-1 text-[#2A3A55]">
              <span className="text-[10px] font-mono tracking-widest">SCROLL</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          PROJECTS / REPOS
      ═══════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.04), transparent)' }} />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="section-badge mb-3 block w-fit">
                {githubOk && repos.length > 0 ? '// github · live sync' : '// featured projects'}
              </span>
              <h2 className="section-heading" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
                {githubOk && repos.length > 0
                  ? <>Top <span className="gradient-text">Repositories</span></>
                  : <>Featured <span className="gradient-text">Projects</span></>
                }
              </h2>
            </div>
            <Link href="/projects" className="btn btn-secondary btn-sm">
              All Projects <ArrowRight size={13} />
            </Link>
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="glass-card p-5 h-36">
                  <div className="skeleton h-4 w-32 mb-3 rounded" />
                  <div className="skeleton h-3 w-full mb-2 rounded" />
                  <div className="skeleton h-3 w-4/5 rounded" />
                </div>
              ))}
            </div>
          )}

          {!loading && repos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((r, i) => <RepoCard key={r.id} repo={r} index={i} />)}
            </div>
          )}

          {!loading && repos.length === 0 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {FEATURED.map((p, i) => <FeaturedCard key={p.id} project={p} index={i} />)}
              </div>
              <div
                className="glass-card p-5 text-center max-w-md mx-auto"
                style={{ borderColor: 'rgba(59,130,246,0.15)', background: 'rgba(59,130,246,0.04)' }}
              >
                <Github size={18} className="text-[#4A6090] mx-auto mb-2" />
                <p className="text-xs text-[#4A6090] font-mono">
                  Add <code className="text-[#60A5FA]">GITHUB_TOKEN</code> to{' '}
                  <code className="text-[#60A5FA]">.env.local</code> to auto-sync all GitHub repos
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════
          TECH STACK STRIP
      ═══════════════════════════════════ */}
      <section className="py-16 relative overflow-hidden">
        <div className="section-divider mb-16" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="section-badge mx-auto">// tech stack</span>
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center max-w-3xl mx-auto">
            {[
              { label: 'Java',       icon: '☕', accent: '#B07219' },
              { label: 'Spring Boot',icon: '🌱', accent: '#6DB33F' },
              { label: 'Python',     icon: '🐍', accent: '#3572A5' },
              { label: 'PyTorch',    icon: '🔥', accent: '#EE4C2C' },
              { label: 'PostgreSQL', icon: '🐘', accent: '#336791' },
              { label: 'REST API',   icon: '⚡', accent: '#F59E0B' },
              { label: 'Socket.io',  icon: '🔌', accent: '#010101' },
              { label: 'DSA',        icon: '🧠', accent: '#8B5CF6' },
              { label: 'Git',        icon: '📦', accent: '#F05032' },
              { label: 'LLMs',       icon: '🤖', accent: '#10B981' },
            ].map((t, i) => (
              <div
                key={t.label}
                className="glass-card hover-lift flex items-center gap-2 px-4 py-2 cursor-default animate-slide-up"
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
              >
                <span className="text-base">{t.icon}</span>
                <span className="font-mono text-xs font-semibold" style={{ color: t.accent }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="section-divider mt-16" />
      </section>

      {/* ═══════════════════════════════════
          CTA
      ═══════════════════════════════════ */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className="glass-card p-10 text-center max-w-2xl mx-auto animate-slide-up"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.08))',
              borderColor: 'rgba(59,130,246,0.18)',
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
            >
              <Zap size={24} className="text-white" />
            </div>
            <h3 className="section-heading text-2xl mb-3">Open to Collaboration</h3>
            <p className="text-[#4A6090] text-sm mb-7 max-w-md mx-auto leading-relaxed">
              Interested in backend projects, AI/ML experiments, or open source?
              Let's build something together.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Get In Touch <ArrowRight size={15} />
              </Link>
              <Link href="/projects" className="btn btn-secondary btn-lg">
                See My Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}