'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Upload, X, ZoomIn, Calendar, Tag, Plus, Trash2, FolderOpen, Image } from 'lucide-react'
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero'

const CATEGORIES = ['All', 'Events', 'Achievements', 'Travel', 'Projects', 'Blogs']

function useGallery() {
  const [items, setItems] = useState([])
  useEffect(() => {
    try {
      const saved = localStorage.getItem('galleryItems')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])
  const save = (next) => { setItems(next); localStorage.setItem('galleryItems', JSON.stringify(next)) }
  const add = (item) => save([item, ...items])
  const remove = (id) => save(items.filter(i => i.id !== id))
  return { items, add, remove }
}

function UploadModal({ onClose, onUpload }) {
  const [dragging, setDragging] = useState(false)
  const [form, setForm] = useState({ title:'', category:'Events', description:'' })
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const inputRef = useRef(null)

  const readFile = (f) => {
    if (!f.type.startsWith('image/')) return
    setFile(f)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(f)
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) readFile(f)
  }, [])

  const handleSubmit = () => {
    if (!preview || !form.title) return
    onUpload({ id: Date.now().toString(), ...form, src: preview, date: new Date().toISOString().split('T')[0] })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:'rgba(3,5,4,0.85)', backdropFilter:'blur(8px)' }}
      onClick={onClose}
    >
      <div className="glass-card w-full max-w-md p-6 animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-[#ECF2EF]">Upload Photo</h2>
          <button onClick={onClose} className="text-[#9CAFA7] hover:text-white"><X size={18}/></button>
        </div>

        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer mb-4 transition-all"
          style={{ borderColor: dragging ? '#10B981' : 'rgba(100,181,246,0.4)', background: dragging ? 'rgba(16,185,129,0.1)':'transparent' }}
        >
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-32 object-cover rounded-lg" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#9CAFA7]">
              <Upload size={28} />
              <p className="text-sm">Drag & drop or <span className="text-[#34D399]">browse</span></p>
              <p className="text-xs text-[#4A6090]">PNG, JPG, GIF, WebP — from your PC</p>
            </div>
          )}
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) readFile(f) }} />
        </div>

        <div className="space-y-3">
          <input placeholder="Title *" value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} className="input-dark text-sm" />
          <select value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))} className="input-dark text-sm">
            {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
          </select>
          <textarea placeholder="Description (optional)" value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} rows={2} className="input-dark text-sm resize-none" />
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="btn-secondary flex-1 text-sm py-2">Cancel</button>
          <button onClick={handleSubmit} disabled={!preview || !form.title} className="btn-primary flex-1 text-sm py-2 disabled:opacity-40 flex items-center justify-center gap-2">
            <Upload size={14} /> Upload
          </button>
        </div>
      </div>
    </div>
  )
}

function Lightbox({ item, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:'rgba(3,5,4,0.9)', backdropFilter:'blur(8px)' }}
      onClick={onClose}
    >
      <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/60 hover:text-white flex items-center gap-1 text-sm">
          <X size={16}/> Close
        </button>
        <img src={item.src} alt={item.title} className="w-full rounded-xl max-h-[60vh] object-contain" />
        <div className="glass-card p-5 mt-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-[#ECF2EF] mb-1">{item.title}</h3>
            {item.description && <p className="text-sm text-[#9CAFA7] mb-2">{item.description}</p>}
            <div className="flex items-center gap-4 text-xs text-[#9CAFA7]">
              <span className="flex items-center gap-1"><Calendar size={11}/>{item.date}</span>
              <span className="flex items-center gap-1"><Tag size={11}/>{item.category}</span>
            </div>
          </div>
          <button onClick={() => { onDelete(item.id); onClose() }}
            className="text-red-400 hover:text-red-300 shrink-0 transition-colors p-2 rounded-lg hover:bg-red-500/10">
            <Trash2 size={16}/>
          </button>
        </div>
      </div>
    </div>
  )
}

function GalleryCard({ item, onClick, onDelete }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      className="relative overflow-hidden rounded-xl cursor-pointer group animate-scale-in"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      <div className="aspect-square">
        {item.src ? (
          <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background:'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))' }}>
            <Image size={32} className="text-[#9CAFA7]" />
          </div>
        )}
      </div>
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${hov ? 'opacity-100':'opacity-0'}`}>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-sm mb-1 truncate">{item.title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-xs">{item.category}</span>
            <ZoomIn size={14} className="text-white/60" />
          </div>
        </div>
      </div>
      <div className="absolute top-3 left-3">
        <span className="text-xs font-mono px-2 py-0.5 rounded-full"
          style={{ background:'rgba(0,0,0,0.6)', color:'#34D399', border:'1px solid rgba(59,130,246,0.3)' }}>
          {item.category}
        </span>
      </div>
      <button
        onClick={e => { e.stopPropagation(); onDelete(item.id) }}
        className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 size={13}/>
      </button>
    </div>
  )
}

export default function GalleryPage() {
  const { items, add, remove } = useGallery()
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [showUpload, setShowUpload] = useState(false)

  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter)

  return (
    <div className="min-h-screen pb-16" style={{ background: 'var(--bg)' }}>
      {/* Scroll-expansion hero — the media grows as you scroll, then the gallery fades in */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1280&auto=format&fit=crop"
        bgImageSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop"
        title="Life in Frames"
        date="Beyond the Code"
        scrollToExpand="Scroll to expand"
        textBlend
      >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-fade-in">
          <span className="section-badge mb-4 block w-fit mx-auto">// photo gallery</span>
          <h1 className="font-display font-800 text-[#ECF2EF] mb-3" style={{ fontSize:'clamp(32px,5vw,52px)' }}>
            My <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-[#9CAFA7] text-base max-w-xl mx-auto">
            Upload photos directly from your PC — events, achievements, travel & more
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  background: filter===cat ? 'linear-gradient(135deg,#3B82F6,#34D399)':'rgba(15,26,46,0.8)',
                  color: filter===cat ? '#fff':'#9CAFA7',
                  border: filter===cat ? 'none':'1px solid rgba(99,120,162,0.2)',
                }}>
                {cat} {cat !== 'All' && <span className="text-xs opacity-70">({items.filter(i=>i.category===cat).length})</span>}
              </button>
            ))}
          </div>
          <button onClick={() => setShowUpload(true)} className="btn-primary text-sm px-5 py-2.5 shrink-0 flex items-center gap-2">
            <Plus size={16}/> Upload Photo
          </button>
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          {[{ label:'Total Photos', value:items.length },
            ...CATEGORIES.filter(c=>c!=='All').map(c => ({ label:c, value:items.filter(i=>i.category===c).length }))
          ].map(s => (
            <div key={s.label} className="stat-card flex items-center gap-2">
              <span className="font-mono font-bold text-[#34D399] text-sm">{s.value}</span>
              <span className="text-xs text-[#9CAFA7]">{s.label}</span>
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <FolderOpen size={48} className="text-[#9CAFA7] mx-auto mb-4 opacity-50" />
            <p className="text-[#9CAFA7] mb-2">No photos yet</p>
            <p className="text-xs text-[#9CAFA7] mb-6">
              {filter !== 'All' ? `No ${filter} photos — try another category` : 'Click "Upload Photo" to add your first photo from your PC'}
            </p>
            <button onClick={() => setShowUpload(true)} className="btn-primary text-sm flex items-center gap-2 mx-auto">
              <Upload size={14}/> Upload Your First Photo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            <div
              onClick={() => setShowUpload(true)}
              className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer group transition-all"
              style={{ borderColor:'rgba(100,181,246,0.4)', background:'rgba(10,16,14,0.5)' }}
            >
              <Plus size={24} className="text-[#9CAFA7] group-hover:text-[#34D399] mb-2 transition-colors" />
              <span className="text-xs text-[#9CAFA7] group-hover:text-[#34D399] font-mono transition-colors">Add Photo</span>
            </div>
            {filtered.map(item => (
              <GalleryCard key={item.id} item={item} onClick={() => setSelected(item)} onDelete={remove} />
            ))}
          </div>
        )}
      </div>
      </ScrollExpandMedia>

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} onUpload={add} />}
      {selected && <Lightbox item={selected} onClose={() => setSelected(null)} onDelete={remove} />}
    </div>
  )
}