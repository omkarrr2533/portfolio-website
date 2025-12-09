'use client'

import { X, ExternalLink, Github, Calendar, Clock } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
          <div className="flex items-center gap-4 text-white/80">
            {project.buildTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {project.buildTime}
              </span>
            )}
            {project.startDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(project.startDate).getFullYear()}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Description</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {project.longDescription || project.description}
            </p>
          </div>

          {project.highlights && (
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Key Highlights</h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <span className="text-blue-600 mt-1">✓</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.techStack && (
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <ExternalLink className="w-5 h-5" />
                View Live
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
              >
                <Github className="w-5 h-5" />
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}