import Link from 'next/link'
import { Github, Linkedin, Mail, ExternalLink, Heart } from 'lucide-react'

const LINKS = [
  { name:'Projects',   path:'/projects' },
  { name:'GitHub',     path:'/github-activities' },
  { name:'About',      path:'/about' },
  { name:'Contact',    path:'/contact' },
]

const SOCIAL = [
  { icon:Github,       label:'GitHub',   url:'https://github.com/omkarrr2533' },
  { icon:Linkedin,     label:'LinkedIn', url:'https://www.linkedin.com/in/om-kapale-b861a228a' },
  { icon:Mail,         label:'Email',    url:'mailto:omshripadkapale@gmail.com' },
  { icon:ExternalLink, label:'LeetCode', url:'https://leetcode.com/u/omi_/' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop:'1px solid rgba(99,120,162,0.12)',
      background:'rgba(6,13,31,0.98)',
    }}>
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-800"
                style={{ background:'linear-gradient(135deg,#3B82F6,#8B5CF6)', color:'#fff' }}
              >OK</span>
              <span className="font-700 text-[#E8F0FE]">Om Shripad Kapale</span>
            </div>
            <p className="text-sm text-[#4A6080] leading-relaxed">
              Backend Developer · AI/ML Enthusiast<br />
              Building scalable systems with clean code.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-600 text-[#4A6080] uppercase tracking-widest mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {LINKS.map(l => (
                <Link key={l.path} href={l.path}
                  className="text-sm text-[#8EA4C8] hover:text-[#60A5FA] transition-colors"
                >
                  {l.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-600 text-[#4A6080] uppercase tracking-widest mb-4">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map(s => (
                <a key={s.label} href={s.url}
                  target={s.url.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#8EA4C8] hover:text-[#60A5FA] transition-colors"
                >
                  <s.icon size={15} />
                  <span className="text-xs">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop:'1px solid rgba(99,120,162,0.1)' }}
        >
          <p className="text-xs text-[#4A6080] flex items-center gap-1">
            Made with <Heart size={11} className="text-red-500 fill-red-500" /> by Om Shripad Kapale
          </p>
          <p className="text-xs text-[#4A6080]">
            © {new Date().getFullYear()} · Powered by Next.js & GitHub API
          </p>
        </div>
      </div>
    </footer>
  )
}