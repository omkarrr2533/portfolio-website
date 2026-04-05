// GitHub API utility - fixes GITHUB_USERNAME resolution and adds getLanguageColor
const GITHUB_API = 'https://api.github.com'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
// Fix: use both env vars so API routes (server) and pages (client) both work
const GITHUB_USERNAME =
  process.env.GITHUB_USERNAME ||
  process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
  'omkarrr2533'

const AUTH_HEADERS = () => ({
  Accept: 'application/vnd.github.v3+json',
  ...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}),
})

/** Language → hex color (GitHub standard palette) */
export function getLanguageColor(language) {
  const colors = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
    Java: '#b07219', Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516',
    PHP: '#4F5D95', Swift: '#ffac45', Kotlin: '#A97BFF', CSS: '#563d7c',
    HTML: '#e34c26', Vue: '#41b883', Shell: '#89e051', C: '#555555',
    'C++': '#f34b7d', 'C#': '#178600', Dart: '#00B4AB', R: '#198CE7',
  }
  return colors[language] || '#8b949e'
}

export function getGitHubUsername() {
  return GITHUB_USERNAME
}

export async function getGitHubProfile() {
  try {
    const response = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
      headers: AUTH_HEADERS(),
      next: { revalidate: 3600 },
    })
    if (!response.ok) throw new Error(`GitHub ${response.status}`)
    const data = await response.json()
    return {
      name: data.name,
      bio: data.bio,
      avatar: data.avatar_url,
      followers: data.followers,
      following: data.following,
      publicRepos: data.public_repos,
      location: data.location,
      blog: data.blog,
      twitter: data.twitter_username,
      company: data.company,
      createdAt: data.created_at,
      hireable: data.hireable,
    }
  } catch (error) {
    console.error('getGitHubProfile:', error)
    return null
  }
}

export async function getGitHubRepos(options = {}) {
  const { sort = 'updated', per_page = 100, type = 'owner' } = options
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=${sort}&per_page=${per_page}&type=${type}`,
      { headers: AUTH_HEADERS(), next: { revalidate: 1800 } }
    )
    if (!response.ok) throw new Error(`GitHub ${response.status}`)
    const data = await response.json()
    return data.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      openIssues: repo.open_issues_count,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
      topics: repo.topics || [],
      isPrivate: repo.private,
      isFork: repo.fork,
      size: repo.size,
      defaultBranch: repo.default_branch,
    }))
  } catch (error) {
    console.error('getGitHubRepos:', error)
    return []
  }
}

export async function getGitHubStats() {
  try {
    const [profile, repos] = await Promise.all([
      getGitHubProfile(),
      getGitHubRepos(),
    ])
    if (!profile) return null
    const totalStars = repos.reduce((s, r) => s + r.stars, 0)
    const totalForks = repos.reduce((s, r) => s + r.forks, 0)
    const languages = {}
    repos.forEach(r => {
      if (r.language) languages[r.language] = (languages[r.language] || 0) + 1
    })
    return {
      totalRepos: repos.length,
      totalStars,
      totalForks,
      followers: profile.followers,
      following: profile.following,
      languages,
      publicRepos: profile.publicRepos,
      avatar: profile.avatar,
      name: profile.name,
      bio: profile.bio,
      location: profile.location,
    }
  } catch (error) {
    console.error('getGitHubStats:', error)
    return null
  }
}

export async function getMergedPRs() {
  try {
    // Open source PRs merged in repos not owned by user
    const res = await fetch(
      `${GITHUB_API}/search/issues?q=author:${GITHUB_USERNAME}+type:pr+is:merged+-user:${GITHUB_USERNAME}&sort=updated&per_page=30`,
      { headers: AUTH_HEADERS(), next: { revalidate: 3600 } }
    )
    if (!res.ok) throw new Error(`GitHub ${res.status}`)
    const data = await res.json()
    return {
      total: data.total_count,
      items: data.items.map(pr => ({
        id: pr.id,
        title: pr.title,
        url: pr.html_url,
        repo: pr.repository_url.replace('https://api.github.com/repos/', ''),
        repoUrl: pr.html_url.split('/pull/')[0],
        number: pr.number,
        createdAt: pr.created_at,
        updatedAt: pr.updated_at,
        labels: pr.labels?.map(l => ({ name: l.name, color: l.color })) || [],
      })),
    }
  } catch (error) {
    console.error('getMergedPRs:', error)
    return { total: 0, items: [] }
  }
}