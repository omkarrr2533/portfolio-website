'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Scroll-reveal wrapper built on framer-motion.
 * Fades + slides content into view the first time it enters the viewport.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  once = true,
  duration = 0.6,
  margin = '-60px',
  className = '',
  style,
  ...rest
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin }}
      transition={{ delay, duration, ease: EASE }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
