'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  ExternalLink, Github, Search, Clock, Code2, X,
  Star, GitFork, Eye, RefreshCw, Globe, Lock,
} from 'lucide-react'

// ── Language badge colours ─────────────────────
const LANG_COLORS = {
  JavaScript: '#F1E05A', TypeScript: '#3178C6', Python: '#3572A5',
  Java: '#B07219', Go: '#00ADD8', Rust: '#DEA584', Ruby: '#701516',
  HTML: '#E34C26', CSS: '#563D7C', 'C++': '#F34B7D', C: '#555555',
}

// ── Skeleton card ──────────────────────────────
function SkeletonCard() {
  return (
    <div className="glass-card p-6">
      <div className="skeleton h-4 w-24 mb-4 rounded" />
      <div className="skeleton h-6 w-48 mb-3 rounded" />
      <div className="skeleton h-16 w-full mb-4 rounded" />
      <div className="flex gap-2 mb-4">
        {[1,2,3].map(i => <div key={i} className="skeleton h-6 w-16 rounded" />)}
      </div>
    </div>
  )
}

// ── Single repo card ───────────────────────────
function RepoCard({ repo, index }) {
  const langColor = LANG_COLORS[repo.language] || '#8b949e'
  const updatedAgo = (() => {
    const diff = Date.now() - new Date(repo.updatedAt).getTime()
    const d = Math.floor(diff / 86400000)
    if (d === 0) return 'today'
    if (d === 1) return 'yesterday'
    if (d < 30) return `${d}d ago`
    const m = Math.floor(d / 30)
    if (m < 12) return `${m}mo ago`
    return `${Math.floor(m / 12)}y ago`
  })()

  return (
    <div
      className="glass-card overflow-hidden group animate-slide-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      {/* Top accent */}
      <div className="h-0.5" style={{ background: `linear-gradient(90deg,${langColor},transparent)` }} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {repo.isPrivate
              ? <Lock size={14} className="text-[#4A6080]" />
              : <Globe size={14} className="text-[#4A6080]" />
            }
            {/* FIXED: restored missing <a opening tag */}
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm font-700 text-[#60A5FA] hover:text-white transition-colors"
            >
              {repo.name}
            </a>
          </div>
          <span className="text-xs text-[#4A6080] font-mono">{updatedAgo}</span>
        </div>

        {/* Description */}
        <p className="text-[#8EA4C8] text-sm leading-relaxed mb-4 line-clamp-2 min-h-[40px]">
          {repo.description || <span className="italic text-[#4A6080]">No description</span>}
        </p>

        {/* Topics */}
        {repo.topics?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.topics.slice(0, 4).map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        )}

        {/* Footer stats */}
        <div className="flex items-center gap-4 pt-3 border-t border-[rgba(99,120,162,0.1)]">
          {repo.language && (
            <span className="flex items-center gap-1.5 text-xs text-[#8EA4C8]">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: langColor }} />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1 text-xs text-[#8EA4C8]">
            <Star size={11} />{repo.stars}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#8EA4C8]">
            <GitFork size={11} />{repo.forks}
          </span>
          {/* FIXED: restored missing <a opening tag */}
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1 text-xs text-[#4A6080] hover:text-[#60A5FA] transition-colors"
          >
            <Github size={13} /> View
          </a>
          {repo.homepage && (
            /* FIXED: restored missing <a opening tag */
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[#4A6080] hover:text-[#34D399] transition-colors"
            >
              <ExternalLink size={13} /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────
export default function ProjectsPage() {
  const [repos, setRepos]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [search, setSearch]     = useState('')
  const [langFilter, setLang]   = useState('All')
  const [sortBy, setSort]       = useState('updated')
  const [lastFetched, setFetched] = useState(null)

  const fetchRepos = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/github/repos?sort=${sortBy}&per_page=100`)
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      setRepos(json.data)
      setFetched(new Date())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRepos() }, [sortBy]) // eslint-disable-line

  // Derived language list
  const languages = useMemo(() => {
    const langs = [...new Set(repos.map(r => r.language).filter(Boolean))]
    return ['All', ...langs.sort()]
  }, [repos])

  // Filtered repos
  const filtered = useMemo(() => {
    let list = [...repos]
    if (langFilter !== 'All') list = list.filter(r => r.language === langFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        (r.description || '').toLowerCase().includes(q) ||
        r.topics.some(t => t.toLowerCase().includes(q))
      )
    }
    return list
  }, [repos, langFilter, search])

  // Summary stats
  const totalStars = repos.reduce((s, r) => s + r.stars, 0)
  const totalForks = repos.reduce((s, r) => s + r.forks, 0)

  return (
    <div className="min-h-screen pt-24 pb-20"
      style={{ background: 'linear-gradient(180deg,#060D1F 0%,#080F20 100%)' }}
    >
      <div className="container mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="mb-10 max-w-xl animate-fade-in">
          <span className="section-badge mb-4 block w-fit">// github repositories</span>
          <h1 className="font-display font-800 text-[#E8F0FE] mb-3"
            style={{ fontSize: 'clamp(32px,5vw,52px)' }}
          >
            All <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-[#8EA4C8] text-base leading-relaxed">
            Live from GitHub — auto-synced every 30 minutes.
          </p>
        </div>

        {/* ── Quick stats ── */}
        <div className="flex flex-wrap gap-4 mb-8 animate-slide-up">
          {[
            { label: 'Repositories', value: repos.length, icon: Code2 },
            { label: 'Total Stars', value: totalStars, icon: Star },
            { label: 'Total Forks', value: totalForks, icon: GitFork },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="stat-card flex items-center gap-3">
              <Icon size={16} className="text-[#60A5FA]" />
              <span className="font-mono text-sm text-[#E8F0FE] font-700">{value}</span>
              <span className="text-xs text-[#4A6080]">{label}</span>
            </div>
          ))}
          {lastFetched && (
            <div className="stat-card flex items-center gap-2 text-xs text-[#4A6080]">
              <Eye size={13} />
              Synced {lastFetched.toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-slide-up">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A6080]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search repos, topics…"
              className="input-dark pl-9 pr-9"
            />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A6080] hover:text-[#8EA4C8]"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Language filter */}
          <div className="flex gap-2 flex-wrap">
            {languages.slice(0, 8).map(lang => (
              <button key={lang} onClick={() => setLang(lang)}
                className="px-3 py-2 rounded-lg text-xs font-600 transition-all font-mono"
                style={{
                  background: langFilter === lang ? 'rgba(59,130,246,0.15)' : 'rgba(15,26,46,0.7)',
                  color:      langFilter === lang ? '#60A5FA' : '#8EA4C8',
                  border:     langFilter === lang ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(99,120,162,0.15)',
                }}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Sort + Refresh */}
          <div className="flex gap-2 ml-auto">
            <select
              value={sortBy}
              onChange={e => setSort(e.target.value)}
              className="input-dark text-xs px-3 py-2 w-auto cursor-pointer"
            >
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
              <option value="created">Newest</option>
              <option value="full_name">Name</option>
            </select>
            <button onClick={fetchRepos} disabled={loading}
              className="btn-secondary px-3 py-2 text-xs"
              title="Refresh from GitHub"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="glass-card p-6 mb-8 border-red-500/20 text-center">
            <p className="text-red-400 text-sm mb-3">⚠ {error}</p>
            <p className="text-[#4A6080] text-xs">
              Make sure <code className="text-[#60A5FA]">GITHUB_TOKEN</code> and{' '}
              <code className="text-[#60A5FA]">GITHUB_USERNAME</code> are set in{' '}
              <code className="text-[#60A5FA]">.env.local</code>
            </p>
          </div>
        )}

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(9).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-[#4A6080]">
            <Code2 size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-mono text-sm">No repositories match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}

        {/* Results count */}
        {!loading && filtered.length > 0 && (
          <p className="text-center text-xs text-[#4A6080] mt-8 font-mono">
            Showing {filtered.length} of {repos.length} repositories
          </p>
        )}
      </div>
    </div>
  )
}