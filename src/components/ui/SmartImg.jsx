'use client'

import { useState, useRef, useEffect } from 'react'

/**
 * Image that steps through a list of candidate sources, falling back to the
 * next one whenever a source fails to load (404, decode error, etc.).
 * Robust against errors that fire before React hydrates.
 *
 * When every candidate fails, renders `fallback` (e.g. initials).
 */
export default function SmartImg({ candidates = [], alt = '', className = '', style, fallback = null }) {
  const [i, setI] = useState(0)
  const ref = useRef(null)

  // Advance exactly one step past candidate `idx`. Idempotent: calling it
  // multiple times for the same broken source (onError + mount check both
  // fire) never skips the next candidate.
  const advanceFrom = (idx) => setI((cur) => (cur <= idx ? idx + 1 : cur))

  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) advanceFrom(i)
  }, [i])

  if (i >= candidates.length) return fallback

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={candidates[i]}
      alt={alt}
      className={className}
      style={style}
      onError={() => advanceFrom(i)}
      onLoad={(e) => { if (e.currentTarget.naturalWidth === 0) advanceFrom(i) }}
    />
  )
}
