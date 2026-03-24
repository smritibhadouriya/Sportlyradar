// src/features/news/pages/NewsPage.jsx
// Route: /news
// Layout: Left = tabbed news cards (All / Cricket / Football)
//         Right = Top Headlines sidebar (desktop only)
// Clicking any card → detail page
// Clicking any headline → /headlines/:slug

import { memo, useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cricketNewsData } from '@/shared/constants/cricketNews.data'
import { footballNewsData } from '@/shared/constants/footballNews.data'
import { headlinesData } from '@/shared/constants/headlines.data'

// ── Tab config ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'all',      label: 'All',      emoji: '🏆' },
  { id: 'cricket',  label: 'Cricket',  emoji: '🏏' },
  { id: 'football', label: 'Football', emoji: '⚽' },
]

// Map tab id → data + detail base path
const TAB_DATA = {
  all:      { items: [...cricketNewsData, ...footballNewsData], basePath: null },   // basePath resolved per item
  cricket:  { items: cricketNewsData,  basePath: '/cricket/news' },
  football: { items: footballNewsData, basePath: '/football/news' },
}

// Resolve base path per item when tab is 'all'
const resolveBasePath = (item) => {
  if (item.category === 'Cricket')  return '/cricket/news'
  if (item.category === 'Football') return '/football/news'
  return '/sports/news'
}

// ── News Card ──────────────────────────────────────────────────────────────────
const NewsCard = memo(({ item, basePath }) => {
  const path = basePath || resolveBasePath(item)
  return (
    <Link
      to={`${path}/${item.slug}`}
      className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group block"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <span className="absolute top-2 left-2 bg-[#00698c] text-white text-[10px] font-bold px-2 py-0.5 rounded">
          {item.subCategory || item.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#00698c] transition-colors mb-2">
          {item.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[10px] font-semibold text-[#00698c] truncate">{item.source}</span>
            {item.author && (
              <>
                <span className="text-gray-300 dark:text-gray-600 flex-shrink-0">·</span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 truncate">{item.author}</span>
              </>
            )}
          </div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2">{item.time}</span>
        </div>
      </div>
    </Link>
  )
})

// ── Headline sidebar item ──────────────────────────────────────────────────────
const HeadlineSidebarItem = memo(({ item }) => (
  <Link
    to={`/headlines/${item.slug}`}
    className="flex gap-3 items-start group p-3 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-shadow"
  >
    {item.image && (
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-12 object-cover rounded flex-shrink-0 group-hover:opacity-80 transition-opacity"
        loading="lazy"
      />
    )}
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-[#00698c] transition-colors leading-snug line-clamp-2 mb-1">
        {item.title}
      </p>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-medium text-[#00698c]">{item.source}</span>
        <span className="text-gray-300 dark:text-gray-600">·</span>
        <span className="text-[10px] text-gray-400 dark:text-gray-500">{item.time}</span>
      </div>
    </div>
  </Link>
))

// ── Tabs ──────────────────────────────────────────────────────────────────────
const TabBar = memo(({ active, onChange }) => (
  <div className="flex items-center gap-2 mb-6">
    {TABS.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
          active === tab.id
            ? 'bg-[#00698c] border-[#00698c] text-white shadow-sm'
            : 'bg-white dark:bg-[#1c2128] border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#00698c] hover:text-[#00698c]'
        }`}
      >
        <span className="text-base leading-none">{tab.emoji}</span>
        {tab.label}
      </button>
    ))}
  </div>
))

// ── Main Page ──────────────────────────────────────────────────────────────────
const NewsPage = () => {
  const [activeTab, setActiveTab] = useState('all')

  const { items, basePath } = useMemo(() => TAB_DATA[activeTab], [activeTab])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Page title */}
      <div className="flex items-center gap-2 mb-5">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">News</h1>
        <span className="text-sm text-gray-400 dark:text-gray-500 ml-auto">
          {items.length} articles
        </span>
      </div>

      {/* Tab bar */}
      <TabBar active={activeTab} onChange={setActiveTab} />

      {/* Two-column layout: cards left, headlines right */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ── Left: News Cards Grid ── */}
        <div className="flex-1 min-w-0">
          {items.length === 0 ? (
            <p className="text-gray-400 dark:text-gray-500 text-sm py-12 text-center">
              No articles found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {items.map((item) => (
                <NewsCard key={item.id} item={item} basePath={basePath} />
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Top Headlines Sidebar ── */}
        <aside className="lg:w-72 xl:w-80 flex-shrink-0">
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Top Headlines</h2>
              
            </div>
            <div className="space-y-2">
              {headlinesData.map((item) => (
                <HeadlineSidebarItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}

export default NewsPage