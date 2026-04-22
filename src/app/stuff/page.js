'use client'

import { useState, useEffect } from 'react'
import { Edit2, Plus, Trash2, Save, X, BookOpen, Heart, Trophy, Code, Target, Zap, Coffee, TrendingUp, Check } from 'lucide-react'

const ICON_MAP = { BookOpen, Heart, Trophy, Code, Target, Zap, Coffee, TrendingUp }

const DEFAULT_DATA = {
  blogs: [
    { id:'b1', title:'Building Scalable REST APIs with Spring Boot', excerpt:'Learn how to build production-ready REST APIs using Spring Boot with best practices for scalability and performance.', date:'2024-01-15', tags:'Spring Boot,Java,REST API', readTime:'8 min' },
    { id:'b2', title:'My Journey with AI/ML and Data Science', excerpt:'Sharing my experience learning AI/ML, completing certifications, and building real-world projects with PyTorch.', date:'2024-01-10', tags:'AI/ML,Data Science,Career', readTime:'6 min' },
    { id:'b3', title:'LeetCode Strategy: From Beginner to Advanced', excerpt:'My approach to solving LeetCode problems efficiently, focusing on DSA patterns and Dynamic Programming.', date:'2024-01-05', tags:'DSA,LeetCode,Problem Solving', readTime:'10 min' },
  ],
  hobbies: [
    { id:'h1', icon:'Code', title:'Problem Solving', desc:'Active on LeetCode solving DSA and Dynamic Programming', accent:'#3B82F6' },
    { id:'h2', icon:'BookOpen', title:'Learning', desc:'Constantly learning new technologies in AI/ML and Data Science', accent:'#8B5CF6' },
    { id:'h3', icon:'Trophy', title:'Competitive Programming', desc:'Participating in coding competitions and hackathons', accent:'#F59E0B' },
    { id:'h4', icon:'Target', title:'Open Source', desc:'Contributing to open source projects and building tools', accent:'#10B981' },
    { id:'h5', icon:'Coffee', title:'Tech Enthusiast', desc:'Exploring latest trends in web development and AI', accent:'#EF4444' },
    { id:'h6', icon:'Zap', title:'Building Projects', desc:'Creating scalable solutions with clean, maintainable code', accent:'#6366F1' },
  ],
  favorites: [
    { id:'f1', category:'Technologies', items:'Spring Boot,Python,PyTorch,PostgreSQL,REST APIs,Socket.io' },
    { id:'f2', category:'Learning Platforms', items:'LeetCode,NVIDIA DLI,IBM Skills,Apna College,Code with Harry' },
    { id:'f3', category:'Currently Learning', items:'LLMs,NLP,Diffusion Models,Advanced Java,Data Science' },
    { id:'f4', category:'Programming Languages', items:'Java,Python,C,JavaScript,Ruby,SQL' },
  ],
  quote: '"Code is like humor. When you have to explain it, it\'s bad."',
  quoteAuthor: '— Cory House',
  stats: [
    { id:'st1', icon:'Code', label:'Programming Languages', value:'5+' },
    { id:'st2', icon:'Trophy', label:'Certifications', value:'6+' },
    { id:'st3', icon:'BookOpen', label:'Tech Stacks Learned', value:'10+' },
    { id:'st4', icon:'TrendingUp', label:'Years Coding', value:'3+' },
  ],
}

function useStuff() {
  const [data, setData] = useState(DEFAULT_DATA)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('stuffData')
      if (saved) setData(JSON.parse(saved))
    } catch {}
  }, [])
  const update = (key, val) => {
    setData(prev => {
      const next = { ...prev, [key]: val }
      localStorage.setItem('stuffData', JSON.stringify(next))
      return next
    })
  }
  return { data, update }
}

function InlineField({ value, onChange, multiline=false, className='', placeholder='Click to edit' }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const save = () => { onChange(draft); setEditing(false) }
  const cancel = () => { setDraft(value); setEditing(false) }

  if (!editing) return (
    <span onClick={()=>{setDraft(value);setEditing(true)}}
      className={`cursor-pointer group relative hover:bg-white/5 rounded px-1 -mx-1 transition-colors ${className}`}>
      {value || <span className="text-[#64B5F6] italic text-xs">{placeholder}</span>}
      <Edit2 size={10} className="inline ml-1 text-blue-400 opacity-0 group-hover:opacity-100" />
    </span>
  )

  return (
    <span className="relative inline-block w-full">
      {multiline
        ? <textarea value={draft} onChange={e=>setDraft(e.target.value)} rows={3} autoFocus
            className={`w-full bg-[#0B1325] border border-blue-500/50 rounded px-2 py-1 text-sm outline-none resize-none text-[#E8F0FE] ${className}`} />
        : <input value={draft} onChange={e=>setDraft(e.target.value)} autoFocus
            className={`w-full bg-[#0B1325] border-b border-blue-500 outline-none text-sm text-[#E8F0FE] ${className}`} />
      }
      <span className="flex gap-1 mt-1">
        <button onClick={save} className="text-[10px] text-green-400 hover:text-green-300 flex items-center gap-0.5"><Check size={10}/>Save</button>
        <button onClick={cancel} className="text-[10px] text-[#64B5F6] hover:text-white flex items-center gap-0.5"><X size={10}/>Cancel</button>
      </span>
    </span>
  )
}

function BlogModal({ blog, onSave, onClose }) {
  const [form, setForm] = useState(blog || { id:Date.now().toString(), title:'', excerpt:'', date:new Date().toISOString().split('T')[0], tags:'', readTime:'5 min' })
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:'rgba(4,8,20,0.85)', backdropFilter:'blur(8px)' }} onClick={onClose}>
      <div className="glass-card w-full max-w-md p-6 animate-scale-in" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#E8F0FE]">{blog?'Edit Post':'New Blog Post'}</h2>
          <button onClick={onClose} className="text-[#64B5F6] hover:text-white"><X size={18}/></button>
        </div>
        <div className="space-y-3">
          {[
            { key:'title', placeholder:'Post title *' },
            { key:'date', placeholder:'Date (YYYY-MM-DD)' },
            { key:'readTime', placeholder:'Read time (e.g. 5 min)' },
            { key:'tags', placeholder:'Tags (comma-separated)' },
          ].map(f => (
            <input key={f.key} value={form[f.key]||''} placeholder={f.placeholder}
              onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
              className="input-dark text-sm" />
          ))}
          <textarea value={form.excerpt||''} placeholder="Post excerpt / description *" rows={3}
            onChange={e=>setForm(p=>({...p,excerpt:e.target.value}))}
            className="input-dark text-sm resize-none" />
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="btn-secondary flex-1 text-sm py-2">Cancel</button>
          <button onClick={()=>{onSave(form);onClose()}} disabled={!form.title||!form.excerpt}
            className="btn-primary flex-1 text-sm py-2 disabled:opacity-40 flex items-center justify-center gap-2">
            <Save size={14}/> Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default function StuffPage() {
  const { data, update } = useStuff()
  const [editMode, setEditMode] = useState(false)
  const [blogModal, setBlogModal] = useState(null)

  const addBlog = (b) => update('blogs', [b, ...data.blogs])
  const editBlog = (b) => update('blogs', data.blogs.map(p=>p.id===b.id?b:p))
  const deleteBlog = (id) => update('blogs', data.blogs.filter(b=>b.id!==id))
  const updateHobby = (id, key, val) => update('hobbies', data.hobbies.map(h=>h.id===id?{...h,[key]:val}:h))
  const deleteHobby = (id) => update('hobbies', data.hobbies.filter(h=>h.id!==id))
  const addHobby = () => update('hobbies', [...data.hobbies, { id:Date.now().toString(), icon:'Zap', title:'New Interest', desc:'Add description here', accent:'#3B82F6' }])
  const updateFav = (id, key, val) => update('favorites', data.favorites.map(f=>f.id===id?{...f,[key]:val}:f))
  const deleteFav = (id) => update('favorites', data.favorites.filter(f=>f.id!==id))
  const addFav = () => update('favorites', [...data.favorites, { id:Date.now().toString(), category:'New Category', items:'item1,item2' }])
  const updateStat = (id, key, val) => update('stats', data.stats.map(s=>s.id===id?{...s,[key]:val}:s))

  return (
    /* FIXED: was #F8FAFC (light), now uses dark theme */
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--bg)' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-display font-800 text-[#E8F0FE] mb-3" style={{ fontSize:'clamp(32px,5vw,52px)' }}>
            My <span className="gradient-text">Stuff</span>
          </h1>
          <p className="text-[#8EA4C8] text-base max-w-xl mx-auto">
            Things I care about, blog posts, hobbies and favorites — all editable from here
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <button onClick={()=>setEditMode(v=>!v)}
            className={`text-sm font-mono flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              editMode ? 'text-green-400 bg-green-500/10 border border-green-500/30' : 'btn-secondary'
            }`}>
            {editMode ? <><Check size={13}/> Done Editing</> : <><Edit2 size={13}/> Edit Mode</>}
          </button>
        </div>

        {/* Fun Stats */}
        <div className="mb-14">
          <h2 className="text-xl font-bold text-[#E8F0FE] mb-5 flex items-center gap-2">
            <TrendingUp size={18} className="text-[#60A5FA]" /> Fun Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.stats.map(s => {
              const Icon = ICON_MAP[s.icon] || Code
              return (
                <div key={s.id} className="glass-card p-5 text-center">
                  <Icon size={24} className="mx-auto mb-2 text-[#60A5FA]" />
                  {editMode
                    ? <InlineField value={s.value} onChange={v=>updateStat(s.id,'value',v)} className="text-3xl font-bold text-[#E8F0FE] font-mono block text-center" />
                    : <div className="text-3xl font-bold text-[#E8F0FE] font-mono mb-1">{s.value}</div>
                  }
                  {editMode
                    ? <InlineField value={s.label} onChange={v=>updateStat(s.id,'label',v)} className="text-xs text-[#8EA4C8] block text-center" />
                    : <p className="text-xs text-[#8EA4C8]">{s.label}</p>
                  }
                </div>
              )
            })}
          </div>
        </div>

        {/* Interests */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#E8F0FE] flex items-center gap-2">
              <Zap size={18} className="text-[#F59E0B]" /> Interests & Hobbies
            </h2>
            {editMode && (
              <button onClick={addHobby} className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
                <Plus size={13}/> Add
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.hobbies.map(h => {
              const Icon = ICON_MAP[h.icon] || Zap
              return (
                <div key={h.id} className="glass-card p-5 group relative">
                  {editMode && (
                    <button onClick={()=>deleteHobby(h.id)} className="absolute top-3 right-3 text-red-400/50 hover:text-red-400">
                      <Trash2 size={14}/>
                    </button>
                  )}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                    style={{ background:`${h.accent}18`, border:`1px solid ${h.accent}30` }}>
                    <Icon size={20} style={{ color:h.accent }} />
                  </div>
                  {editMode
                    ? <>
                        <InlineField value={h.title} onChange={v=>updateHobby(h.id,'title',v)} className="font-bold text-[#E8F0FE] text-sm mb-1 block" />
                        <InlineField value={h.desc} onChange={v=>updateHobby(h.id,'desc',v)} className="text-xs text-[#8EA4C8] block" multiline />
                      </>
                    : <>
                        <h3 className="font-bold text-[#E8F0FE] text-sm mb-1">{h.title}</h3>
                        <p className="text-xs text-[#8EA4C8]">{h.desc}</p>
                      </>
                  }
                </div>
              )
            })}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#E8F0FE] flex items-center gap-2">
              <BookOpen size={18} className="text-[#8B5CF6]" /> Blog Posts & Thoughts
            </h2>
            <button onClick={()=>setBlogModal('new')} className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
              <Plus size={13}/> New Post
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {data.blogs.map(post => (
              <div key={post.id} className="glass-card p-5 group">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-[#64B5F6]">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  {editMode && (
                    <div className="flex gap-1 shrink-0">
                      <button onClick={()=>setBlogModal(post)} className="text-[#64B5F6] hover:text-[#60A5FA]"><Edit2 size={13}/></button>
                      <button onClick={()=>deleteBlog(post.id)} className="text-red-400/50 hover:text-red-400"><Trash2 size={13}/></button>
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-bold text-[#E8F0FE] mb-2 leading-snug">{post.title}</h3>
                <p className="text-xs text-[#8EA4C8] line-clamp-3 mb-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1">
                  {post.tags.split(',').map(t=>t.trim()).filter(Boolean).map(t => (
                    <span key={t} className="tech-badge text-[10px] px-2 py-0.5">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorites */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#E8F0FE] flex items-center gap-2">
              <Heart size={18} className="text-red-400" /> Favorites
            </h2>
            {editMode && (
              <button onClick={addFav} className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
                <Plus size={13}/> Add Category
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.favorites.map(fav => (
              <div key={fav.id} className="glass-card p-5">
                <div className="flex items-start justify-between mb-3">
                  {editMode
                    ? <InlineField value={fav.category} onChange={v=>updateFav(fav.id,'category',v)} className="font-bold text-[#E8F0FE] text-sm" />
                    : <h3 className="font-bold text-[#E8F0FE] text-sm flex items-center gap-2"><Heart size={13} className="text-red-400" /> {fav.category}</h3>
                  }
                  {editMode && (
                    <button onClick={()=>deleteFav(fav.id)} className="text-red-400/50 hover:text-red-400"><Trash2 size={13}/></button>
                  )}
                </div>
                {editMode
                  ? <InlineField value={fav.items} onChange={v=>updateFav(fav.id,'items',v)} className="text-xs text-[#8EA4C8]" />
                  : (
                    <div className="flex flex-wrap gap-1.5">
                      {fav.items.split(',').map(i=>i.trim()).filter(Boolean).map(i => (
                        <span key={i} className="text-xs text-[#8EA4C8] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />{i}
                        </span>
                      ))}
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        </div>

        {/* Quote — FIXED: was light gradient, now dark glass */}
        <div className="glass-card p-10 text-center max-w-2xl mx-auto"
          style={{ background:'linear-gradient(135deg, rgba(79,70,229,0.12), rgba(124,58,237,0.08))', borderColor:'rgba(79,70,229,0.25)' }}>
          {editMode
            ? <>
                <InlineField value={data.quote} onChange={v=>update('quote',v)} className="text-xl font-bold text-[#E8F0FE] italic block text-center mb-2" />
                <InlineField value={data.quoteAuthor} onChange={v=>update('quoteAuthor',v)} className="text-sm text-[#8EA4C8] block text-center" />
              </>
            : <>
                <p className="text-xl font-bold text-[#E8F0FE] italic mb-3">{data.quote}</p>
                <p className="text-sm text-[#8EA4C8]">{data.quoteAuthor}</p>
              </>
          }
        </div>
      </div>

      {blogModal && (
        <BlogModal
          blog={blogModal === 'new' ? null : blogModal}
          onClose={() => setBlogModal(null)}
          onSave={(b) => blogModal === 'new' ? addBlog(b) : editBlog(b)}
        />
      )}
    </div>
  )
}