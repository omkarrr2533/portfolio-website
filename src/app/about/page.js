'use client'

import { Code, Lightbulb, Rocket, Heart, Award, BookOpen } from 'lucide-react'

export default function AboutPage() {
  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Company Inc.',
      period: '2022 - Present',
      description: 'Leading development of enterprise web applications using modern tech stack. Mentoring junior developers and architecting scalable solutions.'
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup XYZ',
      period: '2020 - 2022',
      description: 'Built and maintained multiple client projects. Worked with React, Node.js, and cloud services.'
    },
    {
      title: 'Junior Developer',
      company: 'Digital Agency',
      period: '2019 - 2020',
      description: 'Started my professional journey building responsive websites and learning best practices.'
    }
  ]

  const values = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, well-documented code that others can easily understand and build upon.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Always exploring new technologies and approaches to solve problems more efficiently.'
    },
    {
      icon: Rocket,
      title: 'Performance',
      description: 'Optimizing applications for speed and efficiency to provide the best user experience.'
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Putting users first in every design and development decision I make.'
    }
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Learn more about my journey, skills, and what drives me as a developer
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Profile Image */}
          <div className="lg:col-span-1 animate-slide-up">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
                <div className="w-full aspect-square bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-6xl font-bold mb-6">
                  YN
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Name</h2>
                <p className="text-blue-600 font-semibold mb-4">Full Stack Developer</p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>📍 Location: Your City, Country</p>
                  <p>💼 Experience: 5+ years</p>
                  <p>🎓 Education: Computer Science</p>
                  <p>🌐 Languages: English, Hindi</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="lg:col-span-2 space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                My Story
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Hi! I'm a passionate full-stack developer with over 5 years of experience building web applications. 
                  My journey into tech started when I built my first website in college, and I've been hooked ever since.
                </p>
                <p>
                  I love transforming complex problems into simple, beautiful, and intuitive solutions. When I'm not coding, 
                  you'll find me exploring new technologies, contributing to open source, or sharing my knowledge through 
                  blog posts and mentoring.
                </p>
                <p>
                  I believe in continuous learning and staying up-to-date with the latest industry trends. My goal is to 
                  create impactful software that makes a difference in people's lives.
                </p>
              </div>
            </div>

            {/* Values */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What I Value</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div
                    key={value.title}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <value.icon className="w-10 h-10 text-blue-600 mb-4" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Work Experience
          </h2>
          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 pb-12 border-l-2 border-blue-600 last:pb-0">
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white dark:ring-gray-900"></div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow ml-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <span className="text-sm text-blue-600 font-semibold">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-semibold mb-2">
                    {exp.company}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Fun Facts About Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { emoji: '☕', text: 'Coffee enthusiast' },
              { emoji: '🎮', text: 'Gamer in free time' },
              { emoji: '📚', text: 'Avid reader' },
              { emoji: '🎵', text: 'Music lover' }
            ].map((fact, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="text-5xl mb-3">{fact.emoji}</div>
                <p className="text-gray-900 dark:text-white font-semibold">{fact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}