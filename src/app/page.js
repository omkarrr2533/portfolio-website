'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Github, Clock, Search, Filter } from 'lucide-react'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTech, setSelectedTech] = useState('All')
  const [loading, setLoading] = useState(true)

  // Sample projects data (will be replaced with GitHub API data)
  const sampleProjects = [
    {
      id: 1,
      name: 'Hand Sign Detection Using Python',
      description: 'Hand sign detection is a computer vision technique that identifies and interprets gestures made with the hand. Using Python, libraries like OpenCV for image processing and TensorFlow/Keras for deep learning, a system can capture real-time video from a webcam, detect the hand region, and classify gestures into predefined categories (e.g., numbers, alphabets, or commands). This technology is widely applied in sign language recognition, human-computer interaction, and assistive communication tools.',
      techStack: ['Python','OpenCV','MediaPipe','TensorFlow','Keras','PyTorch','NumPy','Pandas','Scikit-learn','Matplotlib','Seaborn','Flask','FastAPI','Streamlit','Gradio','Docker','Webcam','GPU (CUDA/cuDNN)'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/omkarrr2533/Hand_Sign_Detection_Using_Python.git',
      buildTime: '3 months',
      language: 'Python'
    },
    {
      id: 2,
      name: 'City-Bus Tracking System',
      description: 'This project is a real-time city bus tracking application designed to improve public transport visibility and user convenience. The backend is powered by Java with Spring Boot, which manages APIs, data flow, and WebSocket connections for live updates. Maven ensures smooth dependency management and build automation.',
      techStack: ['Java','HTML','CSS','JavaScript','Spring Boot','Maven','WebSocket','Leaflet Map'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/omkarrr2533/BUS-ETA.git',
      buildTime: '2 months',
      language: 'Java'
    },
    {
      id: 3,
      name: 'Portfolio Dashboard',
      description: 'Analytics dashboard for tracking portfolio performance with interactive charts and real-time data.',
      techStack: ['Vue.js', 'Firebase', 'Chart.js', 'Tailwind'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/yourusername/project3',
      buildTime: '1.5 months',
      language: 'JavaScript'
    }
  ]

  const allTechs = ['All', 'React', 'Next.js', 'Vue.js', 'Node.js', 'TypeScript', 'JavaScript']

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(sampleProjects)
      setFilteredProjects(sampleProjects)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedTech !== 'All') {
      filtered = filtered.filter(project =>
        project.techStack.includes(selectedTech)
      )
    }

    setFilteredProjects(filtered)
  }, [searchTerm, selectedTech, projects])

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of my work showcasing various technologies and problem-solving skills
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 animate-slide-up">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedTech === tech
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Header */}
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold opacity-20">
                    {project.name.charAt(0)}
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      ⭐ {project.stars}
                    </span>
                    <span className="bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      🔱 {project.forks}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {project.buildTime}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
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

                  {/* Links */}
                  <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
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
        )}

        {/* No Results */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found. Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}