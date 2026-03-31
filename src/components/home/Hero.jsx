'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Code2,
  Terminal,
  Layers,
} from 'lucide-react'

// ── Typewriter hook ──────────────────────────────────────────────────
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed)
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2)
    } else {
      setDeleting(false)
      setWordIdx((i) => (i + 1) % words.length)
    }

    setDisplay(current.substring(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

// ── Counter animation hook ───────────────────────────────────────────
function useCounter(target, duration = 2000, delay = 0) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const startTimeout = setTimeout(() => {
      const startTime = Date.now()
      const step = () => {
        const progress = Math.min((Date.now() - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(startTimeout)
  }, [started, target, duration, delay])

  return [count, ref]
}

// ── Stats component ──────────────────────────────────────────────────
function StatItem({ value, suffix, label, delay }) {
  const [count, ref] = useCounter(value, 1800, delay)
  return (
    <div ref={ref} className="stat-card group">
      <div className="font-display text-2xl font-700 text-white mb-0.5">
        <span className="gradient-text-blue">{count}</span>
        <span className="text-[#60A5FA]">{suffix}</span>
      </div>
      <div className="text-xs text-[#8EA4C8] font-medium tracking-wide uppercase">{label}</div>
    </div>
  )
}

// ── Main Hero ────────────────────────────────────────────────────────
export default function Hero() {
  const roles = [
    'Backend Developer',
    'AI/ML Enthusiast',
    'Open Source Contributor',
    'Data Science Learner',
    'Problem Solver',
  ]
  const displayRole = useTypewriter(roles, 75, 2000)

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/omkarrr2533',
      title: '@omkarrr2533',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/om-kapale-b861a228a',
      title: 'Om Kapale',
    },
    {
      icon: Mail,
      label: 'Email',
      url: 'mailto:omshripadkapale@gmail.com',
      title: 'omshripadkapale@gmail.com',
    },
    {
      icon: ExternalLink,
      label: 'LeetCode',
      url: 'https://leetcode.com/u/omi_/',
      title: '@omi_',
    },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 60% -10%, rgba(59,130,246,0.12), transparent 70%), radial-gradient(ellipse 60% 40% at 10% 80%, rgba(139,92,246,0.08), transparent 60%)',
        }}
      />

      {/* ── Decorative orbs ── */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          top: '-15%',
          right: '-5%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          bottom: '10%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.06), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 py-32 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* ── Location badge ── */}
          <div
            className="animate-fade-in delay-100 inline-flex items-center gap-2 mb-6"
            style={{ animationFillMode: 'both' }}
          >
            <span className="section-badge">
              <MapPin size={11} />
              Mumbai, India · Open to Opportunities
            </span>
          </div>

          {/* ── Name ── */}
          <div
            className="animate-slide-up delay-200"
            style={{ animationFillMode: 'both' }}
          >
            <h1 className="font-display font-800 leading-[1.05] tracking-tight mb-4">
              <span
                className="block text-[#8EA4C8] text-xl sm:text-2xl font-500 mb-2 tracking-widest uppercase font-mono"
                style={{ fontSize: 'clamp(13px, 2vw, 18px)' }}
              >
                Hi, I'm
              </span>
              <span
                className="gradient-text block"
                style={{ fontSize: 'clamp(48px, 8vw, 88px)' }}
              >
                Om Shripad
              </span>
              <span
                className="text-[#E8F0FE] block"
                style={{ fontSize: 'clamp(48px, 8vw, 88px)' }}
              >
                Kapale
              </span>
            </h1>
          </div>

          {/* ── Typewriter role ── */}
          <div
            className="animate-slide-up delay-300 flex items-center gap-3 mb-8"
            style={{ animationFillMode: 'both' }}
          >
            <Terminal size={18} className="text-[#3B82F6] shrink-0" />
            <p
              className="font-mono text-[#8EA4C8]"
              style={{ fontSize: 'clamp(14px, 2.5vw, 20px)' }}
            >
              <span className="text-[#60A5FA]">~/om $</span>{' '}
              <span className="text-[#E8F0FE]">{displayRole}</span>
              <span className="cursor-blink" />
            </p>
          </div>

          {/* ── Bio ── */}
          <div
            className="animate-slide-up delay-400"
            style={{ animationFillMode: 'both', maxWidth: '680px' }}
          >
            <p className="text-[#8EA4C8] text-base sm:text-lg leading-relaxed mb-8">
              CSE 3rd year B.Tech student ranked in the{' '}
              <span className="text-[#34D399] font-600">top 5% of my college</span> with{' '}
              <span className="text-[#60A5FA] font-600">8.11 CGPA</span>. I build scalable
              backend systems, explore AI/ML frontiers, and contribute to open source across{' '}
              <span className="text-[#A78BFA] font-600">6+ organisations</span>.
            </p>
          </div>

          {/* ── Stats row ── */}
          <div
            className="animate-slide-up delay-500 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
            style={{ animationFillMode: 'both', maxWidth: '580px' }}
          >
            <StatItem value={8} suffix=".11" label="CGPA" delay={0} />
            <StatItem value={5} suffix="%" label="Top Rank" delay={100} />
            <StatItem value={6} suffix="+" label="Certifications" delay={200} />
            <StatItem value={6} suffix="+" label="OSS Orgs" delay={300} />
          </div>

          {/* ── CTA buttons ── */}
          <div
            className="animate-slide-up delay-600 flex flex-wrap gap-3 mb-10"
            style={{ animationFillMode: 'both' }}
          >
            <Link href="/projects" className="btn-primary group">
              View My Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="/resume.pdf" download className="btn-secondary group">
              <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
              Resume
            </a>
            <Link href="/contact" className="btn-secondary">
              Let's Connect
            </Link>
          </div>

          {/* ── Social links ── */}
          <div
            className="animate-slide-up delay-700 flex flex-wrap items-center gap-4"
            style={{ animationFillMode: 'both' }}
          >
            {socialLinks.map(({ icon: Icon, label, url, title }) => (
              <a
                key={label}
                href={url}
                target={url.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                title={title}
                className="flex items-center gap-2 text-[#4A6080] hover:text-[#60A5FA] group"
              >
                <Icon size={16} className="transition-transform group-hover:scale-110" />
                <span className="text-sm font-mono hidden sm:block">{title}</span>
              </a>
            ))}
          </div>

          {/* ── Quick tech strip ── */}
          <div
            className="animate-fade-in delay-800 mt-16 pt-8 border-t"
            style={{
              animationFillMode: 'both',
              borderColor: 'rgba(99,120,162,0.15)',
              maxWidth: '680px',
            }}
          >
            <p className="text-xs font-mono text-[#4A6080] uppercase tracking-widest mb-4">
              Current Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {['Java', 'Spring Boot', 'Python', 'PyTorch', 'PostgreSQL', 'REST API', 'Socket.io', 'DSA'].map(
                (t) => (
                  <span key={t} className="tech-badge">
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #060D1F, transparent)',
        }}
      />
    </section>
  )
}
