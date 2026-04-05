'use client'

import { useState, useEffect, useMemo } from 'react'
import { ExternalLink, Github, Search, Clock, Code2, X, RefreshCw, Star, GitFork } from 'lucide-react'
import { getLanguageColor } from '@/lib/github'

// ── Hardcoded pinned/featured projects (always shown first) ─────────────────
const PINNED_PROJECTS = [
  {
    id: 'pin-1',
    name: 'Hand Sign Detection',
    tag: 'AI / Computer Vision',
    description:
      'Detects and classifies hand gestures from live webcam feed using MediaPipe for hand landmark detection and a custom CNN trained with PyTorch.',
    techStack: ['Python', 'PyTorch', 'MediaPipe', 'OpenCV', 'NumPy'],
    liveLink: null,
    githubLink: 'https://github.com/omkarrr2533/Hand_Sign_Detection_Using_Python.git',
    buildTime: '3 months',
    category: 'AI/ML',
    accent: '#8B5CF6',
    pinned: true,
  },
  {
    id: 'pin-2',
    name: 'City Bus Tracking System',
    tag: 'Full Stack · Real-time',
    description:
      'Real-time city bus tracking with WebSocket-powered live location updates, Leaflet Map route visualisation, and a Spring Boot REST backend.',
    techStack: ['Java', 'Spring Boot', 'WebSocket', 'Leaflet.js', 'Maven'],
    liveLink: null,
    githubLink: 'https://github.com/omkarrr2533/BUS-ETA.git',
    buildTime: '2 months',
    category: 'Backend',
    accent: '#10B981',
    pinned: true,
  },
  {
    id: 'pin-3',
    name: 'Portfolio Website',
    tag: 'Frontend · Next.js',
    description:
      'Dynamic GitHub-integrated portfolio built with Next.js 14 App Router, Tailwind CSS, and real-time GitHub API data.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'GitHub API'],
    liveLink: 'https://omkapale.vercel.app',
    githubLink: 'https://github.com/omkarrr2533',
    buildTime: '1 month',
    category: 'Frontend',
    accent: '#3B82F6',
    pinned: true,
  },
]

const CATEGORIES = ['All', 'Pinned', 'Backend', 'AI/ML', 'Frontend']

// ── Convert a GitHub repo object → project card format ─────────────────────
function repoToProject(repo) {
  const isBig    = repo.stars >= 5 || repo.forks >= 2
  const hasDesc  = !!repo.description && repo.description.length > 10

  // Skip tiny placeholder repos
  if (!hasDesc && repo.stars === 0) return null

  const accent = repo.language ? getLanguageColor(repo.language) : '#6B7280'

  return {
    id:          `gh-${repo.id}`,
    name:        repo.name,
    tag:         repo.language || 'Other',
    description: repo.description || 'No description provided.',
    techStack:   [repo.language, ...(repo.topics || [])].filter(Boolean).slice(0, 6),
    liveLink:    repo.homepage || null,
    githubLink:  repo.url,
    stars:       repo.stars,
    forks:       repo.forks,
    updatedAt:   repo.updatedAt,
    category:    'GitHub',
    accent,
    pinned:      false,
  }
}

export default function HomePage() {
  const [ghRepos, setGhRepos]     = useState([])
  const [ghLoading, setGhLoading] = useState(true)
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('All')
  const [showGH, setShowGH]       = useState(true)

  // Fetch GitHub repos on mount
  useEffect(() => {
    setGhLoading(true)
    fetch('/api/github/repos?sort=updated&per_page=100')
      .then(r => r.json())
      .then(json => {
        if (json.success) {
          const mapped = (json.data || [])
            .map(repoToProject)
            .filter(Boolean)
          setGhRepos(mapped)
        }
      })
      .catch(() => {}) // silently degrade — pinned projects still show
      .finally(() => setGhLoading(false))
  }, [])

  const allProjects = useMemo(() => {
    const ghIds = new Set(ghRepos.map(r => r.name))
    // Remove pinned if they also appear in GitHub results (avoid duplicates)
    const pinnedFiltered = PINNED_PROJECTS.filter(p => !ghIds.has(p.name.toLowerCase().replace(/\s+/g, '-')))
    return [...pinnedFiltered, ...(showGH ? ghRepos : [])]
  }, [ghRepos, showGH])

  const filtered = useMemo(() => {
    let list = allProjects
    if (category === 'Pinned')         list = list.filter(p => p.pinned)
    else if (category !== 'All')       list = list.filter(p => p.category === category)

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        p => p.name.toLowerCase().includes(q)
          || p.description.toLowerCase().includes(q)
          || p.techStack.some(t => t.toLowerCase().includes(q))
      )
    }
    return list
  }, [allProjects, search, category])

  const dynamicCategories = useMemo(() => {
    const cats = new Set(allProjects.map(p => p.category))
    return ['All', 'Pinned', ...Array.from(cats).filter(c => !['All', 'Pinned'].includes(c))]
  }, [allProjects])

  return (
    <div
      className="min-h-screen pt-28 pb-20"
      style={{ background: 'linear-gradient(180deg, #060D1F 0%, #0B1325 100%)' }}
    >
      <div className="container mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="mb-10 max-w-xl animate-fade-in">
          <span className="section-badge mb-4 block w-fit">// all projects</span>
          <h1 className="font-display font-800 text-[#E8F0FE] mb-3" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-[#8EA4C8] text-base leading-relaxed">
            Spanning backend engineering, AI/ML, and full-stack — including live repos from GitHub.
          </p>
        </div>

        {/* ── Filters ── */}
        <div className="mb-8 flex flex-col sm:flex-row gap-3 animate-slide-up">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A6080]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search projects or tech…"
              className="w-full pl-9 pr-9 py-2.5 rounded-lg text-sm text-[#E8F0FE] placeholder-[#4A6080] outline-none focus:ring-1 focus:ring-[#3B82F6] font-mono transition-all"
              style={{ background: 'rgba(15,26,46,0.7)', border: '1px solid rgba(99,120,162,0.2)' }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A6080] hover:text-[#8EA4C8]">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap items-center">
            {dynamicCategories.slice(0, 6).map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-3.5 py-2 rounded-lg text-sm font-500 transition-all"
                style={{
                  background: category === cat ? 'rgba(59,130,246,0.15)' : 'rgba(15,26,46,0.7)',
                  color:      category === cat ? '#60A5FA'               : '#8EA4C8',
                  border:     category === cat ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(99,120,162,0.15)',
                }}
              >
                {cat}
              </button>
            ))}

            {/* GitHub toggle */}
            <button
              onClick={() => setShowGH(g => !g)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-500 transition-all ml-auto"
              style={{
                background: showGH ? 'rgba(16,185,129,0.12)' : 'rgba(15,26,46,0.7)',
                color:      showGH ? '#34D399'               : '#8EA4C8',
                border:     showGH ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(99,120,162,0.15)',
              }}
              title={showGH ? 'Hide GitHub repos' : 'Show GitHub repos'}
            >
              <Github size={13} />
              {ghLoading ? <RefreshCw size={12} className="animate-spin" /> : `GitHub (${ghRepos.length})`}
            </button>
          </div>
        </div>

        {/* ── Count ── */}
        <p className="text-[#4A6080] text-xs font-mono mb-4">
          Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[#4A6080]">
            <Code2 size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-mono text-sm">No projects match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── ProjectCard ───────────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  return (
    <div
      className="glass-card overflow-hidden group animate-slide-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }} />
      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <span
            className="text-xs font-mono font-600 uppercase tracking-wider px-2 py-0.5 rounded"
            style={{
              background: `${project.accent}18`,
              color: project.accent,
              border: `1px solid ${project.accent}28`,
            }}
          >
            {project.tag}
          </span>
          <div className="flex items-center gap-3 text-[#4A6080] text-xs font-mono">
            {project.stars != null && (
              <span className="flex items-center gap-1">
                <Star size={11} />
                {project.stars}
              </span>
            )}
            {project.forks != null && (
              <span className="flex items-center gap-1">
                <GitFork size={11} />
                {project.forks}
              </span>
            )}
            {project.buildTime && (
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {project.buildTime}
              </span>
            )}
          </div>
        </div>

        <h3 className="font-display text-lg font-700 text-[#E8F0FE] mb-2 group-hover:text-white transition-colors">
          {project.name}
        </h3>
        <p className="text-[#8EA4C8] text-sm leading-relaxed mb-5 line-clamp-3">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map(t => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4" style={{ borderTop: '1px solid rgba(99,120,162,0.1)' }}>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#8EA4C8] hover:text-[#E8F0FE] transition-colors font-500"
          >
            <Github size={15} />
            Source
          </a>
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#8EA4C8] hover:text-[#60A5FA] transition-colors font-500"
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}