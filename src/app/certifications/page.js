'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Award, ExternalLink, Calendar, Building, Plus, Edit2, Trash2, Save, X, FileText, Sparkles, ShieldCheck } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import TiltCard from '@/components/ui/TiltCard'

const EASE = [0.22, 1, 0.36, 1]

const REAL_CERTS = [
  {
    id:'c0', title:'Generative AI with Diffusion Models',
    issuer:'NVIDIA', date:'February 2026',
    credentialId:'KJbWnWgTSdKFDqzKqCkMSQ',
    link:'#', pdf:'', image:'/images/certs/nvidia-genai.jpg',
    featured:true,
    skills:['Diffusion Models','Generative AI','PyTorch','U-Net','Deep Learning','CLIP Guidance'],
    color:'from-green-500 to-emerald-600', accent:'#76B900',
  },
  {
    id:'c1', title:'Artificial Intelligence Fundamentals',
    issuer:'IBM', date:'August 2025',
    credentialId:'33511d2d-4bbf-4716-a021-4548025fa128',
    link:'https://www.credly.com/badges/33511d2d-4bbf-4716-a021-4548025fa128',
    pdf:'/certificates/ibm-ai-fundamentals.pdf',
    skills:['AI Fundamentals','Machine Learning','Deep Learning','NLP'],
    color:'from-blue-600 to-cyan-500', accent:'#1F70C1',
  },
  {
    id:'c2', title:'Rapid Application Development with Large Language Models (LLMs)',
    issuer:'NVIDIA', date:'August 2025',
    credentialId:'RpH1b8OtRK2Kg4KNsOyO4g',
    link:'https://learn.nvidia.com/certificates?id=RpH1b8OtRK2Kg4KNsOyO4g',
    pdf:'/certificates/nvidia-rapid-llm.pdf',
    skills:['LLM Fundamentals','Prompt Engineering','Few-Shot Learning','Fine-Tuning','API Integration','Docker','Cloud Deployment'],
    color:'from-green-500 to-emerald-600', accent:'#76B900',
  },
  {
    id:'c3', title:'The Ultimate Job Ready Data Science Course',
    issuer:'Code with Harry', date:'October 2025',
    credentialId:'CWH-THE-ULTIMATE-JOB-READY-DATA-SCIENCE-COURSE-JGXUEIGY',
    link:'#', pdf:'/certificates/data-science-course.pdf',
    skills:['Python','NumPy','Pandas','Matplotlib','Seaborn','Statistics','Data Analysis'],
    color:'from-purple-500 to-pink-500', accent:'#8B5CF6',
  },
]

// Color options for new certs
const COLOR_OPTIONS = [
  { label:'Blue',   value:'from-emerald-500 to-cyan-500',     accent:'#3B82F6' },
  { label:'Purple', value:'from-purple-500 to-pink-500',   accent:'#8B5CF6' },
  { label:'Green',  value:'from-green-500 to-emerald-500', accent:'#10B981' },
  { label:'Orange', value:'from-orange-500 to-yellow-500', accent:'#F59E0B' },
  { label:'Red',    value:'from-red-500 to-pink-500',      accent:'#EF4444' },
]

// Resolve the best "verify / view" destination for a cert
function verifyHref(cert) {
  if (cert.link && cert.link !== '#') return cert.link
  if (cert.pdf) return cert.pdf
  if (cert.image) return cert.image
  return null
}
function verifyLabel(cert) {
  if (cert.link && cert.link !== '#') return 'Verify Certificate'
  if (cert.pdf) return 'View Certificate'
  if (cert.image) return 'View Certificate'
  return null
}

const CERTS_KEY = 'certifications_v2'

function useCerts() {
  const [certs, setCerts] = useState(REAL_CERTS)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CERTS_KEY)
      if (saved) setCerts(JSON.parse(saved))
    } catch {}
  }, [])
  const save = (next) => { setCerts(next); localStorage.setItem(CERTS_KEY, JSON.stringify(next)) }
  const update = (id, data) => save(certs.map(c => c.id===id ? {...c,...data} : c))
  const remove = (id) => save(certs.filter(c => c.id!==id))
  const add = (cert) => save([cert, ...certs])
  return { certs, update, remove, add }
}

// Certificate image with graceful fallback to a gradient badge.
// Robust against image errors that fire before React hydrates.
function CertImage({ cert, className = '', style }) {
  const [ok, setOk] = useState(true)
  const imgRef = useRef(null)
  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) setOk(false)
  }, [cert.image])
  if (cert.image && ok) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={imgRef}
        src={cert.image}
        alt={`${cert.title} certificate`}
        onError={() => setOk(false)}
        onLoad={(e) => { if (e.currentTarget.naturalWidth === 0) setOk(false) }}
        className={className}
        style={{ objectFit:'cover', width:'100%', height:'100%', ...style }}
      />
    )
  }
  return (
    <div className={`bg-gradient-to-br ${cert.color} ${className}`}
      style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', ...style }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-8 border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border-8 border-white rounded-full" />
      </div>
      <Award className="w-20 h-20 text-white relative z-10" />
    </div>
  )
}

// ── Edit modal ────────────────────────────────────
function EditModal({ cert, onSave, onClose }) {
  const [form, setForm] = useState(cert || {
    id: Date.now().toString(),
    title:'', issuer:'', date:'', credentialId:'', link:'',
    skills:'', color:'from-emerald-500 to-cyan-500', accent:'#3B82F6',
  })
  const isNew = !cert

  const handleSave = () => {
    const final = {
      ...form,
      skills: typeof form.skills === 'string'
        ? form.skills.split(',').map(s=>s.trim()).filter(Boolean)
        : form.skills,
    }
    onSave(final)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:'rgba(0,0,0,0.85)' }} onClick={onClose}>
      <div className="glass-card w-full max-w-lg p-6 animate-scale-in max-h-[90vh] overflow-y-auto"
        onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-700 text-[#ECF2EF]">{isNew ? 'Add Certification':'Edit Certification'}</h2>
          <button onClick={onClose} className="text-[#9CAFA7] hover:text-white"><X size={18}/></button>
        </div>

        <div className="space-y-3">
          {[
            { key:'title', label:'Title *', placeholder:'e.g. AWS Solutions Architect' },
            { key:'issuer', label:'Issuer *', placeholder:'e.g. Amazon' },
            { key:'date', label:'Date', placeholder:'e.g. January 2025' },
            { key:'credentialId', label:'Credential ID', placeholder:'Optional' },
            { key:'link', label:'Verify Link', placeholder:'https://...' },
          ].map(f => (
            <div key={f.key}>
              <label className="text-xs text-[#9CAFA7] font-mono mb-1 block">{f.label}</label>
              <input value={form[f.key] || ''}
                onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                placeholder={f.placeholder}
                className="input-dark text-sm" />
            </div>
          ))}

          <div>
            <label className="text-xs text-[#9CAFA7] font-mono mb-1 block">Skills (comma-separated)</label>
            <input
              value={typeof form.skills==='string' ? form.skills : form.skills?.join(', ') || ''}
              onChange={e=>setForm(p=>({...p, skills:e.target.value}))}
              placeholder="Python, Machine Learning, TensorFlow..."
              className="input-dark text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-[#9CAFA7] font-mono mb-2 block">Card Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLOR_OPTIONS.map(c => (
                <button key={c.value} onClick={()=>setForm(p=>({...p,color:c.value,accent:c.accent}))}
                  className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                    form.color===c.value ? 'ring-2 ring-white/50 scale-105':''
                  } bg-gradient-to-r ${c.value} text-white`}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="btn-secondary flex-1 text-sm py-2">Cancel</button>
          <button onClick={handleSave} disabled={!form.title||!form.issuer}
            className="btn-primary flex-1 text-sm py-2 disabled:opacity-40">
            <Save size={14}/> {isNew ? 'Add Cert':'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Featured certificate spotlight ────────────────
function FeaturedCert({ cert }) {
  const href = verifyHref(cert)
  return (
    <Reveal y={40} duration={0.75} className="mb-14">
      <div className="relative">
        {/* ambient glow */}
        <div className="featured-glow absolute -inset-2 rounded-[28px] blur-2xl pointer-events-none"
          style={{ background:'linear-gradient(120deg, rgba(118,185,0,0.22), rgba(34,211,238,0.16))' }} aria-hidden="true" />

        <div className="group relative glass-card overflow-hidden"
          style={{ borderRadius:24, borderColor:'rgba(118,185,0,0.28)' }}>
          <div className="cert-shine" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Certificate preview */}
            <TiltCard max={5} glareColor="rgba(118,185,0,0.18)"
              className="relative p-5 sm:p-8 flex items-center justify-center"
              style={{ background:'linear-gradient(135deg, rgba(118,185,0,0.06), rgba(10,16,14,0.4))', minHeight:300 }}>
              <div className="relative w-full max-w-[440px] rounded-xl overflow-hidden"
                style={{ aspectRatio:'1 / 1', border:'1px solid rgba(236,242,239,0.14)', boxShadow:'0 20px 60px rgba(0,0,0,0.55)' }}>
                <CertImage cert={cert} />
              </div>
            </TiltCard>

            {/* Details */}
            <div className="p-6 sm:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="section-badge" style={{ color:'#9EE34F', borderColor:'rgba(118,185,0,0.35)', background:'rgba(118,185,0,0.1)' }}>
                  <Sparkles size={11} /> Latest · Featured
                </span>
              </div>

              <p className="font-mono text-xs tracking-widest mb-2" style={{ color:'#9EE34F' }}>
                {cert.issuer.toUpperCase()}
              </p>
              <h2 className="text-2xl sm:text-3xl font-800 text-[#ECF2EF] leading-tight mb-3"
                style={{ fontFamily:'"Playfair Display", serif' }}>
                {cert.title}
              </h2>

              <div className="flex items-center gap-4 text-[#9CAFA7] text-sm mb-5 flex-wrap">
                <span className="inline-flex items-center gap-1.5"><Building size={13}/> {cert.issuer}</span>
                <span className="inline-flex items-center gap-1.5"><Calendar size={13}/> {cert.date}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {cert.skills.map(s => <span key={s} className="tech-badge text-[11px]">{s}</span>)}
              </div>

              {cert.credentialId && (
                <p className="text-[11px] text-[#9CAFA7] font-mono mb-5 flex items-center gap-1.5">
                  <ShieldCheck size={12} style={{ color:'#9EE34F' }} /> ID: {cert.credentialId}
                </p>
              )}

              {href && (
                <a href={href} target="_blank" rel="noopener noreferrer"
                  className="btn-primary w-fit text-sm py-2.5 px-5">
                  {verifyLabel(cert)} <ExternalLink size={14}/>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// ── Cert card ─────────────────────────────────────
function CertCard({ cert, editMode, onEdit, onDelete }) {
  const skills = Array.isArray(cert.skills) ? cert.skills : []
  const href = verifyHref(cert)
  return (
    <TiltCard className="group glass-card glass-card-lift overflow-hidden h-full" max={8}
      glareColor="rgba(52,211,153,0.16)" style={{ borderRadius:16 }}>
      <div className="cert-shine" />
      {/* Top gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${cert.color}`} />

      {/* Badge / image area */}
      <div className="relative h-40 overflow-hidden">
        <CertImage cert={cert} className="transition-transform duration-500 group-hover:scale-[1.06]" />
        <div className="absolute inset-0" style={{ background:'linear-gradient(180deg, transparent 55%, rgba(5,8,7,0.55))' }} />

        {/* Issuer chip */}
        <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-700"
          style={{ background:'rgba(5,8,7,0.7)', border:'1px solid rgba(236,242,239,0.15)', color:'#ECF2EF', backdropFilter:'blur(6px)' }}>
          <Award size={10} style={{ color: cert.accent }} /> {cert.issuer}
        </span>

        {/* Edit/Delete buttons */}
        {editMode && (
          <div className="absolute top-2 right-2 flex gap-1 z-10">
            <button onClick={onEdit}
              className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors">
              <Edit2 size={13}/>
            </button>
            <button onClick={onDelete}
              className="p-1.5 rounded-lg bg-red-500/50 text-white hover:bg-red-500/70 transition-colors">
              <Trash2 size={13}/>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-base font-700 text-[#ECF2EF] mb-2 leading-snug group-hover:text-white transition-colors line-clamp-2">
            {cert.title}
          </h3>
          {cert.date && (
            <div className="flex items-center gap-1.5 text-[#9CAFA7] text-xs">
              <Calendar size={11} /> {cert.date}
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 4).map(s => (
              <span key={s} className="tech-badge text-[10px] px-2 py-0.5">{s}</span>
            ))}
            {skills.length > 4 && (
              <span className="text-[10px] text-[#9CAFA7] px-2 py-0.5">+{skills.length-4} more</span>
            )}
          </div>
        )}

        <div className="pt-3 border-t" style={{ borderColor:'rgba(99,120,162,0.12)' }}>
          {cert.credentialId && (
            <p className="text-[10px] text-[#9CAFA7] font-mono mb-2 truncate">ID: {cert.credentialId}</p>
          )}
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-600 transition-colors group/link"
              style={{ color: cert.accent }}>
              {cert.pdf && (!cert.link || cert.link === '#') ? <FileText size={11}/> : null}
              {verifyLabel(cert)}
              <ExternalLink size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
            </a>
          ) : (
            <span className="text-xs text-[#9CAFA7] italic">No verify link</span>
          )}
        </div>
      </div>
    </TiltCard>
  )
}

// ═══════════════════════════════════════════════
export default function CertificationsPage() {
  const { certs, update, remove, add } = useCerts()
  const [editMode, setEditMode] = useState(false)
  const [modal, setModal] = useState(null) // null | 'add' | cert object

  const featured = certs.find(c => c.featured)
  const rest = certs.filter(c => !c.featured)

  return (
    <div className="min-h-screen pb-16" style={{ background:'var(--bg)' }}>

      {/* ── Hook Banner ── */}
      <div className="page-hook-banner animate-fade-in" style={{ paddingTop:100, marginBottom:8 }}>
        <div style={{ maxWidth:800, margin:'0 auto' }}>
          <span className="section-badge" style={{ marginBottom:18, display:'inline-flex' }}>// certifications</span>

          <h1 className="page-title glow-heading" style={{ marginBottom:12 }}>
            Certified by the <span className="gradient-text">Best</span>
          </h1>
          <span className="accent-line" />
          <p className="hook-subtext" style={{ marginBottom:24 }}>
            Professional credentials from world-class organizations — each one earned, verified, and building toward mastery.
          </p>

          {/* Issuer badges */}
          <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:12, marginBottom:20 }}>
            {[
              { name:'NVIDIA', color:'#76B900', bg:'rgba(118,185,0,0.1)', border:'rgba(118,185,0,0.3)' },
              { name:'IBM', color:'#1F70C1', bg:'rgba(31,112,193,0.1)', border:'rgba(31,112,193,0.3)' },
              { name:'Code with Harry', color:'#34D399', bg:'rgba(52,211,153,0.1)', border:'rgba(52,211,153,0.3)' },
            ].map(issuer => (
              <span key={issuer.name} style={{
                display:'inline-flex', alignItems:'center', gap:6,
                padding:'8px 18px',
                background: issuer.bg,
                border: `1px solid ${issuer.border}`,
                borderRadius:10,
                fontSize:13, fontWeight:700, color: issuer.color,
                fontFamily:'"Inter",sans-serif',
              }}>
                <Award size={13} /> {issuer.name}
              </span>
            ))}
          </div>

          {/* Stats chips */}
          <div className="achievement-strip">
            <span className="achievement-chip">
              <span className="chip-dot" style={{ background:'#F59E0B' }} />
              {certs.length} Certifications Earned
            </span>
            <span className="achievement-chip">
              <span className="chip-dot" style={{ background:'#34D399' }} />
              {certs.filter(c=>verifyHref(c)).length} Verifiable
            </span>
            <span className="achievement-chip">
              <span className="chip-dot" style={{ background:'#34D399' }} />
              AI · ML · Data Science · LLMs
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">

        {/* Controls */}
        <div className="flex items-center justify-end mb-8 flex-wrap gap-3">
          <div className="flex gap-2">
            <button onClick={() => setEditMode(v=>!v)}
              className={`text-sm font-mono flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                editMode ? 'text-green-400 bg-green-500/10 border border-green-500/30'
                         : 'btn-secondary'
              }`}
            >
              {editMode ? <><Save size={12}/> Done Editing</> : <><Edit2 size={12}/> Edit</>}
            </button>
            <button onClick={() => setModal('add')} className="btn-primary text-sm py-2 px-4">
              <Plus size={15}/> Add Cert
            </button>
          </div>
        </div>

        {/* Featured certificate */}
        {featured && <FeaturedCert cert={featured} />}

        {/* Section label */}
        <Reveal className="mb-6">
          <h2 className="text-lg font-700 text-[#ECF2EF] flex items-center gap-2">
            <span className="accent-line" style={{ margin:0, width:28 }} />
            All Credentials
          </h2>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity:0, y:36 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-50px' }}
              transition={{ delay:(i%3)*0.1, duration:0.6, ease:EASE }}
            >
              <CertCard
                cert={cert}
                editMode={editMode}
                onEdit={() => setModal(cert)}
                onDelete={() => remove(cert.id)}
              />
            </motion.div>
          ))}

          {/* Add placeholder card */}
          {editMode && (
            <button onClick={() => setModal('add')}
              className="glass-card h-full min-h-[280px] flex flex-col items-center justify-center gap-3 border-2 border-dashed transition-colors hover:border-emerald-500/40"
              style={{ borderColor:'rgba(99,120,162,0.2)' }}>
              <Plus size={28} className="text-[#9CAFA7]" />
              <span className="text-xs text-[#9CAFA7] font-mono">Add Certification</span>
            </button>
          )}
        </div>

        {/* Continuous learning banner */}
        <Reveal y={30} className="mt-14">
          <div className="glass-card p-8 text-center max-w-2xl mx-auto"
            style={{ background:'linear-gradient(135deg,rgba(118,185,0,0.07),rgba(34,211,238,0.06))' }}>
            <Award className="w-10 h-10 text-[#F59E0B] mx-auto mb-3 animate-float" />
            <h3 className="text-xl font-800 text-[#ECF2EF] mb-2">Always Learning</h3>
            <p className="text-[#9CAFA7] text-sm">
              Continuously exploring AI/ML, backend engineering, and cloud technologies.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Modal */}
      {modal && (
        <EditModal
          cert={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={(data) => {
            if (modal === 'add') add(data)
            else update(data.id, data)
          }}
        />
      )}
    </div>
  )
}
