'use client'

import Link from 'next/link'
import { ExternalLink, Github, Clock, Code } from 'lucide-react'

export default function FeaturedProjects() {
  const featuredProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.',
      techStack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/yourusername/project1',
      buildTime: '3 months',
      image: '/images/projects/project1.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'AI Chat Application',
      description: 'Real-time chat application with AI-powered responses, file sharing, and group conversations.',
      techStack: ['React', 'Socket.io', 'OpenAI', 'PostgreSQL'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/yourusername/project2',
      buildTime: '2 months',
      image: '/images/projects/project2.jpg',
      featured: true
    },
    {
      id: 3,
      title: 'Portfolio Dashboard',
      description: 'Analytics dashboard for tracking portfolio performance with interactive charts and real-time data.',
      techStack: ['Vue.js', 'Firebase', 'Chart.js', 'Tailwind'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/yourusername/project3',
      buildTime: '1.5 months',
      image: '/images/projects/project3.jpg',
      featured: true
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-blue-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent works that showcase my skills and passion for development
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-primary-500 to-blue-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code className="w-20 h-20 text-white/20" />
                </div>
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {project.buildTime}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 animate-fade-in">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            View All Projects
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}