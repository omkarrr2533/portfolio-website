'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Wraps children with a scroll-triggered reveal animation.
 *
 * Usage:
 *   <ScrollReveal delay={0.1} direction="up">
 *     <YourComponent />
 *   </ScrollReveal>
 */
export default function ScrollReveal({
  children,
  delay     = 0,
  direction = 'up',
  className = '',
  threshold = 0.15,
  once      = true,
}) {
  const ref     = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVis(false)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  const hidden = {
    up:    'translateY(32px)',
    down:  'translateY(-32px)',
    left:  'translateX(32px)',
    right: 'translateX(-32px)',
    none:  'none',
  }[direction] || 'translateY(32px)'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis ? 'none' : hidden,
        transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}