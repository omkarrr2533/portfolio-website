'use client'

import { useState, useEffect } from 'react'
import {
  Github, Star, GitFork, GitPullRequest, Eye,
  TrendingUp, Code2, Users, RefreshCw, ExternalLink,
  Award, CheckCircle, Clock, BookOpen, Activity,
  GitCommit, GitBranch, Zap, Globe, Lock,
} from 'lucide-react'

const LANG_COLOR = {
  JavaScript: '#F1E05A', TypeScript: '#3178C6', Python: '#3572A5',
  Java: '#B07219', Go: '#00ADD8', Ruby: '#701516', CSS: '#563D7C',
  HTML: '#E34C26', 'C++': '#F34B7D', C: '#555555', Rust: '#DEA584',
}

const Skel = ({ h = 'h-4', w = 'w-full', className = '' }) => (
  <div className={`skeleton ${h} ${w} rounded ${className}`} />
)

// ── Contribution calendar ────────────────────────
function ContribCalendar({ weeks, total }) {
  const mock = !weeks?.length
  const data = mock
    ? Array.from({ length: 52 }, () => ({
        contributionDays: Array.from({ length: 7 }, (_, d) => ({
          contributionCount: Math.floor(Math.random() * (d % 3 === 0 ? 2 : 8)),
          date: '',
        }))
      }))
    : weeks

  const level = (n) => n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : 4

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-700 text-[#E8F0FE] flex items-center gap-2">
          <Activity size={18} className="text-[#60A5FA]" />
          Contribution Activity
        </h2>
        {total > 0 && (
          <span className="text-sm font-mono text-[#34D399] font-700">{total.toLocaleString()} contributions</span>
        )}
      </div>
      {mock && <p className="text-xs text-[#4A6080] font-mono mb-3">⚠ Add GITHUB_TOKEN for live data</p>}
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
        {[0, 1, 2, 3, 4].map(l => <div key={l} className={`contrib-cell contrib-${l}`} />)}
        <span>More</span>
      </div>
    </div>
  )
}

// ── Language bar chart ───────────────────────────
function LanguageChart({ languages }) {
  const entries = Object.entries(languages).sort(([, a], [, b]) => b - a).slice(0, 8)
  const total = entries.reduce((s, [, v]) => s + v, 0)
  if (!entries.length) return null

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-700 text-[#E8F0FE] mb-5 flex items-center gap-2">
        <Code2 size={18} className="text-[#60A5FA]" /> Languages
      </h2>
      <div className="flex h-3 rounded-full overflow-hidden mb-5 gap-0.5">
        {entries.map(([lang, count]) => (
          <div key={lang}
            style={{ width: `${(count / total) * 100}%`, background: LANG_COLOR[lang] || '#8b949e' }}
            title={`${lang}: ${count} repos`}
          />
        ))}
      </div>
      <div className="space-y-2">
        {entries.map(([lang, count]) => (
          <div key={lang} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: LANG_COLOR[lang] || '#8b949e' }} />
            <span className="text-xs text-[#8EA4C8] font-mono flex-1">{lang}</span>
            <div className="flex-1 h-1.5 rounded-full bg-[#0B1325] overflow-hidden">
              <div className="h-full rounded-full" style={{
                width: `${(count / entries[0][1]) * 100}%`,
                background: LANG_COLOR[lang] || '#8b949e',
                opacity: 0.7,
              }} />
            </div>
            <span className="text-xs text-[#4A6080] font-mono w-10 text-right">
              {Math.round((count / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── PR card ──────────────────────────────────────
function PRCard({ pr, index }) {
  const repo = pr.repo
  const repoName = repo.split('/')[1] || repo
  const owner = repo.split('/')[0] || ''
  const d = Math.floor((Date.now() - new Date(pr.updatedAt)) / 86400000)
  const timeAgo = d === 0 ? 'today' : d === 1 ? 'yesterday' : d < 30 ? `${d}d ago` : `${Math.floor(d / 30)}mo ago`

  return (
    <a href={pr.url} target="_blank" rel="noopener noreferrer"
      className="glass-card p-4 group hover:border-green-500/30 transition-all block animate-slide-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}>
      <div className="flex items-start gap-3">
        <CheckCircle size={15} className="text-[#10B981] shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-600 text-[#E8F0FE] group-hover:text-white line-clamp-2 mb-1">{pr.title}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-[#60A5FA]">{owner}/{repoName}</span>
            <span className="text-xs text-[#4A6080] flex items-center gap-1"><Clock size={10} />{timeAgo}</span>
          </div>
          {pr.labels?.length > 0 && (
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {pr.labels.slice(0, 3).map(l => (
                <span key={l.name} className="text-xs px-1.5 py-0.5 rounded font-mono"
                  style={{ background: `#${l.color}22`, color: `#${l.color}`, border: `1px solid #${l.color}44` }}>
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

// ── Repo card ────────────────────────────────────
function RepoCard({ repo, rank }) {
  const langColor = LANG_COLOR[repo.language] || '#8b949e'
  return (
    <a href={repo.url} target="_blank" rel="noopener noreferrer"
      className="glass-card p-4 flex items-start gap-3 group hover:border-blue-500/30 transition-all">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-800 shrink-0"
        style={{ background: 'rgba(59,130,246,0.1)', color: '#60A5FA' }}>
        #{rank}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-sm font-700 text-[#60A5FA] group-hover:text-white truncate mb-0.5">{repo.name}</p>
        <p className="text-xs text-[#8EA4C8] line-clamp-1 mb-2">{repo.description || 'No description'}</p>
        <div className="flex items-center gap-3 text-xs text-[#4A6080]">
          {repo.language && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: langColor }} />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1"><Star size={10} />{repo.stars}</span>
          <span className="flex items-center gap-1"><GitFork size={10} />{repo.forks}</span>
          {repo.isPrivate ? <Lock size={10} /> : <Globe size={10} />}
        </div>
      </div>
      <ExternalLink size={13} className="text-[#4A6080] group-hover:text-[#60A5FA] shrink-0" />
    </a>
  )
}

// ── Recent activity mock ─────────────────────────
function RecentActivityFeed({ repos }) {
  if (!repos.length) return null
  const sorted = [...repos].sort((a, b) => new Date(b.pushedAt || b.updatedAt) - new Date(a.pushedAt || a.updatedAt))
  const recent = sorted.slice(0, 8)

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-700 text-[#E8F0FE] mb-5 flex items-center gap-2">
        <GitCommit size={18} className="text-[#8B5CF6]" />
        Recent Activity
      </h2>
      <div className="space-y-3">
        {recent.map((repo, i) => {
          const pushed = repo.pushedAt || repo.updatedAt
          const d = Math.floor((Date.now() - new Date(pushed)) / 86400000)
          const timeAgo = d === 0 ? 'today' : d === 1 ? 'yesterday' : d < 30 ? `${d}d ago` : `${Math.floor(d / 30)}mo ago`
          return (
            <div key={repo.id} className="flex items-center gap-3 group">
              <div className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: LANG_COLOR[repo.language] || '#8b949e' }} />
              <GitBranch size={13} className="text-[#4A6080] shrink-0" />
              <a href={repo.url} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-[#60A5FA] hover:text-white transition-colors flex-1 truncate">
                {repo.name}
              </a>
              <span className="text-xs text-[#4A6080] shrink-0">{timeAgo}</span>
              {repo.language && (
                <span className="text-xs text-[#4A6080] shrink-0 hidden sm:block">{repo.language}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Profile card ─────────────────────────────────
function ProfileCard({ stats }) {
  if (!stats) return null
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-5">
        {stats.avatar && (
          <img src={stats.avatar} alt="avatar" className="w-12 h-12 rounded-xl" />
        )}
        <div>
          <h3 className="font-700 text-[#E8F0FE]">{stats.name || 'GitHub Profile'}</h3>
          {stats.bio && <p className="text-xs text-[#8EA4C8] mt-0.5 line-clamp-1">{stats.bio}</p>}
          {stats.location && (
            <p className="text-xs text-[#4A6080] mt-0.5 flex items-center gap-1">
              <Globe size={10} />{stats.location}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Repositories', value: stats.totalRepos, icon: BookOpen, accent: '#3B82F6' },
          { label: 'Followers', value: stats.followers, icon: Users, accent: '#8B5CF6' },
          { label: 'Following', value: stats.following, icon: Users, accent: '#06B6D4' },
          { label: 'Stars', value: stats.totalStars, icon: Star, accent: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="p-3 rounded-lg text-center"
            style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <s.icon size={14} className="mx-auto mb-1" style={{ color: s.accent }} />
            <div className="text-base font-800 font-mono text-[#E8F0FE]">{s.value}</div>
            <div className="text-xs text-[#4A6080]">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Not configured banner ────────────────────────
function NotConfiguredBanner() {
  return (
    <div className="glass-card p-8 text-center" style={{ borderColor: 'rgba(245,158,11,0.2)' }}>
      <Github size={40} className="text-[#4A6080] mx-auto mb-4 opacity-50" />
      <h3 className="text-lg font-700 text-[#E8F0FE] mb-2">GitHub Not Connected</h3>
      <p className="text-[#8EA4C8] text-sm mb-4">Add your GitHub credentials to see live stats</p>
      <div className="bg-slate-800 rounded-lg p-4 text-left font-mono text-xs max-w-sm mx-auto">
        <div className="text-[#4A6080] mb-1"># .env.local</div>
        <div className="text-[#34D399]">GITHUB_USERNAME=<span className="text-[#60A5FA]">omkarrr2533</span></div>
        <div className="text-[#34D399]">GITHUB_TOKEN=<span className="text-[#60A5FA]">ghp_your_token_here</span></div>
      </div>
      <p className="text-xs text-[#4A6080] mt-3 font-mono">
        Get token at github.com/settings/tokens (needs repo, user scopes)
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════
export default function GitHubActivitiesPage() {
  const [stats, setStats] = useState(null)
  const [repos, setRepos] = useState([])
  const [contribs, setContribs] = useState(null)
  const [prs, setPrs] = useState({ total: 0, items: [] })
  const [loading, setLoading] = useState(true)
  const [githubConfigured, setGithubConfigured] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [statsRes, reposRes, prsRes] = await Promise.all([
        fetch('/api/github/status'),
        fetch('/api/github/repos?per_page=100&sort=stars'),
        fetch('/api/github/prs'),
      ])
      const [st, rp, pr] = await Promise.all([statsRes.json(), reposRes.json(), prsRes.json()])

      if (st.success && st.data) {
        setStats(st.data)
        setGithubConfigured(true)
      } else {
        setGithubConfigured(false)
      }
      if (rp.success && rp.data?.length) setRepos(rp.data)
      if (pr.success) setPrs({ total: pr.total || 0, items: pr.items || [] })

      try {
        const cRes = await fetch('/api/github/contributions')
        const cJson = await cRes.json()
        if (cJson.success) setContribs(cJson.data)
      } catch {}
    } catch {
      setGithubConfigured(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const topRepos = [...repos].sort((a, b) => b.stars - a.stars).slice(0, 10)
  const langMap = repos.reduce((acc, r) => {
    if (r.language) acc[r.language] = (acc[r.language] || 0) + 1
    return acc
  }, {})

  const statItems = stats ? [
    { label: 'Repositories', value: stats.totalRepos, icon: BookOpen, accent: '#3B82F6' },
    { label: 'Stars Earned', value: stats.totalStars, icon: Star, accent: '#F59E0B' },
    { label: 'Forks', value: stats.totalForks, icon: GitFork, accent: '#10B981' },
    { label: 'Followers', value: stats.followers, icon: Users, accent: '#8B5CF6' },
    { label: 'OSS PRs Merged', value: prs.total || '—', icon: GitPullRequest, accent: '#34D399' },
    { label: 'Languages', value: Object.keys(langMap).length, icon: Code2, accent: '#06B6D4' },
  ] : []

  const TABS = ['overview', 'contributions', 'repositories']

  return (
    <div className="min-h-screen pt-24 pb-20"
      style={{ background: '#F8FAFC' }}>
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div className="animate-fade-in">
            <span className="section-badge mb-3 block w-fit">// github stats · live</span>
            <h1 className="font-display font-800 text-[#E8F0FE] mb-2"
              style={{ fontSize: 'clamp(32px,5vw,52px)' }}>
              GitHub <span className="gradient-text">Activity</span>
            </h1>
            <p className="text-[#8EA4C8] text-sm font-mono">
              Contributions, repositories, open source PRs & more
            </p>
          </div>
          <button onClick={fetchAll} disabled={loading} className="btn-secondary text-sm">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Syncing…' : 'Refresh'}
          </button>
        </div>

        {/* Not configured */}
        {!loading && !githubConfigured && (
          <div className="mb-8"><NotConfiguredBanner /></div>
        )}

        {/* Stat grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="glass-card p-5"><Skel h="h-10" /></div>
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 animate-slide-up">
            {statItems.map((s, i) => (
              <div key={s.label} className="glass-card p-5 text-center hover:border-blue-500/20 transition-colors"
                style={{ animationDelay: `${i * 60}ms` }}>
                <s.icon size={20} className="mx-auto mb-2" style={{ color: s.accent }} />
                <p className="text-2xl font-800 text-[#E8F0FE] font-mono">{s.value}</p>
                <p className="text-xs text-[#4A6080] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        ) : null}

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl w-fit"
          style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className="px-4 py-2 rounded-lg text-sm font-600 transition-all capitalize"
              style={{
                background: activeTab === t ? '#EEF2FF' : 'transparent',
                color: activeTab === t ? '#4F46E5' : '#475569',
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Contribution graph */}
            <ContribCalendar weeks={contribs?.weeks} total={contribs?.totalContributions} />

            {/* Two column: languages + profile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.keys(langMap).length > 0
                ? <LanguageChart languages={langMap} />
                : <div className="glass-card p-6"><Skel h="h-40" /></div>
              }
              <ProfileCard stats={stats} />
            </div>

            {/* Top repos */}
            {topRepos.length > 0 && (
              <div>
                <h2 className="text-lg font-700 text-[#E8F0FE] mb-4 flex items-center gap-2">
                  <Star size={16} className="text-[#F59E0B]" /> Most Starred Repositories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {topRepos.slice(0, 4).map((r, i) => <RepoCard key={r.id} repo={r} rank={i + 1} />)}
                </div>
              </div>
            )}

            {/* Recent activity */}
            {repos.length > 0 && <RecentActivityFeed repos={repos} />}

            {/* Open source PRs */}
            {prs.items.length > 0 && (
              <div>
                <h2 className="text-lg font-700 text-[#E8F0FE] mb-4 flex items-center gap-2">
                  <GitPullRequest size={16} className="text-[#34D399]" />
                  Open Source Contributions
                  <span className="section-badge ml-2">{prs.total} merged PRs</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {prs.items.slice(0, 4).map((pr, i) => <PRCard key={pr.id} pr={pr} index={i} />)}
                </div>
                {prs.total > 4 && (
                  <button onClick={() => setActiveTab('contributions')}
                    className="mt-4 text-xs text-[#60A5FA] font-mono hover:text-white transition-colors">
                    View all {prs.total} merged PRs →
                  </button>
                )}
              </div>
            )}

            {!githubConfigured && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ContribCalendar weeks={null} total={0} />
                <div className="space-y-4">
                  <div className="glass-card p-5 text-center">
                    <Award size={24} className="text-[#F59E0B] mx-auto mb-2" />
                    <p className="text-sm font-700 text-[#E8F0FE]">Top 5% Academic Rank</p>
                    <p className="text-xs text-[#4A6080]">8.11 CGPA</p>
                  </div>
                  <div className="glass-card p-5 text-center">
                    <GitPullRequest size={24} className="text-[#34D399] mx-auto mb-2" />
                    <p className="text-sm font-700 text-[#E8F0FE]">Open Source Contributor</p>
                    <p className="text-xs text-[#4A6080]">6+ organisations</p>
                  </div>
                  <div className="glass-card p-5 text-center">
                    <Zap size={24} className="text-[#8B5CF6] mx-auto mb-2" />
                    <p className="text-sm font-700 text-[#E8F0FE]">Multiple Certifications</p>
                    <p className="text-xs text-[#4A6080]">Nvidia, IBM, and more</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── CONTRIBUTIONS ── */}
        {activeTab === 'contributions' && (
          <div className="space-y-6">
            <ContribCalendar weeks={contribs?.weeks} total={contribs?.totalContributions} />

            {contribs && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Commits (year)', value: contribs.totalCommits || '—', icon: GitCommit, accent: '#3B82F6' },
                  { label: 'Pull Requests', value: contribs.totalPRs || '—', icon: GitPullRequest, accent: '#10B981' },
                  { label: 'Issues', value: contribs.totalIssues || '—', icon: Award, accent: '#F59E0B' },
                ].map(s => (
                  <div key={s.label} className="glass-card p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${s.accent}15` }}>
                      <s.icon size={20} style={{ color: s.accent }} />
                    </div>
                    <div>
                      <p className="text-xl font-800 text-[#E8F0FE] font-mono">{s.value}</p>
                      <p className="text-xs text-[#4A6080]">{s.label}</p>
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
                  <p className="font-mono text-sm">Connect GitHub to see your merged PRs</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {prs.items.map((pr, i) => <PRCard key={pr.id} pr={pr} index={i} />)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── REPOSITORIES ── */}
        {activeTab === 'repositories' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.keys(langMap).length > 0 && <LanguageChart languages={langMap} />}
              {repos.length > 0 && <RecentActivityFeed repos={repos} />}
            </div>

            <div>
              <h2 className="text-lg font-700 text-[#E8F0FE] mb-4 flex items-center gap-2">
                <Star size={16} className="text-[#F59E0B]" /> All Repositories
                <span className="section-badge ml-2">{repos.length}</span>
              </h2>
              {topRepos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {topRepos.map((r, i) => <RepoCard key={r.id} repo={r} rank={i + 1} />)}
                </div>
              ) : (
                <div className="glass-card p-8 text-center text-[#4A6080]">
                  <Code2 size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="font-mono text-sm">Connect GitHub to see your repositories</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile CTA */}
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