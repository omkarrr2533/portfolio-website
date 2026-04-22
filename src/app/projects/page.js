'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import {
  ExternalLink, Github, Search, Code2, X, Star, GitFork,
  RefreshCw, Globe, Lock, Plus, Edit2, Trash2, Save,
  ChevronDown, ArrowRight, CheckCircle,
} from 'lucide-react'
import { AdminOnly, useAdmin } from '@/lib/admin'

const LANG_CLR = {
  JavaScript:'#F59E0B', TypeScript:'#3B82F6', Python:'#8B5CF6',
  Java:'#EF4444', Go:'#06B6D4', Rust:'#F97316', Ruby:'#E11D48',
  HTML:'#F97316', CSS:'#EC4899', 'C++':'#14B8A6', C:'#64748B',
}

/* ── Custom project storage ─────────────────────── */
function useCustomProjects() {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    try { const s = localStorage.getItem('customProjects'); if (s) setProjects(JSON.parse(s)) } catch {}
  }, [])
  const save = (n) => { setProjects(n); localStorage.setItem('customProjects', JSON.stringify(n)) }
  const add    = (p) => save([{ ...p, id: Date.now().toString(), isCustom: true }, ...projects])
  const update = (p) => save(projects.map(x => x.id === p.id ? p : x))
  const remove = (id) => save(projects.filter(p => p.id !== id))
  return { projects, add, update, remove }
}

/* ── Add / Edit modal ────────────────────────────── */
const EMPTY = { name:'', description:'', language:'', techStack:'', url:'', homepage:'', stars:0, forks:0 }

function ProjectModal({ project, onSave, onClose }) {
  const [form, setForm] = useState(project
    ? { ...project, techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : (project.topics?.join(', ') || '') }
    : EMPTY
  )
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const handleSave = () => {
    if (!form.name) return
    const topics = form.techStack ? form.techStack.split(',').map(s=>s.trim()).filter(Boolean) : []
    onSave({ ...form, topics, techStack: topics })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-scale-in" style={{ padding: 24 }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
          <h2 style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontWeight:700, fontSize:18, color:'#E8F0FE' }}>
            {project ? 'Edit Project' : 'Add Project'}
          </h2>
          <button onClick={onClose} style={{ color:'#94A3B8', cursor:'pointer' }}><X size={18}/></button>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {[
            { key:'name',        label:'Project Name *',        ph:'e.g. My Awesome Project' },
            { key:'url',         label:'GitHub URL',             ph:'https://github.com/you/project' },
            { key:'homepage',    label:'Live URL (optional)',    ph:'https://project.com' },
            { key:'language',    label:'Primary Language',       ph:'Python, Java, JavaScript…' },
            { key:'techStack',   label:'Tech Stack (comma-sep)', ph:'React, Node.js, MongoDB' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ display:'block', fontSize:11, fontFamily:'JetBrains Mono,monospace', color:'#94A3B8', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.06em' }}>{f.label}</label>
              <input value={form[f.key]||''} onChange={e=>set(f.key,e.target.value)} placeholder={f.ph} className="input" />
            </div>
          ))}
          <div>
            <label style={{ display:'block', fontSize:11, fontFamily:'JetBrains Mono,monospace', color:'#94A3B8', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.06em' }}>Description</label>
            <textarea value={form.description||''} onChange={e=>set('description',e.target.value)} placeholder="What does this project do?" rows={3} className="input" />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {[{key:'stars',label:'Stars'},{key:'forks',label:'Forks'}].map(f=>(
              <div key={f.key}>
                <label style={{ display:'block', fontSize:11, fontFamily:'JetBrains Mono,monospace', color:'#94A3B8', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.06em' }}>{f.label}</label>
                <input type="number" value={form[f.key]||0} onChange={e=>set(f.key,parseInt(e.target.value)||0)} className="input" />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', gap:10, marginTop:20 }}>
          <button onClick={onClose} className="btn btn-secondary" style={{ flex:1 }}>Cancel</button>
          <button onClick={handleSave} disabled={!form.name} className="btn btn-primary" style={{ flex:1, opacity: form.name?1:.4 }}>
            <Save size={14}/> {project?'Save Changes':'Add Project'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── GitHub repo selector modal ──────────────────── */
function GitHubPickerModal({ repos, existing, onAdd, onClose }) {
  const [q, setQ] = useState('')
  const filtered = repos.filter(r =>
    !existing.find(e => e.url === r.url) &&
    (r.name.toLowerCase().includes(q.toLowerCase()) || (r.description||'').toLowerCase().includes(q.toLowerCase()))
  )
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-scale-in" style={{ padding:24, maxWidth:560 }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
          <h2 style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontWeight:700, fontSize:18, color:'#E8F0FE' }}>
            Add from GitHub
          </h2>
          <button onClick={onClose} style={{ color:'#94A3B8', cursor:'pointer' }}><X size={18}/></button>
        </div>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search repositories…" className="input" style={{ marginBottom:14 }} />
        <div style={{ maxHeight:360, overflowY:'auto', display:'flex', flexDirection:'column', gap:6 }}>
          {filtered.length === 0 ? (
            <p style={{ textAlign:'center', color:'#94A3B8', fontSize:13, padding:'24px 0' }}>No repositories found</p>
          ) : filtered.map(r => (
            <button
              key={r.id}
              onClick={() => { onAdd(r); }}
              style={{
                display:'flex', alignItems:'center', gap:12, padding:'11px 14px',
                background:'rgba(13,21,38,0.7)', border:'1px solid rgba(148,163,184,0.1)', borderRadius:9, cursor:'pointer',
                textAlign:'left', transition:'all 150ms ease',
              }}
            >
              <Github size={14} color="#94A3B8" style={{ flexShrink:0 }} />
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontFamily:'JetBrains Mono,monospace', fontSize:13, fontWeight:600, color:'#4F46E5', marginBottom:2 }}>{r.name}</p>
                <p className="line-clamp-1" style={{ fontSize:11.5, color:'#64748B' }}>{r.description||'No description'}</p>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#94A3B8', flexShrink:0 }}>
                <Star size={10}/>{r.stars}
              </div>
              <CheckCircle size={14} color="#4F46E5" style={{ flexShrink:0 }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Project card ────────────────────────────────── */
function ProjectCard({ project, index, onEdit, onDelete, isCustom }) {
  const langColor = LANG_CLR[project.language] || '#94A3B8'
  const topics = project.topics || (Array.isArray(project.techStack) ? project.techStack : [])
  const updatedAgo = useMemo(() => {
    if (!project.updatedAt) return null
    const d = Math.floor((Date.now() - new Date(project.updatedAt)) / 86400000)
    return d===0?'today':d===1?'1d ago':d<30?`${d}d ago`:`${Math.floor(d/30)}mo ago`
  }, [project.updatedAt])
  const admin = useAdmin()

  return (
    <div
      className="card card-lift animate-slide-up"
      style={{
        overflow:'hidden', position:'relative',
        animationDelay:`${index*45}ms`, animationFillMode:'both',
        borderTop:`2px solid ${langColor}55`,
      }}
    >
      {isCustom && (
        <div style={{ position:'absolute', top:10, left:12 }}>
          <span className="badge badge-success" style={{ fontSize:9 }}>custom</span>
        </div>
      )}
      {admin && isCustom && (
        <div style={{ position:'absolute', top:8, right:10, display:'flex', gap:4 }}>
          <button
            onClick={()=>onEdit(project)}
            style={{ width:26, height:26, borderRadius:6, border:'1px solid #E2E8F0', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#64748B' }}
          ><Edit2 size={11}/></button>
          <button
            onClick={()=>onDelete(project.id)}
            style={{ width:26, height:26, borderRadius:6, border:'1px solid #FECACA', background:'#FEF2F2', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#DC2626' }}
          ><Trash2 size={11}/></button>
        </div>
      )}

      <div style={{ padding:'16px 16px 14px', paddingTop: isCustom ? 36 : 16 }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'start', justifyContent:'space-between', marginBottom:7 }}>
          <div style={{ display:'flex', alignItems:'center', gap:5, flex:1, minWidth:0 }}>
            {project.isPrivate ? <Lock size={11} color="#94A3B8"/> : <Globe size={11} color="#94A3B8"/>}
            {project.url ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:'JetBrains Mono,monospace', fontSize:13, fontWeight:600, color:'#4F46E5', textDecoration:'none', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:150 }}>
                {project.name}
              </a>
            ) : (
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:13, fontWeight:600, color:'#4F46E5', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:150 }}>{project.name}</span>
            )}
          </div>
          {updatedAgo && <span style={{ fontSize:10, fontFamily:'JetBrains Mono,monospace', color:'#CBD5E1', flexShrink:0, marginLeft:6 }}>{updatedAgo}</span>}
        </div>

        <p className="line-clamp-2" style={{ fontSize:12, color:'#64748B', lineHeight:1.6, marginBottom:10, minHeight:38 }}>
          {project.description||<span style={{ fontStyle:'italic' }}>No description</span>}
        </p>

        {topics.length>0 && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:10 }}>
            {topics.slice(0,4).map(t=><span key={t} className="tech-pill" style={{ fontSize:11, padding:'3px 8px' }}>{t}</span>)}
            {topics.length>4 && <span style={{ fontSize:11, color:'#94A3B8', padding:'3px 4px' }}>+{topics.length-4}</span>}
          </div>
        )}

        <div style={{ display:'flex', alignItems:'center', gap:10, paddingTop:10, borderTop:'1px solid #F1F5F9' }}>
          {project.language && (
            <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:'#94A3B8' }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:langColor, display:'inline-block' }}/>
              {project.language}
            </span>
          )}
          <span style={{ display:'flex', alignItems:'center', gap:3, fontSize:11, color:'#94A3B8' }}><Star size={10}/>{project.stars||0}</span>
          <span style={{ display:'flex', alignItems:'center', gap:3, fontSize:11, color:'#94A3B8' }}><GitFork size={10}/>{project.forks||0}</span>
          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8 }}>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color:'#94A3B8', transition:'color 150ms ease' }} title="Source">
                <Github size={13}/>
              </a>
            )}
            {project.homepage && (
              <a href={project.homepage} target="_blank" rel="noopener noreferrer" style={{ color:'#94A3B8', transition:'color 150ms ease' }} title="Live demo">
                <ExternalLink size={13}/>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="card" style={{ padding:16, height:154 }}>
      <div className="skeleton" style={{ height:11, width:110, marginBottom:10 }}/>
      <div className="skeleton" style={{ height:10, width:'100%', marginBottom:6 }}/>
      <div className="skeleton" style={{ height:10, width:'78%', marginBottom:16 }}/>
      <div style={{ display:'flex', gap:6 }}>
        <div className="skeleton" style={{ height:20, width:56, borderRadius:99 }}/>
        <div className="skeleton" style={{ height:20, width:48, borderRadius:99 }}/>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
export default function ProjectsPage() {
  const { projects: customProjects, add, update, remove } = useCustomProjects()
  const [ghRepos,  setGhRepos]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [lang,     setLang]     = useState('All')
  const [sortBy,   setSort]     = useState('updated')
  const [tab,      setTab]      = useState('all')
  const [modal,    setModal]    = useState(null)
  const [ghPicker, setGhPicker] = useState(false)
  const [ghOk,     setGhOk]    = useState(true)
  const searchRef = useRef(null)
  const admin = useAdmin()

  const fetchRepos = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch(`/api/github/repos?sort=${sortBy}&per_page=100`)
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      if (json.data?.length) { setGhRepos(json.data); setGhOk(true) }
      else setGhOk(false)
    } catch { setGhOk(false) }
    finally { setLoading(false) }
  }, [sortBy])

  useEffect(() => { fetchRepos() }, [fetchRepos])

  useEffect(() => {
    const fn = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') { e.preventDefault(); searchRef.current?.focus() }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const allProjects = useMemo(() => [
    ...customProjects.map(p=>({...p,isCustom:true})),
    ...ghRepos.map(r=>({...r,isCustom:false})),
  ], [ghRepos, customProjects])

  const languages = useMemo(() => {
    const langs = [...new Set(allProjects.map(r=>r.language).filter(Boolean))]
    return ['All', ...langs.sort()]
  }, [allProjects])

  const filtered = useMemo(() => {
    let src = tab==='custom' ? customProjects.map(p=>({...p,isCustom:true}))
            : tab==='github' ? ghRepos.map(r=>({...r,isCustom:false}))
            : allProjects
    if (lang!=='All') src = src.filter(r=>r.language===lang)
    if (search.trim()) {
      const q = search.toLowerCase()
      src = src.filter(r =>
        r.name?.toLowerCase().includes(q) ||
        (r.description||'').toLowerCase().includes(q) ||
        (r.topics||[]).some(t=>t.toLowerCase().includes(q)) ||
        (Array.isArray(r.techStack)?r.techStack:[]).some(t=>t.toLowerCase().includes(q))
      )
    }
    return src
  }, [allProjects, customProjects, ghRepos, lang, search, tab])

  const totalStars = ghRepos.reduce((s,r)=>s+r.stars,0)

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', paddingTop:80, paddingBottom:96 }}>
      <div className="container" style={{ paddingTop:32 }}>

        {/* Header */}
        <div style={{ marginBottom:40 }}>
          <span className="section-label" style={{ display:'inline-flex', marginBottom:14 }}>// projects</span>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:14 }}>
            <div>
              <h1 style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontWeight:800, fontSize:'clamp(32px,5vw,52px)', color:'#E8F0FE', letterSpacing:'-0.03em', lineHeight:1.1 }}>
                All <span className="gradient-text">Projects</span>
              </h1>
              <p style={{ fontSize:14, color:'#64748B', marginTop:6 }}>Your custom projects + live GitHub repositories</p>
            </div>
            {admin && (
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={()=>setGhPicker(true)} className="btn btn-secondary btn-sm">
                  <Github size={14}/> From GitHub
                </button>
                <button onClick={()=>setModal('add')} className="btn btn-primary btn-sm">
                  <Plus size={14}/> Add Project
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:28 }}>
          {[
            { icon:Code2,    v:customProjects.length, label:'My Projects', accent:'#059669' },
            ghOk&&{ icon:Globe,   v:ghRepos.length,      label:'GitHub Repos', accent:'#4F46E5' },
            ghOk&&{ icon:Star,    v:totalStars,           label:'Total Stars',  accent:'#D97706' },
          ].filter(Boolean).map(s=>(
            <div key={s.label} className="stat-card" style={{ display:'flex', alignItems:'center', gap:10 }}>
              <s.icon size={14} style={{ color:s.accent }}/>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:13, fontWeight:700, color:'#E8F0FE' }}>{s.v}</span>
              <span style={{ fontSize:12, color:'#94A3B8' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:2, marginBottom:20, padding:4,
  background:'rgba(13,21,38,0.8)', border:'1px solid rgba(148,163,184,0.1)',
  borderRadius:10, width:'fit-content' }}>
          {[
            { id:'all',    label:`All (${allProjects.length})` },
            { id:'custom', label:`Mine (${customProjects.length})` },
            { id:'github', label:`GitHub (${ghRepos.length})` },
          ].map(t=>(
            <button
              key={t.id}
              onClick={()=>setTab(t.id)}
              style={{
                padding:'7px 16px', borderRadius:7, fontSize:13, fontWeight:600,
                 background: tab===t.id ? 'rgba(79,70,229,0.15)':'transparent',
                color:      tab===t.id ? '#4F46E5':'#64748B',
                boxShadow:  tab===t.id ? '0 1px 3px rgba(15,23,42,.08)':'none',
                border:'none', cursor:'pointer', transition:'all 150ms ease',
                fontFamily:'Plus Jakarta Sans,sans-serif',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search + filters */}
        <div className="card" style={{ padding:16, marginBottom:20 }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:14 }}>
            {/* Search */}
            <div style={{ position:'relative', flex:1, minWidth:220 }}>
              <Search size={13} color="#94A3B8" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)' }}/>
              <input
                ref={searchRef}
                value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder='Search projects… (press / to focus)'
                className="input"
                style={{ paddingLeft:34, paddingRight:search?32:14 }}
              />
              {search && (
                <button onClick={()=>setSearch('')} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', color:'#94A3B8', cursor:'pointer' }}>
                  <X size={13}/>
                </button>
              )}
            </div>
            {/* Sort */}
            <select value={sortBy} onChange={e=>setSort(e.target.value)} className="input" style={{ width:'auto', minWidth:160 }}>
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
              <option value="created">Newest First</option>
            </select>
            {/* Refresh */}
            <button onClick={fetchRepos} disabled={loading} className="btn btn-secondary btn-sm">
              <RefreshCw size={13} className={loading?'animate-spin':''}/>
            </button>
          </div>
          {/* Language pills */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
            {languages.slice(0,14).map(l=>(
              <button key={l} onClick={()=>setLang(l)} className={`filter-pill ${lang===l?'active':''}`}>
                {l!=='All' && <span style={{ width:6, height:6, borderRadius:'50%', background:LANG_CLR[l]||'#94A3B8', display:'inline-block', marginRight:4 }}/>}
                {l}
              </button>
            ))}
            {lang!=='All' && (
              <button onClick={()=>setLang('All')} className="filter-pill" style={{ color:'#DC2626', borderColor:'#FECACA' }}>
                <X size={10}/> Clear
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {loading && tab!=='custom' ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 }}>
            {Array(9).fill(0).map((_,i)=><CardSkeleton key={i}/>)}
          </div>
        ) : filtered.length===0 ? (
          <div className="card" style={{ padding:'60px 24px', textAlign:'center' }}>
            <Code2 size={36} color="#CBD5E1" style={{ margin:'0 auto 16px' }}/>
            {tab==='custom' && customProjects.length===0 ? (
              <>
                <p style={{ fontSize:14, color:'#94A3B8', marginBottom:16, fontFamily:'JetBrains Mono,monospace' }}>No custom projects yet.</p>
                {admin && (
                  <button onClick={()=>setModal('add')} className="btn btn-primary btn-sm">
                    <Plus size={14}/> Add Your First Project
                  </button>
                )}
              </>
            ) : (
              <div>
                <p style={{ fontSize:14, color:'#94A3B8', marginBottom:10, fontFamily:'JetBrains Mono,monospace' }}>No projects match your search.</p>
                <button onClick={()=>{setSearch('');setLang('All')}} className="btn btn-ghost btn-sm">
                  <X size={12}/> Clear filters
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 }}>
              {filtered.map((project,i)=>(
                <ProjectCard
                  key={project.id||project.name}
                  project={project}
                  index={i}
                  isCustom={project.isCustom}
                  onEdit={p=>setModal(p)}
                  onDelete={remove}
                />
              ))}
            </div>
            <p style={{ textAlign:'center', fontSize:11, fontFamily:'JetBrains Mono,monospace', color:'#CBD5E1', marginTop:28 }}>
              Showing {filtered.length} project{filtered.length!==1?'s':''}
              {search && ` for "${search}"`}
              {lang!=='All' && ` in ${lang}`}
            </p>
          </>
        )}
      </div>

      {/* Project add/edit modal */}
      {modal && (
        <ProjectModal
          project={modal==='add'?null:modal}
          onClose={()=>setModal(null)}
          onSave={data => { if(modal==='add') add(data); else update(data) }}
        />
      )}

      {/* GitHub picker modal */}
      {ghPicker && (
        <GitHubPickerModal
          repos={ghRepos}
          existing={customProjects}
          onAdd={r => {
            add({
              name: r.name,
              description: r.description||'',
              language: r.language||'',
              techStack: r.topics||[],
              topics: r.topics||[],
              url: r.url,
              homepage: r.homepage||'',
              stars: r.stars,
              forks: r.forks,
              updatedAt: r.updatedAt,
            })
          }}
          onClose={()=>setGhPicker(false)}
        />
      )}
    </div>
  )
}