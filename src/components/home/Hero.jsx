'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react'

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Full Stack Developer'
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.substring(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)
    
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Greeting */}
          <div className="animate-fade-in">
            <p className="text-primary-500 font-semibold text-lg mb-4">
              👋 Hello, I'm
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Name
            </h1>
          </div>

          {/* Typing Effect */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 min-h-[40px]">
              {displayText}
              <span className="animate-pulse">|</span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            I build exceptional digital experiences with modern web technologies. 
            Passionate about creating elegant solutions and turning ideas into reality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Link
              href="/projects"
              className="group px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a
              href="/resume.pdf"
              download
              className="px-8 py-4 border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-500 hover:text-white transition-all transform hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-500 hover:text-white transition-all transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-500 hover:text-white transition-all transform hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}