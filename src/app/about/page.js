'use client'

import { useState, useEffect, useRef } from 'react'
import { Camera, Edit2, Save, X, Plus, Trash2, MapPin, Mail, ExternalLink, Check } from 'lucide-react'

const DEFAULT_ABOUT = {
  name: 'Om Shripad Kapale',
  title: 'GSoC 2026 Contributor · Backend Developer · Open Source',
  location: 'Chh. Sambhajinagar, Maharashtra, India',
  email: 'omshripadkapale@gmail.com',
  bio: `Selected for Google Summer of Code 2026 at the PEcAn Project as the #1 ranked contributor globally — refactoring the Trait-Meta-analysis-Configuration Pipeline under mentor Mike Dietze (Boston University), working on real open-source climate/ecosystem modeling software.\n\nFinal-year Computer Science student. I build scalable backend systems with Java/Spring Boot, explore ecological informatics and LLM integration with Python, and contribute to open source across 5+ organisations with 15+ merged PRs. I believe in clean, maintainable code that solves real problems.`,
  cgpa: '7.67',
  rank: 'Top 5%',
  gsoc: 'GSoC 2026',
  education: 'B.Tech Computer Science Engineering',
  college: 'CSMSS Chh. Shahu College of Engineering',
  period: '2023 – Present',
  experience: [
    {
    id:'e0',
    title: 'Google Summer of Code 2026 Contributor',
    company: 'PEcAn Project · Google',
    period: 'May – Sep 2026',
    bullets: [
      'Selected for GSoC 2026 from a record-breaking applicant pool worldwide',
      'Refactoring the Trait-Meta-analysis-Configuration Pipeline for better modularity',
      'Designing plugin interfaces and decoupling core modules in PEcAn codebase',
      'Improving test coverage for open-source climate and ecosystem modeling software',
      'Mentor: Mike Dietze · Stipend: $3,000 USD · Ranking: #1 proposal',
    ],
  },
    {
      id:'e1', title:'Backend Developer (Learning)', company:'Personal Projects',
      period:'2023–Present',
      bullets:['Building REST APIs with Spring Boot & Java','Implementing WebSocket real-time features','Working with PostgreSQL, MySQL, Oracle databases','Developing AI/ML models with PyTorch & Pandas'],
    },
    {
      id:'e2', title:'Open Source Contributor', company:'Zulip · JabRef · FreeCAD · CircuitVerse',
      period:'2024–Present',
      bullets:['15+ merged PRs (~3000+ lines of code) across 5+ organisations','Implemented server-side caching for realm descriptions in Zulip','Fixed group-merging and library-import bugs in JabRef','Collaborating with global developers'],
    },
  ],
  skills: [
    { id:'s1', category:'Backend', items:'Java, Spring Boot, Node.js, REST API, WebSocket' },
    { id:'s2', category:'AI / ML', items:'Python, PyTorch, Pandas, NumPy, NLP, LLMs' },
    { id:'s3', category:'Databases', items:'PostgreSQL, MySQL, Oracle, Redis' },
    { id:'s4', category:'Tools', items:'Git, Socket.io, Maven, DSA, Linux' },
  ],
  values: [
    { id:'v1', emoji:'⚡', title:'Clean Code', desc:'Readable, maintainable, well-documented.' },
    { id:'v2', emoji:'🧠', title:'Problem Solving', desc:'Love tackling complex algorithmic challenges.' },
    { id:'v3', emoji:'🌱', title:'Always Learning', desc:'Exploring new tech in AI/ML and backend.' },
    { id:'v4', emoji:'🤝', title:'Collaboration', desc:'Open source contributor and team player.' },
  ],
}

function useAbout() {
  const [data, setData] = useState(DEFAULT_ABOUT)
  const [photo, setPhoto] = useState(null)
  useEffect(() => {
    try {
      const d = localStorage.getItem('aboutData')
      if (d) setData(JSON.parse(d))
      const p = localStorage.getItem('profilePhotoUrl')
      if (p) setPhoto(p)
    } catch {}
  }, [])
  const update = (key, val) => {
    setData(prev => {
      const next = { ...prev, [key]: val }
      localStorage.setItem('aboutData', JSON.stringify(next))
      return next
    })
  }
  const savePhoto = (base64) => {
    setPhoto(base64)
    localStorage.setItem('profilePhoto', base64)
  }
  return { data, update, photo, savePhoto }
}

function Field({ value, onChange, tag:Tag='p', multiline=false, className='', placeholder='Click to edit...' }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const save = () => { onChange(draft); setEditing(false) }
  const cancel = () => { setDraft(value); setEditing(false) }

  if (editing) {
    return (
      <div className="relative">
        {multiline
          ? <textarea value={draft} onChange={e=>setDraft(e.target.value)} rows={5} autoFocus
              className="w-full bg-[#0A100E] border border-emerald-500/50 rounded-lg px-3 py-2 text-sm outline-none resize-none text-[#ECF2EF]" />
          : <input value={draft} onChange={e=>setDraft(e.target.value)} autoFocus
              className="w-full bg-[#0A100E] border border-emerald-500/50 rounded-lg px-3 py-2 text-sm outline-none text-[#ECF2EF]" />
        }
        <div className="flex gap-2 mt-2">
          <button onClick={save} className="text-xs btn-primary py-1 px-3 flex items-center gap-1"><Check size={12}/> Save</button>
          <button onClick={cancel} className="text-xs btn-secondary py-1 px-3 flex items-center gap-1"><X size={12}/> Cancel</button>
        </div>
      </div>
    )
  }
  return (
    <Tag onClick={() => { setDraft(value); setEditing(true) }}
      className={`cursor-pointer group relative hover:bg-white/5 rounded px-1 -mx-1 transition-colors ${className}`}
    >
      {value || <span className="text-[#9CAFA7] italic text-sm">{placeholder}</span>}
      <Edit2 size={11} className="absolute right-1 top-1 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Tag>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: 'Playfair Display, "Inter", sans-serif',
      fontWeight: 800, fontSize: 22, color: '#ECF2EF',
      marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12,
      letterSpacing: '0.02em',
    }}>
      <span style={{
        height: 2, width: 32, flexShrink: 0, borderRadius: 2,
        background: 'linear-gradient(90deg, #10B981, #22D3EE)',
        display: 'block',
      }} />
      {children}
    </h2>
  )
}

export default function AboutPage() {
  const { data, update, photo, savePhoto } = useAbout()
  const [editMode, setEditMode] = useState(false)
  const photoRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') setEditMode(v => !v)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const addExperience = () => {
    const next = [...data.experience, {
      id: Date.now().toString(), title:'New Role', company:'Company',
      period:'20XX–Present', bullets:['Add your responsibilities here'],
    }]
    update('experience', next)
  }
  const removeExperience = (id) => update('experience', data.experience.filter(e=>e.id!==id))
  const updateExp = (id, key, val) => update('experience', data.experience.map(e=>e.id===id?{...e,[key]:val}:e))
  const addBullet = (expId) => { update('experience', data.experience.map(e => e.id===expId ? {...e, bullets:[...e.bullets, 'New bullet point']} : e)) }
  const updateBullet = (expId, bi, val) => { update('experience', data.experience.map(e => e.id===expId ? {...e, bullets: e.bullets.map((b,i) => i===bi ? val : b)} : e)) }
  const removeBullet = (expId, bi) => { update('experience', data.experience.map(e => e.id===expId ? {...e, bullets: e.bullets.filter((_,i) => i!==bi)} : e)) }
  const updateSkill = (id, key, val) => update('skills', data.skills.map(s=>s.id===id?{...s,[key]:val}:s))
  const addSkill = () => update('skills', [...data.skills, { id:Date.now().toString(), category:'New Category', items:'skill1, skill2' }])
  const removeSkill = (id) => update('skills', data.skills.filter(s=>s.id!==id))

  return (
    <div className="min-h-screen pb-16" style={{ background: 'var(--bg)' }}>

      {/* ── Hook Banner ── */}
      <div className="page-hook-banner" style={{ paddingTop: 96 }}>
        <div className="container mx-auto px-4 sm:px-6" style={{ maxWidth: 860 }}>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
            <button onClick={() => setEditMode(v=>!v)}
              className={`text-xs font-mono flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                editMode ? 'text-green-400 bg-green-500/10 border border-green-500/30'
                         : 'text-[#9CAFA7] bg-white/5 border border-white/10 hover:border-emerald-500/30'
              }`}
            >
              {editMode ? <><Save size={11}/> Editing</> : <><Edit2 size={11}/> Edit</>}
            </button>
          </div>

          <span className="section-badge" style={{ marginBottom: 18, display: 'inline-flex' }}>// about me</span>

          <h1 className="page-title glow-heading" style={{ marginBottom: 14 }}>
            The <span className="gradient-text-animate">Story</span> Behind the Code
          </h1>
          <span className="accent-line" />
          <p className="hook-subtext" style={{ marginBottom: 28 }}>
            CSE student turned open source contributor — building scalable systems, shipping AI tools, and making an impact globally.
          </p>

          {/* Achievement chips */}
          <div className="achievement-strip">
            {[
              { dot: '#4ade80', text: 'GSoC 2026 · PEcAn Project' },
              { dot: '#34D399', text: 'Top 5% of College' },
              { dot: '#22D3EE', text: '7.67 CGPA' },
              { dot: '#f59e0b', text: '5+ Open Source Orgs' },
              { dot: '#22D3EE', text: 'Chh. Sambhajinagar, India' },
            ].map(chip => (
              <span key={chip.text} className="achievement-chip">
                <span className="chip-dot" style={{ background: chip.dot }} />
                {chip.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <div className="lg:col-span-1">
            <div style={{
              background: 'rgba(10,16,14,0.7)',
              border: '1px solid rgba(236,242,239,0.1)',
              borderRadius: 20,
              backdropFilter: 'blur(20px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
              padding: 28,
              textAlign: 'center',
              position: 'sticky', top: 88,
            }}>
              {/* Avatar */}
              <div className="relative mx-auto mb-5 cursor-pointer group"
                style={{ width: 120, height: 120 }}
                onClick={() => editMode && photoRef.current?.click()}>
                <div style={{
                  position: 'absolute', inset: -3, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10B981, #22D3EE, #0D9488)',
                  padding: 3,
                }}>
                  <div style={{
                    width: '100%', height: '100%', borderRadius: '50%',
                    background: 'rgba(10,16,14,0.95)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', fontSize: 32, fontWeight: 800,
                    color: '#34D399',
                    fontFamily: 'Playfair Display, sans-serif',
                  }}>
                    {photo
                      ? <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : 'OK'
                    }
                  </div>
                </div>
                {editMode && (
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={20} className="text-white" />
                  </div>
                )}
              </div>

              <input ref={photoRef} type="file" accept="image/*" className="hidden"
                onChange={e => {
                  const f = e.target.files?.[0]
                  if (!f) return
                  const reader = new FileReader()
                  reader.onload = ev => savePhoto(ev.target.result)
                  reader.readAsDataURL(f)
                }} />
              {editMode && <p className="text-xs text-[#9CAFA7] mb-2 font-mono">Click photo to change</p>}

              {/* Name */}
              {editMode
                ? <Field value={data.name} onChange={v=>update('name',v)} tag="h2" className="text-xl font-bold text-[#ECF2EF] mb-1 text-center" />
                : <h2 style={{ fontFamily:'Playfair Display,sans-serif', fontWeight:800, fontSize:22, color:'#ECF2EF', marginBottom:4 }}>{data.name}</h2>
              }

              {/* GSoC badge */}
              <div style={{ marginBottom: 12 }}>
                <span className="available-badge">
                  <span className="available-dot" />
                  GSoC 2026 Active
                </span>
              </div>

              {editMode
                ? <Field value={data.title} onChange={v=>update('title',v)} tag="p" className="text-xs text-[#34D399] mb-4 text-center" />
                : <p style={{ fontSize:12, color:'#9CAFA7', marginBottom:20, lineHeight:1.6 }}>{data.title}</p>
              }

              {/* Contact info */}
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
                {[
                  { icon: MapPin, content: editMode
                      ? <Field value={data.location} onChange={v=>update('location',v)} className="text-sm" />
                      : <span style={{ fontSize:12, color:'#9CAFA7' }}>{data.location}</span>
                  },
                  { icon: Mail, content: editMode
                      ? <Field value={data.email} onChange={v=>update('email',v)} className="text-sm" />
                      : <a href={`mailto:${data.email}`} style={{ fontSize:12, color:'#34D399' }}>{data.email}</a>
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'center', color:'#5F7169' }}>
                    <item.icon size={12} style={{ flexShrink:0 }} />
                    {item.content}
                  </div>
                ))}
              </div>

              {/* Stats grid */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:8 }}>
                {[{ label:'CGPA', key:'cgpa', accent:'#34D399' }, { label:'Rank', key:'rank', accent:'#22D3EE' }].map(s => (
                  <div key={s.key} style={{
                    background:'rgba(16,185,129,0.08)',
                    border:'1px solid rgba(16,185,129,0.2)',
                    borderRadius:12, padding:'12px 8px', textAlign:'center',
                  }}>
                    {editMode
                      ? <Field value={data[s.key]} onChange={v=>update(s.key,v)} className="text-lg font-bold font-mono text-center block" style={{ color: s.accent }} />
                      : <div style={{ fontFamily:'JetBrains Mono,monospace', fontWeight:800, fontSize:18, color:s.accent, lineHeight:1 }}>{data[s.key]}</div>
                    }
                    <div style={{ fontSize:10, color:'#5F7169', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:4, fontFamily:'JetBrains Mono,monospace' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <div className="glass-card p-6">
              <SectionTitle>About</SectionTitle>
              {editMode
                ? <Field value={data.bio} onChange={v=>update('bio',v)} multiline className="text-[#9CAFA7] text-sm leading-relaxed" />
                : <div className="text-[#9CAFA7] text-sm leading-relaxed whitespace-pre-line">{data.bio}</div>
              }
            </div>

            <div className="glass-card p-6">
              <SectionTitle>Education</SectionTitle>
              <div className="border-l-2 border-blue-600 pl-5">
                {editMode
                  ? <>
                      <Field value={data.education} onChange={v=>update('education',v)} tag="h3" className="text-lg font-bold text-[#ECF2EF] mb-1" />
                      <Field value={data.college} onChange={v=>update('college',v)} tag="p" className="text-[#34D399] text-sm font-semibold mb-1" />
                      <Field value={data.period} onChange={v=>update('period',v)} tag="p" className="text-[#9CAFA7] text-xs" />
                    </>
                  : <>
                      <h3 className="text-lg font-bold text-[#ECF2EF] mb-1">{data.education}</h3>
                      <p className="text-[#34D399] text-sm font-semibold mb-1">{data.college}</p>
                      <p className="text-[#9CAFA7] text-xs">{data.period} · CGPA {data.cgpa} · {data.rank} of College</p>
                    </>
                }
              </div>
            </div>

            <div>
              <SectionTitle>What I Value</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.values.map(v => (
                  <div key={v.id} className="glass-card p-5">
                    <div className="text-2xl mb-2">{v.emoji}</div>
                    <h4 className="font-bold text-[#ECF2EF] text-sm mb-1">{v.title}</h4>
                    {editMode
                      ? <Field value={v.desc} onChange={val=>update('values', data.values.map(vv=>vv.id===v.id?{...vv,desc:val}:vv))} className="text-xs text-[#9CAFA7]" />
                      : <p className="text-xs text-[#9CAFA7]">{v.desc}</p>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <SectionTitle>Experience</SectionTitle>
            {editMode && (
              <button onClick={addExperience} className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
                <Plus size={13}/> Add Role
              </button>
            )}
          </div>
          <div className="space-y-6 max-w-4xl">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative pl-6" style={{
                borderLeft: '2px solid rgba(16,185,129,0.35)',
              }}>
                <div style={{
                  position:'absolute', left:-8, top:16,
                  width:16, height:16, borderRadius:'50%',
                  background:'linear-gradient(135deg,#10B981,#0D9488)',
                  boxShadow:'0 0 12px rgba(16,185,129,0.5)',
                }} className="timeline-dot" />
                <div style={{
                  background:'rgba(10,16,14,0.65)',
                  border:'1px solid rgba(236,242,239,0.1)',
                  borderRadius:14,
                  backdropFilter:'blur(16px)',
                  padding:'20px 22px',
                  boxShadow:'0 4px 20px rgba(0,0,0,0.3)',
                  transition:'all 220ms ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(16,185,129,0.3)'; e.currentTarget.style.transform='translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(236,242,239,0.1)'; e.currentTarget.style.transform='translateX(0)' }}
                >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {editMode
                      ? <>
                          <Field value={exp.title} onChange={v=>updateExp(exp.id,'title',v)} tag="h3" className="text-lg font-bold text-[#ECF2EF] mb-1" />
                          <Field value={exp.company} onChange={v=>updateExp(exp.id,'company',v)} tag="p" className="text-[#34D399] text-sm font-semibold mb-1" />
                          <Field value={exp.period} onChange={v=>updateExp(exp.id,'period',v)} tag="p" className="text-[#9CAFA7] text-xs mb-3" />
                        </>
                      : <>
                          <h3 className="text-lg font-bold text-[#ECF2EF] mb-1">{exp.title}</h3>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-[#34D399] text-sm font-semibold">{exp.company}</span>
                            <span className="text-[#9CAFA7] text-xs">{exp.period}</span>
                          </div>
                        </>
                    }
                    <ul className="space-y-1">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2">
                          <span className="text-[#3B82F6] mt-1.5 text-xs">▸</span>
                          {editMode
                            ? <div className="flex gap-2 flex-1">
                                <Field value={b} onChange={v=>updateBullet(exp.id,bi,v)} className="text-sm text-[#9CAFA7] flex-1" />
                                <button onClick={()=>removeBullet(exp.id,bi)} className="text-red-400/50 hover:text-red-400"><X size={12}/></button>
                              </div>
                            : <span className="text-sm text-[#9CAFA7]">{b}</span>
                          }
                        </li>
                      ))}
                    </ul>
                    {editMode && (
                      <button onClick={()=>addBullet(exp.id)} className="mt-2 text-xs text-[#9CAFA7] hover:text-[#34D399] flex items-center gap-1 font-mono">
                        <Plus size={11}/> Add bullet
                      </button>
                    )}
                  </div>
                  {editMode && (
                    <button onClick={()=>removeExperience(exp.id)} className="text-red-400/50 hover:text-red-400 shrink-0">
                      <Trash2 size={15}/>
                    </button>
                  )}
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <SectionTitle>Technical Skills</SectionTitle>
            {editMode && (
              <button onClick={addSkill} className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
                <Plus size={13}/> Add Category
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skills.map(sk => (
              <div key={sk.id} className="glass-card p-5">
                <div className="flex items-start justify-between mb-3">
                  {editMode
                    ? <Field value={sk.category} onChange={v=>updateSkill(sk.id,'category',v)} tag="h3" className="font-bold text-[#ECF2EF] text-sm" />
                    : <h3 className="font-bold text-[#ECF2EF] text-sm">{sk.category}</h3>
                  }
                  {editMode && (
                    <button onClick={()=>removeSkill(sk.id)} className="text-red-400/50 hover:text-red-400">
                      <Trash2 size={13}/>
                    </button>
                  )}
                </div>
                {editMode
                  ? <Field value={sk.items} onChange={v=>updateSkill(sk.id,'items',v)} className="text-xs text-[#9CAFA7]" />
                  : (
                    <div className="flex flex-wrap gap-1.5">
                      {sk.items.split(',').map(s => s.trim()).filter(Boolean).map(s => (
                        <span key={s} className="tech-badge">{s}</span>
                      ))}
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}