import { useState } from 'react'
import { Link } from 'react-router-dom'
import SportsTabs from '@/layouts/SportsTabs'
import CricketTabs from '../components/CricketTabs'
import SectionHeader from '@/shared/components/SectionHeader'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import { iplMatches } from '@/shared/constants/cricket.data'

const IPLMatchCard = ({ match }) => (
  <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm mb-4">
    <div className="bg-[#00698c] text-white px-4 py-2 flex items-center justify-between">
      <span className="text-sm font-semibold">{match.date}</span>
      <span className="text-sm font-medium">{match.matchNumber}</span>
    </div>
    <div className="p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
      <Link
  to={`/cricket/ipl/teams?team=${encodeURIComponent(match.team1.name)}`}
  className="flex items-center gap-2"
>
  <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
    {match.team1.code}
  </span>
  <span className="font-semibold text-gray-900 dark:text-white text-sm">{match.team1.name}</span>
</Link>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 mx-1">VS</span>
    <Link
  to={`/cricket/ipl/teams?team=${encodeURIComponent(match.team2.name)}`}
  className="flex items-center gap-2"
>
  <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
    {match.team2.code}
  </span>
  <span className="font-semibold text-gray-900 dark:text-white text-sm">{match.team2.name}</span>
</Link>
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 dark:text-gray-400">
        <div>
          <p className="font-semibold text-gray-700 dark:text-gray-300 text-xs mb-0.5">Location</p>
          <p>{match.venue}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700 dark:text-gray-300 text-xs mb-0.5">Time</p>
          <p>{match.time}</p>
        </div>
      </div>
    </div>
  </div>
)

const IPLPage = () => {
  const [activeTab, setActiveTab] = useState('Matches')
  const tabs = ['Home', 'Matches', 'Table', 'News', 'Photos', 'Video']

  return (
    <>
      <SeoManager title="IPL 2026 | SportyRadar" />
      <SportsTabs />
      <CricketTabs extraTab={{ label: 'IPL 2026', path: '/cricket/ipl' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <SectionHeader title="INDIAN PREMIER LEAGUE  2026" />

        {/* IPL Sub-tabs */}
        <div className="flex items-center gap-0 border-b border-gray-200 dark:border-gray-700 mb-6 bg-white dark:bg-[#1c2128] rounded-lg overflow-hidden shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex-1 ${
                activeTab === tab
                  ? 'border-[#00698c] text-[#00698c]'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {iplMatches.map((match) => (
          <IPLMatchCard key={match.id} match={match} />
        ))}

        <BlogsSection />
      </div>
    </>
  )
}

export default IPLPage
