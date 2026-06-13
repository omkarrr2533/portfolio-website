'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Animated number that counts up the first time it scrolls into view.
 * Non-numeric values (e.g. '—') are rendered as-is.
 */
export default function CountUp({ to, prefix = '', suffix = '', duration = 1.6, className, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)

  const isNum = typeof to === 'number' || /^\d+$/.test(String(to))
  const target = isNum ? Number(to) : 0

  useEffect(() => {
    if (!inView || !isNum) return
    let start = null
    let raf
    const step = (t) => {
      if (start === null) start = t
      const p = Math.min((t - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, isNum])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{isNum ? val.toLocaleString() : to}{suffix}
    </span>
  )
}
