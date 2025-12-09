'use client'

import { Award, ExternalLink, Calendar, Building } from 'lucide-react'

export default function CertificationsPage() {
  const certifications = [
    {
      id: 1,
      title: 'Artificial Intelligence Fundamentals',
      issuer: 'IBM',
      date: 'Augest 2025',
      link: 'https://www.credly.com/badges/33511d2d-4bbf-4716-a021-4548025fa128',
      skills: ['AI', 'Basic Of Artificial Intelligence'],
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: 2,
      title: 'Rapid Application Development with Large Language Models(LLMs)',
      issuer: 'NVIDIA',
      date: 'Augest 2025',
      credentialId: 'RpH1b8OtRK2Kg4KNsOyO4g',
      link: 'https://learn.nvidia.com/certificates?id=RpH1b8OtRK2Kg4KNsOyO4g',
      skills: ['LLM Fundamentals','Prompt Engineering','Few-Shot Learning','Application Prototyping','Fine-Tuning Models','API Integration','Real-Time Communication','Enterprise System Integration','Cloud Deployment','Containerization (Docker)','Scaling Strategies','Business Applications of LLMs'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'The Ultimate Job Ready Data Science Course',
      issuer: 'Code with Harry',
      date: 'October 2025',
      credentialId: 'CWH-THE-ULTIMATE-JOB-READY-DATA-SCIENCE-COURSE-JGXUEIGY',
      skills: ['Python Programming','Anaconda & Jupyter Setup','NumPy for Numerical Computing','Pandas for Data Analysis','Matplotlib for Visualization','Seaborn for Statistical Graphics','Statistics & Probability','Data Science Project Work','Real-world Applications','Career Readiness in Data Science'],
      color: 'from-blue-600 to-indigo-600'
    }
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-4">
            <Award className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Certifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Professional certifications and achievements that validate my expertise
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16 animate-slide-up">
          {[
            { label: 'Total Certifications', value: certifications.length },
            { label: 'Cloud Platforms', value: 3 },
            { label: 'This Year', value: 2 },
            { label: 'Active', value: certifications.length }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
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

                {/* Credential ID */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                    Credential ID: {cert.credentialId}
                  </p>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group/link"
                  >
                    <span>Verify Certificate</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white max-w-2xl">
            <h3 className="text-2xl font-bold mb-3">Continuous Learning</h3>
            <p className="text-white/90">
              I'm constantly expanding my knowledge and pursuing new certifications. 
              Currently preparing for advanced AWS and Kubernetes certifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}