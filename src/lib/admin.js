'use client'

/**
 * Admin gate — all "edit", "add", "delete" UI is hidden behind this.
 *
 * To unlock:  open DevTools console and run:
 *   localStorage.setItem('admin_token', 'OK_ADMIN_2025')
 *   location.reload()
 *
 * To lock again:
 *   localStorage.removeItem('admin_token')
 *   location.reload()
 *
 * The secret key should match ADMIN_TOKEN below.
 * For production, change it to something harder to guess.
 */
const ADMIN_TOKEN = 'OK_ADMIN_2025'

import { useState, useEffect } from 'react'
import { ShieldCheck, ShieldOff, Eye, EyeOff, Lock, X } from 'lucide-react'

/** Returns true if admin mode is active */
export function isAdmin() {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem('admin_token') === ADMIN_TOKEN
  } catch {
    return false
  }
}

/** React hook — reactively tracks admin state */
export function useAdmin() {
  const [admin, setAdmin] = useState(false)
  useEffect(() => {
    setAdmin(isAdmin())
    const onStorage = () => setAdmin(isAdmin())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  return admin
}

/** Renders children only when admin is active */
export function AdminOnly({ children, fallback = null }) {
  const admin = useAdmin()
  return admin ? children : fallback
}

/**
 * Floating admin toggle widget shown in bottom-right corner.
 * Renders only once; provides login / logout UI.
 */
export function AdminWidget() {
  const admin = useAdmin()
  const [open, setOpen] = useState(false)
  const [token, setToken] = useState('')
  const [err, setErr] = useState('')

  const login = () => {
    if (token === ADMIN_TOKEN) {
      localStorage.setItem('admin_token', ADMIN_TOKEN)
      window.dispatchEvent(new Event('storage'))
      setOpen(false)
      setToken('')
      setErr('')
    } else {
      setErr('Invalid admin key.')
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    window.dispatchEvent(new Event('storage'))
    setOpen(false)
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(v => !v)}
        title={admin ? 'Admin mode active' : 'Admin login'}
        className="fixed bottom-5 right-5 z-[900] w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all"
        style={{
          background: admin ? '#4F46E5' : '#1E293B',
          color: '#fff',
        }}
      >
        {admin ? <ShieldCheck size={17} /> : <Lock size={17} />}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-16 right-5 z-[900] w-72 rounded-xl shadow-xl overflow-hidden animate-scale-in"
          style={{ background: '#fff', border: '1px solid #E2E8F0' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: '1px solid #E2E8F0', background: admin ? '#EEF2FF' : '#F8FAFC' }}
          >
            <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: admin ? '#4F46E5' : '#1E293B' }}>
              {admin ? <ShieldCheck size={15} /> : <Lock size={15} />}
              {admin ? 'Admin Mode Active' : 'Admin Login'}
            </div>
            <button onClick={() => setOpen(false)} style={{ color: '#94A3B8' }}>
              <X size={15} />
            </button>
          </div>

          <div className="p-4">
            {admin ? (
              <div className="space-y-3">
                <p className="text-xs" style={{ color: '#64748B' }}>
                  All edit and add controls are now visible across the site.
                </p>
                <button onClick={logout} className="btn btn-danger btn-sm w-full">
                  <ShieldOff size={13} /> Exit Admin Mode
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs" style={{ color: '#64748B' }}>
                  Enter your admin key to unlock edit controls.
                </p>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Admin key…"
                    value={token}
                    onChange={e => { setToken(e.target.value); setErr('') }}
                    onKeyDown={e => e.key === 'Enter' && login()}
                    className="input text-sm"
                    style={{ paddingRight: 40 }}
                  />
                </div>
                {err && <p className="text-xs" style={{ color: '#DC2626' }}>{err}</p>}
                <button onClick={login} className="btn btn-primary btn-sm w-full">
                  <ShieldCheck size={13} /> Unlock
                </button>
                <p className="text-xs text-center" style={{ color: '#CBD5E1' }}>
                  Hint: set via DevTools localStorage
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}