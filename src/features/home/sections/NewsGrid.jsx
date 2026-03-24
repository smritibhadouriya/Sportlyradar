// src/features/home/sections/NewsGrid.jsx
// Used in HomePage for Cricket, Football, Other Sports sections.
// Shows 4 items (1 featured + 3 small). "View all" goes to list page.
// Every card click → detail page.

import { memo } from 'react'
import { Link } from 'react-router-dom'

/**
 * @param {string}   title     - Section heading
 * @param {string}   viewAllTo - Route for "View all" button (e.g. "/cricket/news")
 * @param {Array}    items     - Array of news objects (max 4 used for home preview)
 * @param {string}   basePath  - Base detail route prefix (e.g. "/cricket/news")
 */
const NewsGrid = memo(({ title, viewAllTo, items = [], basePath }) => {
  // Only first 4 items on home page preview
  const preview = items.slice(0, 4)
  const [featured, ...rest] = preview

  if (!featured) return null

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
        <Link
          to={viewAllTo}
          className="text-sm text-[#00698c] hover:underline font-medium"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Featured large item */}
        <Link
          to={`${basePath}/${featured.slug}`}
          className="md:col-span-2 relative rounded-lg overflow-hidden h-48 cursor-pointer group block"
        >
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
            <p className="text-white font-bold text-base leading-tight">{featured.title}</p>
          </div>
        </Link>

        {/* Small items */}
        <div className="space-y-2">
          {rest.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              to={`${basePath}/${item.slug}`}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-14 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <p className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-[#00698c] transition-colors line-clamp-3 leading-snug">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
})

export default NewsGrid