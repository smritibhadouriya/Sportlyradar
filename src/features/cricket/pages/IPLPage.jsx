
/////// ye jo neeche code lga hai scorecard ke liye hai upar jo hai usme scorekard vala nahi tha par hai dono sahi 

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import SportsTabs from '../../../layouts/SportsTabs'
import CricketTabs from '../components/CricketTabs'
import SectionHeader from '@/shared/components/SectionHeader'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import { iplMatches } from '@/shared/constants/cricket.data'

// Tab → route mapping
const TAB_ROUTES = {
  News:   '/cricket/news',
  Photos: '/photogallary',
  Video:  '/vediogallary',
}

const IPLMatchCard = ({ match }) => {
  const navigate = useNavigate()
  return (
    <div
      className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 mb-3 sm:mb-4 cursor-pointer"
      onClick={() => navigate(`/cricket/ipl/match/${match.id}/scorecard`)}
    >
      <div className="bg-gradient-to-r from-[#00698c] to-[#0088b0] text-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs sm:text-sm font-semibold">{match.date}</span>
        <span className="text-xs sm:text-sm font-medium bg-white/20 px-2 sm:px-3 py-0.5 rounded-full">{match.matchNumber}</span>
      </div>
      <div className="p-3 sm:p-4 md:p-5">
        {/* Teams */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <span
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: match.team1.color || '#dc2626' }}
              >
                {match.team1.code}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                {match.team1.name}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start">
            <span className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 px-2">VS</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <span
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: match.team2.color || '#f97316' }}
              >
                {match.team2.code}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                {match.team2.name}
              </span>
            </div>
          </div>
        </div>

        {/* Match Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 text-xs mb-0.5">Venue</p>
              <p className="break-words">{match.venue}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 text-xs mb-0.5">Match Time</p>
              <p>{match.time}</p>
            </div>
          </div>
        </div>

        {/* View Scorecard */}
        <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-[#00698c] hover:text-[#0088b0] font-medium transition-colors">
            View Scorecard
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

const IPLPage = () => {
  const [activeTab, setActiveTab] = useState('Matches')
  const [isScrolled, setIsScrolled] = useState(false)
  const tabs = ['Home', 'Scorecard', 'Matches', 'Table', 'News', 'Photos', 'Video']
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getMatches = () => {
    if (activeTab === 'Matches') return iplMatches
    if (activeTab === 'Home') return iplMatches.slice(0, 3)
    return []
  }

  const displayedMatches = getMatches()

  const handleTabClick = (tab) => {
    if (tab === 'Scorecard') {
      // Navigate to first match scorecard
      navigate(`/cricket/ipl/match/${iplMatches[0]?.id}/scorecard`)
    } else if (TAB_ROUTES[tab]) {
      // News, Photos, Video — navigate to their pages
      navigate(TAB_ROUTES[tab])
    } else {
      setActiveTab(tab)
    }
  }

  return (
    <>
      <SeoManager title="IPL 2026 | SportyRadar" />
      <SportsTabs />
      <CricketTabs extraTab={{ label: 'IPL 2026', path: '/cricket/ipl' }} />

      {/* Main layout: IPL content + right sidebar space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex gap-6">

          {/* Left: IPL content — 80% width */}
          <div className="w-full lg:w-[80%] min-w-0">
            <SectionHeader title="INDIAN PREMIER LEAGUE 2026" />

            {/* IPL Sub-tabs */}
            <div className={`sticky top-0 z-10 bg-white dark:bg-[#1c2128] transition-shadow ${isScrolled ? 'shadow-md' : ''}`}>
              <div className="flex items-center gap-0 border-b pb-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1c2128] rounded-t-lg overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`flex-shrink-0 px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-[#00698c] text-[#00698c]'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-4 ">
              {activeTab === 'Matches' || activeTab === 'Home' ? (
                <>
                  <div className="flex items-center justify-between mb-3 sm:mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-5 sm:h-6 bg-[#00698c] rounded-full"></div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        {activeTab === 'Home' ? 'Upcoming Matches' : 'All Matches'}
                      </h3>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {displayedMatches.length} Match{displayedMatches.length !== 1 ? 'es' : ''}
                    </span>
                  </div>
                  <div className="space-y-3 sm:space-y-6">
                    {displayedMatches.map((match) => (
                      <IPLMatchCard key={match.id} match={match} />
                    ))}
                  </div>
                  {activeTab === 'Home' && iplMatches.length > 3 && (
                    <div className="text-center mt-4 sm:mt-6">
                      <button
                        onClick={() => setActiveTab('Matches')}
                        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-[#00698c] hover:text-[#00698c] transition-all"
                      >
                        View All Matches
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8 text-center">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {activeTab} Coming Soon
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    We're working on bringing you the latest {activeTab.toLowerCase()} for IPL 2026.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Empty space reserved for future sidebar — adjust w-[20%] to control width */}
          <div className="hidden lg:block lg:w-[20%]">
            {/* Sidebar content add karo yahan */}
          </div>

        </div>
      </div>

      {/* BlogsSection: separate full-width container — same width as other IPL pages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogsSection />
      </div>
    </>
  )
}

export default IPLPage