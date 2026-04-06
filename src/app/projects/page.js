'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import {
  ExternalLink, Github, Search, Code2, X, Star, GitFork,
  RefreshCw, Globe, Lock, Plus, Edit2, Trash2, Save,
  Filter, SortAsc, ChevronDown, ArrowRight, Eye,
} from 'lucide-react'

/* ── Language colours ────────────────────────────────── */
const LANG_CLR = {
  JavaScript: '#F1E05A', TypeScript: '#3178C6', Python: '#3572A5',
  Java: '#B07219', Go: '#00ADD8', Rust: '#DEA584', Ruby: '#701516',
  HTML: '#E34C26', CSS: '#563D7C', 'C++': '#F34B7D', C: '#555555',
}

/* ── Custom project storage ──────────────────────────── */
function useCustomProjects() {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    try { const s = localStorage.getItem('customProjects'); if (s) setProjects(JSON.parse(s)) } catch {}
  }, [])
  const save = (n) => { setProjects(n); try { localStorage.setItem('customProjects', JSON.stringify(n)) } catch {} }
  const add    = (p) => save([{ ...p, id: Date.now().toString(), isCustom: true }, ...projects])
  const update = (p) => save(projects.map(x => x.id === p.id ? p : x))
  const remove = (id) => save(projects.filter(p => p.id !== id))
  return { projects, add, update, remove }
}

/* ── Add / Edit modal ────────────────────────────────── */
const EMPTY = { name: '', description: '', language: '', techStack: '', url: '', homepage: '', stars: 0, forks: 0 }

function ProjectModal({ project, onSave, onClose }) {
  const [form, setForm] = useState(project
    ? { ...project, techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : (project.topics?.join(', ') || '') }
    : EMPTY
  )
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSave = () => {
    if (!form.name) return
    const topics = form.techStack ? form.techStack.split(',').map(s => s.trim()).filter(Boolean) : []
    onSave({ ...form, topics, techStack: topics })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-scale-bounce p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#EDF2FF]" style={{ fontFamily: 'Syne, sans-serif' }}>
            {project ? 'Edit Project' : 'Add Project'}
          </h2>
          <button onClick={onClose} className="btn-icon btn"><X size={16} /></button>
        </div>

        <div className="space-y-3">
          {[
            { key: 'name',         label: 'Project Name *',       placeholder: 'e.g. My Awesome Project' },
            { key: 'url',          label: 'GitHub URL',            placeholder: 'https://github.com/you/project' },
            { key: 'homepage',     label: 'Live URL (optional)',   placeholder: 'https://project.com' },
            { key: 'language',     label: 'Primary Language',      placeholder: 'Python, Java, JavaScript…' },
            { key: 'techStack',    label: 'Tech Stack (comma-sep)',placeholder: 'React, Node.js, MongoDB' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-[10px] font-mono text-[#4A6090] mb-1.5 uppercase tracking-wider">{f.label}</label>
              <input value={form[f.key] || ''} onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder} className="input-dark" />
            </div>
          ))}
          <div>
            <label className="block text-[10px] font-mono text-[#4A6090] mb-1.5 uppercase tracking-wider">Description</label>
            <textarea value={form.description || ''} onChange={e => set('description', e.target.value)}
              placeholder="What does this project do?" rows={3} className="input-dark" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[{ key: 'stars', label: 'Stars' }, { key: 'forks', label: 'Forks' }].map(f => (
              <div key={f.key}>
                <label className="block text-[10px] font-mono text-[#4A6090] mb-1.5 uppercase tracking-wider">{f.label}</label>
                <input type="number" value={form[f.key] || 0}
                  onChange={e => set(f.key, parseInt(e.target.value) || 0)} className="input-dark" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2.5 mt-6">
          <button onClick={onClose} className="btn btn-secondary flex-1">Cancel</button>
          <button onClick={handleSave} disabled={!form.name} className="btn btn-primary flex-1 disabled:opacity-40">
            <Save size={14} /> {project ? 'Save Changes' : 'Add Project'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Project card ────────────────────────────────────── */
function ProjectCard({ project, index, onEdit, onDelete, isCustom }) {
  const langColor = LANG_CLR[project.language] || '#8b949e'
  const topics = project.topics || (Array.isArray(project.techStack) ? project.techStack : [])
  const updatedAgo = useMemo(() => {
    if (!project.updatedAt) return null
    const d = Math.floor((Date.now() - new Date(project.updatedAt)) / 86400000)
    return d === 0 ? 'today' : d === 1 ? '1d ago' : d < 30 ? `${d}d ago` : `${Math.floor(d/30)}mo ago`
  }, [project.updatedAt])

  return (
    <div
      className="glass-card glass-card-interactive overflow-hidden group card-shine animate-slide-up"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
    >
      {/* Lang colour accent */}
      <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${langColor}cc, transparent)` }} />

      {/* Custom badge + actions */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        {isCustom && (
          <span className="status-badge green text-[10px]">
            <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
            custom
          </span>
        )}
      </div>
      {isCustom && (
        <div className="absolute top-3.5 right-3.5 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(project)} className="btn btn-icon" style={{ width: 28, height: 28 }}>
            <Edit2 size={11} />
          </button>
          <button onClick={() => onDelete(project.id)} className="btn btn-danger" style={{ width: 28, height: 28, padding: 0 }}>
            <Trash2 size={11} />
          </button>
        </div>
      )}

      <div className="p-5 pt-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            {project.isPrivate ? <Lock size={12} className="text-[#4A6090] flex-shrink-0" /> : <Globe size={12} className="text-[#4A6090] flex-shrink-0" />}
            {project.url ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="font-mono text-sm font-semibold text-[#60A5FA] hover:text-[#EDF2FF] transition-colors truncate">
                {project.name}
              </a>
            ) : (
              <span className="font-mono text-sm font-semibold text-[#60A5FA] truncate">{project.name}</span>
            )}
          </div>
          {updatedAgo && <span className="text-[10px] font-mono text-[#2A3A55] flex-shrink-0 ml-2">{updatedAgo}</span>}
        </div>

        {/* Description */}
        <p className="text-xs text-[#4A6090] leading-relaxed mb-3 min-h-[36px] line-clamp-2">
          {project.description || <span className="italic">No description</span>}
        </p>

        {/* Topics */}
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {topics.slice(0, 4).map(t => <span key={t} className="tech-badge">{t}</span>)}
            {topics.length > 4 && <span className="tech-badge" style={{ color: '#4A6090', borderColor: 'rgba(99,125,175,0.1)' }}>+{topics.length - 4}</span>}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: 'rgba(99,125,175,0.1)' }}>
          {project.language && (
            <span className="flex items-center gap-1 text-[11px] text-[#4A6090]">
              <span className="w-2 h-2 rounded-full" style={{ background: langColor }} />
              {project.language}
            </span>
          )}
          <span className="flex items-center gap-1 text-[11px] text-[#4A6090]">
            <Star size={10} />{project.stars || 0}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#4A6090]">
            <GitFork size={10} />{project.forks || 0}
          </span>
          <div className="ml-auto flex items-center gap-2">
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="text-[#4A6090] hover:text-[#60A5FA] transition-colors" title="Source">
                <Github size={13} />
              </a>
            )}
            {project.homepage && (
              <a href={project.homepage} target="_blank" rel="noopener noreferrer"
                className="text-[#4A6090] hover:text-[#34D399] transition-colors" title="Live demo">
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Skeleton ─────────────────────────────────────────── */
function CardSkeleton() {
  return (
    <div className="glass-card p-5 h-44">
      <div className="skeleton h-3 w-28 mb-3 rounded" />
      <div className="skeleton h-3 w-full mb-2 rounded" />
      <div className="skeleton h-3 w-4/5 mb-4 rounded" />
      <div className="flex gap-2"><div className="skeleton h-5 w-16 rounded" /><div className="skeleton h-5 w-14 rounded" /></div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════ */
export default function ProjectsPage() {
  const { projects: customProjects, add, update, remove } = useCustomProjects()
  const [ghRepos,  setGhRepos]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [search,   setSearch]   = useState('')
  const [lang,     setLang]     = useState('All')
  const [sortBy,   setSort]     = useState('updated')
  const [tab,      setTab]      = useState('all')
  const [modal,    setModal]    = useState(null)
  const [ghOk,     setGhOk]    = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const searchRef = useRef(null)

  const fetchRepos = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const res  = await fetch(`/api/github/repos?sort=${sortBy}&per_page=100`)
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      if (json.data?.length) { setGhRepos(json.data); setGhOk(true) }
      else setGhOk(false)
    } catch (e) { setError(e.message); setGhOk(false) }
    finally { setLoading(false) }
  }, [sortBy])

  useEffect(() => { fetchRepos() }, [fetchRepos])

  /* Keyboard shortcut: / to focus search */
  useEffect(() => {
    const fn = (e) => { if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') { e.preventDefault(); searchRef.current?.focus() } }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const allProjects = useMemo(() => [
    ...customProjects.map(p => ({ ...p, isCustom: true })),
    ...ghRepos.map(r => ({ ...r, isCustom: false })),
  ], [ghRepos, customProjects])

  const languages = useMemo(() => {
    const langs = [...new Set(allProjects.map(r => r.language).filter(Boolean))]
    return ['All', ...langs.sort()]
  }, [allProjects])

  const filtered = useMemo(() => {
    let source = tab === 'custom' ? customProjects.map(p => ({ ...p, isCustom: true }))
               : tab === 'github' ? ghRepos.map(r => ({ ...r, isCustom: false }))
               : allProjects

    if (lang !== 'All') source = source.filter(r => r.language === lang)
    if (search.trim()) {
      const q = search.toLowerCase()
      source = source.filter(r =>
        r.name?.toLowerCase().includes(q) ||
        (r.description || '').toLowerCase().includes(q) ||
        (r.topics || []).some(t => t.toLowerCase().includes(q)) ||
        (Array.isArray(r.techStack) ? r.techStack : []).some(t => t.toLowerCase().includes(q))
      )
    }
    return source
  }, [allProjects, customProjects, ghRepos, lang, search, tab])

  const totalStars = ghRepos.reduce((s, r) => s + r.stars, 0)
  const totalForks = ghRepos.reduce((s, r) => s + r.forks, 0)

  return (
    <div className="min-h-screen pt-20 pb-24"
      style={{ background: 'linear-gradient(180deg, #04091A 0%, #080F22 100%)' }}>
      <div className="container mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="mb-12 pt-8 animate-fade-in">
          <span className="section-badge mb-4 block w-fit">// projects</span>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="section-heading mb-2" style={{ fontSize: 'clamp(32px,5vw,52px)' }}>
                All <span className="gradient-text">Projects</span>
              </h1>
              <p className="text-sm text-[#4A6090]">Your custom projects + live GitHub repositories</p>
            </div>
            <button onClick={() => setModal('add')} className="btn btn-primary">
              <Plus size={15} /> Add Project
            </button>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="flex flex-wrap gap-3 mb-8 animate-slide-up">
          {[
            { icon: Code2,   v: customProjects.length, label: 'My Projects',   accent: '#10B981' },
            ghOk && { icon: Globe,   v: ghRepos.length,      label: 'GitHub Repos',  accent: '#3B82F6' },
            ghOk && { icon: Star,    v: totalStars,           label: 'Total Stars',   accent: '#F59E0B' },
            ghOk && { icon: GitFork, v: totalForks,           label: 'Total Forks',   accent: '#8B5CF6' },
          ].filter(Boolean).map(s => (
            <div key={s.label} className="stat-card flex items-center gap-3">
              <s.icon size={15} style={{ color: s.accent }} />
              <span className="font-mono text-sm font-bold text-[#EDF2FF]">{s.v}</span>
              <span className="text-xs text-[#4A6090]">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Not configured ── */}
        {!ghOk && !loading && (
          <div className="glass-card p-5 mb-8 flex items-start gap-3"
            style={{ borderColor: 'rgba(245,158,11,0.15)', background: 'rgba(245,158,11,0.03)' }}>
            <span className="text-amber-400 text-lg mt-0.5">⚠</span>
            <div>
              <p className="text-sm font-semibold text-amber-300 mb-1">GitHub not connected</p>
              <p className="text-xs text-[#4A6090] font-mono">
                Add <code className="text-[#60A5FA]">GITHUB_TOKEN</code> and <code className="text-[#60A5FA]">GITHUB_USERNAME</code> to <code className="text-[#60A5FA]">.env.local</code>
              </p>
            </div>
          </div>
        )}

        {/* ── Tabs ── */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(8,15,34,0.8)', border: '1px solid rgba(99,125,175,0.12)' }}>
            {[
              { id: 'all',    label: `All (${allProjects.length})` },
              { id: 'custom', label: `My Projects (${customProjects.length})` },
              { id: 'github', label: `GitHub (${ghRepos.length})` },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all"
                style={{
                  background: tab === t.id ? 'rgba(59,130,246,0.15)' : 'transparent',
                  color:      tab === t.id ? '#60A5FA' : '#4A6090',
                  fontFamily: 'DM Sans, sans-serif',
                }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Search + Filters ── */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A6090]" />
              <input
                ref={searchRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search projects, technologies… (press / to focus)"
                className="input-dark pl-9 pr-8 text-sm"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A6090] hover:text-[#8EA8D8]">
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Filter toggle on mobile */}
            <button
              onClick={() => setShowFilters(v => !v)}
              className="btn btn-ghost btn-sm sm:hidden flex items-center gap-1.5"
            >
              <Filter size={13} /> Filters
              <ChevronDown size={12} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Sort */}
            <select value={sortBy} onChange={e => setSort(e.target.value)} className="input-dark w-auto text-sm pr-8 hidden sm:block" style={{ minWidth: 160 }}>
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
              <option value="created">Newest First</option>
            </select>

            {/* Refresh */}
            <button onClick={fetchRepos} disabled={loading} className="btn btn-secondary btn-sm hidden sm:flex">
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>

          {/* Language filters */}
          <div className={`mt-3 ${showFilters ? 'block' : 'hidden sm:block'}`}>
            <div className="flex flex-wrap gap-1.5">
              {languages.slice(0, 12).map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`filter-pill ${lang === l ? 'active' : ''}`}>
                  {l !== 'All' && <span className="w-1.5 h-1.5 rounded-full mr-1 inline-block" style={{ background: LANG_CLR[l] || '#8b949e' }} />}
                  {l}
                </button>
              ))}
              {lang !== 'All' && (
                <button onClick={() => setLang('All')} className="filter-pill flex items-center gap-1 text-rose-400">
                  <X size={10} /> Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="glass-card p-4 mb-6 flex items-center gap-2" style={{ borderColor: 'rgba(244,63,94,0.2)' }}>
            <X size={15} className="text-rose-400" />
            <p className="text-sm text-rose-400">{error}</p>
          </div>
        )}

        {/* ── Grid ── */}
        {loading && tab !== 'custom' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(9).fill(0).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <Code2 size={40} className="text-[#4A6090] mx-auto mb-4 opacity-30" />
            {tab === 'custom' && customProjects.length === 0 ? (
              <>
                <p className="text-sm font-mono text-[#4A6090] mb-5">No custom projects yet.</p>
                <button onClick={() => setModal('add')} className="btn btn-primary">
                  <Plus size={14} /> Add Your First Project
                </button>
              </>
            ) : (
              <div>
                <p className="text-sm font-mono text-[#4A6090] mb-2">No projects match your search.</p>
                <button onClick={() => { setSearch(''); setLang('All') }} className="btn btn-ghost btn-sm">
                  <X size={12} /> Clear filters
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id || project.name}
                  project={project}
                  index={i}
                  isCustom={project.isCustom}
                  onEdit={p => setModal(p)}
                  onDelete={remove}
                />
              ))}
            </div>
            <p className="text-center text-xs font-mono text-[#2A3A55] mt-8">
              Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
              {search && ` for "${search}"`}
              {lang !== 'All' && ` in ${lang}`}
            </p>
          </>
        )}
      </div>

      {/* ── Modal ── */}
      {modal && (
        <ProjectModal
          project={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={data => { if (modal === 'add') add(data); else update(data) }}
        />
      )}
    </div>
  )
}