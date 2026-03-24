import { memo } from 'react'
import { Link } from 'react-router-dom'
import SeoManager from '@/core/seo/SeoManager'
import { seoConfig } from '@/config/seo.config'
import BlogCard from '@/shared/components/BlogCard'
import { blogPosts } from '@/shared/constants/blogs.data'
import { photos } from '@/shared/constants/Vedio.data'
import { videos } from '@/shared/constants/Vedio.data'
import LiveTicker from '../../layouts/LiveTicker'
import Category from '../../layouts/Category.jsx'
import Headline  from '../../layouts/Headline.jsx'
import { cricketNewsData } from '@/shared/constants/cricketNews.data'
import { footballNewsData } from '@/shared/constants/footballNews.data'
import { otherSportsNewsData } from '@/shared/constants/otherSportsNews.data'
import NewsGrid from '../../features/home/sections/NewsGrid'

import TopHeadlines from '../../features/home/sections/TopHeadlines.jsx'

const toSlug = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')   // remove special chars
    .replace(/\s+/g, '-')            // spaces → hyphens
    .replace(/-+/g, '-');     

const HeroSection = memo(() => (
  <div className="relative text-white overflow-hidden" style={{ minHeight: '520px' }}>
    <img
      src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1400&q=80"
      alt="Stadium"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/60" />
    <div className="relative z-10">
      <LiveTicker />
    </div>
    <Category />
    <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-6 pb-5 max-w-7xl mx-auto">
      <Headline />
    </div>
  </div>
))

const FeaturedMatch = memo(() => (
  <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm mb-6">
    <div className="relative h-48 md:h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80"
        alt="Cricket match"
        className="w-full h-full object-cover opacity-60"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Live
          </span>
          <span className="text-white/80 text-xs">Cricket</span>
        </div>
        <h3 className="text-white font-bold text-lg leading-tight">India Women Tour of Australia</h3>
        <div className="flex items-center gap-3 mt-2 text-white text-sm">
          <span>🇮🇳 India Women</span>
          <span className="font-bold">184/8 • 97 overs</span>
        </div>
        <div className="flex items-center gap-3 mt-1 text-white text-sm">
          <span>🇦🇺 Australian Women</span>
        </div>
      </div>
    </div>
  </div>
))

const QuickLinks = memo(() => {
  const links = [
    { label: 'ICC World League', href: '#' },
    { label: 'Recent League', href: '#' },
    { label: 'English Premier League', href: '#' },
    { label: 'La Liga', href: '#' },
    { label: 'Champions League', href: '#' },
    { label: 'Serie A', href: '#' },
    { label: 'Bundesliga', href: '#' },
    { label: 'Ligue 1', href: '#' },
    { label: 'More T20 leagues', href: '#' },
  ]
  return (
    <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-sm mb-6">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 px-1">Quick Links</h3>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="flex items-center justify-between px-1 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#00698c] dark:hover:text-[#3387a3] border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors"
            >
              {link.label}
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
})



// ─── Photos Section ───────────────────────────────────────────────────────────
const PhotosSection = memo(() => {
  // latest 4 photos
  const latest = photos.slice(0, 4)

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Photos</h2>
        <Link to="/photogallary" className="text-sm text-[#00698c] hover:underline font-medium">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {latest.map((item, idx) => (
          <Link to={`/photogallary/${toSlug(item.cardTitle)}`}
           key={idx} className="group block">
            <div className="relative rounded-lg overflow-hidden cursor-pointer" style={{ aspectRatio: '4/3' }}>
              <img
                src={item.images[0].url}
                alt={item.cardTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              
              {/* title */}
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-white text-xs font-semibold leading-snug line-clamp-2">
                  {item.cardTitle}
                </p>
                <p className="text-gray-300 text-xs mt-0.5">{item.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
})

// ─── Videos Section ───────────────────────────────────────────────────────────
const VideosSection = memo(() => {
  // latest 4 videos
  const latest = videos.slice(0, 4)

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Videos</h2>
        <Link to="/vediogallary" className="text-sm text-[#00698c] hover:underline font-medium">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {latest.map((item, idx) => (
          <Link to={`/vediogallary/${toSlug(item.title)}`}
          key={idx} className="group block">
            <div className="relative rounded-lg overflow-hidden cursor-pointer" style={{ aspectRatio: '16/9' }}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

              {/* play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#111" className="ml-0.5">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>

              {/* duration badge */}
              {item.duration && (
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                  {item.duration}
                </div>
              )}
            </div>

            {/* title below */}
            <div className="mt-1.5 px-0.5">
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-snug line-clamp-2 group-hover:text-[#00698c] transition-colors">
                {item.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
})

const BlogsRow = memo(() => {
  const posts = blogPosts.slice(0, 4)
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} compact />
        ))}
      </div>
    </div>
  )
})

const HomePage = () => (
  <>
    <SeoManager
      title={seoConfig.pages.home.title}
      description={seoConfig.pages.home.description}
    />
    <HeroSection />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <FeaturedMatch />
          <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-6 shadow-sm">
            <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">
              Weekend predictions: Can Wrexham top Chelsea in FA Cup?
            </p>
            <img
              src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=700&q=80"
              alt="FA Cup"
              className="w-full h-40 object-cover rounded-lg mt-2"
              loading="lazy"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <QuickLinks />
        </div>
      </div>

    <TopHeadlines />

      <NewsGrid
        title="Cricket News & Updates"
        viewAllTo="/cricket/news"
        items={cricketNewsData}
        basePath="/cricket/news"
      />
        <NewsGrid
        title="Football News & Updates"
        viewAllTo="/football/news"
        items={footballNewsData}
        basePath="/football/news"
      />

      <NewsGrid
        title="Other Sports News & Updates"
        viewAllTo="/sports/news"
        items={otherSportsNewsData}
        basePath="/sports/news"
      />

      {/* ✅ Real Photos & Videos sections */}
      <PhotosSection />
      <VideosSection />

      <BlogsRow />
    </div>
  </>
)

export default HomePage
