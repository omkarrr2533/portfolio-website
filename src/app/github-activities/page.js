'use client'

import { useState, useEffect } from 'react'
import {
  Github, Star, GitFork, GitPullRequest, Eye,
  TrendingUp, Code2, Users, RefreshCw, ExternalLink,
  Award, CheckCircle, Clock, BookOpen,
} from 'lucide-react'

const LANG_COLOR = {
  JavaScript:'#F1E05A', TypeScript:'#3178C6', Python:'#3572A5',
  Java:'#B07219', Go:'#00ADD8', Ruby:'#701516', CSS:'#563D7C',
  HTML:'#E34C26', 'C++':'#F34B7D', C:'#555555', Rust:'#DEA584',
}

const Skel = ({ h='h-4', w='w-full', className='' }) => (
  <div className={`skeleton ${h} ${w} rounded ${className}`} />
)

// ── Contribution calendar ────────────────────────
function ContribCalendar({ weeks, total }) {
  const mock = !weeks?.length
  const data = mock
    ? Array.from({ length: 52 }, () => ({
        contributionDays: Array.from({ length: 7 }, () => ({
          contributionCount: Math.floor(Math.random() * 8), date: ''
        }))
      }))
    : weeks

  const level = (n) => n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : 4
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-700 text-[#E8F0FE] flex items-center gap-2">
          <TrendingUp size={18} className="text-[#60A5FA]" />
          Contribution Activity
        </h2>
        {total > 0 && (
          <span className="text-sm font-mono text-[#34D399]">{total} total</span>
        )}
      </div>
      {mock && <p className="text-xs text-[#4A6080] font-mono mb-3">⚠ Mock data — add GITHUB_TOKEN for live graph</p>}
      <div className="scroll-x pb-2">
        <div className="flex gap-1 min-w-max">
          {data.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.contributionDays.map((day, di) => (
                <div key={di}
                  className={`contrib-cell contrib-${level(day.contributionCount)}`}
                  title={`${day.date || 'date'}: ${day.contributionCount} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs text-[#4A6080]">
        <span>Less</span>
        {[0,1,2,3,4].map(l => <div key={l} className={`contrib-cell contrib-${l}`} />)}
        <span>More</span>
      </div>
    </div>
  )
}

// ── Language bar ─────────────────────────────────
function LanguageChart({ languages }) {
  const entries = Object.entries(languages).sort(([,a],[,b]) => b-a).slice(0,8)
  const total = entries.reduce((s,[,v]) => s+v, 0)
  if (!entries.length) return null
  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-700 text-[#E8F0FE] mb-5 flex items-center gap-2">
        <Code2 size={18} className="text-[#60A5FA]" /> Languages Used
      </h2>
      <div className="flex h-3 rounded-full overflow-hidden mb-5 gap-0.5">
        {entries.map(([lang, count]) => (
          <div key={lang} style={{ width:`${(count/total)*100}%`, background: LANG_COLOR[lang]||'#8b949e' }}
            title={`${lang}: ${count} repos`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-y-2">
        {entries.map(([lang, count]) => (
          <div key={lang} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: LANG_COLOR[lang]||'#8b949e' }} />
            <span className="text-xs text-[#8EA4C8] font-mono">{lang}</span>
            <span className="text-xs text-[#4A6080] ml-auto">{Math.round((count/total)*100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Merged PR card ───────────────────────────────
function PRCard({ pr, index }) {
  const repo = pr.repo
  const repoName = repo.split('/')[1] || repo
  const owner = repo.split('/')[0] || ''
  const timeAgo = (() => {
    const d = Math.floor((Date.now() - new Date(pr.updatedAt)) / 86400000)
    return d === 0 ? 'today' : d === 1 ? 'yesterday' : d < 30 ? `${d}d ago` : `${Math.floor(d/30)}mo ago`
  })()

  return (
    <a href={pr.url} target="_blank" rel="noopener noreferrer"
      className="glass-card p-4 group hover:border-green-500/30 transition-all block animate-slide-up"
      style={{ animationDelay: `${index*60}ms`, animationFillMode:'both' }}
    >
      <div className="flex items-start gap-3">
        <CheckCircle size={15} className="text-[#10B981] shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-600 text-[#E8F0FE] group-hover:text-white line-clamp-2 mb-1">{pr.title}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <a href={pr.repoUrl} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-xs font-mono text-[#60A5FA] hover:text-white transition-colors"
            >
              {owner}/{repoName}
            </a>
            <span className="text-xs text-[#4A6080] flex items-center gap-1">
              <Clock size={10} /> {timeAgo}
            </span>
          </div>
          {pr.labels.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {pr.labels.slice(0,3).map(l => (
                <span key={l.name} className="text-xs px-2 py-0.5 rounded-full font-mono"
                  style={{ background:`#${l.color}22`, color:`#${l.color}`, border:`1px solid #${l.color}44` }}>
                  {l.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <ExternalLink size={12} className="text-[#4A6080] group-hover:text-[#60A5FA] shrink-0" />
      </div>
    </a>
  )
}

// ── Top repo card ────────────────────────────────
function TopRepoCard({ repo, rank }) {
  return (
    <a href={repo.url} target="_blank" rel="noopener noreferrer"
      className="glass-card p-4 flex items-start gap-3 group hover:border-blue-500/30 transition-all"
    >
      <span className="text-lg font-800 text-[#4A6080] w-7 shrink-0">#{rank}</span>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-sm font-700 text-[#60A5FA] group-hover:text-white truncate">{repo.name}</p>
        <p className="text-xs text-[#8EA4C8] mt-0.5 line-clamp-1">{repo.description || 'No description'}</p>
        <div className="flex items-center gap-3 mt-2 text-xs text-[#4A6080]">
          {repo.language && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: LANG_COLOR[repo.language]||'#8b949e' }} />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1"><Star size={10}/>{repo.stars}</span>
          <span className="flex items-center gap-1"><GitFork size={10}/>{repo.forks}</span>
        </div>
      </div>
      <ExternalLink size={13} className="text-[#4A6080] group-hover:text-[#60A5FA] shrink-0" />
    </a>
  )
}

// ═══════════════════════════════════════════════
export default function GitHubActivitiesPage() {
  const [stats, setStats]       = useState(null)
  const [repos, setRepos]       = useState([])
  const [contribs, setContribs] = useState(null)
  const [prs, setPrs]           = useState({ total: 0, items: [] })
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  const fetchAll = async () => {
    setLoading(true)
    setError(null)
    try {
      const [statsRes, reposRes, prsRes] = await Promise.all([
        fetch('/api/github/status'),
        fetch('/api/github/repos?per_page=100&sort=stars'),
        fetch('/api/github/prs'),
      ])
      const [st, rp, pr] = await Promise.all([
        statsRes.json(), reposRes.json(), prsRes.json()
      ])
      if (st.success) setStats(st.data)
      if (rp.success) setRepos(rp.data)
      if (pr.success) setPrs({ total: pr.total, items: pr.items || [] })

      try {
        const cRes = await fetch('/api/github/contributions')
        const cJson = await cRes.json()
        if (cJson.success) setContribs(cJson.data)
      } catch {}
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const topRepos = [...repos].sort((a,b) => b.stars - a.stars).slice(0, 8)
  const langMap  = repos.reduce((acc, r) => {
    if (r.language) acc[r.language] = (acc[r.language]||0)+1
    return acc
  }, {})

  const statItems = stats ? [
    { label:'Repositories', value:stats.totalRepos,   icon:BookOpen,  accent:'#3B82F6' },
    { label:'Stars',        value:stats.totalStars,   icon:Star,      accent:'#F59E0B' },
    { label:'Forks',        value:stats.totalForks,   icon:GitFork,   accent:'#10B981' },
    { label:'Followers',    value:stats.followers,    icon:Users,     accent:'#8B5CF6' },
    { label:'Open Source',  value:prs.total||'—',    icon:GitPullRequest, accent:'#34D399' },
    { label:'Languages',    value:Object.keys(langMap).length, icon:Code2, accent:'#06B6D4' },
  ] : []

  const TABS = ['overview', 'contributions', 'repositories']

  return (
    <div className="min-h-screen pt-24 pb-20"
      style={{ background:'linear-gradient(180deg,#060D1F 0%,#080F20 100%)' }}>
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div className="animate-fade-in">
            <span className="section-badge mb-3 block w-fit">// live · auto-refresh</span>
            <h1 className="font-display font-800 text-[#E8F0FE] mb-2"
              style={{ fontSize:'clamp(32px,5vw,52px)' }}>
              GitHub <span className="gradient-text">Activity</span>
            </h1>
            <p className="text-[#8EA4C8] text-sm font-mono">
              Real-time data from GitHub API · contributions, repos & open source PRs
            </p>
          </div>
          <button onClick={fetchAll} disabled={loading} className="btn-secondary text-sm">
            <RefreshCw size={14} className={loading ? 'animate-spin':''} />
            {loading ? 'Syncing…':'Refresh'}
          </button>
        </div>

        {error && (
          <div className="glass-card p-5 mb-6 text-center" style={{ borderColor:'rgba(239,68,68,0.2)' }}>
            <p className="text-red-400 text-sm">⚠ {error} — Set GITHUB_TOKEN in .env.local</p>
          </div>
        )}

        {/* Stat grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {Array(6).fill(0).map((_,i) => <div key={i} className="glass-card p-5"><Skel h="h-10" /></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 animate-slide-up">
            {statItems.map((s,i) => (
              <div key={s.label} className="glass-card p-5 text-center" style={{ animationDelay:`${i*60}ms` }}>
                <s.icon size={20} className="mx-auto mb-2" style={{ color:s.accent }} />
                <p className="text-2xl font-800 text-[#E8F0FE] font-mono">{s.value}</p>
                <p className="text-xs text-[#4A6080] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl w-fit"
          style={{ background:'rgba(15,26,46,0.8)', border:'1px solid rgba(99,120,162,0.15)' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className="px-4 py-2 rounded-lg text-sm font-600 transition-all capitalize"
              style={{
                background: activeTab===t ? 'rgba(59,130,246,0.15)':'transparent',
                color: activeTab===t ? '#60A5FA':'#8EA4C8',
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {loading ? <div className="glass-card p-6"><Skel h="h-40" /></div>
                  : <ContribCalendar weeks={contribs?.weeks} total={contribs?.totalContributions} />}
              </div>
              <div>
                {loading ? <div className="glass-card p-6"><Skel h="h-40" /></div>
                  : <LanguageChart languages={langMap} />}
              </div>
            </div>

            {/* Top repos preview */}
            <div>
              <h2 className="text-lg font-700 text-[#E8F0FE] mb-4 flex items-center gap-2">
                <Star size={16} className="text-[#F59E0B]" /> Most Starred
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topRepos.slice(0,4).map((r,i) => <TopRepoCard key={r.id} repo={r} rank={i+1} />)}
              </div>
            </div>

            {/* Open source PR preview */}
            {prs.items.length > 0 && (
              <div>
                <h2 className="text-lg font-700 text-[#E8F0FE] mb-4 flex items-center gap-2">
                  <GitPullRequest size={16} className="text-[#34D399]" />
                  Open Source Contributions
                  <span className="text-xs font-mono text-[#4A6080]">({prs.total} merged PRs)</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {prs.items.slice(0,4).map((pr,i) => <PRCard key={pr.id} pr={pr} index={i} />)}
                </div>
                {prs.total > 4 && (
                  <button onClick={() => setActiveTab('contributions')}
                    className="mt-4 text-xs text-[#60A5FA] font-mono hover:text-white transition-colors">
                    View all {prs.total} merged PRs →
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── CONTRIBUTIONS TAB ── */}
        {activeTab === 'contributions' && (
          <div className="space-y-6">
            <ContribCalendar weeks={contribs?.weeks} total={contribs?.totalContributions} />

            {contribs && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label:'Commits', value:contribs.totalCommits||'—', icon:Code2, accent:'#3B82F6' },
                  { label:'Pull Requests', value:contribs.totalPRs||'—', icon:GitPullRequest, accent:'#10B981' },
                  { label:'Issues', value:contribs.totalIssues||'—', icon:Award, accent:'#F59E0B' },
                ].map(s => (
                  <div key={s.label} className="glass-card p-5 flex items-center gap-4">
                    <s.icon size={24} style={{ color:s.accent }} />
                    <div>
                      <p className="text-xl font-800 text-[#E8F0FE] font-mono">{s.value}</p>
                      <p className="text-xs text-[#4A6080]">{s.label} this year</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div>
              <h2 className="text-lg font-700 text-[#E8F0FE] mb-4 flex items-center gap-2">
                <CheckCircle size={16} className="text-[#34D399]" />
                Merged PRs in Open Source
                {prs.total > 0 && <span className="section-badge ml-2">{prs.total} total</span>}
              </h2>
              {prs.items.length === 0 ? (
                <div className="glass-card p-8 text-center text-[#4A6080]">
                  <GitPullRequest size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="font-mono text-sm">No open source PRs found yet — or GITHUB_TOKEN needed</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {prs.items.map((pr,i) => <PRCard key={pr.id} pr={pr} index={i} />)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── REPOSITORIES TAB ── */}
        {activeTab === 'repositories' && (
          <div className="space-y-6">
            <LanguageChart languages={langMap} />
            <div>
              <h2 className="text-lg font-700 text-[#E8F0FE] mb-4 flex items-center gap-2">
                <Star size={16} className="text-[#F59E0B]" /> All Repositories by Stars
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topRepos.map((r,i) => <TopRepoCard key={r.id} repo={r} rank={i+1} />)}
              </div>
            </div>
          </div>
        )}

        {/* GitHub profile CTA */}
        <div className="mt-12 text-center">
          <a href="https://github.com/omkarrr2533" target="_blank" rel="noopener noreferrer"
            className="btn-primary text-sm px-8 py-3">
            <Github size={18} /> View Full GitHub Profile
          </a>
        </div>

      </div>
    </div>
  )
}