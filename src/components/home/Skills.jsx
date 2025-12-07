'use client'

import { Code2, Database, Globe, Smartphone, Cloud, GitBranch } from 'lucide-react'

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Code2,
      skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Backend Development',
      icon: Database,
      skills: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Database',
      icon: Database,
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'DevOps & Cloud',
      icon: Cloud,
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx', 'Linux'],
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Mobile Development',
      icon: Smartphone,
      skills: ['React Native', 'Flutter', 'Progressive Web Apps', 'Responsive Design'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Tools & Others',
      icon: GitBranch,
      skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Postman', 'Jira'],
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-blue-600 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I'm proficient in a wide range of technologies and always eager to learn more
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {category.title}
              </h3>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="inline-block bg-gradient-to-r from-primary-500 to-blue-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Always Learning</h3>
            <p className="text-white/90">
              Currently exploring: AI/ML, Web3, and Serverless Architecture
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}