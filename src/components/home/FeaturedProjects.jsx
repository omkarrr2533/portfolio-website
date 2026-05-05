'use client'

import Link from 'next/link'
import { ExternalLink, Github, ArrowRight, Cpu, BusFront } from 'lucide-react'

const projects = [
  {
    id: 1,
    tag: 'Computer Vision',
    name: 'Hand Sign Detection',
    headline: 'Real-time gesture recognition using deep learning',
    description:
      'Detects and classifies hand gestures from live webcam feed using MediaPipe for hand landmark detection and a custom CNN trained with PyTorch. Achieves high accuracy for ASL alphabet recognition.',
    tech: ['Python', 'PyTorch', 'MediaPipe', 'OpenCV', 'NumPy'],
    github: 'https://github.com/omkarrr2533/Hand_Sign_Detection_Using_Python.git',
    live: null,
    accent: '#3B82F6',
    icon: Cpu,
    metrics: [
      { label: 'Model Type', value: 'CNN' },
      { label: 'Framework', value: 'PyTorch' },
      { label: 'Input', value: 'Webcam' },
    ],
  },
  {
    id: 2,
    tag: 'Full Stack · Real-time',
    name: 'City Bus Tracking System',
    headline: 'Live bus location tracking for public transport',
    description:
      'Real-time city bus tracking application with WebSocket-powered location updates, Leaflet Map integration for route visualisation, and a Spring Boot REST backend managing API and data flow.',
    tech: ['Java', 'Spring Boot', 'WebSocket', 'Leaflet.js', 'HTML/CSS/JS', 'Maven'],
    github: 'https://github.com/omkarrr2533/BUS-ETA.git',
    live: null,
    accent: '#10B981',
    icon: BusFront,
    metrics: [
      { label: 'Backend', value: 'Spring Boot' },
      { label: 'Protocol', value: 'WebSocket' },
      { label: 'Map', value: 'Leaflet' },
    ],
  },
]

export default function FeaturedProjects() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* ── Section background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,130,246,0.04), transparent)',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* ── Section header ── */}
        <div className="mb-16 max-w-xl">
          style={{ fontFamily:'JetBrains Mono,monospace', fontSize:13, fontWeight:600, color:'#4F46E5', textDecoration:'none', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:150 }}>
          <h2
            className="font-display font-800 text-[#E8F0FE] mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
          >
            What I've{' '}
            <span className="gradient-text">Built</span>
          </h2>
           {/* GSoC current work notice */}
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 8,
    padding: '7px 14px',
    background: 'rgba(16,185,129,0.06)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: 99,
    fontFamily: '"JetBrains Mono",sans-serif', fontSize: 12, color: '#10B981',
  }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
    Currently building: PEcAn Modularity Refactor (GSoC 2026)
  </div>
          <p className="text-[#8EA4C8] text-base leading-relaxed">
            Projects that demonstrate my approach to backend engineering and applied
            AI/ML — focused on real-world utility and clean architecture.
          </p>
        </div>

        {/* ── Project cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {projects.map((project, i) => {
            const Icon = project.icon
            return (
              <article
                key={project.id}
                className="glass-card overflow-hidden group animate-slide-up"
                style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}
              >
                {/* ── Card top accent bar ── */}
                <div
                  className="h-1 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${project.accent}, transparent)`,
                  }}
                />

                <div className="p-6 sm:p-8">
                  {/* ── Tag + Icon ── */}
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-600 uppercase tracking-wider"
                      style={{
                        background: `${project.accent}18`,
                        color: project.accent,
                        border: `1px solid ${project.accent}30`,
                      }}
                    >
                      {project.tag}
                    </span>
                    <div
                      className="p-2 rounded-lg"
                      style={{ background: `${project.accent}10` }}
                    >
                      <Icon size={20} style={{ color: project.accent }} />
                    </div>
                  </div>

                  {/* ── Name + Headline ── */}
                  <h3 className="font-display text-xl font-700 text-[#E8F0FE] mb-1 group-hover:text-white transition-colors">
                    {project.name}
                  </h3>
                  <p
                    className="text-sm font-600 mb-4"
                    style={{ color: project.accent }}
                  >
                    {project.headline}
                  </p>

                  {/* ── Description ── */}
                  <p className="text-[#8EA4C8] text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* ── Metrics row ── */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {project.metrics.map(({ label, value }) => (
                      <div
                        key={label}
                        className="rounded-lg p-2.5 text-center"
                        style={{
                          background: 'rgba(15,26,46,0.8)',
                          border: '1px solid rgba(99,120,162,0.12)',
                        }}
                      >
                        <div className="text-xs text-[#4A6080] mb-0.5 font-mono">{label}</div>
                        <div className="text-xs font-700 text-[#E8F0FE] font-mono">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* ── Tech stack ── */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>

                  {/* ── Links ── */}
                  <div
                    className="flex gap-4 pt-5"
                    style={{ borderTop: '1px solid rgba(99,120,162,0.12)' }}
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-600 text-[#8EA4C8] hover:text-[#E8F0FE] group/link"
                    >
                      <Github size={15} />
                      Source Code
                      <ArrowRight
                        size={12}
                        className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all"
                      />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-600 text-[#8EA4C8] hover:text-[#60A5FA] group/link"
                      >
                        <ExternalLink size={15} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* ── View all CTA ── */}
        <div className="text-center">
          <Link
            href="/projects"
            className="btn-secondary inline-flex group"
          >
            View All Projects
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
