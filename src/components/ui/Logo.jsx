'use client'

/**
 * Om Kapale monogram — a geometric "OK" mark (ring "O" + angular "K")
 * inside a glass badge with an animated conic-gradient ring.
 */
export default function Logo({ size = 38 }) {
  return (
    <span className="ok-logo" style={{ width: size, height: size }} aria-label="Om Kapale">
      <svg viewBox="0 0 52 48" width={size * 0.66} height={size * 0.66} fill="none"
        style={{ position: 'relative', zIndex: 1 }}>
        <defs>
          <linearGradient id="ok-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="52%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        {/* O — ring */}
        <circle cx="16" cy="24" r="9.5" stroke="url(#ok-grad)" strokeWidth="3.6" />
        {/* K — stem + two angled strokes */}
        <path d="M32 12.5 V35.5" stroke="url(#ok-grad)" strokeWidth="3.6" strokeLinecap="round" />
        <path d="M32 24 L43 12.5" stroke="url(#ok-grad)" strokeWidth="3.6" strokeLinecap="round" />
        <path d="M32 24 L43 35.5" stroke="url(#ok-grad)" strokeWidth="3.6" strokeLinecap="round" />
      </svg>
    </span>
  )
}
