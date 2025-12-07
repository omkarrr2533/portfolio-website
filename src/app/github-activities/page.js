'use client'

import { useState, useEffect } from 'react'
import { Github, Star, GitFork, Eye, TrendingUp, Calendar, Code2 } from 'lucide-react'

export default function GitHubActivitiesPage() {
  const [stats, setStats] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  // Sample data (will be replaced with real GitHub API)
  const sampleStats = {
    totalRepos: 45,
    totalStars: 324,
    totalForks: 89,
    totalContributions: 1247,
    followers: 156,
    following: 78
  }

  const sampleRepos = [
    {
      id: 1,
      name: 'awesome-web-dev',
      description: 'A curated list of awesome web development resources',
      language: 'JavaScript',
      stars: 123,
      forks: 45,
      updatedAt: '2024-01-15',
      url: 'https://github.com/yourusername/awesome-web-dev'
    },
    {
      id: 2,
      name: 'react-dashboard',
      description: 'Modern dashboard built with React and Tailwind CSS',
      language: 'TypeScript',
      stars: 89,
      forks: 23,
      updatedAt: '2024-01-10',
      url: 'https://github.com/yourusername/react-dashboard'
    },
    {
      id: 3,
      name: 'api-generator',
      description: 'CLI tool to generate REST API boilerplate code',
      language: 'Python',
      stars: 67,
      forks: 12,
      updatedAt: '2024-01-05',
      url: 'https://github.com/yourusername/api-generator'
    },
    {
      id: 4,
      name: 'portfolio-website',
      description: 'My personal portfolio website',
      language: 'JavaScript',
      stars: 45,
      forks: 8,
      updatedAt: '2024-01-20',
      url: 'https://github.com/yourusername/portfolio-website'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(sampleStats)
      setRepos(sampleRepos)
      setLoading(false)
    }, 1000)
  }, [])

  const languageColors = {
    JavaScript: 'bg-yellow-500',
    TypeScript: 'bg-blue-500',
    Python: 'bg-green-500',
    Java: 'bg-red-500',
    Go: 'bg-cyan-500'
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <Github className="w-16 h-16 text-gray-900 dark:text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GitHub Activities
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            My contributions, repositories, and open source involvement
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 animate-slide-up">
              {[
                { label: 'Repositories', value: stats.totalRepos, icon: Code2 },
                { label: 'Stars', value: stats.totalStars, icon: Star },
                { label: 'Forks', value: stats.totalForks, icon: GitFork },
                { label: 'Contributions', value: stats.totalContributions, icon: TrendingUp },
                { label: 'Followers', value: stats.followers, icon: Eye },
                { label: 'Following', value: stats.following, icon: Github }
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Contribution Graph Placeholder */}
            <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Contribution Activity
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <div className="grid grid-cols-12 gap-2">
                  {Array.from({ length: 365 }).map((_, i) => {
                    const intensity = Math.floor(Math.random() * 5)
                    const colors = [
                      'bg-gray-100 dark:bg-gray-700',
                      'bg-green-200 dark:bg-green-900',
                      'bg-green-300 dark:bg-green-700',
                      'bg-green-400 dark:bg-green-600',
                      'bg-green-500 dark:bg-green-500'
                    ]
                    return (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-sm ${colors[intensity]} hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer`}
                        title={`${intensity} contributions`}
                      />
                    )
                  })}
                </div>
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-sm ${
                          ['bg-gray-100 dark:bg-gray-700', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500'][i]
                        }`}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Popular Repositories */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Popular Repositories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {repos.map((repo, index) => (
                  <a
                    key={repo.id}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors flex items-center gap-2">
                        <Code2 className="w-5 h-5" />
                        {repo.name}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {repo.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${languageColors[repo.language] || 'bg-gray-500'}`}></div>
                        <span>{repo.language}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span>{repo.forks}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(repo.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}