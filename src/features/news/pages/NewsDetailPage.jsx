// src/features/news/pages/NewsDetailPage.jsx
// Single detail page for Cricket, Football, OtherSports news AND Headlines.
// Route params: slug  — resolved against all data sources via basePath from URL.

import { useMemo } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { cricketNewsData } from '@/shared/constants/cricketNews.data'
import { footballNewsData } from '@/shared/constants/footballNews.data'
import { otherSportsNewsData } from '@/shared/constants/otherSportsNews.data'
import { headlinesData } from '@/shared/constants/headlines.data'

// Map base paths → dataset + back navigation
const SOURCE_MAP = {
  '/cricket/news': { data: cricketNewsData, label: 'Cricket News', listPath: '/cricket/news' },
  '/football/news': { data: footballNewsData, label: 'Football News', listPath: '/football/news' },
  '/sports/news': { data: otherSportsNewsData, label: 'Other Sports News', listPath: '/sports/news' },
  '/headlines': { data: headlinesData, label: 'Top Headlines', listPath: '/headlines' },
}

// Resolve which data source to use based on current pathname
const resolveSource = (pathname) => {
  const key = Object.keys(SOURCE_MAP).find((k) => pathname.startsWith(k))
  return key ? SOURCE_MAP[key] : null
}

// Tag pill
const Tag = ({ label }) => (
  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[11px] font-medium px-2 py-0.5 rounded-full">
    #{label}
  </span>
)

// Related card
const RelatedCard = ({ item, basePath }) => (
  <Link
    to={`${basePath}/${item.slug}`}
    className="flex gap-3 items-start group cursor-pointer"
  >
    <img
      src={item.image}
      alt={item.title}
      className="w-20 h-14 object-cover rounded flex-shrink-0 group-hover:opacity-80 transition-opacity"
      loading="lazy"
    />
    <div>
      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-[#00698c] transition-colors leading-snug line-clamp-2">
        {item.title}
      </p>
      <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 block">{item.time}</span>
    </div>
  </Link>
)

const NewsDetailPage = () => {
  const { slug } = useParams()
  const { pathname } = useLocation()

  const source = useMemo(() => resolveSource(pathname), [pathname])
  const article = useMemo(
    () => (source ? source.data.find((a) => a.slug === slug) : null),
    [source, slug]
  )

  // Related: other items from same dataset (exclude current)
  const related = useMemo(
    () => (source ? source.data.filter((a) => a.slug !== slug).slice(0, 4) : []),
    [source, slug]
  )

  // ── 404 state ────────────────────────────────────────────────────────────
  if (!source || !article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Article not found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          The article you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#00698c] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#005a78] transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    )
  }

  // Format date
  const formattedDate = new Date(article.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm mb-6 flex-wrap">
        <Link to="/" className="text-gray-400 hover:text-[#00698c] transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
        </svg>
        <Link
          to={source.listPath}
          className="text-gray-400 hover:text-[#00698c] transition-colors"
        >
          {source.label}
        </Link>
        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
        </svg>
        <span className="text-gray-700 dark:text-gray-300 line-clamp-1 max-w-xs">{article.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Main article ── */}
        <article className="flex-1 min-w-0">
          {/* Category + time */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="bg-[#00698c] text-white text-xs font-bold px-2.5 py-0.5 rounded">
              {article.subCategory || article.category}
            </span>
            {article.series && article.series !== 'General' && (
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                {article.series}
              </span>
            )}
            <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">{article.time}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-200 dark:border-gray-700 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-full bg-[#00698c]/20 flex items-center justify-center text-[#00698c] text-xs font-bold">
                {(article.author || article.source || 'S').charAt(0)}
              </div>
              <div>
                {article.author && (
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-none">
                    {article.author}
                  </p>
                )}
                <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-none mt-0.5">
                  {article.source}
                </p>
              </div>
            </div>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <time className="text-xs text-gray-400 dark:text-gray-500">{formattedDate}</time>
            {article.venue && (
              <>
                <span className="text-gray-300 dark:text-gray-600">·</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">📍 {article.venue}</span>
              </>
            )}
          </div>

          {/* Hero image */}
          <div className="relative rounded-lg overflow-hidden mb-6 h-64 sm:h-80 md:h-96">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Body / description */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {article.description}
            </p>
            {/* Extended filler paragraphs to simulate full article */}
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Sports journalism continues to evolve at a rapid pace, with real-time data, expert analysis, and
              fan-driven stories all playing a role in how we consume the beautiful game today. This story
              highlights one of many developments shaping the landscape of {article.category.toLowerCase()} as
              we head deeper into the season.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Stay tuned for further updates, post-match analysis, and exclusive interviews as we continue
              to bring you the most comprehensive sports coverage from around the world. The full story is
              still unfolding — bookmark this page and follow us for live updates.
            </p>
          </div>

          {/* Tags */}
          {article.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
              {article.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          )}
        </article>

        {/* ── Sidebar: Related articles ── */}
        {related.length > 0 && (
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-20">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Related Articles
              </h2>
              <div className="space-y-4">
                {related.map((item) => (
                  <RelatedCard key={item.id} item={item} basePath={source.listPath} />
                ))}
              </div>

              {/* Back to list */}
              <Link
                to={source.listPath}
                className="mt-6 flex items-center gap-2 text-sm text-[#00698c] font-medium hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" d="M15 18l-6-6 6-6" />
                </svg>
                View all {source.label}
              </Link>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

export default NewsDetailPage