'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SmartImg from '@/components/ui/SmartImg'
import {
  Github, Linkedin, Mail, ArrowRight, ArrowUpRight,
  Download, ChevronDown, Code2, GitPullRequest,
  Trophy, Sprout, MapPin, GraduationCap,
} from 'lucide-react'

import { WovenCanvas } from '@/components/ui/woven-light-hero'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { GlowCard } from '@/components/ui/spotlight-card'
import { CircularTestimonials } from '@/components/ui/circular-testimonials'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const SOCIALS = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/omkarrr2533' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/om-kapale-b861a228a' },
  { icon: Code2, label: 'LeetCode', url: 'https://leetcode.com/u/omii_/' },
  { icon: Mail, label: 'Email', url: 'mailto:omshripadkapale@gmail.com' },
]

const STATS = [
  { value: 1, prefix: '#', label: 'GSoC 2026 Global Rank', sub: 'PEcAn Project' },
  { value: 244, suffix: '+', label: 'LeetCode Solved', sub: '1416 contest rating' },
  { value: 15, suffix: '+', label: 'Merged PRs', sub: '~3000+ lines of code' },
  { value: 5, suffix: '+', label: 'Open Source Orgs', sub: 'PEcAn · Zulip · FreeCAD …' },
]

const PROJECTS = [
  {
    name: 'SatyaCheck',
    desc: 'Chrome extension with a 7-layer AI pipeline that detects misinformation in real time using fine-tuned LLMs and ensemble NLP models.',
    metric: '92.6% detection accuracy',
    tags: ['Python', 'NLP', 'LLMs', 'Chrome Extension'],
    glow: 'green',
    url: 'https://github.com/omkarrr2533',
  },
  {
    name: 'Real-Time Bus Tracker',
    desc: 'Live city-bus positioning with sub-second WebSocket updates, interactive Leaflet.js maps and a Spring Boot REST backend.',
    metric: 'Sub-second live updates',
    tags: ['Node.js', 'WebSockets', 'Spring Boot', 'Leaflet.js'],
    glow: 'blue',
    url: 'https://github.com/omkarrr2533/BUS-ETA.git',
  },
  {
    name: 'Hand Sign Detection',
    desc: 'Real-time ASL alphabet recognition from webcam streams using MediaPipe landmarks and a custom PyTorch CNN.',
    metric: 'Real-time gesture recognition',
    tags: ['PyTorch', 'MediaPipe', 'OpenCV', 'CNN'],
    glow: 'orange',
    url: 'https://github.com/omkarrr2533/Hand_Sign_Detection_Using_Python.git',
  },
]

const OSS_JOURNEY = [
  {
    quote:
      'Selected as the #1 ranked contributor globally for GSoC 2026 at the PEcAn Project. Refactoring the Trait-Meta-analysis-Configuration pipeline to make ecological forecasting more modular, under mentor Mike Dietze of Boston University.',
    name: 'PEcAn Project · GSoC 2026',
    designation: 'Google Summer of Code · Ecological Forecasting',
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1368&auto=format&fit=crop',
  },
  {
    quote:
      'Implemented server-side caching for realm descriptions in Zulip, cutting redundant database queries on high-traffic organisations. Reviewed and merged into the main codebase.',
    name: 'Zulip',
    designation: 'Open Source Contributor · Python / Django',
    src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1368&auto=format&fit=crop',
  },
  {
    quote:
      'Fixed group-merging and library-import bugs in JabRef, and shipped fixes across FreeCAD and CircuitVerse — part of 15+ merged pull requests spanning 5+ open-source organisations.',
    name: 'JabRef · FreeCAD · CircuitVerse',
    designation: 'Open Source Contributor · Java / C++',
    src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1368&auto=format&fit=crop',
  },
]

const SKILLS = [
  { category: 'Languages', items: ['Java', 'Python', 'JavaScript', 'R', 'C'] },
  { category: 'Backend', items: ['Spring Boot', 'Spring AI', 'Django', 'Node.js', 'REST APIs', 'WebSockets'] },
  { category: 'Databases', items: ['PostgreSQL', 'MySQL', 'Redis'] },
  { category: 'AI / ML', items: ['PyTorch', 'LLM Integration', 'RAG Agents', 'NLP', 'MediaPipe'] },
  { category: 'Tools', items: ['Git', 'GitHub Actions', 'Linux', 'Postman'] },
]

/* ─────────────────────────────────────────────────────────
   PRIMITIVES
───────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1]

function CountUp({ to, prefix = '', suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = null
    let raf
    const step = (t) => {
      if (start === null) start = t
      const p = Math.min((t - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  )
}

function SectionHeading({ eyebrow, title, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE }}
      className="text-center mb-14 px-4"
    >
      {eyebrow && <span className="section-badge">{eyebrow}</span>}
      <h2 className="section-heading mt-5" style={{ fontSize: 'clamp(30px, 4.5vw, 48px)' }}>
        {title}
      </h2>
      <span className="accent-line" />
      {sub && <p className="hook-subtext mt-2">{sub}</p>}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────── */
const FLOAT_CHIPS = [
  { label: '#1', sub: 'GSoC Rank', pos: { top: '6%', left: '-7%' }, delay: 1.5 },
  { label: '15+', sub: 'Merged PRs', pos: { bottom: '20%', left: '-9%' }, delay: 1.7 },
  { label: '244+', sub: 'LeetCode', pos: { top: '14%', right: '-8%' }, delay: 1.9 },
  { label: '5+', sub: 'OSS Orgs', pos: { bottom: '8%', right: '-6%' }, delay: 2.1 },
]

function Hero() {
  const name = 'Om Kapale'
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const letterContainer = {
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
  }
  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] } },
  }

  return (
    <section ref={heroRef} className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <WovenCanvas />
      {/* readability scrim over the weave */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(5,8,7,0.45), rgba(5,8,7,0.88) 92%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 pt-28 pb-20 grid items-center gap-10 lg:gap-6 lg:grid-cols-[1.05fr_0.95fr]">

        {/* ── Left: copy ── */}
        <motion.div style={{ y: textY, opacity: fade }} className="text-center lg:text-left order-2 lg:order-1">
          {/* GSoC badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
            className="mb-7 flex justify-center lg:justify-start"
          >
            <span className="available-badge">
              <span className="available-dot" />
              GSoC 2026 · Selected #1 Globally
            </span>
          </motion.div>

          {/* Name — letter by letter */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={letterContainer}
            className="font-display text-white"
            style={{ fontSize: 'clamp(48px, 8vw, 92px)', lineHeight: 1.0, textShadow: '0 0 60px rgba(52,211,153,0.22)' }}
          >
            {name.split(' ').map((word, wi) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split('').map((ch, i) => (
                  <motion.span key={i} variants={letter} className="inline-block">{ch}</motion.span>
                ))}
                {wi < name.split(' ').length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </motion.h1>

          {/* Role line */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.9 }}
            className="mt-5 font-mono text-[11px] sm:text-xs tracking-[0.32em] uppercase"
            style={{ color: '#34D399' }}
          >
            Backend Developer&nbsp;&nbsp;·&nbsp;&nbsp;Open Source Contributor
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.9, ease: EASE }}
            className="mx-auto lg:mx-0 mt-5 max-w-md text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Final-year CSE student weaving scalable backends with Java, Spring Boot
            &amp; Python — and contributing across the open-source ecosystem.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.9, ease: EASE }}
            className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <LiquidButton size="xl" className="rounded-full font-semibold"
              onClick={() => document.getElementById('gsoc')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore My Work <ArrowRight size={16} />
            </LiquidButton>
            <a href="/resume.pdf" download className="btn btn-secondary btn-lg" style={{ borderRadius: 999 }}>
              <Download size={15} /> Resume
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.9 }}
            className="mt-9 flex items-center justify-center lg:justify-start gap-3"
          >
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.url}
                target={s.url.startsWith('mailto') ? '_self' : '_blank'} rel="noopener noreferrer" aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: 'var(--border-md)', color: 'var(--text-secondary)', background: 'rgba(10,16,14,0.6)', backdropFilter: 'blur(8px)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.45)'; e.currentTarget.style.color = '#34D399' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-md)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                <s.icon size={17} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: portrait ── */}
        <motion.div
          style={{ y: photoY, scale: photoScale, opacity: fade }}
          className="relative mx-auto order-1 lg:order-2 w-full max-w-[330px] sm:max-w-[370px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: EASE }}
            className="relative"
          >
            {/* glow */}
            <div className="absolute -inset-6 rounded-[40px] blur-3xl opacity-70 featured-glow pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 40%, rgba(16,185,129,0.45), rgba(34,211,238,0.18), transparent 70%)' }}
              aria-hidden="true" />

            {/* portrait frame */}
            <div className="hero-portrait relative">
              <SmartImg
                candidates={['/images/headshot.jpg', '/images/profile.jpg']}
                alt="Om Kapale"
                className="relative w-full"
                style={{ aspectRatio: '4 / 5', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />
              {/* subtle inner gradient for legibility of overlapping chips */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(5,8,7,0.35))', borderRadius: 'inherit' }} />
            </div>

            {/* floating stat chips */}
            {FLOAT_CHIPS.map((c) => (
              <motion.div
                key={c.sub}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: c.delay, duration: 0.6, ease: EASE }}
                className="absolute hidden sm:flex animate-float"
                style={{ ...c.pos, animationDelay: `${c.delay}s` }}
              >
                <div className="flex flex-col items-center rounded-2xl px-3.5 py-2"
                  style={{ background: 'rgba(6,11,9,0.82)', border: '1px solid rgba(16,185,129,0.3)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 28px rgba(0,0,0,0.5)' }}>
                  <span className="font-mono font-extrabold text-base" style={{ color: '#34D399' }}>{c.label}</span>
                  <span className="font-mono text-[9px] tracking-wide" style={{ color: 'var(--text-muted)' }}>{c.sub}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
          style={{ color: 'var(--text-faint)' }}
        >
          <span className="font-mono text-[9px] tracking-[0.3em]">SCROLL</span>
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   STATS
───────────────────────────────────────────────────────── */
function Stats() {
  return (
    <section
      className="relative"
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(3,5,4,0.6)', backdropFilter: 'blur(12px)' }}
    >
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
              className="stat-item"
            >
              <div className="metric-number">
                <CountUp to={s.value} prefix={s.prefix || ''} suffix={s.suffix || ''} />
              </div>
              <div className="metric-label">{s.label}</div>
              <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   GSOC SHOWCASE (ContainerScroll)
───────────────────────────────────────────────────────── */
function GsocShowcase() {
  return (
    <section id="gsoc" className="relative overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="px-4">
            <span className="section-badge">
              <Trophy size={11} /> Headline Achievement
            </span>
            <h2 className="font-display text-white mt-6" style={{ fontSize: 'clamp(34px, 6vw, 72px)', lineHeight: 1.08 }}>
              Google Summer of Code <span className="gradient-text">2026</span>
            </h2>
            <p className="hook-subtext mt-5 mb-10">
              Selected as the <strong style={{ color: '#34D399' }}>#1 ranked contributor globally</strong> at
              the PEcAn Project — out of a competitive worldwide applicant pool.
            </p>
          </div>
        }
      >
        {/* GSoC mission panel */}
        <div className="flex h-full w-full flex-col justify-between overflow-y-auto p-6 sm:p-10 text-left">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] font-bold tracking-widest"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34D399' }}
              >
                <Sprout size={12} /> PECAN PROJECT
              </span>
              <span className="font-mono text-[11px] tracking-widest" style={{ color: 'var(--text-muted)' }}>
                MAY — SEPTEMBER 2026
              </span>
            </div>

            <h3 className="font-display text-white mt-8" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', lineHeight: 1.15 }}>
              Increasing PEcAn Modularity
            </h3>
            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Refactoring the <em>Trait-Meta-analysis-Configuration Pipeline</em> of PEcAn — an
              ecological forecasting system — to decouple core modules, design cleaner interfaces
              and make the science more reproducible. Mentored by{' '}
              <strong style={{ color: 'var(--text)' }}>Mike Dietze</strong> (Boston University).
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { k: '#1', v: 'Global selection rank' },
              { k: '7+', v: 'PRs merged in GSoC' },
              { k: '2000+', v: 'Lines of code changed' },
              { k: 'R · Py', v: 'Core languages' },
            ].map((f) => (
              <div
                key={f.v}
                className="rounded-xl p-4"
                style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid var(--border)' }}
              >
                <p className="font-mono text-xl font-bold" style={{ color: '#34D399' }}>{f.k}</p>
                <p className="mt-1 text-[11px] leading-snug" style={{ color: 'var(--text-muted)' }}>{f.v}</p>
              </div>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   FEATURED PROJECTS (GlowCard)
───────────────────────────────────────────────────────── */
function FeaturedProjects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Projects"
          sub="Systems that solve real problems — from misinformation detection to live transit tracking."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: EASE }}
            >
              <GlowCard glowColor={p.glow} customSize className="h-full w-full !p-6">
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl text-white">{p.name}</h3>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} on GitHub`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors"
                      style={{ borderColor: 'var(--border-md)', color: 'var(--text-secondary)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#34D399'; e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-md)' }}
                    >
                      <Github size={15} />
                    </a>
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {p.desc}
                  </p>

                  <div
                    className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-[11px]"
                    style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', color: '#34D399' }}
                  >
                    <Trophy size={11} /> {p.metric}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-12 text-center"
        >
          <Link href="/projects" className="btn btn-ghost btn-lg" style={{ borderRadius: 999, border: '1px solid var(--border-md)' }}>
            View All Projects <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   OPEN SOURCE JOURNEY (CircularTestimonials)
───────────────────────────────────────────────────────── */
function OpenSourceJourney() {
  return (
    <section className="relative py-24" style={{ background: 'rgba(3,5,4,0.5)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Open Source"
          title="The Open Source Journey"
          sub="15+ merged pull requests across 5+ organisations — each one a story of real-world impact."
        />

        <div className="flex justify-center">
          <CircularTestimonials
            testimonials={OSS_JOURNEY}
            autoplay={true}
            colors={{
              name: '#ECF2EF',
              designation: '#34D399',
              testimony: '#9CAFA7',
              arrowBackground: '#14201C',
              arrowForeground: '#ECF2EF',
              arrowHoverBackground: '#10B981',
            }}
            fontSizes={{
              name: 'clamp(20px, 2.4vw, 26px)',
              designation: '13px',
              quote: 'clamp(14px, 1.6vw, 17px)',
            }}
          />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────────────────── */
function Skills() {
  return (
    <section className="relative py-24">
      <div className="container" style={{ maxWidth: 920 }}>
        <SectionHeading
          eyebrow="Toolbox"
          title="Skills & Technologies"
          sub="The stack I reach for when building clean, scalable systems."
        />

        <div className="flex flex-col gap-6">
          {SKILLS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: gi * 0.07, duration: 0.6, ease: EASE }}
              className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8"
              style={{ borderBottom: '1px solid var(--border)', paddingBottom: 22 }}
            >
              <p className="w-32 shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <span key={s} className="tech-badge tag-shimmer cursor-default">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   ABOUT STRIP (photo + intro)
───────────────────────────────────────────────────────── */
function AboutStrip() {
  return (
    <section className="relative py-24" style={{ background: 'rgba(3,5,4,0.5)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="grid items-center gap-12 md:grid-cols-[320px_1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative mx-auto w-full max-w-[320px]"
          >
            <div
              className="absolute -inset-3 rounded-3xl opacity-50 blur-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.35), rgba(34,211,238,0.2))' }}
              aria-hidden="true"
            />
            <SmartImg
              candidates={['/images/portrait-full.jpg', '/images/profile.jpg']}
              alt="Om Shripad Kapale"
              className="relative w-full rounded-3xl object-cover"
              style={{ border: '1px solid var(--border-bright)', aspectRatio: '3 / 4', objectPosition: 'center top' }}
            />
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 font-mono text-[10px] font-bold tracking-widest"
              style={{ background: '#050807', border: '1px solid rgba(16,185,129,0.35)', color: '#34D399' }}
            >
              GSOC 2026 CONTRIBUTOR
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.12, duration: 0.8, ease: EASE }}
          >
            <span className="section-badge">About Me</span>
            <h2 className="section-heading mt-5" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Engineering with curiosity,<br />contributing with purpose.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I&apos;m Om Shripad Kapale — a final-year Computer Science student at CSMSS Chh. Shahu
              College of Engineering. I build backend systems in Java &amp; Spring Boot, explore
              ecological informatics and LLM integration, and spend my evenings shipping pull
              requests to open-source projects around the world.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm" style={{ color: 'var(--text-muted)' }}>
              <span className="inline-flex items-center gap-2"><MapPin size={14} /> Chh. Sambhajinagar, India</span>
              <span className="inline-flex items-center gap-2"><GraduationCap size={14} /> B.Tech CSE · Final Year</span>
              <span className="inline-flex items-center gap-2"><GitPullRequest size={14} /> 15+ merged PRs</span>
            </div>

            <div className="mt-8">
              <Link href="/about" className="btn btn-secondary" style={{ borderRadius: 999 }}>
                More About Me <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   CONTACT CTA
───────────────────────────────────────────────────────── */
function ContactCta() {
  const router = useRouter()
  return (
    <section className="relative overflow-hidden py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.1), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="container relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="section-badge">Get In Touch</span>
          <h2 className="font-display text-white mt-6" style={{ fontSize: 'clamp(34px, 5.5vw, 64px)', lineHeight: 1.1 }}>
            Let&apos;s build something<br />
            <em className="gradient-text" style={{ fontStyle: 'italic' }}>that matters.</em>
          </h2>
          <p className="hook-subtext mt-6">
            Open to SDE roles, open-source collaboration and interesting backend problems.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <LiquidButton size="xl" className="rounded-full font-semibold" onClick={() => router.push('/contact')}>
              <Mail size={16} /> Start a Conversation
            </LiquidButton>
            <a
              href="mailto:omshripadkapale@gmail.com"
              className="font-mono text-sm transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#34D399')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              omshripadkapale@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg)', overflowX: 'hidden' }}>
      <Hero />
      <Stats />
      <GsocShowcase />
      <FeaturedProjects />
      <OpenSourceJourney />
      <Skills />
      <AboutStrip />
      <ContactCta />
    </div>
  )
}
