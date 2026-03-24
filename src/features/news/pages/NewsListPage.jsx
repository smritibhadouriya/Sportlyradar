// src/features/news/pages/NewsListPage.jsx
// Single "View All" page for Cricket, Football and Other Sports news.
// The sport is determined by the URL: /cricket/news  /football/news  /sports/news

import { memo, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cricketNewsData } from '@/shared/constants/cricketNews.data'
import { footballNewsData } from '@/shared/constants/footballNews.data'
import { otherSportsNewsData } from '@/shared/constants/otherSportsNews.data'
import { headlinesData } from '@/shared/constants/headlines.data'

// ── Map pathname → data & meta ─────────────────────────────────────────────

const CONFIG = {
  '/cricket/news': {
    label: 'Cricket',
    data: cricketNewsData,
    basePath: '/cricket/news',
    accent: '#00698c',
    emoji: '🏏',
  },
  '/football/news': {
    label: 'Football',
    data: footballNewsData,
    basePath: '/football/news',
    accent: '#00698c',
    emoji: '⚽',
  },
  '/sports/news': {
    label: 'Other Sports',
    data: otherSportsNewsData,
    basePath: '/sports/news',
    accent: '#00698c',
    emoji: '🏆',
  },
  '/headlines': {
    label: 'Top Headlines',
    data: headlinesData,
    basePath: '/headlines',
    accent: '#00698c',
    emoji: '📰',
  },
}

// ── Card components ────────────────────────────────────────────────────────

const NewsCard = memo(({ item, basePath }) => (
  <Link
    to={`${basePath}/${item.slug}`}
    className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group block"
  >
    <div className="relative h-44 overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      {/* Category badge */}
      <span className="absolute top-2 left-2 bg-[#00698c] text-white text-[10px] font-bold px-2 py-0.5 rounded">
        {item.subCategory || item.category}
      </span>
    </div>

    <div className="p-3">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#00698c] transition-colors mb-2">
        {item.title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3">
        {item.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold text-[#00698c]">{item.source}</span>
          {item.author && (
            <>
              <span className="text-gray-300 dark:text-gray-600">·</span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500">{item.author}</span>
            </>
          )}
        </div>
        <span className="text-[10px] text-gray-400 dark:text-gray-500">{item.time}</span>
      </div>
    </div>
  </Link>
))

// ── Headline card (text only) ──────────────────────────────────────────────

const HeadlineCard = memo(({ item }) => (
  <Link
    to={`/headlines/${item.slug}`}
    className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex gap-3 p-3 items-start"
  >
    {item.image && (
      <div className="relative w-24 h-20 flex-shrink-0 rounded overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <span className="inline-block bg-[#00698c]/10 text-[#00698c] text-[10px] font-bold px-2 py-0.5 rounded mb-1">
        {item.category}
      </span>
      <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#00698c] transition-colors mb-1">
        {item.title}
      </p>
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] font-medium text-[#00698c]">{item.source}</span>
        <span className="text-gray-300 dark:text-gray-600">·</span>
        <span className="text-[10px] text-gray-400 dark:text-gray-500">{item.time}</span>
      </div>
    </div>
  </Link>
))

// ── Main Page ──────────────────────────────────────────────────────────────

const NewsListPage = () => {
  const { pathname } = useLocation()

  // Resolve config based on current path
  const config = useMemo(() => {
    // Exact match first
    if (CONFIG[pathname]) return CONFIG[pathname]
    // Partial match fallback
    const key = Object.keys(CONFIG).find((k) => pathname.startsWith(k))
    return key ? CONFIG[key] : null
  }, [pathname])

  if (!config) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
        <p className="text-gray-500 dark:text-gray-400">Section not found.</p>
        <Link to="/" className="text-[#00698c] hover:underline mt-2 inline-block text-sm">Go Home</Link>
      </div>
    )
  }

  const isHeadlines = config.basePath === '/headlines'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Page header */}
      <div className="flex items-center gap-2 mb-6">
        <Link to="/" className="text-gray-400 dark:text-gray-500 hover:text-[#00698c] transition-colors text-sm">
          Home
        </Link>
        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
        </svg>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{config.label}</span>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">{config.emoji}</span>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isHeadlines ? 'Top Headlines' : `${config.label} News & Updates`}
        </h1>
        <span className="ml-auto text-sm text-gray-400 dark:text-gray-500">
          {config.data.length} articles
        </span>
      </div>

      {/* Grid */}
      {isHeadlines ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {config.data.map((item) => (
            <HeadlineCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {config.data.map((item) => (
            <NewsCard key={item.id} item={item} basePath={config.basePath} />
          ))}
        </div>
      )}
    </div>
  )
}

export default NewsListPage