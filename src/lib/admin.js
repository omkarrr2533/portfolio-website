'use client'

/**
 * Secure Admin Gate
 *
 * HOW TO USE:
 *   1. Set ADMIN_PASSWORD and ADMIN_JWT_SECRET in .env.local
 *   2. Click the shield icon (bottom-right) on your site
 *   3. Enter your password — it's verified server-side via HttpOnly cookie
 *   4. To log out: click the shield icon again → "Exit Admin Mode"
 *
 * The password is NEVER stored in JavaScript source code.
 */

import { useState, useEffect, useCallback } from 'react'
import { ShieldCheck, ShieldOff, Lock, X, Eye, EyeOff, Loader } from 'lucide-react'

/* ── React hook — reactively tracks admin state ──── */
export function useAdmin() {
  const [admin, setAdmin] = useState(false)

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/auth', { credentials: 'include' })
      const data = await res.json()
      setAdmin(data.isAdmin === true)
    } catch {
      setAdmin(false)
    }
  }, [])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  return admin
}

/* ── Render children only when admin is active ─────── */
export function AdminOnly({ children, fallback = null }) {
  const admin = useAdmin()
  return admin ? children : fallback
}

/* ─────────────────────────────────────────────────────────
   FLOATING ADMIN WIDGET
───────────────────────────────────────────────────────── */
export function AdminWidget() {
  const [admin,    setAdmin]    = useState(false)
  const [open,     setOpen]     = useState(false)
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  /* Check session on mount */
  useEffect(() => {
    fetch('/api/admin/auth', { credentials: 'include' })
      .then(r => r.json())
      .then(d => setAdmin(d.isAdmin === true))
      .catch(() => {})
  }, [])

  const login = async () => {
    if (!password) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        setAdmin(true)
        setOpen(false)
        setPassword('')
      } else {
        setError(data.error || 'Invalid password.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE', credentials: 'include' })
    setAdmin(false)
    setOpen(false)
  }

  return (
    <>
      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen(v => !v)}
        title={admin ? 'Admin mode active' : 'Admin login'}
        style={{
          position: 'fixed', bottom: 20, right: 20,
          zIndex: 900,
          width: 42, height: 42,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: admin
            ? 'linear-gradient(135deg,#4F46E5,#7C3AED)'
            : 'rgba(13,21,38,0.9)',
          border: `1px solid ${admin ? 'rgba(79,70,229,0.5)' : 'rgba(148,163,184,0.15)'}`,
          color: '#fff',
          cursor: 'pointer',
          boxShadow: admin ? '0 0 20px rgba(79,70,229,0.5)' : '0 4px 16px rgba(0,0,0,0.4)',
          transition: 'all 200ms ease',
        }}
      >
        {admin ? <ShieldCheck size={18} /> : <Lock size={16} />}
      </button>

      {/* ── Panel ── */}
      {open && (
        <div
          style={{
            position: 'fixed', bottom: 70, right: 20, zIndex: 900,
            width: 288,
            background: 'rgba(13,21,38,0.95)',
            border: '1px solid rgba(148,163,184,0.12)',
            borderRadius: 16,
            boxShadow: '0 0 40px rgba(0,0,0,0.6), 0 0 24px rgba(79,70,229,0.15)',
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
            animation: 'scaleIn 0.2s ease both',
          }}
        >
          {/* Panel header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px',
            borderBottom: '1px solid rgba(148,163,184,0.08)',
            background: admin ? 'rgba(79,70,229,0.08)' : 'transparent',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
              {admin ? <ShieldCheck size={15} color="#818CF8" /> : <Lock size={14} color="#4A6080" />}
              <span style={{ fontFamily:'Plus Jakarta Sans,sans-serif', fontWeight:700, fontSize:13, color: admin ? '#818CF8' : '#E8F0FE' }}>
                {admin ? 'Admin Active' : 'Admin Login'}
              </span>
            </div>
            <button onClick={() => setOpen(false)} style={{ color:'#4A6080', cursor:'pointer' }}>
              <X size={15} />
            </button>
          </div>

          <div style={{ padding: 16 }}>
            {admin ? (
              <div style={{ display:'flex', flexDirection:'column', gap: 12 }}>
                <p style={{ fontSize:12, color:'#8EA4C8', lineHeight:1.6 }}>
                  Edit controls are visible across the site. Your session expires in 24 hours.
                </p>
                <button
                  onClick={logout}
                  style={{
                    display:'flex', alignItems:'center', justifyContent:'center', gap:6,
                    width:'100%', padding:'9px 0',
                    background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)',
                    borderRadius:9, color:'#f87171', fontSize:13, fontWeight:600, cursor:'pointer',
                  }}
                >
                  <ShieldOff size={13} /> Exit Admin Mode
                </button>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap: 12 }}>
                <p style={{ fontSize:12, color:'#4A6080', lineHeight:1.6 }}>
                  Enter your admin password to unlock editing controls.
                </p>

                <div style={{ position:'relative' }}>
                  <input
                    type={showPw ? 'text' : 'password'}
                    placeholder="Admin password…"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError('') }}
                    onKeyDown={e => e.key === 'Enter' && login()}
                    autoFocus
                    style={{
                      width:'100%', padding:'9px 38px 9px 12px',
                      background:'rgba(5,10,23,0.8)', border:'1px solid rgba(148,163,184,0.15)',
                      borderRadius:9, color:'#E8F0FE', fontSize:13, outline:'none',
                      fontFamily:'JetBrains Mono,monospace',
                    }}
                  />
                  <button
                    onClick={() => setShowPw(v => !v)}
                    style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', color:'#4A6080', cursor:'pointer' }}
                  >
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>

                {error && (
                  <p style={{ fontSize:12, color:'#f87171' }}>{error}</p>
                )}

                <button
                  onClick={login}
                  disabled={!password || loading}
                  style={{
                    display:'flex', alignItems:'center', justifyContent:'center', gap:6,
                    width:'100%', padding:'9px 0',
                    background:'linear-gradient(135deg,#4F46E5,#7C3AED)',
                    border:'none', borderRadius:9,
                    color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer',
                    opacity: (!password || loading) ? 0.5 : 1,
                  }}
                >
                  {loading ? <Loader size={13} className="animate-spin" /> : <ShieldCheck size={13} />}
                  {loading ? 'Verifying…' : 'Unlock Admin'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}