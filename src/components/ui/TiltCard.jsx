'use client'

import { useRef, useCallback } from 'react'

/**
 * Pointer-tracking 3D tilt wrapper with an optional light glare.
 * Vanilla (no extra deps) — writes transforms directly for buttery motion.
 * Exposes --mx / --my (0-100%) so children can place a glare highlight.
 */
export default function TiltCard({
  children,
  className = '',
  style,
  max = 7,
  scale = 1.012,
  glare = true,
  glareColor = 'rgba(52,211,153,0.14)',
  ...rest
}) {
  const ref = useRef(null)
  const raf = useRef(0)

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const rx = (py - 0.5) * -2 * max
      const ry = (px - 0.5) * 2 * max
      el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`
      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
    })
  }, [max, scale])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(raf.current)
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card ${className}`}
      style={{
        transition: 'transform 220ms cubic-bezier(0.22,1,0.36,1)',
        transformStyle: 'preserve-3d',
        position: 'relative',
        willChange: 'transform',
        ...style,
      }}
      {...rest}
    >
      {children}
      {glare && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            background: `radial-gradient(420px circle at var(--mx,50%) var(--my,50%), ${glareColor}, transparent 45%)`,
            opacity: 0,
            transition: 'opacity 220ms ease',
            zIndex: 2,
          }}
          className="tilt-glare"
        />
      )}
    </div>
  )
}
