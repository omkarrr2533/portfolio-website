'use client'

import { useState, useEffect } from 'react'
import { Award, ExternalLink, Calendar, Building, Plus, Edit2, Trash2, Save, X } from 'lucide-react'

const REAL_CERTS = [
  {
    id:'c1', title:'Artificial Intelligence Fundamentals',
    issuer:'IBM', date:'August 2025',
    credentialId:'33511d2d-4bbf-4716-a021-4548025fa128',
    link:'https://www.credly.com/badges/33511d2d-4bbf-4716-a021-4548025fa128',
    skills:['AI Fundamentals','Machine Learning','Deep Learning','NLP'],
    color:'from-orange-500 to-yellow-500', accent:'#F59E0B',
  },
  {
    id:'c2', title:'Rapid Application Development with Large Language Models (LLMs)',
    issuer:'NVIDIA', date:'August 2025',
    credentialId:'RpH1b8OtRK2Kg4KNsOyO4g',
    link:'https://learn.nvidia.com/certificates?id=RpH1b8OtRK2Kg4KNsOyO4g',
    skills:['LLM Fundamentals','Prompt Engineering','Few-Shot Learning','Fine-Tuning','API Integration','Docker','Cloud Deployment'],
    color:'from-green-500 to-emerald-600', accent:'#10B981',
  },
  {
    id:'c3', title:'The Ultimate Job Ready Data Science Course',
    issuer:'Code with Harry', date:'October 2025',
    credentialId:'CWH-THE-ULTIMATE-JOB-READY-DATA-SCIENCE-COURSE-JGXUEIGY',
    link:'#',
    skills:['Python','NumPy','Pandas','Matplotlib','Seaborn','Statistics','Data Analysis'],
    color:'from-blue-600 to-indigo-600', accent:'#3B82F6',
  },
]

// Color options for new certs
const COLOR_OPTIONS = [
  { label:'Blue',   value:'from-blue-500 to-cyan-500',     accent:'#3B82F6' },
  { label:'Purple', value:'from-purple-500 to-pink-500',   accent:'#8B5CF6' },
  { label:'Green',  value:'from-green-500 to-emerald-500', accent:'#10B981' },
  { label:'Orange', value:'from-orange-500 to-yellow-500', accent:'#F59E0B' },
  { label:'Red',    value:'from-red-500 to-pink-500',      accent:'#EF4444' },
]

function useCerts() {
  const [certs, setCerts] = useState(REAL_CERTS)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('certifications')
      if (saved) setCerts(JSON.parse(saved))
    } catch {}
  }, [])
  const save = (next) => { setCerts(next); localStorage.setItem('certifications', JSON.stringify(next)) }
  const update = (id, data) => save(certs.map(c => c.id===id ? {...c,...data} : c))
  const remove = (id) => save(certs.filter(c => c.id!==id))
  const add = (cert) => save([cert, ...certs])
  return { certs, update, remove, add }
}

// ── Edit modal ────────────────────────────────────
function EditModal({ cert, onSave, onClose }) {
  const [form, setForm] = useState(cert || {
    id: Date.now().toString(),
    title:'', issuer:'', date:'', credentialId:'', link:'',
    skills:'', color:'from-blue-500 to-cyan-500', accent:'#3B82F6',
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
          <h2 className="text-lg font-700 text-[#E8F0FE]">{isNew ? 'Add Certification':'Edit Certification'}</h2>
          <button onClick={onClose} className="text-[#4A6080] hover:text-white"><X size={18}/></button>
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
              <label className="text-xs text-[#4A6080] font-mono mb-1 block">{f.label}</label>
              <input value={form[f.key] || ''}
                onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                placeholder={f.placeholder}
                className="input-dark text-sm" />
            </div>
          ))}

          <div>
            <label className="text-xs text-[#4A6080] font-mono mb-1 block">Skills (comma-separated)</label>
            <input
              value={typeof form.skills==='string' ? form.skills : form.skills?.join(', ') || ''}
              onChange={e=>setForm(p=>({...p, skills:e.target.value}))}
              placeholder="Python, Machine Learning, TensorFlow..."
              className="input-dark text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-[#4A6080] font-mono mb-2 block">Card Color</label>
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

// ── Cert card ─────────────────────────────────────
function CertCard({ cert, editMode, onEdit, onDelete }) {
  const skills = Array.isArray(cert.skills) ? cert.skills : []
  return (
    <div className="group glass-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Top gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${cert.color}`} />

      {/* Badge area */}
      <div className={`relative h-40 bg-gradient-to-br ${cert.color} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border-8 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-8 border-white rounded-full" />
        </div>
        <Award className="w-16 h-16 text-white relative z-10 group-hover:scale-110 transition-transform" />

        {/* Edit/Delete buttons */}
        {editMode && (
          <div className="absolute top-2 right-2 flex gap-1">
            <button onClick={onEdit}
              className="p-1.5 rounded-lg bg-black/40 text-white hover:bg-black/60 transition-colors">
              <Edit2 size={13}/>
            </button>
            <button onClick={onDelete}
              className="p-1.5 rounded-lg bg-red-500/40 text-white hover:bg-red-500/60 transition-colors">
              <Trash2 size={13}/>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-base font-700 text-[#E8F0FE] mb-2 leading-snug group-hover:text-white transition-colors">
            {cert.title}
          </h3>
          <div className="flex items-center gap-1.5 text-[#8EA4C8] text-xs mb-1">
            <Building size={11} /> {cert.issuer}
          </div>
          {cert.date && (
            <div className="flex items-center gap-1.5 text-[#4A6080] text-xs">
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
              <span className="text-[10px] text-[#4A6080] px-2 py-0.5">+{skills.length-4} more</span>
            )}
          </div>
        )}

        <div className="pt-3 border-t" style={{ borderColor:'rgba(99,120,162,0.12)' }}>
          {cert.credentialId && (
            <p className="text-[10px] text-[#4A6080] font-mono mb-2 truncate">ID: {cert.credentialId}</p>
          )}
          {cert.link && cert.link !== '#' ? (
            <a href={cert.link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-600 transition-colors group/link"
              style={{ color: cert.accent }}>
              Verify Certificate
              <ExternalLink size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
            </a>
          ) : (
            <span className="text-xs text-[#4A6080] italic">No verify link</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════
export default function CertificationsPage() {
  const { certs, update, remove, add } = useCerts()
  const [editMode, setEditMode] = useState(false)
  const [modal, setModal] = useState(null) // null | 'add' | cert object

  return (
    <div className="min-h-screen pt-24 pb-16"
      style={{ background:'linear-gradient(180deg,#060D1F 0%,#0B1325 100%)' }}>
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-3">
            <Award className="w-14 h-14 text-[#F59E0B]" />
          </div>
          <h1 className="font-display font-800 text-[#E8F0FE] mb-3" style={{ fontSize:'clamp(32px,5vw,52px)' }}>
            <span className="gradient-text">Certifications</span>
          </h1>
          <p className="text-[#8EA4C8] text-base max-w-xl mx-auto">
            Professional certifications that validate my expertise — all verifiable online
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div className="flex gap-3 flex-wrap">
            <div className="stat-card flex items-center gap-2">
              <Award size={14} className="text-[#F59E0B]" />
              <span className="font-mono text-sm text-[#E8F0FE] font-700">{certs.length}</span>
              <span className="text-xs text-[#4A6080]">Total</span>
            </div>
            <div className="stat-card flex items-center gap-2">
              <span className="text-xs text-[#4A6080] font-mono">
                {certs.filter(c=>c.link && c.link!=='#').length} verifiable online
              </span>
            </div>
          </div>
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <div key={cert.id} className="animate-slide-up" style={{ animationDelay:`${i*80}ms`, animationFillMode:'both' }}>
              <CertCard
                cert={cert}
                editMode={editMode}
                onEdit={() => setModal(cert)}
                onDelete={() => remove(cert.id)}
              />
            </div>
          ))}

          {/* Add placeholder card */}
          {editMode && (
            <button onClick={() => setModal('add')}
              className="glass-card h-full min-h-[280px] flex flex-col items-center justify-center gap-3 border-2 border-dashed transition-colors hover:border-blue-500/40"
              style={{ borderColor:'rgba(99,120,162,0.2)' }}>
              <Plus size={28} className="text-[#4A6080]" />
              <span className="text-xs text-[#4A6080] font-mono">Add Certification</span>
            </button>
          )}
        </div>

        {/* Continuous learning banner */}
        <div className="mt-14 glass-card p-8 text-center max-w-2xl mx-auto"
          style={{ background:'linear-gradient(135deg,rgba(59,130,246,0.08),rgba(139,92,246,0.08))' }}>
          <Award className="w-10 h-10 text-[#F59E0B] mx-auto mb-3" />
          <h3 className="text-xl font-800 text-[#E8F0FE] mb-2">Always Learning</h3>
          <p className="text-[#8EA4C8] text-sm">
            Continuously exploring AI/ML, backend engineering, and cloud technologies.
          </p>
        </div>
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