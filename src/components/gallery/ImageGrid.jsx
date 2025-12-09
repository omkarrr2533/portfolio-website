'use client'

import { ZoomIn, Calendar, Tag } from 'lucide-react'

export default function ImageGrid({ images, onImageClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => onImageClick(image)}
        >
          {/* Image Placeholder with Gradient */}
          <div className={`aspect-square bg-gradient-to-br ${image.color} flex items-center justify-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all" />
            </div>
            <div className="text-white/20 text-8xl font-bold">
              {image.title.charAt(0)}
            </div>
          </div>

          {/* Image Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
            <h3 className="text-lg font-bold mb-2">{image.title}</h3>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(image.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {image.category}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}