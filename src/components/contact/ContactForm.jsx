'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus(''), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus(''), 3000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus(''), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Om Kapale"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Your Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="om@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Subject *
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="How can I help you?"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="6"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          placeholder="Tell me about your project..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
      >
        {status === 'sending' ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>

      {status === 'success' && (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-500 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg animate-fade-in">
          ✅ Message sent successfully! I'll get back to you soon.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg animate-fade-in">
          ❌ Failed to send message. Please try again.
        </div>
      )}
    </form>
  )
}