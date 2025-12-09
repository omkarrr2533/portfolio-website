export default function Loading({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-3',
    lg: 'h-16 w-16 border-4',
  }

  return (
    <div className="flex justify-center items-center py-20">
      <div 
        className={`animate-spin rounded-full border-t-blue-600 border-gray-200 dark:border-gray-700 ${sizes[size]} ${className}`}
      />
    </div>
  )
}

export function LoadingSpinner({ size = 'md', color = 'blue' }) {
  const sizes = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  const colors = {
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600',
  }

  return (
    <div 
      className={`animate-spin rounded-full border-2 border-t-transparent ${colors[color]} ${sizes[size]}`}
    />
  )
}

export function LoadingDots() {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loading size="lg" />
      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  )
}