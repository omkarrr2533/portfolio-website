'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, CheckCircle, AlertCircle, Loader, ArrowRight, MessageSquare } from 'lucide-react'

const SOCIAL = [
  { icon: Github,       label: 'GitHub',   sub: '@omkarrr2533',            url: 'https://github.com/omkarrr2533',                   color: '#EDF2FF' },
  { icon: Linkedin,     label: 'LinkedIn', sub: 'Om Kapale',               url: 'https://www.linkedin.com/in/om-kapale-b861a228a',  color: '#60A5FA' },
  { icon: Mail,         label: 'Email',    sub: 'omshripadkapale@gmail.com',url: 'mailto:omshripadkapale@gmail.com',                 color: '#34D399' },
  { icon: ExternalLink, label: 'LeetCode', sub: '@omi_',                   url: 'https://leetcode.com/u/omi_/',                    color: '#FCD34D' },
]

const CONTACT_ITEMS = [
  { icon: Mail,    label: 'Email',    value: 'omshripadkapale@gmail.com', link: 'mailto:omshripadkapale@gmail.com' },
  { icon: MapPin,  label: 'Location', value: 'Mumbai, Maharashtra, India', link: null },
  { icon: MessageSquare, label: 'Response', value: 'Usually within 24 hours', link: null },
]

export default function ContactPage() {
  const [form,   setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('') // '' | 'sending' | 'success' | 'error'

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus(''), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus(''), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(''), 4000)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-24" style={{ background: 'var(--bg)' }}>
      <div className="container mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center mb-16 pt-8 animate-fade-in">
          <span className="section-badge mb-4 mx-auto block w-fit">// get in touch</span>
          <h1 className="section-heading mb-4" style={{ fontSize: 'clamp(36px,5vw,56px)' }}>
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-[#4A6090] text-base max-w-xl mx-auto leading-relaxed">
            Have a project idea, collaboration in mind, or just want to chat about tech?
            My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">

          {/* ── Left sidebar ── */}
          <div className="lg:col-span-2 space-y-4 animate-slide-up">

            {/* Contact info */}
            <div className="glass-card p-6">
              <h2 className="text-base font-bold text-[#EDF2FF] mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>
                Contact Info
              </h2>
              <div className="space-y-4">
                {CONTACT_ITEMS.map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
                      <item.icon size={14} className="text-[#60A5FA]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-[#4A6090] uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.link ? (
                        <a href={item.link} className="text-sm text-[#EDF2FF] hover:text-[#60A5FA] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-[#8EA8D8]">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="glass-card p-6">
              <h2 className="text-base font-bold text-[#EDF2FF] mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>
                Find Me Online
              </h2>
              <div className="space-y-2">
                {SOCIAL.map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target={s.url.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group"
                    style={{ border: '1px solid transparent' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#F1F5F9'
                     e.currentTarget.style.borderColor = '#E2E8F0'
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(12,21,40,0.8)', border: '1px solid rgba(99,125,175,0.15)' }}>
                      <s.icon size={14} style={{ color: s.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#EDF2FF]">{s.label}</p>
                      <p className="text-[11px] text-[#4A6090] truncate font-mono">{s.sub}</p>
                    </div>
                    <ArrowRight size={12} className="text-[#4A6090] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick tip */}
            <div className="glass-card p-5"
              style={{ background: 'rgba(79,70,229,0.08)', borderColor: 'rgba(79,70,229,0.2)' }}>
              <p className="text-xs text-[#4A6090] leading-relaxed">
                <span className="text-[#60A5FA] font-semibold">Quick note:</span> I'm currently open to internships,
                freelance work, and collaborative projects in backend development and AI/ML.
              </p>
            </div>
          </div>

          {/* ── Contact form ── */}
          <div className="lg:col-span-3 animate-slide-up delay-100" style={{ animationFillMode: 'both' }}>
            <div className="glass-card p-8">
              <h2 className="text-lg font-bold text-[#EDF2FF] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                Send a Message
              </h2>
              <p className="text-sm text-[#4A6090] mb-7">Fill out the form and I'll get back to you shortly.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-[#4A6090] uppercase tracking-wider mb-2">Your Name *</label>
                    <input type="text" value={form.name} onChange={e => set('name', e.target.value)} required
                      placeholder="Om Kapale" className="input-dark" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[#4A6090] uppercase tracking-wider mb-2">Email Address *</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required
                      placeholder="om@example.com" className="input-dark" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#4A6090] uppercase tracking-wider mb-2">Subject *</label>
                  <input type="text" value={form.subject} onChange={e => set('subject', e.target.value)} required
                    placeholder="Project collaboration, internship inquiry…" className="input-dark" />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#4A6090] uppercase tracking-wider mb-2">Message *</label>
                  <textarea value={form.message} onChange={e => set('message', e.target.value)} required
                    rows={6} placeholder="Tell me about your project or idea…" className="input-dark" />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-primary btn-xl w-full justify-center disabled:opacity-50 disabled:pointer-events-none"
                >
                  {status === 'sending' ? (
                    <><Loader size={16} className="animate-spin" /> Sending…</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>

                {/* Feedback */}
                {status === 'success' && (
                  <div className="flex items-start gap-3 p-4 rounded-xl animate-scale-in"
                    style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <CheckCircle size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-300 mb-0.5">Message sent!</p>
                      <p className="text-xs text-[#4A6090]">I'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-start gap-3 p-4 rounded-xl animate-scale-in"
                    style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)' }}>
                    <AlertCircle size={18} className="text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-rose-300 mb-0.5">Failed to send</p>
                      <p className="text-xs text-[#4A6090]">Please try again or reach out via email directly.</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}