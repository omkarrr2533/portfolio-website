'use client'

import { Trophy, Target, Zap, Award } from 'lucide-react'

export default function Achievements() {
  const achievements = [
    {
      icon: Trophy,
      title: 'Top Contributor',
      description: 'Active contributor to open source projects',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Target,
      title: 'Problem Solver',
      description: 'Solved 100+ LeetCode problems',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Quick Learner',
      description: 'Mastered multiple tech stacks',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      title: 'Academic Excellence',
      description: 'Top 5% of college with 8.11 CGPA',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {achievements.map((achievement, index) => (
        <div
          key={achievement.title}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-4`}>
            <achievement.icon className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {achievement.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {achievement.description}
          </p>
        </div>
      ))}
    </div>
  )
}