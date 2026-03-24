import { useState } from 'react'
import SportsTabs from '@/layouts/SportsTabs'
import CricketTabs from '../components/CricketTabs'
import SectionHeader from '@/shared/components/SectionHeader'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import { resultsByDate } from '@/shared/constants/cricket.data'

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" strokeWidth="2"/>
    <path strokeWidth="2" strokeLinecap="round" d="M21 21l-4.35-4.35"/>
  </svg>
)

const ResultCard = ({ match }) => (
  <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex items-start justify-between mb-3">
      <div>
        <p className="text-sm font-semibold text-gray-800 dark:text-white">{match.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{match.venue}</p>
      </div>
      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
      </svg>
    </div>
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{match.team1.flag}</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{match.team1.name}</span>
        </div>
        <span className="text-sm font-bold text-gray-900 dark:text-white">{match.team1.score}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{match.team2.flag}</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{match.team2.name}</span>
        </div>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{match.team2.score}</span>
      </div>
    </div>
  </div>
)

const CricketResultsPage = () => {
  const [search, setSearch] = useState('')

  return (
    <>
      <SeoManager title="Cricket Results | SportyRadar" />
      <SportsTabs />
      <CricketTabs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <SectionHeader title="Cricket Results" />

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:border-[#00698c] transition-colors bg-white dark:bg-[#1c2128]">
            Select Series
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search Team, Series, Ground"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm bg-white dark:bg-[#1c2128] text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:border-[#00698c] transition-colors"
            />
          </div>
        </div>

        {resultsByDate.map((group) => (
          <div key={group.date} className="mb-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">{group.date}</h3>
            <div className="space-y-3">
              {group.matches.map((match) => (
                <ResultCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))}

        <BlogsSection />
      </div>
    </>
  )
}

export default CricketResultsPage
