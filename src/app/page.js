'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Github, Linkedin, Mail, ExternalLink, ArrowRight,
  Download, ChevronDown, Terminal, Code2, Cpu, Zap,
  Globe, Star, GitBranch, Youtube
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────
   CANVAS: Animated node network background
───────────────────────────────────────────────────────── */
function NodeNetwork({ mousePos }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const nodesRef = useRef([])
  const mousePosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    mousePosRef.current = mousePos
  }, [mousePos])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create nodes
    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 12000))
    nodesRef.current = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
      hue: Math.random() > 0.6 ? 180 : 270, // cyan or violet
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mousePosRef.current.x || canvas.width / 2
      const my = mousePosRef.current.y || canvas.height / 2

      nodesRef.current.forEach(n => {
        n.x += n.vx
        n.y += n.vy
        n.pulse += n.pulseSpeed

        // Soft bounce
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1

        // Mouse attraction (subtle)
        const dx = mx - n.x, dy = my - n.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          n.x += dx * 0.0015
          n.y += dy * 0.0015
        }

        const alpha = 0.4 + 0.4 * Math.sin(n.pulse)
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${n.hue}, 100%, 70%, ${alpha})`
        ctx.shadowBlur = 8
        ctx.shadowColor = `hsla(${n.hue}, 100%, 70%, 0.8)`
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw connections
      const nodes = nodesRef.current
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 140) {
            const alpha = (1 - d / 140) * 0.35
            const hue = (nodes[i].hue + nodes[j].hue) / 2
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, zIndex: 0,
        opacity: 0.65, pointerEvents: 'none',
      }}
    />
  )
}

/* ─────────────────────────────────────────────────────────
   CANVAS: Holographic globe
───────────────────────────────────────────────────────── */
function HoloGlobe({ mousePos }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const rotRef = useRef(0)
  const mousePosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    mousePosRef.current = mousePos
  }, [mousePos])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const S = 340
    canvas.width = S
    canvas.height = S

    const draw = () => {
      ctx.clearRect(0, 0, S, S)
      const cx = S / 2, cy = S / 2
      const R = 130
      const mx = (mousePosRef.current.x || window.innerWidth / 2) / window.innerWidth
      const my = (mousePosRef.current.y || window.innerHeight / 2) / window.innerHeight
      const tiltX = (my - 0.5) * 0.3
      const tiltY = (mx - 0.5) * 0.3

      rotRef.current += 0.004

      // Outer glow rings
      for (let i = 3; i > 0; i--) {
        ctx.beginPath()
        ctx.arc(cx, cy, R + i * 12, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0, 255, 230, ${0.05 / i})`
        ctx.lineWidth = 12
        ctx.stroke()
      }

      // Draw lat/lon lines
      const lines = 12
      for (let l = 0; l < lines; l++) {
        const lat = (l / lines) * Math.PI - Math.PI / 2
        ctx.beginPath()
        let first = true
        for (let a = 0; a <= Math.PI * 2; a += 0.05) {
          const nx = Math.cos(lat) * Math.cos(a + rotRef.current + tiltY)
          const ny = Math.sin(lat) + tiltX
          const nz = Math.cos(lat) * Math.sin(a + rotRef.current + tiltY)
          if (nz < 0) { first = true; continue }
          const px = cx + nx * R
          const py = cy + ny * R * 0.95
          const alpha = 0.15 + nz * 0.4
          if (first) { ctx.moveTo(px, py); first = false }
          else ctx.lineTo(px, py)
        }
        ctx.strokeStyle = `rgba(0, 255, 220, ${0.3})`
        ctx.lineWidth = 0.7
        ctx.stroke()
      }

      // Meridian lines
      for (let l = 0; l < 8; l++) {
        const lon = (l / 8) * Math.PI * 2
        ctx.beginPath()
        let first = true
        for (let a = -Math.PI / 2; a <= Math.PI / 2; a += 0.05) {
          const nx = Math.cos(a) * Math.cos(lon + rotRef.current + tiltY)
          const ny = Math.sin(a) + tiltX * 0.5
          const nz = Math.cos(a) * Math.sin(lon + rotRef.current + tiltY)
          if (nz < 0) { first = true; continue }
          const px = cx + nx * R
          const py = cy + ny * R * 0.95
          if (first) { ctx.moveTo(px, py); first = false }
          else ctx.lineTo(px, py)
        }
        ctx.strokeStyle = `rgba(160, 80, 255, 0.25)`
        ctx.lineWidth = 0.7
        ctx.stroke()
      }

      // Glowing dot nodes on globe surface
      const dots = [
        [0.3, 0.9], [1.2, 0.5], [2.1, 1.1], [3.5, 0.7],
        [4.2, 1.3], [5.1, 0.4], [0.8, 1.5], [2.8, 0.3],
      ]
      dots.forEach(([lon, lat]) => {
        const a = lon + rotRef.current + tiltY
        const b = lat - Math.PI / 2
        const nx = Math.cos(b) * Math.cos(a)
        const ny = Math.sin(b) + tiltX * 0.5
        const nz = Math.cos(b) * Math.sin(a)
        if (nz < 0.1) return
        const px = cx + nx * R
        const py = cy + ny * R * 0.95
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 220, ${0.5 + nz * 0.5})`
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(0,255,220,0.8)'
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Core glow
      const grad = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R)
      grad.addColorStop(0, 'rgba(80, 200, 255, 0.08)')
      grad.addColorStop(0.7, 'rgba(130, 60, 255, 0.04)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      // Ring equator
      ctx.beginPath()
      ctx.ellipse(cx, cy, R + 30, 18, tiltX, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0, 255, 220, 0.2)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', filter: 'drop-shadow(0 0 30px rgba(0,255,220,0.3))' }}
    />
  )
}

/* ─────────────────────────────────────────────────────────
   TYPEWRITER HOOK
───────────────────────────────────────────────────────── */
function useTypewriter(text, speed = 55) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(id); setDone(true) }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return { displayed, done }
}

/* ─────────────────────────────────────────────────────────
   GLITCH TEXT
───────────────────────────────────────────────────────── */
function GlitchText({ children, className = '' }) {
  const [glitching, setGlitching] = useState(false)
  const chars = '!<>-_\\/[]{}—=+*^?#$%'
  const [glitched, setGlitched] = useState(children)

  const trigger = () => {
    setGlitching(true)
    let count = 0
    const id = setInterval(() => {
      setGlitched(
        children.split('').map(c =>
          c === ' ' ? ' ' : (Math.random() > 0.6 ? chars[Math.floor(Math.random() * chars.length)] : c)
        ).join('')
      )
      count++
      if (count > 10) {
        clearInterval(id)
        setGlitched(children)
        setGlitching(false)
      }
    }, 50)
  }

  return (
    <span
      className={className}
      onMouseEnter={trigger}
      style={{ cursor: 'default', letterSpacing: '0.05em' }}
    >
      {glitched}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────
   SKILLS PARTICLE CANVAS
───────────────────────────────────────────────────────── */
function SkillsParticles({ skills, hovered }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const particlesRef = useRef([])
  const hoveredRef = useRef(null)

  useEffect(() => {
    hoveredRef.current = hovered
  }, [hovered])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const W = canvas.width, H = canvas.height

    // Create particles for each skill
    const allParticles = []
    skills.forEach((skill, si) => {
      const angle = (si / skills.length) * Math.PI * 2
      const baseR = Math.min(W, H) * 0.32
      const cx = W / 2 + Math.cos(angle) * baseR
      const cy = H / 2 + Math.sin(angle) * baseR * 0.7
      const count = 18 + Math.floor(Math.random() * 12)
      for (let i = 0; i < count; i++) {
        allParticles.push({
          skillIdx: si,
          homeX: cx + (Math.random() - 0.5) * 40,
          homeY: cy + (Math.random() - 0.5) * 40,
          x: Math.random() * W,
          y: Math.random() * H,
          vx: 0, vy: 0,
          r: 1.5 + Math.random() * 2,
          hue: skill.hue,
          alpha: 0.5 + Math.random() * 0.5,
        })
      }
    })
    particlesRef.current = allParticles

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const scattered = hoveredRef.current !== null

      particlesRef.current.forEach(p => {
        let tx = p.homeX, ty = p.homeY
        if (scattered && hoveredRef.current !== p.skillIdx) {
          tx = p.x + (Math.random() - 0.5) * 200
          ty = p.y + (Math.random() - 0.5) * 200
        } else if (!scattered) {
          tx = p.homeX
          ty = p.homeY
        }

        const speed = scattered && hoveredRef.current !== p.skillIdx ? 0.02 : 0.06
        p.x += (tx - p.x) * speed
        p.y += (ty - p.y) * speed

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${p.alpha})`
        ctx.shadowBlur = 6
        ctx.shadowColor = `hsla(${p.hue}, 90%, 70%, 0.7)`
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [skills])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}

/* ─────────────────────────────────────────────────────────
   TERMINAL COMPONENT
───────────────────────────────────────────────────────── */
function TerminalContact() {
  const [lines, setLines] = useState([
    { type: 'system', text: '> SECURE CONNECTION ESTABLISHED' },
    { type: 'system', text: '> PORTFOLIO CONTACT NODE v2.0.26' },
    { type: 'prompt', text: '// Type your message and press [ENTER] to send' },
  ])
  const [input, setInput] = useState('')
  const [stage, setStage] = useState('idle') // idle | name | email | message | sent
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const termRef = useRef(null)

  const addLine = (text, type = 'output') => {
    setLines(l => [...l, { type, text }])
    setTimeout(() => { termRef.current?.scrollTo(0, 99999) }, 50)
  }

  const handleCommand = async (cmd) => {
    addLine(`$ ${cmd}`, 'input')
    const c = cmd.trim().toLowerCase()

    if (stage === 'idle') {
      if (c === 'contact' || c === 'msg' || c === 'message') {
        setStage('name')
        addLine('> Initiating contact protocol...', 'system')
        addLine('> Enter your name:', 'prompt')
      } else if (c === 'help') {
        addLine('  contact   → Send a message to Om', 'output')
        addLine('  github    → Open GitHub profile', 'output')
        addLine('  linkedin  → Open LinkedIn profile', 'output')
        addLine('  clear     → Clear terminal', 'output')
      } else if (c === 'github') {
        addLine('> Opening: github.com/omkarrr2533', 'system')
        window.open('https://github.com/omkarrr2533', '_blank')
      } else if (c === 'linkedin') {
        addLine('> Opening LinkedIn...', 'system')
        window.open('https://www.linkedin.com/in/om-kapale-b861a228a', '_blank')
      } else if (c === 'clear') {
        setLines([])
      } else {
        addLine(`> Command not found: "${cmd}". Type "help" for commands.`, 'error')
      }
    } else if (stage === 'name') {
      setFormData(d => ({ ...d, name: cmd }))
      setStage('email')
      addLine(`> Name recorded: ${cmd}`, 'system')
      addLine('> Enter your email address:', 'prompt')
    } else if (stage === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cmd)) {
        addLine('> Invalid email format. Try again:', 'error')
        return
      }
      setFormData(d => ({ ...d, email: cmd }))
      setStage('message')
      addLine(`> Email recorded: ${cmd}`, 'system')
      addLine('> Enter your message:', 'prompt')
    } else if (stage === 'message') {
      const finalData = { ...formData, message: cmd }
      setFormData(finalData)
      setStage('idle')
      setSending(true)
      addLine('> Encrypting message...', 'system')
      addLine('> Transmitting to receiver...', 'system')
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: finalData.name, email: finalData.email, subject: 'Terminal Contact', message: cmd }),
        })
        if (res.ok) {
          addLine('> ✓ MESSAGE SENT SUCCESSFULLY!', 'success')
          addLine(`> Response will arrive at: ${finalData.email}`, 'system')
        } else {
          addLine('> Transmission error. Try again or email directly.', 'error')
        }
      } catch {
        addLine('> Network error. Email: omshripadkapale@gmail.com', 'error')
      }
      setSending(false)
    }
  }

  const color = {
    system: '#00ffe7',
    prompt: '#a78bfa',
    input: '#f1f5f9',
    output: '#94a3b8',
    error: '#f87171',
    success: '#4ade80',
  }

  return (
    <div style={{
      background: 'rgba(6,13,31,0.95)',
      border: '1px solid rgba(0,255,231,0.15)',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 0 40px rgba(0,255,231,0.08), 0 24px 64px rgba(0,0,0,0.7)',
      fontFamily: '"JetBrains Mono", monospace',
    }}>
      {/* Terminal header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '10px 16px',
        background: 'rgba(0,0,0,0.5)',
        borderBottom: '1px solid rgba(0,255,231,0.1)',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
        <span style={{ marginLeft: 10, fontSize: 11, color: '#4a6090' }}>
          om@portfolio:~$ terminal_contact
        </span>
      </div>

      {/* Output */}
      <div ref={termRef} style={{
        height: 280, overflowY: 'auto', padding: '14px 20px',
        fontSize: 12.5, lineHeight: 1.9,
        scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,255,231,0.2) transparent',
      }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: color[l.type] || '#94a3b8' }}>{l.text}</div>
        ))}
      </div>

      {/* Input row */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '10px 20px',
        borderTop: '1px solid rgba(0,255,231,0.1)',
        background: 'rgba(0,0,0,0.3)',
      }}>
        <span style={{ color: '#00ffe7', marginRight: 8, fontSize: 13 }}>$</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && input.trim() && !sending) {
              handleCommand(input.trim())
              setInput('')
            }
          }}
          disabled={sending}
          placeholder={stage === 'idle' ? 'type "contact" or "help"…' : '…'}
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            color: '#e8f0fe', fontSize: 12.5, fontFamily: '"JetBrains Mono", monospace',
            caretColor: '#00ffe7',
          }}
        />
        <span style={{
          width: 7, height: 14, background: '#00ffe7', marginLeft: 4,
          animation: 'cursorBlink 1s step-end infinite',
        }} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   PROJECT CARD (3D hover)
───────────────────────────────────────────────────────── */
function HoloCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)
  const cardRef = useRef(null)

  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 20
    setTilt({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }) }}
      style={{
        transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) ${hover ? 'translateZ(20px)' : 'translateZ(0)'}`,
        transition: hover ? 'transform 0.1s ease' : 'transform 0.5s ease',
        willChange: 'transform',
      }}
    >
      <div style={{
        background: 'rgba(13,21,38,0.7)',
        border: `1px solid ${hover ? project.accent + '60' : 'rgba(148,163,184,0.1)'}`,
        borderRadius: 16,
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        boxShadow: hover
          ? `0 0 30px ${project.accent}25, 0 24px 48px rgba(0,0,0,0.5)`
          : '0 4px 24px rgba(0,0,0,0.4)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        position: 'relative',
      }}>
        {/* Holographic sheen on hover */}
        {hover && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            background: `linear-gradient(135deg, ${project.accent}08, transparent 60%, ${project.accent}05)`,
          }} />
        )}

        {/* Top accent */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${project.accent}, transparent)` }} />

        <div style={{ padding: '24px 24px 20px', position: 'relative', zIndex: 1 }}>
          {/* Tag */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {project.tags.map(t => (
              <span key={t} style={{
                padding: '3px 10px', borderRadius: 99, fontSize: 10,
                fontFamily: '"JetBrains Mono", monospace',
                background: `${project.accent}15`,
                color: project.accent,
                border: `1px solid ${project.accent}30`,
                fontWeight: 600, letterSpacing: '0.05em',
              }}>{t}</span>
            ))}
          </div>

          <h3 style={{
            fontSize: 20, fontWeight: 700, color: '#e8f0fe', marginBottom: 8,
            fontFamily: 'Rajdhani, "Plus Jakarta Sans", sans-serif', letterSpacing: '0.02em',
          }}>{project.name}</h3>

          <p style={{ fontSize: 13, color: '#8ea4c8', lineHeight: 1.7, marginBottom: 16 }}>
            {project.desc}
          </p>

          {/* Accuracy/metric badge */}
          {project.metric && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px',
              background: 'rgba(0,255,231,0.06)',
              border: '1px solid rgba(0,255,231,0.2)',
              borderRadius: 8, marginBottom: 16, fontSize: 12, color: '#00ffe7',
              fontFamily: '"JetBrains Mono", monospace',
            }}>
              <Zap size={12} /> {project.metric}
            </div>
          )}

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 12, fontWeight: 600, color: '#8ea4c8',
              transition: 'color 150ms',
            }}
          >
            <Github size={13} />
            View Source <ArrowRight size={11} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────
   EXPERIENCE CARD
───────────────────────────────────────────────────────── */
function ExpCard({ exp, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      style={{
        display: 'flex', gap: 20, alignItems: 'flex-start',
        position: 'relative',
      }}
    >
      {/* Timeline dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: `linear-gradient(135deg, ${exp.accent}, ${exp.accent2 || exp.accent}80)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 16px ${exp.accent}50`,
          fontSize: 16,
        }}>
          {exp.icon}
        </div>
        {index < 2 && (
          <div style={{
            width: 1, height: 60, marginTop: 8,
            background: `linear-gradient(to bottom, ${exp.accent}40, transparent)`,
          }} />
        )}
      </div>

      {/* Card */}
      <div style={{
        flex: 1, marginBottom: 32,
        background: 'rgba(13,21,38,0.6)',
        border: '1px solid rgba(148,163,184,0.1)',
        borderRadius: 14,
        padding: '18px 20px',
        backdropFilter: 'blur(16px)',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
          <h3 style={{
            fontSize: 16, fontWeight: 700, color: '#e8f0fe',
            fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.03em',
          }}>{exp.role}</h3>
          <span style={{
            fontSize: 10, fontFamily: '"JetBrains Mono", monospace',
            color: exp.accent, padding: '3px 10px',
            background: `${exp.accent}15`, border: `1px solid ${exp.accent}30`,
            borderRadius: 99,
          }}>{exp.period}</span>
        </div>
        <p style={{ fontSize: 12, color: exp.accent, fontWeight: 600, marginBottom: 8 }}>{exp.org}</p>
        <p style={{ fontSize: 13, color: '#8ea4c8', lineHeight: 1.7 }}>{exp.desc}</p>
        {exp.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {exp.tags.map(t => (
              <span key={t} style={{
                fontSize: 10, padding: '2px 8px', borderRadius: 99,
                background: 'rgba(148,163,184,0.1)', color: '#8ea4c8',
                border: '1px solid rgba(148,163,184,0.15)',
                fontFamily: '"JetBrains Mono", monospace',
              }}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════ */
function GsocBanner() {
  const [show, setShow] = useState(true)
  if (!show) return null
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6, ease: [0.22,1,0.36,1] }}
      style={{
        position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)',
        zIndex: 50, width: 'fit-content', maxWidth: '90vw',
        background: 'rgba(6,13,31,0.95)',
        border: '1px solid rgba(74,222,128,0.4)',
        borderRadius: 14, padding: '10px 20px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 30px rgba(74,222,128,0.2), 0 8px 32px rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}
    >
      <span style={{ fontSize: 20 }}>🎉</span>
      <div>
        <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700, fontSize: 13, color: '#4ade80', margin: 0 }}>
          Just got selected for Google Summer of Code 2026!
        </p>
        <p style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: '#4a6090', margin: '2px 0 0' }}>
          PEcAn Project · Refactoring Trait-Meta-analysis Pipeline · $3,000 stipend
        </p>
      </div>
      <button
        onClick={() => setShow(false)}
        style={{ background: 'none', border: 'none', color: '#4a6090', cursor: 'pointer', fontSize: 16, padding: '0 0 0 8px' }}
      >×</button>
    </motion.div>
  )
}

export default function FuturisticPortfolio() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
const [showBanner, setShowBanner] = useState(true)
const [daysToMidterm, setDaysToMidterm] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])
  const heroY = useTransform(scrollY, [0, 500], [0, -80])

  const { displayed: headline } = useTypewriter('Om Kapale | GSoC 2026 Contributor @ PEcAn Project', 48)

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
  window.addEventListener('mousemove', handleMouseMove)
  return () => window.removeEventListener('mousemove', handleMouseMove)
}, [handleMouseMove])

useEffect(() => {
  const midterm = new Date('2026-07-10T22:00:00')
  const update = () => {
    const diff = Math.ceil((midterm - new Date()) / (1000 * 60 * 60 * 24))
    setDaysToMidterm(Math.max(0, diff))
  }
  update()
}, [])

  const PROJECTS = [
    {
      name: 'SatyaCheck',
      desc: 'A Chrome extension utilizing a 7-layer AI pipeline to detect misinformation in real-time. Achieved 92.6% accuracy using fine-tuned LLMs and ensemble NLP models.',
      tags: ['Python', 'AI/ML', 'JavaScript', 'NLP', 'Chrome Extension'],
      metric: '92.6% accuracy · 7-layer AI pipeline',
      accent: '#00ffe7',
      url: 'https://github.com/omkarrr2533',
    },
    {
      name: 'Real-Time Bus Tracker',
      desc: 'Live city bus positioning system with sub-second WebSocket updates, interactive Leaflet.js map, Spring Boot REST backend, and offline-capable PWA design.',
      tags: ['Node.js', 'WebSockets', 'REST APIs', 'Leaflet.js', 'Spring Boot'],
      metric: 'Sub-second position updates',
      accent: '#a78bfa',
      url: 'https://github.com/omkarrr2533/BUS-ETA.git',
    },
    {
      name: 'Hand Sign Detection',
      desc: 'Real-time ASL alphabet recognition from webcam using MediaPipe landmark detection and a custom PyTorch CNN trained on augmented gesture datasets.',
      tags: ['Python', 'PyTorch', 'MediaPipe', 'OpenCV', 'CNN'],
      metric: 'Real-time gesture recognition',
      accent: '#f59e0b',
      url: 'https://github.com/omkarrr2533/Hand_Sign_Detection_Using_Python.git',
    },
  ]

  const EXPERIENCE = [
    {
  role: 'Google Summer of Code 2026 — Contributor',
  org: 'PEcAn Project · Google Open Source',
  period: 'May – Sep 2026',
  desc: "Selected from a record-breaking applicant pool for GSoC 2026. Refactoring PEcAn's Trait-Meta-analysis-Configuration Pipeline — increasing modularity, designing plugin interfaces, decoupling core modules, and improving test coverage. Mentor: Mike Dietze. Stipend: $3,000 USD.",
  tags: ['R', 'Python', 'Architecture', 'Modular Design', 'GSoC', 'Open Source'],
  accent: '#4ade80',
  accent2: '#00ffe7',
  icon: '🌱',
},
    {
      role: 'Realm Description Caching',
      org: 'Zulip Open Source',
      period: '2025',
      desc: 'Implemented server-side caching for realm descriptions — reducing redundant DB queries on high-traffic orgs. PR reviewed and merged into the main Zulip codebase.',
      tags: ['Python', 'Django', 'Redis', 'Performance', 'Backend'],
      accent: '#a78bfa',
      icon: '💬',
    },
    {
      role: 'Group Merging & Library Import Fixes',
      org: 'JabRef (Java Reference Manager)',
      period: '2025',
      desc: 'Fixed critical bugs in the group merging algorithm and library import pipeline. Resolved edge cases causing data corruption when importing mixed-format reference libraries.',
      tags: ['Java', 'JavaFX', 'Bug Fix', 'UI', 'Parsing'],
      accent: '#f59e0b',
      icon: '📚',
    },
  ]

  const SKILLS = [
    { name: 'Python', hue: 210 },
    { name: 'Java', hue: 0 },
    { name: 'JavaScript', hue: 50 },
    { name: 'R', hue: 200 },
    { name: 'C', hue: 250 },
    { name: 'Node.js', hue: 130 },
    { name: 'PyTorch', hue: 20 },
    { name: 'Spring Boot', hue: 140 },
    { name: 'SQL', hue: 180 },
    { name: 'REST API', hue: 280 },
  ]

  const parallaxX = useTransform(scrollY, [0, 300], [0, -20])
  const parallaxY = useTransform(scrollY, [0, 300], [0, 30])

  return (
    <div style={{ background: '#060D1F', minHeight: '100vh', color: '#e8f0fe', overflowX: 'hidden' }}>

{/* ── GSoC announcement banner ── */}
{showBanner && (
  <motion.div
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 2.5, duration: 0.7, ease: [0.22,1,0.36,1] }}
    style={{
      position: 'fixed', top: 74, left: '50%', transform: 'translateX(-50%)',
      zIndex: 999, whiteSpace: 'nowrap',
      background: 'rgba(6,13,31,0.97)',
      border: '1px solid rgba(74,222,128,0.45)',
      borderRadius: 14, padding: '10px 20px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 0 32px rgba(74,222,128,0.2), 0 8px 40px rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', gap: 12,
    }}
  >
    <span style={{ fontSize: 18 }}>🎉</span>
    <div>
      <p style={{
        fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700,
        fontSize: 13, color: '#4ade80', margin: 0, lineHeight: 1.4,
      }}>
        Just got selected for Google Summer of Code 2026!
      </p>
      <p style={{
        fontFamily: '"JetBrains Mono",monospace', fontSize: 11,
        color: '#4a6090', margin: '2px 0 0', lineHeight: 1.4,
      }}>
        PEcAn Project · Trait-Meta-analysis Pipeline · $3,000 stipend
      </p>
    </div>
    <button
      onClick={() => setShowBanner(false)}
      style={{
        background: 'none', border: 'none', color: '#4a6090',
        cursor: 'pointer', fontSize: 18, padding: '0 0 0 8px', lineHeight: 1,
      }}
    >×</button>
  </motion.div>
)}
      {/* ───── HERO ───── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden', paddingTop: 80,
      }}>
        {/* Scan-line overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,231,0.015) 3px, rgba(0,255,231,0.015) 4px)',
        }} />

        {/* Deep glow blobs */}
        <div style={{
          position: 'absolute', top: '10%', left: '5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,230,0.08), transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', top: '20%', right: '0%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(130,60,255,0.07), transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
        }} />

        <NodeNetwork mousePos={mousePos} />

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 60, paddingBottom: 80 }}>
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 60, alignItems: 'center', maxWidth: 1100, margin: '0 auto',
            }}>
              {/* ── Left col ── */}
              <div>
                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{ marginBottom: 24 }}
                >
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '6px 14px',
                    background: 'rgba(0,255,231,0.06)',
                    border: '1px solid rgba(0,255,231,0.2)',
                    borderRadius: 99, fontSize: 11,
                    fontFamily: '"JetBrains Mono", monospace',
                    color: '#00ffe7', letterSpacing: '0.1em',
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                    🏆 GSoC 2026 SELECTED · PECAN PROJECT
                  </span>
                </motion.div>

                {/* Headline typewriter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h1 style={{
                    fontSize: 'clamp(15px, 2vw, 18px)',
                    color: '#4a6090', fontFamily: '"JetBrains Mono", monospace',
                    letterSpacing: '0.12em', marginBottom: 12,
                  }}>
                    <span style={{ color: '#00ffe7' }}>~/om $</span> whoami
                  </h1>
                  <h2 style={{
                    fontSize: 'clamp(32px, 5.5vw, 64px)',
                    fontWeight: 800, lineHeight: 1.05, marginBottom: 20,
                    fontFamily: 'Rajdhani, "Plus Jakarta Sans", sans-serif',
                    letterSpacing: '0.02em',
                  }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #00ffe7 0%, #818cf8 50%, #a78bfa 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      Om Kapale
                    </span>
                    <br />
                    <span style={{ color: '#e8f0fe', fontSize: '0.6em', fontWeight: 600 }}>
                      Software Engineer
                    </span>
                  </h2>
                </motion.div>

                {/* Typewriter line */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 13, color: '#4a6090',
                    marginBottom: 20, minHeight: 22,
                  }}
                >
                  <span style={{ color: '#a78bfa' }}>{'>'}</span>{' '}
                  <span style={{ color: '#e8f0fe' }}>{headline}</span>
                  <span style={{
                    display: 'inline-block', width: 8, height: 15,
                    background: '#00ffe7', marginLeft: 2,
                    verticalAlign: 'text-bottom',
                    animation: 'cursorBlink 1s step-end infinite',
                  }} />
                </motion.div>

                <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.0 }}
  style={{ color: '#8ea4c8', fontSize: 15, lineHeight: 1.75, maxWidth: 500, marginBottom: 16 }}
>
  GSoC 2026 contributor · Top 5% CSE student (8.11 CGPA) ·
  Building scalable backends, AI-powered tools, and contributing to open source across <span style={{ color: '#00ffe7' }}>6+ organisations</span>.
</motion.p>

{/* GSoC live indicator */}
{daysToMidterm > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.3 }}
    style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}
  >
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 14px',
      background: 'rgba(74,222,128,0.06)',
      border: '1px solid rgba(74,222,128,0.25)',
      borderRadius: 99,
      fontFamily: '"JetBrains Mono",monospace',
      fontSize: 11, color: '#4ade80',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: '#4ade80', boxShadow: '0 0 8px #4ade80',
        animation: 'cursorBlink 1.5s step-end infinite',
      }} />
      GSoC 2026 active · Midterm eval in {daysToMidterm} days · PEcAn Project
    </div>
  </motion.div>
)}
{daysToMidterm === 0 && <div style={{ marginBottom: 28 }} />}

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}
                >
                  <a
                    href="#projects"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, rgba(0,255,231,0.15), rgba(130,60,255,0.15))',
                      border: '1px solid rgba(0,255,231,0.4)',
                      borderRadius: 10, color: '#00ffe7',
                      fontSize: 14, fontWeight: 600,
                      textDecoration: 'none',
                      boxShadow: '0 0 20px rgba(0,255,231,0.15)',
                      transition: 'all 200ms ease',
                      fontFamily: '"JetBrains Mono", monospace',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,255,231,0.25), rgba(130,60,255,0.2))'
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,231,0.3)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,255,231,0.15), rgba(130,60,255,0.15))'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,231,0.15)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <Zap size={15} /> Explore My Universe
                  </a>

                  <a
                    href="/resume.pdf" download
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '12px 24px',
                      background: 'rgba(13,21,38,0.8)',
                      border: '1px solid rgba(148,163,184,0.15)',
                      borderRadius: 10, color: '#8ea4c8',
                      fontSize: 14, fontWeight: 600, textDecoration: 'none',
                      transition: 'all 200ms ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.4)'; e.currentTarget.style.color = '#a78bfa' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)'; e.currentTarget.style.color = '#8ea4c8' }}
                  >
                    <Download size={15} /> Resume
                  </a>
                </motion.div>

                {/* Socials */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
                >
                  {[
                    { icon: Github, url: 'https://github.com/omkarrr2533', label: 'GitHub' },
                    { icon: Linkedin, url: 'https://www.linkedin.com/in/om-kapale-b861a228a', label: 'LinkedIn' },
                    { icon: Mail, url: 'mailto:omshripadkapale@gmail.com', label: 'Email' },
                    { icon: Youtube, url: '#', label: 'YouTube' },
                  ].map(s => (
                    <a key={s.label} href={s.url} target={s.url.startsWith('mailto') ? '_self' : '_blank'}
                      rel="noopener noreferrer" title={s.label}
                      style={{
                        width: 38, height: 38, borderRadius: 10,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(13,21,38,0.8)',
                        border: '1px solid rgba(148,163,184,0.12)',
                        color: '#4a6090', textDecoration: 'none',
                        transition: 'all 150ms ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,231,0.4)'; e.currentTarget.style.color = '#00ffe7'; e.currentTarget.style.boxShadow = '0 0 12px rgba(0,255,231,0.2)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.12)'; e.currentTarget.style.color = '#4a6090'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                      <s.icon size={16} />
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* ── Right col: Globe ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 24,
                  x: parallaxX, y: parallaxY,
                }}
              >
                <div style={{ position: 'relative' }}>
                  <HoloGlobe mousePos={mousePos} />
                  {/* Floating stat badges */}
                  {[
                    { label: 'CGPA', value: '8.11', top: '10%', left: '-20%', accent: '#00ffe7' },
                    { label: 'GSoC 2026', value: 'Selected', top: '55%', right: '-25%', accent: '#4ade80' },
                    { label: 'Stipend', value: '$3K', bottom: '8%', left: '-18%', accent: '#f59e0b' },
                  ].map(b => (
                    <motion.div
                      key={b.label}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute', ...b,
                        background: 'rgba(6,13,31,0.9)',
                        border: `1px solid ${b.accent}40`,
                        borderRadius: 10, padding: '8px 14px',
                        backdropFilter: 'blur(10px)',
                        boxShadow: `0 0 16px ${b.accent}20`,
                        textAlign: 'center', minWidth: 70,
                      }}
                    >
                      <div style={{ fontSize: 17, fontWeight: 800, color: b.accent, fontFamily: '"JetBrains Mono", monospace' }}>
                        {b.value}
                      </div>
                      <div style={{ fontSize: 9, color: '#4a6090', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {b.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Tech strip */}
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: 8,
                  justifyContent: 'center', maxWidth: 300,
                }}>
                  {['Python', 'Java', 'Spring Boot', 'PyTorch', 'Node.js', 'R'].map(t => (
                    <span key={t} style={{
                      padding: '4px 12px', borderRadius: 99, fontSize: 11,
                      background: 'rgba(13,21,38,0.8)',
                      border: '1px solid rgba(148,163,184,0.12)',
                      color: '#8ea4c8', fontFamily: '"JetBrains Mono", monospace',
                    }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

{/* Scroll cue */}
<motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
  style={{
    position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    color: '#2a3f60', zIndex: 2,
  }}
>
  <span style={{ fontSize: 9, letterSpacing: '0.2em', fontFamily: '"JetBrains Mono", monospace' }}>SCROLL</span>
  <ChevronDown size={14} />
</motion.div>
</section>

{/* ───── STATS STRIP ───── */}
      <div style={{
        borderTop: '1px solid rgba(148,163,184,0.06)',
        borderBottom: '1px solid rgba(148,163,184,0.06)',
        background: 'rgba(5,10,23,0.6)',
        backdropFilter: 'blur(12px)',
      }}>
        <div className="container">
          <div className="stats-strip">
            {[
              { number: '3+',   label: 'Projects Shipped' },
              { number: '6+',   label: 'Open Source Orgs' },
              { number: '8.11', label: 'CGPA Score' },
              { number: '$3K',  label: 'GSoC Stipend' },
            ].map((stat, i) => (
              <div key={stat.label} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && <div className="stats-divider" />}
                <div className="stat-item">
                  <div className="metric-number">{stat.number}</div>
                  <div className="metric-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

{/* ───── EXPERIENCE ───── */}
      <section id="experience" style={{ padding: '100px 0', position: 'relative', background: 'rgba(5,10,23,0.7)' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(0,255,231,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,231,0.025) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }} />
        <div className="container" style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 60 }}
          >
            <span style={{
              fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
              color: '#00ffe7', letterSpacing: '0.15em', textTransform: 'uppercase',
              display: 'block', marginBottom: 10,
            }}>// open source · experience</span>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 800, color: '#e8f0fe',
              fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.02em',
            }}>
              <GlitchText>My Contributions</GlitchText>
            </h2>
          </motion.div>

          {EXPERIENCE.map((exp, i) => <ExpCard key={i} exp={exp} index={i} />)}
        </div>
      </section>

      {/* ───── PROJECTS ───── */}
      <section id="projects" style={{ padding: '100px 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 60 }}
          >
            <span style={{
              fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
              color: '#a78bfa', letterSpacing: '0.15em', textTransform: 'uppercase',
              display: 'block', marginBottom: 10,
            }}>// holographic · project panels</span>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 800, color: '#e8f0fe',
              fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.02em',
            }}>
              <GlitchText>Featured Projects</GlitchText>
            </h2>
            <p style={{ color: '#4a6090', fontSize: 14, marginTop: 8 }}>
              Hover over cards to see holographic depth effect
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {PROJECTS.map((p, i) => <HoloCard key={i} project={p} index={i} />)}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: 40 }}
          >
            <Link href="/projects" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 24px',
              background: 'rgba(13,21,38,0.8)',
              border: '1px solid rgba(148,163,184,0.15)',
              borderRadius: 10, color: '#8ea4c8',
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
              transition: 'all 200ms ease',
            }}>
              View All Projects <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ───── SKILLS PARTICLE MATRIX ───── */}
      <section style={{ padding: '100px 0', background: 'rgba(5,10,23,0.6)', position: 'relative' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 50 }}
          >
            <span style={{
              fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
              color: '#f59e0b', letterSpacing: '0.15em', textTransform: 'uppercase',
              display: 'block', marginBottom: 10,
            }}>// particle · skills matrix</span>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 800, color: '#e8f0fe',
              fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.02em',
            }}>
              <GlitchText>Tech Arsenal</GlitchText>
            </h2>
            <p style={{ color: '#4a6090', fontSize: 13, marginTop: 8, fontFamily: '"JetBrains Mono", monospace' }}>
              Hover skills to scatter the particle field
            </p>
          </motion.div>

          <div style={{ position: 'relative', height: 360, marginBottom: 40 }}>
            <SkillsParticles skills={SKILLS} hovered={hoveredSkill} />
            {/* Skill labels overlaid */}
            {SKILLS.map((skill, si) => {
              const angle = (si / SKILLS.length) * Math.PI * 2
              const r = 38
              const cx = 50 + Math.cos(angle) * r
              const cy = 50 + Math.sin(angle) * r * 0.6
              return (
                <motion.button
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: si * 0.05 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredSkill(si)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    position: 'absolute',
                    left: `${cx}%`, top: `${cy}%`,
                    transform: 'translate(-50%, -50%)',
                    padding: '7px 16px',
                    background: hoveredSkill === si ? `hsla(${skill.hue}, 90%, 60%, 0.2)` : 'rgba(13,21,38,0.8)',
                    border: `1px solid ${hoveredSkill === si ? `hsla(${skill.hue}, 90%, 60%, 0.5)` : 'rgba(148,163,184,0.15)'}`,
                    borderRadius: 99, cursor: 'pointer',
                    color: hoveredSkill === si ? `hsla(${skill.hue}, 90%, 75%, 1)` : '#8ea4c8',
                    fontSize: 12, fontWeight: 600,
                    fontFamily: '"JetBrains Mono", monospace',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 200ms ease',
                    boxShadow: hoveredSkill === si ? `0 0 20px hsla(${skill.hue}, 90%, 60%, 0.3)` : 'none',
                    zIndex: 2, whiteSpace: 'nowrap',
                  }}
                >
                  {skill.name}
                </motion.button>
              )
            })}
          </div>

          {/* Additional skill grid */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {[
              'PostgreSQL', 'MySQL', 'Redis', 'REST API', 'WebSocket',
              'Git', 'Docker', 'Linux', 'LLMs', 'DSA', 'OOP', 'pandas', 'NumPy',
            ].map(s => (
              <span key={s} style={{
                padding: '5px 14px', borderRadius: 99, fontSize: 11,
                background: 'rgba(13,21,38,0.7)',
                border: '1px solid rgba(148,163,184,0.1)',
                color: '#8ea4c8', fontFamily: '"JetBrains Mono", monospace',
              }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TERMINAL CONTACT ───── */}
      <section id="contact" style={{ padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 50 }}
          >
            <span style={{
              fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
              color: '#4ade80', letterSpacing: '0.15em', textTransform: 'uppercase',
              display: 'block', marginBottom: 10,
            }}>// retro-futuristic · terminal</span>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 800, color: '#e8f0fe',
              fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.02em',
            }}>
              <GlitchText>Contact Node</GlitchText>
            </h2>
            <p style={{ color: '#4a6090', fontSize: 13, marginTop: 8, fontFamily: '"JetBrains Mono", monospace' }}>
              Type <span style={{ color: '#00ffe7' }}>"contact"</span> or <span style={{ color: '#a78bfa' }}>"help"</span> to get started
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <TerminalContact />
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              display: 'flex', gap: 12, justifyContent: 'center',
              flexWrap: 'wrap', marginTop: 24,
            }}
          >
            {[
              { label: 'GitHub', icon: Github, url: 'https://github.com/omkarrr2533', accent: '#e8f0fe' },
              { label: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/om-kapale-b861a228a', accent: '#60a5fa' },
              { label: 'Email', icon: Mail, url: 'mailto:omshripadkapale@gmail.com', accent: '#4ade80' },
              { label: 'YouTube', icon: Youtube, url: '#', accent: '#f87171' },
            ].map(s => (
              <a key={s.label} href={s.url}
                target={s.url.startsWith('mailto') || s.url === '#' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '9px 18px',
                  background: 'rgba(13,21,38,0.7)',
                  border: '1px solid rgba(148,163,184,0.12)',
                  borderRadius: 10, color: '#8ea4c8',
                  fontSize: 13, fontWeight: 600, textDecoration: 'none',
                  transition: 'all 200ms ease',
                  fontFamily: '"JetBrains Mono", monospace',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = s.accent; e.currentTarget.style.borderColor = s.accent + '40' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#8ea4c8'; e.currentTarget.style.borderColor = 'rgba(148,163,184,0.12)' }}
              >
                <s.icon size={14} /> {s.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  )
}