'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Github, Linkedin, Mail, ExternalLink, Download,
  ArrowRight, Star, GitFork, Camera, Code2, Terminal,
  Zap, Award, TrendingUp, Lock, Globe, Cpu, BusFront,
  ChevronDown, MapPin, Plus, Trash2, X, Check, Edit3,
} from 'lucide-react'
import { AdminOnly, useAdmin } from '@/lib/admin'

/* ── Typewriter ─────────────────────────────────── */
function useTypewriter(words, speed = 70, pause = 2000) {
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

/* ── Counter ────────────────────────────────────── */
function useCounter(target, duration = 1600, delay = 0, started = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    const id = setTimeout(() => {
      const t0 = Date.now()
      const step = () => {
        const p = Math.min((Date.now() - t0) / duration, 1)
        setCount(Math.round((1 - Math.pow(1 - p, 3)) * target))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(id)
  }, [started, target, duration, delay])
  return count
}

const LANG_CLR = {
  JavaScript:'#F59E0B', TypeScript:'#3B82F6', Python:'#8B5CF6',
  Java:'#EF4444', Go:'#06B6D4', CSS:'#EC4899', HTML:'#F97316',
  'C++':'#14B8A6', Rust:'#F97316',
}

/* ── Stat pill ──────────────────────────────────── */
function StatPill({ icon: Icon, value, label, accent, delay = 0, started }) {
  const n = parseInt(value)
  const isNum = !isNaN(n)
  const cnt = useCounter(isNum ? n : 0, 1400, delay, started)
  const display = isNum ? cnt + (String(value).includes('+') ? '+' : '') : value

  return (
    <div
      className="stat-card flex items-center gap-3 animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: `${accent}14`,
          border: `1px solid ${accent}25`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={15} style={{ color: accent }} />
      </div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.2 }}>
          {isNum ? display : value}
        </div>
        <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>{label}</div>
      </div>
    </div>
  )
}

/* ── Repo card ──────────────────────────────────── */
function RepoCard({ repo, index }) {
  const lc = LANG_CLR[repo.language] || '#94A3B8'
  const d = repo.pushedAt ? Math.floor((Date.now() - new Date(repo.pushedAt)) / 86400000) : null
  const ago = d === null ? '' : d === 0 ? 'today' : d === 1 ? '1d ago' : d < 30 ? `${d}d ago` : `${Math.floor(d/30)}mo ago`

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-lift animate-slide-up"
      style={{
        display: 'block',
        padding: '16px 18px',
        animationDelay: `${index * 55}ms`,
        animationFillMode: 'both',
        textDecoration: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {repo.isPrivate ? <Lock size={12} color="#94A3B8" /> : <Globe size={12} color="#94A3B8" />}
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: '#4F46E5', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {repo.name}
          </span>
        </div>
        <ArrowRight size={12} color="#CBD5E1" />
      </div>
      <p className="line-clamp-2" style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6, marginBottom: 12, minHeight: 38 }}>
        {repo.description || 'No description provided'}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: '#94A3B8' }}>
        {repo.language && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: lc, display: 'inline-block' }} />
            {repo.language}
          </span>
        )}
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Star size={10} />{repo.stars}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><GitFork size={10} />{repo.forks}</span>
        {ago && <span style={{ marginLeft: 'auto' }}>{ago}</span>}
      </div>
    </a>
  )
}

/* ── Featured projects ──────────────────────────── */
const FEATURED = [
  {
    id:'fp1', tag:'Computer Vision · AI', name:'Hand Sign Detection',
    headline:'Real-time gesture recognition via deep learning',
    desc:'Detects hand gestures from live webcam using MediaPipe + a custom PyTorch CNN. Supports full ASL alphabet.',
    tech:['Python','PyTorch','MediaPipe','OpenCV'],
    github:'https://github.com/omkarrr2533/Hand_Sign_Detection_Using_Python.git',
    accent:'#4F46E5', icon: Cpu,
  },
  {
    id:'fp2', tag:'Full Stack · Real-time', name:'City Bus Tracking',
    headline:'Live bus location tracking for public transport',
    desc:'Spring Boot REST backend + WebSocket location updates + Leaflet Map for route visualisation.',
    tech:['Java','Spring Boot','WebSocket','Leaflet.js'],
    github:'https://github.com/omkarrr2533/BUS-ETA.git',
    accent:'#059669', icon: BusFront,
  },
]

function FeaturedCard({ project, index }) {
  const Icon = project.icon
  return (
    <div
      className="card card-lift animate-slide-up"
      style={{
        overflow: 'hidden',
        animationDelay: `${index * 120}ms`,
        animationFillMode: 'both',
        borderTop: `3px solid ${project.accent}`,
      }}
    >
      <div
        style={{
          height: 100,
          background: `${project.accent}0C`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: `${project.accent}18`,
            border: `1px solid ${project.accent}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={24} color={project.accent} />
        </div>
      </div>
      <div style={{ padding: '18px 20px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '3px 8px',
            background: `${project.accent}12`,
            color: project.accent,
            border: `1px solid ${project.accent}25`,
            borderRadius: 99,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginBottom: 10,
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          {project.tag}
        </span>
        <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#1E293B', marginBottom: 4 }}>
          {project.name}
        </h3>
        <p style={{ fontSize: 13, fontWeight: 600, color: project.accent, marginBottom: 8 }}>{project.headline}</p>
        <p style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.65, marginBottom: 14 }}>{project.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {project.tech.map(t => <span key={t} className="tech-pill" style={{ fontSize: 11 }}>{t}</span>)}
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#64748B', transition: 'color 150ms ease' }}
        >
          <Github size={13} />
          View Source
          <ArrowRight size={11} />
        </a>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function HomePage() {
  const [photo,        setPhoto]     = useState(null)
  const [info,         setInfo]      = useState({
    name: 'Om Shripad Kapale',
    bio: 'CSE 3rd year B.Tech student in the top 5% of college with 8.11 CGPA. I build scalable backend systems, explore AI/ML frontiers, and contribute to open source across 6+ organisations.',
    stack: 'Java · Spring Boot · Python · PyTorch · PostgreSQL · REST API',
  })
  const [repos,        setRepos]     = useState([])
  const [ghStats,      setGhStats]   = useState(null)
  const [loading,      setLoading]   = useState(true)
  const [ghOk,         setGhOk]      = useState(true)
  const [statsVisible, setVisible]   = useState(false)
  const statsRef = useRef(null)
  const photoRef = useRef(null)
  const admin = useAdmin()

  /* Load saved */
  useEffect(() => {
    try {
      const p = localStorage.getItem('profilePhoto')
      if (p) setPhoto(p)
      const i = localStorage.getItem('portfolioInfo')
      if (i) setInfo(JSON.parse(i))
    } catch {}
  }, [])

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
      if (st.success && st.data) { setGhStats(st.data); setGhOk(true) }
      else setGhOk(false)
      if (rp.success && rp.data?.length) setRepos(rp.data.filter(r => !r.isFork).slice(0, 6))
    }).catch(() => setGhOk(false)).finally(() => setLoading(false))
  }, [])

  /* Intersection for counters */
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const roles = ['Backend Developer', 'AI/ML Enthusiast', 'Open Source Contributor', 'Data Scientist', 'Problem Solver']
  const role = useTypewriter(roles)

  const STATS = ghStats ? [
    { icon: Award,      value: '8.11',                  label: 'CGPA',          accent: '#059669', delay: 0   },
    { icon: Star,       value: String(ghStats.totalStars), label: 'GitHub Stars', accent: '#D97706', delay: 80  },
    { icon: Code2,      value: String(ghStats.totalRepos), label: 'Repositories', accent: '#4F46E5', delay: 160 },
    { icon: TrendingUp, value: String(ghStats.followers),  label: 'Followers',    accent: '#7C3AED', delay: 240 },
  ] : [
    { icon: Award,      value: '8.11',  label: 'CGPA',           accent: '#059669', delay: 0   },
    { icon: Star,       value: 'Top 5%',label: 'College Rank',   accent: '#D97706', delay: 80  },
    { icon: Code2,      value: '6+',    label: 'Certifications', accent: '#4F46E5', delay: 160 },
    { icon: TrendingUp, value: '6+',    label: 'OSS Orgs',       accent: '#7C3AED', delay: 240 },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>

      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: 64,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(79,70,229,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,.04) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            pointerEvents: 'none',
          }}
        />
        {/* Accent blobs */}
        <div style={{ position:'absolute', top:'-10%', right:'-5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(79,70,229,.07), transparent 70%)', filter:'blur(40px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'5%', left:'-5%', width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,.05), transparent 70%)', filter:'blur(40px)', pointerEvents:'none' }} />

        <div className="container" style={{ paddingTop: 80, paddingBottom: 80, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 56, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>

            {/* ── Text col ── */}
            <div>
              <div className="section-label animate-fade-in" style={{ marginBottom: 20, animationFillMode: 'both' }}>
                // open to opportunities
              </div>

              {/* Name */}
              <div className="animate-slide-up delay-100" style={{ animationFillMode: 'both' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#94A3B8', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Hello World, I'm
                </p>
                <h1
                  className="text-hero gradient-text"
                  style={{
                    fontSize: 'clamp(42px,7vw,78px)',
                    marginBottom: 16,
                    /* FIX: prevent blurry text in hero */
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                >
                  {info.name}
                </h1>
              </div>

              {/* Typewriter */}
              <div className="animate-slide-up delay-200" style={{ animationFillMode: 'both', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <Terminal size={15} color="#4F46E5" />
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15, color: '#475569' }}>
                  <span style={{ color: '#4F46E5' }}>~/om $ </span>
                  <span style={{ color: '#1E293B' }}>{role}</span>
                  <span className="cursor-blink" />
                </p>
              </div>

              {/* Bio */}
             <div className="animate-slide-up delay-300" style={{ animationFillMode: 'both', position: 'relative', maxWidth: 520, marginBottom: 20 }}>
  {editingBio ? (
    <div>
      <textarea
        value={info.bio}
        onChange={e => updateInfo('bio', e.target.value)}
        rows={4}
        autoFocus
        style={{ width: '100%', background: '#fff', border: '1px solid #C7D2FE', borderRadius: 8, padding: '8px 12px', fontSize: 14, fontFamily: 'Plus Jakarta Sans, sans-serif', outline: 'none', resize: 'vertical', color: '#1E293B' }}
      />
      <button onClick={() => setEditingBio(false)} className="btn btn-primary btn-sm" style={{ marginTop: 6 }}>Done</button>
    </div>
  ) : (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
      <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.75, flex: 1 }}>{info.bio}</p>
      <button onClick={() => setEditingBio(true)} title="Edit bio" style={{ color: '#CBD5E1', background: 'none', border: 'none', cursor: 'pointer', padding: 2, marginTop: 3, flexShrink: 0 }}>
        <Edit3 size={13} />
      </button>
    </div>
  )}
</div>
              {/* Location */}
              <div className="animate-slide-up delay-350" style={{ animationFillMode: 'both', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#94A3B8', marginBottom: 20, fontFamily: 'JetBrains Mono, monospace' }}>
                <MapPin size={11} />
                Mumbai, India · Open to Opportunities
              </div>

              {/* Stack */}
              <div className="animate-slide-up delay-400" style={{ animationFillMode: 'both', marginBottom: 28 }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
    <p style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
      Current Stack
    </p>
    <button onClick={() => setEditingStack(true)} title="Edit stack" style={{ color: '#CBD5E1', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
      <Edit3 size={11} />
    </button>
  </div>
  {editingStack ? (
    <div>
      <input
        value={info.stack}
        onChange={e => updateInfo('stack', e.target.value)}
        autoFocus
        placeholder="Java · Spring Boot · Python (use · as separator)"
        style={{ width: '100%', maxWidth: 520, background: '#fff', border: '1px solid #C7D2FE', borderRadius: 8, padding: '8px 12px', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', outline: 'none', color: '#1E293B' }}
      />
      <button onClick={() => setEditingStack(false)} className="btn btn-primary btn-sm" style={{ marginTop: 6 }}>Done</button>
    </div>
  ) : (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {info.stack.split('·').map(t => t.trim()).filter(Boolean).map(t => (
        <span key={t} className="tech-pill">{t}</span>
      ))}
    </div>
  )}
</div>

              {/* CTAs */}
              <div className="animate-slide-up delay-500" style={{ animationFillMode: 'both', display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
                <Link href="/projects" className="btn btn-primary btn-lg">
                  View Projects <ArrowRight size={16} />
                </Link>
                <a href="/resume.pdf" download className="btn btn-secondary btn-lg">
                  <Download size={15} /> Resume
                </a>
                <Link href="/contact" className="btn btn-ghost btn-lg">
                  Hire Me
                </Link>
              </div>

              {/* Socials */}
              <div className="animate-slide-up delay-600" style={{ animationFillMode: 'both', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
                {[
                  { icon: Github,       url: 'https://github.com/omkarrr2533',                   label: '@omkarrr2533' },
                  { icon: Linkedin,     url: 'https://www.linkedin.com/in/om-kapale-b861a228a', label: 'LinkedIn' },
                  { icon: Mail,         url: 'mailto:omshripadkapale@gmail.com',                label: 'Email' },
                  { icon: ExternalLink, url: 'https://leetcode.com/u/omi_/',                    label: 'LeetCode' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target={s.url.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    title={s.label}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#94A3B8', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', textDecoration: 'none', transition: 'color 150ms ease' }}
                  >
                    <s.icon size={15} />
                    <span style={{ display: 'none' }} className="sm-show">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* ── Right col: photo + terminal ── */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

              {/* Photo */}
              <div style={{ position: 'relative', width: 240, height: 240 }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: -8,
                    borderRadius: 24,
                    background: 'linear-gradient(135deg,rgba(79,70,229,.12),rgba(124,58,237,.08))',
                    filter: 'blur(16px)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 20,
                    border: '1px solid rgba(79,70,229,.15)',
                    overflow: 'hidden',
                    background: '#EEF2FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: admin ? 'pointer' : 'default',
                  }}
                  onClick={() => photoRef.current?.click()}
                >
                  {photo ? (
                    <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: 18,
                          background: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'Plus Jakarta Sans, sans-serif',
                          fontWeight: 800,
                          fontSize: 24,
                          color: '#fff',
                          margin: '0 auto 8px',
                        }}
                      >
                        OK
                      </div>
                      <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace' }}>Click to upload</span>
                    </div>
                  )}
                  {photo && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(15,23,42,.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 200ms',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = 1}
                      onMouseLeave={e => e.currentTarget.style.opacity = 0}
                    >
                      <Camera size={20} color="#fff" />
                    </div>
                  )}
                </div>
                {/* Presence dot */}
                <div style={{ position: 'absolute', top: 10, right: 10 }}>
                  <div className="ping-dot">
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', display: 'block', border: '2px solid #fff' }} />
                  </div>
                </div>
                <input ref={photoRef} type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={e => {
                    const f = e.target.files?.[0]; if (!f) return
                    const r = new FileReader()
                    r.onload = ev => { setPhoto(ev.target.result); localStorage.setItem('profilePhoto', ev.target.result) }
                    r.readAsDataURL(f)
                  }} />
              </div>

              {/* Stat pills */}
              <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%', maxWidth: 280 }}>
                {STATS.map(s => <StatPill key={s.label} {...s} started={statsVisible} />)}
              </div>

              {/* Terminal */}
              <div className="terminal animate-slide-up delay-700" style={{ animationFillMode: 'both', width: '100%', maxWidth: 280 }}>
                <div className="terminal-header">
                  <div className="terminal-dot" style={{ background: '#FF5F56' }} />
                  <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
                  <div className="terminal-dot" style={{ background: '#27C93F' }} />
                  <span style={{ marginLeft: 8, fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#475569' }}>
                    om@portfolio ~ bash
                  </span>
                </div>
                <div className="terminal-body">
                  <div><span className="t-muted">$ </span><span className="t-blue">whoami</span></div>
                  <div className="t-green">om-shripad-kapale</div>
                  <div style={{ marginTop: 4 }}><span className="t-muted">$ </span><span className="t-blue">cat skills.txt</span></div>
                  <div className="t-violet">Java · Spring Boot · Python</div>
                  <div className="t-violet">PyTorch · PostgreSQL · DSA</div>
                  <div style={{ marginTop: 4 }}><span className="t-muted">$ </span><span className="t-blue">echo $STATUS</span></div>
                  <div><span className="t-amber">⬤ </span><span className="t-white">Open to opportunities</span></div>
                  <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="t-muted">$ </span>
                    <span className="cursor-blink" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="animate-float" style={{ display: 'flex', justifyContent: 'center', marginTop: 64 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: '#CBD5E1' }}>
              <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em' }}>SCROLL</span>
              <ChevronDown size={15} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          REPOS / PROJECTS
      ═══════════════════════════════════ */}
      <section style={{ padding: '88px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span className="section-label" style={{ marginBottom: 10, display: 'inline-flex' }}>
                {ghOk && repos.length > 0 ? '// github · live sync' : '// featured projects'}
              </span>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,42px)', color: '#1E293B', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                {ghOk && repos.length > 0 ? <><span className="gradient-text">Top</span> Repositories</> : <>Featured <span className="gradient-text">Projects</span></>}
              </h2>
            </div>
            <Link href="/projects" className="btn btn-secondary btn-sm">
              All Projects <ArrowRight size={13} />
            </Link>
          </div>

          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 16 }}>
              {Array(6).fill(0).map((_,i) => (
                <div key={i} className="card" style={{ padding: 18, height: 140 }}>
                  <div className="skeleton" style={{ height: 12, width: 120, marginBottom: 10 }} />
                  <div className="skeleton" style={{ height: 10, width: '100%', marginBottom: 6 }} />
                  <div className="skeleton" style={{ height: 10, width: '75%' }} />
                </div>
              ))}
            </div>
          )}

          {!loading && repos.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 16 }}>
              {repos.map((r, i) => <RepoCard key={r.id} repo={r} index={i} />)}
            </div>
          )}

          {!loading && repos.length === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: 20, marginBottom: 24 }}>
              {FEATURED.map((p,i) => <FeaturedCard key={p.id} project={p} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════
          TECH STRIP
      ═══════════════════════════════════ */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <span className="section-label">// tech stack</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 720, margin: '0 auto' }}>
            {[
              { label:'Java',        icon:'☕' },
              { label:'Spring Boot', icon:'🌱' },
              { label:'Python',      icon:'🐍' },
              { label:'PyTorch',     icon:'🔥' },
              { label:'PostgreSQL',  icon:'🐘' },
              { label:'REST API',    icon:'⚡' },
              { label:'Socket.io',   icon:'🔌' },
              { label:'DSA',         icon:'🧠' },
              { label:'Git',         icon:'📦' },
              { label:'LLMs',        icon:'🤖' },
            ].map((t, i) => (
              <div
                key={t.label}
                className="card animate-slide-up hover-lift"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '8px 14px',
                  cursor: 'default',
                  animationDelay: `${i * 35}ms`,
                  animationFillMode: 'both',
                }}
              >
                <span style={{ fontSize: 14 }}>{t.icon}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600, color: '#4F46E5' }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CTA
      ═══════════════════════════════════ */}
      <section style={{ padding: '64px 0 96px' }}>
        <div className="container">
          <div
            className="card"
            style={{
              padding: '48px 40px',
              textAlign: 'center',
              maxWidth: 640,
              margin: '0 auto',
              background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)',
              borderColor: '#C7D2FE',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <Zap size={22} color="#fff" />
            </div>
            <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 24, color: '#1E293B', marginBottom: 10, letterSpacing: '-0.02em' }}>
              Open to Collaboration
            </h3>
            <p style={{ color: '#64748B', fontSize: 14, marginBottom: 28, lineHeight: 1.7, maxWidth: 440, margin: '0 auto 28px' }}>
              Interested in backend projects, AI/ML experiments, or open source? Let's build something together.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
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

      <style>{`
        @media (min-width: 640px) { .sm-show { display: block!important; } }
        @media (max-width: 639px) { .sm-show { display: none; } }
      `}</style>
    </div>
  )
}