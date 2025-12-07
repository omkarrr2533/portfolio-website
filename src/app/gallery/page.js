'use client'

import { useState } from 'react'
import { X, ZoomIn, Calendar, Tag } from 'lucide-react'

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'Projects', 'Events', 'Achievements', 'Travel']

  const images = [
    {
      id: 1,
      title: 'Project Launch Event',
      category: 'Events',
      date: '2024-01-15',
      description: 'Launching our new e-commerce platform',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 2,
      title: 'Hackathon Winner',
      category: 'Achievements',
      date: '2023-12-10',
      description: 'First place at National Hackathon',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 3,
      title: 'Team Building',
      category: 'Events',
      date: '2023-11-20',
      description: 'Annual team outing and workshops',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      title: 'Conference Talk',
      category: 'Achievements',
      date: '2023-10-05',
      description: 'Speaking at Tech Conference 2023',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 5,
      title: 'Dashboard UI',
      category: 'Projects',
      date: '2023-09-15',
      description: 'Analytics dashboard design mockup',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 6,
      title: 'Mountain Trek',
      category: 'Travel',
      date: '2023-08-22',
      description: 'Weekend hiking adventure',
      color: 'from-emerald-500 to-green-500'
    },
    {
      id: 7,
      title: 'Mobile App Launch',
      category: 'Projects',
      date: '2023-07-10',
      description: 'New mobile app release celebration',
      color: 'from-violet-500 to-purple-500'
    },
    {
      id: 8,
      title: 'Code Review Session',
      category: 'Events',
      date: '2023-06-18',
      description: 'Monthly code review and learning',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 9,
      title: 'Beach Workation',
      category: 'Travel',
      date: '2023-05-25',
      description: 'Remote work from paradise',
      color: 'from-sky-500 to-cyan-500'
    }
  ]

  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gallery
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            A visual journey through my projects, achievements, and memorable moments
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 ${
                filter === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image)}
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

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No images found in this category.
            </p>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              {/* Image */}
              <div className={`aspect-video bg-gradient-to-br ${selectedImage.color} rounded-xl flex items-center justify-center mb-6`}>
                <div className="text-white text-9xl font-bold opacity-20">
                  {selectedImage.title.charAt(0)}
                </div>
              </div>

              {/* Info */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedImage.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedImage.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedImage.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    {selectedImage.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}