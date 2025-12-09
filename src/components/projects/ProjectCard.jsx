'use client'

import { ExternalLink, Github, Clock, Code } from 'lucide-react'

export default function ProjectCard({ project, index = 0 }) {
  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Project Header */}
      <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <Code className="w-20 h-20 text-white/20" />
        <div className="absolute top-4 right-4 flex gap-2">
          {project.stars && (
            <span className="bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full text-xs font-semibold">
              ⭐ {project.stars}
            </span>
          )}
          {project.forks && (
            <span className="bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full text-xs font-semibold">
              🔱 {project.forks}
            </span>
          )}
        </div>
        {project.buildTime && (
          <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {project.buildTime}
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
          {project.name || project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.techStack && (
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
}