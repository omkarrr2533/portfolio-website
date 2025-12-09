'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation({ items, mobile = false }) {
  const pathname = usePathname()

  const linkClass = mobile
    ? 'text-sm font-medium transition-colors hover:text-blue-600'
    : 'text-sm font-medium transition-colors hover:text-blue-600'

  return (
    <>
      {items.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`${linkClass} ${
            pathname === item.path
              ? 'text-blue-600'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </>
  )
}