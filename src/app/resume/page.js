'use client'

import { Download, Briefcase, GraduationCap, Award, Code } from 'lucide-react'

export default function ResumePage() {
  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Company Inc.',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      responsibilities: [
        'Lead development of enterprise web applications serving 100K+ users',
        'Architected microservices infrastructure reducing system latency by 40%',
        'Mentored team of 5 junior developers',
        'Implemented CI/CD pipelines improving deployment frequency by 300%'
      ]
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup XYZ',
      location: 'New York, NY',
      period: '2020 - 2022',
      responsibilities: [
        'Built and maintained 15+ client projects using React and Node.js',
        'Developed RESTful APIs serving 50K+ daily requests',
        'Integrated payment gateways (Stripe, PayPal) for e-commerce platforms',
        'Optimized database queries reducing response time by 60%'
      ]
    },
    {
      title: 'Junior Developer',
      company: 'Digital Agency',
      location: 'Boston, MA',
      period: '2019 - 2020',
      responsibilities: [
        'Developed responsive websites for 20+ clients',
        'Collaborated with designers to implement pixel-perfect UI',
        'Maintained and updated legacy codebases',
        'Participated in agile development processes'
      ]
    }
  ]

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      location: 'Boston, MA',
      period: '2015 - 2019',
      details: 'GPA: 3.8/4.0, Dean\'s List, Computer Science Society President'
    }
  ]

  const skills = {
    'Frontend': ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
    'Backend': ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL'],
    'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
    'DevOps': ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Jenkins', 'Git'],
    'Tools': ['VS Code', 'Postman', 'Figma', 'Jira', 'Slack']
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Resume
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            Professional experience, education, and skills
          </p>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </a>
        </div>

        {/* Professional Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Summary
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Passionate Full Stack Developer with 5+ years of experience building scalable web applications. 
            Specialized in React, Node.js, and cloud technologies. Proven track record of delivering high-quality 
            solutions that improve user experience and business outcomes. Strong problem-solving skills and ability 
            to work effectively in fast-paced, collaborative environments.
          </p>
        </div>

        {/* Work Experience */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            Work Experience
          </h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {job.title}
                </h3>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <p className="text-blue-600 font-semibold">
                    {job.company} • {job.location}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {job.period}
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {edu.degree}
                </h3>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <p className="text-blue-600 font-semibold">
                    {edu.school} • {edu.location}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {edu.period}
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-600" />
            Technical Skills
          </h2>
          <div className="space-y-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Quick View */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center animate-fade-in">
          <Award className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">6+ Professional Certifications</h3>
          <p className="text-white/90 mb-4">
            Including AWS, Google Cloud, and Kubernetes certifications
          </p>
          <a
            href="/certifications"
            className="inline-block px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View All Certifications
          </a>
        </div>
      </div>
    </div>
  )
}