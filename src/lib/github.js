// GitHub API utility functions

const GITHUB_API = 'https://api.github.com'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME

/**
 * Fetch user profile information
 */
export async function getGitHubProfile() {
  try {
    const response = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
      headers: {
        Authorization: GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : '',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) throw new Error('Failed to fetch GitHub profile')
    
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
    }
  } catch (error) {
    console.error('Error fetching GitHub profile:', error)
    return null
  }
}

/**
 * Fetch user's repositories
 */
export async function getGitHubRepos(options = {}) {
  const { 
    sort = 'updated', 
    per_page = 100,
    type = 'owner' 
  } = options

  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=${sort}&per_page=${per_page}&type=${type}`,
      {
        headers: {
          Authorization: GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : '',
          'Content-Type': 'application/json',
        },
        next: { revalidate: 1800 } // Cache for 30 minutes
      }
    )

    if (!response.ok) throw new Error('Failed to fetch repositories')
    
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
    }))
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}

/**
 * Fetch repository details with additional info
 */
export async function getRepoDetails(repoName) {
  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}`,
      {
        headers: {
          Authorization: GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : '',
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }
      }
    )

    if (!response.ok) throw new Error('Failed to fetch repo details')
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching repo details:', error)
    return null
  }
}

/**
 * Fetch user's contribution data
 */
export async function getGitHubContributions() {
  // Note: GitHub doesn't provide a direct API for contribution graph
  // You would need to use GitHub GraphQL API for this
  // For now, returning mock data structure
  
  try {
    const query = `
      query($userName: String!) {
        user(login: $userName) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { userName: GITHUB_USERNAME }
      }),
      next: { revalidate: 86400 } // Cache for 24 hours
    })

    if (!response.ok) throw new Error('Failed to fetch contributions')
    
    const result = await response.json()
    return result.data?.user?.contributionsCollection?.contributionCalendar
  } catch (error) {
    console.error('Error fetching contributions:', error)
    return null
  }
}

/**
 * Fetch user's GitHub stats
 */
export async function getGitHubStats() {
  try {
    const [profile, repos] = await Promise.all([
      getGitHubProfile(),
      getGitHubRepos()
    ])

    if (!profile || !repos) return null

    const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0)
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks, 0)
    
    // Get language statistics
    const languages = {}
    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1
      }
    })

    return {
      totalRepos: repos.length,
      totalStars,
      totalForks,
      followers: profile.followers,
      following: profile.following,
      languages,
      publicRepos: profile.publicRepos,
    }
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    return null
  }
}

/**
 * Get pinned repositories (featured projects)
 */
export async function getPinnedRepos() {
  try {
    const repos = await getGitHubRepos({ sort: 'updated', per_page: 6 })
    
    // Filter repositories by stars or manually specify pinned repos
    return repos
      .filter(repo => !repo.isFork) // Exclude forked repos
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 6)
  } catch (error) {
    console.error('Error fetching pinned repos:', error)
    return []
  }
}

/**
 * Search repositories
 */
export async function searchRepos(query) {
  try {
    const response = await fetch(
      `${GITHUB_API}/search/repositories?q=user:${GITHUB_USERNAME}+${query}`,
      {
        headers: {
          Authorization: GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : '',
          'Content-Type': 'application/json',
        },
        next: { revalidate: 1800 }
      }
    )

    if (!response.ok) throw new Error('Failed to search repositories')
    
    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error('Error searching repos:', error)
    return []
  }
}

/**
 * Get repository languages breakdown
 */
export async function getRepoLanguages(repoName) {
  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      {
        headers: {
          Authorization: GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : '',
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }
      }
    )

    if (!response.ok) throw new Error('Failed to fetch languages')
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching repo languages:', error)
    return {}
  }
}