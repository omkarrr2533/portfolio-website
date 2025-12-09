'use client'

export default function ContributionGraph({ data }) {
  // Generate contribution data
  const contributions = data || Array.from({ length: 365 }).map(() => 
    Math.floor(Math.random() * 5)
  )

  const colors = [
    'bg-gray-100 dark:bg-gray-700',
    'bg-green-200 dark:bg-green-900',
    'bg-green-300 dark:bg-green-700',
    'bg-green-400 dark:bg-green-600',
    'bg-green-500 dark:bg-green-500'
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Contribution Activity
      </h2>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-52 gap-1 min-w-max">
          {contributions.map((intensity, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-sm ${colors[intensity]} hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer`}
              title={`${intensity} contributions`}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-6 text-sm text-gray-600 dark:text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          {colors.map((color, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}