'use client'

import { Award, ExternalLink, Calendar, Building } from 'lucide-react'

export default function CertCard({ cert, index = 0 }) {
  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Certificate Badge */}
      <div className={`relative h-48 bg-gradient-to-br ${cert.color} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-8 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-8 border-white rounded-full"></div>
        </div>
        <Award className="w-20 h-20 text-white relative z-10 group-hover:scale-110 transition-transform" />
      </div>

      {/* Certificate Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
            {cert.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
            <Building className="w-4 h-4" />
            <span>{cert.issuer}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{cert.date}</span>
          </div>
        </div>

        {/* Skills Tags */}
        {cert.skills && (
          <div className="flex flex-wrap gap-2">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Credential ID */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          {cert.credentialId && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
              Credential ID: {cert.credentialId}
            </p>
          )}
          {cert.link && (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group/link"
            >
              <span>Verify Certificate</span>
              <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}