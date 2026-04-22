'use client'

import { useState, useEffect, useRef } from 'react'
import { Camera, Edit2, Save, X, Plus, Trash2, MapPin, Mail, ExternalLink, Check } from 'lucide-react'

const DEFAULT_ABOUT = {
  name: 'Om Shripad Kapale',
  title: 'Backend Developer & AI/ML Enthusiast',
  location: 'Mumbai, Maharashtra, India',
  email: 'omshripadkapale@gmail.com',
  bio: `Passionate Computer Science student ranked in the top 5% of my college with 8.11 CGPA. I love building scalable backend systems, exploring AI/ML frontiers, and contributing to open source across 6+ organisations.\n\nCurrently in my 3rd year of B.Tech CSE, I focus on Java/Spring Boot for backend work and Python/PyTorch for AI/ML projects. I believe in writing clean, maintainable code that solves real problems.`,
  cgpa: '8.11',
  rank: 'Top 5%',
  education: 'B.Tech Computer Science Engineering',
  college: 'Your College Name',
  period: '2023 – Present',
  experience: [
    {
      id:'e1', title:'Backend Developer (Learning)', company:'Personal Projects',
      period:'2023–Present',
      bullets:['Building REST APIs with Spring Boot & Java','Implementing WebSocket real-time features','Working with PostgreSQL, MySQL, Oracle databases','Developing AI/ML models with PyTorch & Pandas'],
    },
    {
      id:'e2', title:'Open Source Contributor', company:'GitHub',
      period:'2024–Present',
      bullets:['Contributing to 6+ organisations','Getting PRs merged in various projects','Collaborating with global developers'],
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
              className="w-full bg-[#0B1325] border border-indigo-500/50 rounded-lg px-3 py-2 text-sm outline-none resize-none text-[#E8F0FE]" />
          : <input value={draft} onChange={e=>setDraft(e.target.value)} autoFocus
              className="w-full bg-[#0B1325] border border-indigo-500/50 rounded-lg px-3 py-2 text-sm outline-none text-[#E8F0FE]" />
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
      {value || <span className="text-[#64B5F6] italic text-sm">{placeholder}</span>}
      <Edit2 size={11} className="absolute right-1 top-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Tag>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl font-bold text-[#E8F0FE] mb-6 flex items-center gap-3">
      <span className="h-0.5 w-8 bg-gradient-to-r from-blue-500 to-transparent" />
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
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg)' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <span className="section-badge">// about me</span>
          <button onClick={() => setEditMode(v=>!v)}
            className={`text-sm font-mono flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              editMode ? 'text-green-400 bg-green-500/10 border border-green-500/30'
                       : 'text-[#64B5F6] bg-white/5 border border-white/10 hover:border-blue-500/30'
            }`}
          >
            {editMode ? <><Save size={12}/> Editing (click fields)</> : <><Edit2 size={12}/> Enable Editing</>}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <div className="lg:col-span-1">
            <div className="glass-card p-6 text-center sticky top-24">
              <div className="relative w-32 h-32 mx-auto mb-4 cursor-pointer group"
                onClick={() => editMode && photoRef.current?.click()}>
                <div className="w-full h-full rounded-2xl overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(124,58,237,0.2))' }}>
                  {photo
                    ? <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[#64B5F6]">OK</div>
                  }
                </div>
                {editMode && (
                  <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
              {editMode && <p className="text-xs text-[#64B5F6] mb-3 font-mono">Click photo to change</p>}

              {editMode
                ? <Field value={data.name} onChange={v=>update('name',v)} tag="h2" className="text-xl font-bold text-[#E8F0FE] mb-1 text-center" />
                : <h2 className="text-xl font-bold text-[#E8F0FE] mb-1">{data.name}</h2>
              }
              {editMode
                ? <Field value={data.title} onChange={v=>update('title',v)} tag="p" className="text-sm text-[#60A5FA] mb-4 text-center" />
                : <p className="text-sm text-[#60A5FA] mb-4">{data.title}</p>
              }

              <div className="space-y-2 text-sm text-[#64B5F6] text-left">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="shrink-0" />
                  {editMode ? <Field value={data.location} onChange={v=>update('location',v)} className="text-sm" /> : <span>{data.location}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="shrink-0" />
                  {editMode ? <Field value={data.email} onChange={v=>update('email',v)} className="text-sm" /> : <a href={`mailto:${data.email}`} className="text-[#60A5FA] hover:text-white text-sm">{data.email}</a>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                {[{ label:'CGPA', key:'cgpa' }, { label:'Rank', key:'rank' }].map(s => (
                  <div key={s.key} style={{ background:'rgba(79,70,229,0.1)', border:'1px solid rgba(79,70,229,0.25)', borderRadius:10 }} className="p-3 text-center">
                    {editMode
                      ? <Field value={data[s.key]} onChange={v=>update(s.key,v)} className="text-lg font-bold font-mono text-center block text-[#818CF8]" />
                      : <div className="text-lg font-bold font-mono text-[#818CF8]">{data[s.key]}</div>
                    }
                    <div className="text-xs text-[#64B5F6]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <div className="glass-card p-6">
              <SectionTitle>About</SectionTitle>
              {editMode
                ? <Field value={data.bio} onChange={v=>update('bio',v)} multiline className="text-[#8EA4C8] text-sm leading-relaxed" />
                : <div className="text-[#8EA4C8] text-sm leading-relaxed whitespace-pre-line">{data.bio}</div>
              }
            </div>

            <div className="glass-card p-6">
              <SectionTitle>Education</SectionTitle>
              <div className="border-l-2 border-blue-600 pl-5">
                {editMode
                  ? <>
                      <Field value={data.education} onChange={v=>update('education',v)} tag="h3" className="text-lg font-bold text-[#E8F0FE] mb-1" />
                      <Field value={data.college} onChange={v=>update('college',v)} tag="p" className="text-[#60A5FA] text-sm font-semibold mb-1" />
                      <Field value={data.period} onChange={v=>update('period',v)} tag="p" className="text-[#64B5F6] text-xs" />
                    </>
                  : <>
                      <h3 className="text-lg font-bold text-[#E8F0FE] mb-1">{data.education}</h3>
                      <p className="text-[#60A5FA] text-sm font-semibold mb-1">{data.college}</p>
                      <p className="text-[#64B5F6] text-xs">{data.period} · CGPA {data.cgpa} · {data.rank} of College</p>
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
                    <h4 className="font-bold text-[#E8F0FE] text-sm mb-1">{v.title}</h4>
                    {editMode
                      ? <Field value={v.desc} onChange={val=>update('values', data.values.map(vv=>vv.id===v.id?{...vv,desc:val}:vv))} className="text-xs text-[#8EA4C8]" />
                      : <p className="text-xs text-[#8EA4C8]">{v.desc}</p>
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
              <div key={exp.id} className="relative border-l-2 border-blue-600 pl-6 glass-card p-5">
                <div className="absolute -left-2 top-4 w-4 h-4 bg-blue-600 rounded-full ring-4" style={{ '--tw-ring-color': 'var(--bg)' }} />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {editMode
                      ? <>
                          <Field value={exp.title} onChange={v=>updateExp(exp.id,'title',v)} tag="h3" className="text-lg font-bold text-[#E8F0FE] mb-1" />
                          <Field value={exp.company} onChange={v=>updateExp(exp.id,'company',v)} tag="p" className="text-[#60A5FA] text-sm font-semibold mb-1" />
                          <Field value={exp.period} onChange={v=>updateExp(exp.id,'period',v)} tag="p" className="text-[#64B5F6] text-xs mb-3" />
                        </>
                      : <>
                          <h3 className="text-lg font-bold text-[#E8F0FE] mb-1">{exp.title}</h3>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-[#60A5FA] text-sm font-semibold">{exp.company}</span>
                            <span className="text-[#64B5F6] text-xs">{exp.period}</span>
                          </div>
                        </>
                    }
                    <ul className="space-y-1">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2">
                          <span className="text-[#3B82F6] mt-1.5 text-xs">▸</span>
                          {editMode
                            ? <div className="flex gap-2 flex-1">
                                <Field value={b} onChange={v=>updateBullet(exp.id,bi,v)} className="text-sm text-[#8EA4C8] flex-1" />
                                <button onClick={()=>removeBullet(exp.id,bi)} className="text-red-400/50 hover:text-red-400"><X size={12}/></button>
                              </div>
                            : <span className="text-sm text-[#8EA4C8]">{b}</span>
                          }
                        </li>
                      ))}
                    </ul>
                    {editMode && (
                      <button onClick={()=>addBullet(exp.id)} className="mt-2 text-xs text-[#64B5F6] hover:text-[#60A5FA] flex items-center gap-1 font-mono">
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
                    ? <Field value={sk.category} onChange={v=>updateSkill(sk.id,'category',v)} tag="h3" className="font-bold text-[#E8F0FE] text-sm" />
                    : <h3 className="font-bold text-[#E8F0FE] text-sm">{sk.category}</h3>
                  }
                  {editMode && (
                    <button onClick={()=>removeSkill(sk.id)} className="text-red-400/50 hover:text-red-400">
                      <Trash2 size={13}/>
                    </button>
                  )}
                </div>
                {editMode
                  ? <Field value={sk.items} onChange={v=>updateSkill(sk.id,'items',v)} className="text-xs text-[#8EA4C8]" />
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