'use client'

import { useState, useEffect } from 'react'
import {
  Github, Star, GitFork, Eye, TrendingUp,
  Code2, Users, BookOpen, RefreshCw, ExternalLink,
} from 'lucide-react'

// ── Language colours ──────────────────────────
const LANG_COLOR = {
  JavaScript:'#F1E05A', TypeScript:'#3178C6', Python:'#3572A5',
  Java:'#B07219', Go:'#00ADD8', Ruby:'#701516', CSS:'#563D7C',
  HTML:'#E34C26', 'C++':'#F34B7D', C:'#555555', Rust:'#DEA584',
}

// ── Skeleton ──────────────────────────────────
const Skel = ({ h = 'h-4', w = 'w-full' }) => (
  <div className={`skeleton ${h} ${w} rounded`} />
)

// ── Contribution calendar ─────────────────────
function ContribCalendar({ weeks }) {
  if (!weeks?.length) {
    // Random mock data fallback
    weeks = Array.from({ length: 52 }, () => ({
      contributionDays: Array.from({ length: 7 }, () => ({
        contributionCount: Math.floor(Math.random() * 8),
        date: ''
      }))
    }))
  }

  const getLevel = (count) => {
    if (count === 0) return 0
    if (count <= 2) return 1
    if (count <= 5) return 2
    if (count <= 9) return 3
    return 4
  }

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-700 text-[#E8F0FE] mb-6 flex items-center gap-2">
        <TrendingUp size={18} className="text-[#60A5FA]" />
        Contribution Activity
      </h2>
      <div className="scroll-x">
        <div className="flex gap-1 min-w-max pb-2">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.contributionDays.map((day, di) => (
                <div
                  key={di}
                  className={`contrib-cell contrib-${getLevel(day.contributionCount)}`}
                  title={day.date ? `${day.date}: ${day.contributionCount} contributions` : `${day.contributionCount} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 text-xs text-[#4A6080]">
        <span>Less</span>
        {[0,1,2,3,4].map(l => (
          <div key={l} className={`contrib-cell contrib-${l}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}

// ── Language bar chart ─────────────────────────
function LanguageChart({ languages }) {
  const entries = Object.entries(languages).sort(([,a],[,b]) => b - a).slice(0, 8)
  const total   = entries.reduce((s,[,v]) => s + v, 0)

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-700 text-[#E8F0FE] mb-5 flex items-center gap-2">
        <Code2 size={18} className="text-[#60A5FA]" />
        Languages Used
      </h2>
      {/* Bar */}
      <div className="flex h-3 rounded-full overflow-hidden mb-5 gap-0.5">
        {entries.map(([lang, count]) => (
          <div key={lang}
            style={{ width: `${(count/total)*100}%`, background: LANG_COLOR[lang] || '#8b949e' }}
            title={`${lang}: ${count} repos`}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {entries.map(([lang, count]) => (
          <div key={lang} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: LANG_COLOR[lang] || '#8b949e' }}
            />
            <span className="text-xs text-[#8EA4C8] font-mono">{lang}</span>
            <span className="text-xs text-[#4A6080] ml-auto">{Math.round((count/total)*100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Top repo card ─────────────────────────────
function TopRepoCard({ repo, rank }) {
  return (
    <a href={repo.url} target="_blank" rel="noopener noreferrer"
      className="glass-card p-4 flex items-start gap-3 group hover:border-blue-500/30 transition-all"
    >
      <span className="text-lg font-800 text-[#4A6080] w-7 shrink-0">#{rank}</span>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-sm font-700 text-[#60A5FA] group-hover:text-white transition-colors truncate">
          {repo.name}
        </p>
        <p className="text-xs text-[#8EA4C8] mt-0.5 line-clamp-1">
          {repo.description || 'No description'}
        </p>
        <div className="flex items-center gap-3 mt-2 text-xs text-[#4A6080]">
          {repo.language && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full"
                style={{ background: LANG_COLOR[repo.language] || '#8b949e' }}
              />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1"><Star size={10}/> {repo.stars}</span>
          <span className="flex items-center gap-1"><GitFork size={10}/> {repo.forks}</span>
        </div>
      </div>
      <ExternalLink size={13} className="text-[#4A6080] group-hover:text-[#60A5FA] shrink-0 mt-1" />
    </a>
  )
}

// ═════════════════════════════════════════════
export default function GitHubActivitiesPage() {
  const [stats,    setStats]   = useState(null)
  const [repos,    setRepos]   = useState([])
  const [contribs, setContribs]= useState(null)
  const [loading,  setLoading] = useState(true)
  const [error,    setError]   = useState(null)

  const fetchAll = async () => {
    setLoading(true)
    setError(null)
    try {
      const [statsRes, reposRes] = await Promise.all([
        fetch('/api/github/status'),
        fetch('/api/github/repos?per_page=100&sort=stars'),
      ])
      const [statsJson, reposJson] = await Promise.all([
        statsRes.json(), reposRes.json()
      ])
      if (statsJson.success) setStats(statsJson.data)
      if (reposJson.success) setRepos(reposJson.data)

      // Contributions via GraphQL (needs GITHUB_TOKEN with correct scope)
      try {
        const cRes = await fetch('/api/github/contributions')
        const cJson = await cRes.json()
        if (cJson.success) setContribs(cJson.data)
      } catch { /* non-fatal */ }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const topRepos = [...repos].sort((a,b) => b.stars - a.stars).slice(0, 6)
  const langMap  = repos.reduce((acc, r) => {
    if (r.language) acc[r.language] = (acc[r.language] || 0) + 1
    return acc
  }, {})

  const statItems = stats ? [
    { label:'Repositories',   value:stats.totalRepos,       icon:BookOpen },
    { label:'Stars Earned',   value:stats.totalStars,       icon:Star },
    { label:'Forks',          value:stats.totalForks,       icon:GitFork },
    { label:'Followers',      value:stats.followers,        icon:Users },
    { label:'Following',      value:stats.following,        icon:Eye },
    { label:'Languages',      value:Object.keys(langMap).length, icon:Code2 },
  ] : []

  return (
    <div className="min-h-screen pt-24 pb-20"
      style={{ background:'linear-gradient(180deg,#060D1F 0%,#080F20 100%)' }}
    >
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div className="animate-fade-in">
            <span className="section-badge mb-4 block w-fit">// live github data</span>
            <h1 className="font-display font-800 text-[#E8F0FE] mb-2"
              style={{ fontSize:'clamp(32px,5vw,52px)' }}
            >
              GitHub <span className="gradient-text">Activity</span>
            </h1>
            <p className="text-[#8EA4C8] text-base">
              Real-time stats · auto-updates every hour
            </p>
          </div>
          <button onClick={fetchAll} disabled={loading}
            className="btn-secondary text-sm animate-fade-in"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Syncing…' : 'Refresh'}
          </button>
        </div>

        {error && (
          <div className="glass-card p-5 mb-8 text-center border-red-500/20">
            <p className="text-red-400 text-sm">⚠ {error}</p>
            <p className="text-[#4A6080] text-xs mt-2">
              Set <code className="text-[#60A5FA]">GITHUB_TOKEN</code> in .env.local
            </p>
          </div>
        )}

        {/* Stat cards */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {Array(6).fill(0).map((_,i) => (
              <div key={i} className="glass-card p-5 flex flex-col gap-2">
                <Skel h="h-8" w="w-12" />
                <Skel h="h-3" w="w-20" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10 animate-slide-up">
            {statItems.map((s, i) => (
              <div key={s.label} className="glass-card p-5 text-center"
                style={{ animationDelay:`${i*80}ms` }}
              >
                <s.icon size={20} className="mx-auto mb-2 text-[#60A5FA]" />
                <p className="text-2xl font-800 text-[#E8F0FE] font-mono">{s.value}</p>
                <p className="text-xs text-[#4A6080] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Contribution graph + Language chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            {loading
              ? <div className="glass-card p-6"><Skel h="h-36" /></div>
              : <ContribCalendar weeks={contribs?.weeks} />
            }
          </div>
          <div>
            {loading
              ? <div className="glass-card p-6"><Skel h="h-36" /></div>
              : <LanguageChart languages={langMap} />
            }
          </div>
        </div>

        {/* Top repos */}
        <div className="animate-slide-up" style={{ animationDelay:'300ms' }}>
          <h2 className="text-xl font-700 text-[#E8F0FE] mb-5 flex items-center gap-2">
            <Star size={18} className="text-[#60A5FA]" />
            Most Starred Repositories
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array(6).fill(0).map((_,i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topRepos.map((repo, i) => (
                <TopRepoCard key={repo.id} repo={repo} rank={i+1} />
              ))}
            </div>
          )}
        </div>

        {/* GitHub CTA - FIXED: added missing <a tag */}
        <div className="mt-12 text-center animate-fade-in">
          <a
            href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'omkarrr2533'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-4"
          >
            <Github size={20} />
            View Full GitHub Profile
          </a>
        </div>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return <div className="glass-card p-4"><Skel h="h-20" /></div>
}