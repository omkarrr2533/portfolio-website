'use client'

import { BookOpen, Code, Trophy, Coffee, Target, Zap, Heart, TrendingUp } from 'lucide-react'

export default function StuffPage() {
  const hobbies = [
    {
      icon: Code,
      title: 'Problem Solving',
      description: 'Active on LeetCode solving DSA and Dynamic Programming problems',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BookOpen,
      title: 'Learning',
      description: 'Constantly learning new technologies in AI/ML and Data Science',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Trophy,
      title: 'Competitive Programming',
      description: 'Participating in coding competitions and hackathons',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Target,
      title: 'Open Source',
      description: 'Contributing to open source projects and building tools',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Coffee,
      title: 'Tech Enthusiast',
      description: 'Exploring latest trends in web development and AI',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Building Projects',
      description: 'Creating scalable solutions with clean, maintainable code',
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const blogPosts = [
    {
      id: 1,
      title: 'Building Scalable REST APIs with Spring Boot',
      excerpt: 'Learn how to build production-ready REST APIs using Spring Boot with best practices for scalability and performance.',
      date: '2024-01-15',
      readTime: '8 min read',
      tags: ['Spring Boot', 'Java', 'REST API']
    },
    {
      id: 2,
      title: 'My Journey with AI/ML and Data Science',
      excerpt: 'Sharing my experience learning AI/ML, completing certifications, and building real-world projects with PyTorch and Pandas.',
      date: '2024-01-10',
      readTime: '6 min read',
      tags: ['AI/ML', 'Data Science', 'Career']
    },
    {
      id: 3,
      title: 'LeetCode Strategy: From Beginner to Advanced',
      excerpt: 'My approach to solving LeetCode problems efficiently, focusing on DSA patterns and Dynamic Programming.',
      date: '2024-01-05',
      readTime: '10 min read',
      tags: ['DSA', 'LeetCode', 'Problem Solving']
    }
  ]

  const favorites = [
    {
      category: 'Favorite Technologies',
      items: ['Spring Boot', 'Python', 'PyTorch', 'PostgreSQL', 'REST APIs', 'Socket.io']
    },
    {
      category: 'Favorite Learning Platforms',
      items: ['LeetCode', 'Nvidia DLI', 'IBM Skills', 'Apna College', 'Code with Harry']
    },
    {
      category: 'Currently Learning',
      items: ['Large Language Models', 'NLP', 'Diffusion Models', 'Advanced Java', 'Data Science']
    },
    {
      category: 'Programming Languages',
      items: ['Java', 'Python', 'C', 'JavaScript', 'Ruby', 'SQL']
    }
  ]

  const achievements = [
    {
      icon: Trophy,
      title: 'Top 5% of College',
      description: 'Outstanding academic performance with 8.11 CGPA',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Code,
      title: '6+ Certifications',
      description: 'Certified in AI/ML, LLMs, NLP, Java, Python, and more',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'LeetCode Active',
      description: 'Regular problem solver focusing on DSA and DP',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Multiple Tech Stacks',
      description: 'Proficient in Java, Python, databases, and AI/ML',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Stuff
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Things I love, achievements, learning journey, and more
          </p>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center animate-slide-up">
            Achievements & Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-4`}>
                  <achievement.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interests & Hobbies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center animate-slide-up">
            Interests & What I Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hobbies.map((hobby, index) => (
              <div
                key={hobby.title}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${hobby.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <hobby.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {hobby.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {hobby.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Recent Thoughts & Articles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Favorites */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            My Favorites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favorites.map((fav) => (
              <div
                key={fav.category}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  {fav.category}
                </h3>
                <ul className="space-y-2">
                  {fav.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Stats */}
        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Fun Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Code, label: 'Programming Languages', value: '5+' },
              { icon: Trophy, label: 'Certifications', value: '6+' },
              { icon: BookOpen, label: 'Tech Stacks Learned', value: '10+' },
              { icon: TrendingUp, label: 'Years Coding', value: '3+' }
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <stat.icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white max-w-3xl">
            <p className="text-2xl font-bold mb-3">
              "Code is like humor. When you have to explain it, it's bad."
            </p>
            <p className="text-white/80">- Cory House</p>
          </div>
        </div>
      </div>
    </div>
  )
}