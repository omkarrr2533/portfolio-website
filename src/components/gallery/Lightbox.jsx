'use client'

import { X, Calendar, Tag } from 'lucide-react'

export default function Lightbox({ image, onClose }) {
  if (!image) return null

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        onClick={onClose}
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        {/* Image */}
        <div className={`aspect-video bg-gradient-to-br ${image.color} rounded-xl flex items-center justify-center mb-6`}>
          <div className="text-white text-9xl font-bold opacity-20">
            {image.title.charAt(0)}
          </div>
        </div>

        {/* Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {image.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {image.description}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(image.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {image.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}