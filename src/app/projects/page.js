'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  ExternalLink, Github, Search, Code2, X, Star, GitFork,
  RefreshCw, Globe, Lock, Plus, Edit2, Trash2, Save,
} from 'lucide-react'

const LANG_COLORS = {
  JavaScript: '#F1E05A', TypeScript: '#3178C6', Python: '#3572A5',
  Java: '#B07219', Go: '#00ADD8', Rust: '#DEA584', Ruby: '#701516',
  HTML: '#E34C26', CSS: '#563D7C', 'C++': '#F34B7D', C: '#555555',
}

// ── Custom project storage ──────────────────────
function useCustomProjects() {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    try {
      const saved = localStorage.getItem('customProjects')
      if (saved) setProjects(JSON.parse(saved))
    } catch {}
  }, [])
  const save = (next) => { setProjects(next); localStorage.setItem('customProjects', JSON.stringify(next)) }
  const add = (p) => save([{ ...p, id: Date.now().toString(), isCustom: true }, ...projects])
  const update = (p) => save(projects.map(x => x.id === p.id ? p : x))
  const remove = (id) => save(projects.filter(p => p.id !== id))
  return { projects, add, update, remove }
}

// ── Add / Edit project modal ────────────────────
const EMPTY_FORM = {
  name: '', description: '', language: '', techStack: '',
  url: '', homepage: '', stars: 0, forks: 0,
}

function ProjectModal({ project, onSave, onClose }) {
  const [form, setForm] = useState(project ? {
    ...project,
    techStack: Array.isArray(project.techStack)
      ? project.techStack.join(', ')
      : (project.topics?.join(', ') || ''),
  } : EMPTY_FORM)

  const handleSave = () => {
    if (!form.name) return
    const topics = form.techStack
      ? form.techStack.split(',').map(s => s.trim()).filter(Boolean)
      : []
    onSave({ ...form, topics, techStack: topics })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <div className="glass-card w-full max-w-md p-6 animate-scale-in max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-700 text-[#E8F0FE]">
            {project ? 'Edit Project' : 'Add Project'}
          </h2>
          <button onClick={onClose} className="text-[#4A6080] hover:text-white"><X size={18} /></button>
        </div>

        <div className="space-y-3">
          {[
            { key: 'name', label: 'Project Name *', placeholder: 'e.g. My Cool Project' },
            { key: 'url', label: 'GitHub URL', placeholder: 'https://github.com/you/project' },
            { key: 'homepage', label: 'Live URL (optional)', placeholder: 'https://myproject.com' },
            { key: 'language', label: 'Primary Language', placeholder: 'e.g. Python, Java, JavaScript' },
            { key: 'techStack', label: 'Tech Stack (comma-separated)', placeholder: 'React, Node.js, MongoDB' },
          ].map(f => (
            <div key={f.key}>
              <label className="text-xs text-[#4A6080] font-mono mb-1 block">{f.label}</label>
              <input
                value={form[f.key] || ''}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="input-dark text-sm"
              />
            </div>
          ))}
          <div>
            <label className="text-xs text-[#4A6080] font-mono mb-1 block">Description</label>
            <textarea
              value={form.description || ''}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Describe what your project does..."
              rows={3}
              className="input-dark text-sm resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'stars', label: 'Stars' },
              { key: 'forks', label: 'Forks' },
            ].map(f => (
              <div key={f.key}>
                <label className="text-xs text-[#4A6080] font-mono mb-1 block">{f.label}</label>
                <input
                  type="number"
                  value={form[f.key] || 0}
                  onChange={e => setForm(p => ({ ...p, [f.key]: parseInt(e.target.value) || 0 }))}
                  className="input-dark text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="btn-secondary flex-1 text-sm py-2">Cancel</button>
          <button
            onClick={handleSave}
            disabled={!form.name}
            className="btn-primary flex-1 text-sm py-2 disabled:opacity-40"
          >
            <Save size={14} /> {project ? 'Save Changes' : 'Add Project'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Skeleton card ───────────────────────────────
function SkeletonCard() {
  return (
    <div className="glass-card p-6">
      <div className="skeleton h-4 w-24 mb-4 rounded" />
      <div className="skeleton h-6 w-48 mb-3 rounded" />
      <div className="skeleton h-16 w-full mb-4 rounded" />
      <div className="flex gap-2 mb-4">
        {[1, 2, 3].map(i => <div key={i} className="skeleton h-6 w-16 rounded" />)}
      </div>
    </div>
  )
}

// ── Project card (works for both GitHub and custom) ─
function ProjectCard({ project, index, onEdit, onDelete, isCustom }) {
  const langColor = LANG_COLORS[project.language] || '#8b949e'
  const topics = project.topics || (Array.isArray(project.techStack) ? project.techStack : [])

  const updatedAgo = project.updatedAt ? (() => {
    const d = Math.floor((Date.now() - new Date(project.updatedAt)) / 86400000)
    if (d === 0) return 'today'
    if (d === 1) return 'yesterday'
    if (d < 30) return `${d}d ago`
    return `${Math.floor(d / 30)}mo ago`
  })() : null

  return (
    <div
      className="glass-card overflow-hidden group animate-slide-up relative"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      <div className="h-0.5" style={{ background: `linear-gradient(90deg,${langColor},transparent)` }} />

      {/* Custom project badge */}
      {isCustom && (
        <div className="absolute top-3 left-3 z-10">
          <span className="text-xs font-mono px-2 py-0.5 rounded"
            style={{ background: 'rgba(16,185,129,0.15)', color: '#34D399', border: '1px solid rgba(16,185,129,0.3)' }}>
            custom
          </span>
        </div>
      )}

      {/* Edit/delete for custom projects */}
      {isCustom && (
        <div className="absolute top-3 right-3 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(project)}
            className="p-1.5 rounded-lg text-[#4A6080] hover:text-[#60A5FA] bg-[#0B1325] border border-[rgba(99,120,162,0.2)]">
            <Edit2 size={12} />
          </button>
          <button onClick={() => onDelete(project.id)}
            className="p-1.5 rounded-lg text-red-400/50 hover:text-red-400 bg-[#0B1325] border border-[rgba(99,120,162,0.2)]">
            <Trash2 size={12} />
          </button>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-3 mt-4">
          <div className="flex items-center gap-2">
            {project.isPrivate
              ? <Lock size={14} className="text-[#4A6080]" />
              : <Globe size={14} className="text-[#4A6080]" />}
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm font-700 text-[#60A5FA] hover:text-white transition-colors"
              >
                {project.name}
              </a>
            ) : (
              <span className="font-mono text-sm font-700 text-[#60A5FA]">{project.name}</span>
            )}
          </div>
          {updatedAgo && <span className="text-xs text-[#4A6080] font-mono">{updatedAgo}</span>}
        </div>

        <p className="text-[#8EA4C8] text-sm leading-relaxed mb-4 line-clamp-2 min-h-[40px]">
          {project.description || <span className="italic text-[#4A6080]">No description</span>}
        </p>

        {topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {topics.slice(0, 4).map(t => <span key={t} className="tech-badge">{t}</span>)}
          </div>
        )}

        <div className="flex items-center gap-4 pt-3 border-t border-[rgba(99,120,162,0.1)]">
          {project.language && (
            <span className="flex items-center gap-1.5 text-xs text-[#8EA4C8]">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: langColor }} />
              {project.language}
            </span>
          )}
          <span className="flex items-center gap-1 text-xs text-[#8EA4C8]">
            <Star size={11} />{project.stars || 0}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#8EA4C8]">
            <GitFork size={11} />{project.forks || 0}
          </span>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1 text-xs text-[#4A6080] hover:text-[#60A5FA] transition-colors">
              <Github size={13} /> View
            </a>
          )}
          {project.homepage && (
            <a href={project.homepage} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[#4A6080] hover:text-[#34D399] transition-colors">
              <ExternalLink size={13} /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════
export default function ProjectsPage() {
  const { projects: customProjects, add, update, remove } = useCustomProjects()
  const [ghRepos, setGhRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [langFilter, setLang] = useState('All')
  const [sortBy, setSort] = useState('updated')
  const [activeTab, setActiveTab] = useState('all')
  const [modal, setModal] = useState(null) // null | 'add' | project object
  const [githubConfigured, setGithubConfigured] = useState(true)

  const fetchRepos = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/github/repos?sort=${sortBy}&per_page=100`)
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      if (json.data?.length) {
        setGhRepos(json.data)
        setGithubConfigured(true)
      } else {
        setGithubConfigured(false)
      }
    } catch (e) {
      setError(e.message)
      setGithubConfigured(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRepos() }, [sortBy]) // eslint-disable-line

  // All projects = custom + GitHub
  const allProjects = useMemo(() => {
    const ghMapped = ghRepos.map(r => ({ ...r, isCustom: false }))
    const customMapped = customProjects.map(p => ({ ...p, isCustom: true }))
    return [...customMapped, ...ghMapped]
  }, [ghRepos, customProjects])

  const languages = useMemo(() => {
    const langs = [...new Set(allProjects.map(r => r.language).filter(Boolean))]
    return ['All', ...langs.sort()]
  }, [allProjects])

  const getFilteredProjects = (source) => {
    let list = [...source]
    if (langFilter !== 'All') list = list.filter(r => r.language === langFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(r =>
        r.name?.toLowerCase().includes(q) ||
        (r.description || '').toLowerCase().includes(q) ||
        (r.topics || []).some(t => t.toLowerCase().includes(q)) ||
        (Array.isArray(r.techStack) ? r.techStack : []).some(t => t.toLowerCase().includes(q))
      )
    }
    return list
  }

  const displayProjects = useMemo(() => {
    if (activeTab === 'custom') return getFilteredProjects(customProjects.map(p => ({ ...p, isCustom: true })))
    if (activeTab === 'github') return getFilteredProjects(ghRepos.map(r => ({ ...r, isCustom: false })))
    return getFilteredProjects(allProjects)
  }, [allProjects, customProjects, ghRepos, langFilter, search, activeTab]) // eslint-disable-line

  const totalStars = ghRepos.reduce((s, r) => s + r.stars, 0)
  const totalForks = ghRepos.reduce((s, r) => s + r.forks, 0)

  return (
    <div className="min-h-screen pt-24 pb-20"
      style={{ background: 'linear-gradient(180deg,#060D1F 0%,#080F20 100%)' }}>
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <span className="section-badge mb-4 block w-fit">// projects</span>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display font-800 text-[#E8F0FE] mb-2"
                style={{ fontSize: 'clamp(32px,5vw,52px)' }}>
                All <span className="gradient-text">Projects</span>
              </h1>
              <p className="text-[#8EA4C8] text-sm">
                Your own projects + live GitHub repos
              </p>
            </div>
            <button onClick={() => setModal('add')} className="btn-primary text-sm py-2.5 px-5">
              <Plus size={16} /> Add Project
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 mb-8 animate-slide-up">
          <div className="stat-card flex items-center gap-3">
            <Code2 size={16} className="text-[#60A5FA]" />
            <span className="font-mono text-sm text-[#E8F0FE] font-700">{customProjects.length}</span>
            <span className="text-xs text-[#4A6080]">My Projects</span>
          </div>
          {githubConfigured && (
            <>
              <div className="stat-card flex items-center gap-3">
                <Code2 size={16} className="text-[#8B5CF6]" />
                <span className="font-mono text-sm text-[#E8F0FE] font-700">{ghRepos.length}</span>
                <span className="text-xs text-[#4A6080]">GitHub Repos</span>
              </div>
              <div className="stat-card flex items-center gap-3">
                <Star size={16} className="text-[#F59E0B]" />
                <span className="font-mono text-sm text-[#E8F0FE] font-700">{totalStars}</span>
                <span className="text-xs text-[#4A6080]">Total Stars</span>
              </div>
              <div className="stat-card flex items-center gap-3">
                <GitFork size={16} className="text-[#10B981]" />
                <span className="font-mono text-sm text-[#E8F0FE] font-700">{totalForks}</span>
                <span className="text-xs text-[#4A6080]">Total Forks</span>
              </div>
            </>
          )}
        </div>

        {/* GitHub not configured banner */}
        {!githubConfigured && !loading && (
          <div className="glass-card p-5 mb-6 text-center"
            style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.04)' }}>
            <p className="text-[#F59E0B] text-sm mb-1">⚠ GitHub not connected</p>
            <p className="text-[#4A6080] text-xs font-mono">
              Add <code className="text-[#60A5FA]">GITHUB_TOKEN=your_token</code> and{' '}
              <code className="text-[#60A5FA]">GITHUB_USERNAME=your_username</code> to <code className="text-[#60A5FA]">.env.local</code> to sync GitHub repos automatically.
            </p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="flex gap-1 p-1 rounded-xl"
            style={{ background: 'rgba(15,26,46,0.8)', border: '1px solid rgba(99,120,162,0.15)' }}>
            {[
              { id: 'all', label: `All (${allProjects.length})` },
              { id: 'custom', label: `My Projects (${customProjects.length})` },
              { id: 'github', label: `GitHub (${ghRepos.length})` },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2 rounded-lg text-sm font-600 transition-all"
                style={{
                  background: activeTab === tab.id ? 'rgba(59,130,246,0.15)' : 'transparent',
                  color: activeTab === tab.id ? '#60A5FA' : '#8EA4C8',
                }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-slide-up">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A6080]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search projects, topics…"
              className="input-dark pl-9 pr-9"
            />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A6080] hover:text-[#8EA4C8]">
                <X size={13} />
              </button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {languages.slice(0, 8).map(lang => (
              <button key={lang} onClick={() => setLang(lang)}
                className="px-3 py-2 rounded-lg text-xs font-600 transition-all font-mono"
                style={{
                  background: langFilter === lang ? 'rgba(59,130,246,0.15)' : 'rgba(15,26,46,0.7)',
                  color: langFilter === lang ? '#60A5FA' : '#8EA4C8',
                  border: langFilter === lang ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(99,120,162,0.15)',
                }}>
                {lang}
              </button>
            ))}
          </div>

          <div className="flex gap-2 ml-auto">
            <select
              value={sortBy}
              onChange={e => setSort(e.target.value)}
              className="input-dark text-xs px-3 py-2 w-auto cursor-pointer">
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
              <option value="created">Newest</option>
            </select>
            <button onClick={fetchRepos} disabled={loading}
              className="btn-secondary px-3 py-2 text-xs">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="glass-card p-4 mb-6 text-center" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
            <p className="text-red-400 text-sm">⚠ {error}</p>
          </div>
        )}

        {/* Grid */}
        {loading && activeTab !== 'custom' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : displayProjects.length === 0 ? (
          <div className="text-center py-24 text-[#4A6080]">
            <Code2 size={40} className="mx-auto mb-4 opacity-30" />
            {activeTab === 'custom' && customProjects.length === 0 ? (
              <>
                <p className="font-mono text-sm mb-4">No custom projects yet.</p>
                <button onClick={() => setModal('add')} className="btn-primary text-sm">
                  <Plus size={15} /> Add Your First Project
                </button>
              </>
            ) : (
              <p className="font-mono text-sm">No projects match your filters.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayProjects.map((project, i) => (
              <ProjectCard
                key={project.id || project.name}
                project={project}
                index={i}
                isCustom={project.isCustom}
                onEdit={(p) => setModal(p)}
                onDelete={remove}
              />
            ))}
          </div>
        )}

        {!loading && displayProjects.length > 0 && (
          <p className="text-center text-xs text-[#4A6080] mt-8 font-mono">
            Showing {displayProjects.length} project{displayProjects.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <ProjectModal
          project={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={(data) => {
            if (modal === 'add') add(data)
            else update(data)
          }}
        />
      )}
    </div>
  )
}