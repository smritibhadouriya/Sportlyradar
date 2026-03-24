import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import SportsTabs from '@/layouts/SportsTabs'
import CricketTabs from '../components/CricketTabs'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import { iplMatches, iplMatchTeams } from '@/shared/constants/cricket.data'

const PlayerItem = ({ player }) => (
  <Link
    to={`/cricket/player/${player.id}`}
    className="flex items-center gap-2 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg px-2 -mx-2"
  >
    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center overflow-hidden">
      {player.image ? (
        <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
      ) : (
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-900 dark:text-white hover:text-[#00698c] dark:hover:text-[#00698c] transition-colors">
        {player.name}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{player.role}</p>
    </div>
    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
    </svg>
  </Link>
)

const IPLMatchTeamsPage = () => {
  const { matchId } = useParams()
  const [activeTab, setActiveTab] = useState('Teams')
  const [match, setMatch] = useState(null)
  const [teamsData, setTeamsData] = useState(null)
  
  const tabs = ['Home', 'Live', 'Teams', 'Table', 'News', 'Photos', 'Video']

  useEffect(() => {
    // Use matchId to get specific match data
    const currentMatch = iplMatches.find(m => m.id === parseInt(matchId)) || iplMatches[0]
    setMatch(currentMatch)
    
    // Get teams data for this match
    const matchTeams = iplMatchTeams[currentMatch?.id] || iplMatchTeams.default || iplMatchTeams
    setTeamsData(matchTeams)
  }, [matchId])

  if (!match || !teamsData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <>
      <SeoManager title={`IPL Match: ${match.team1.name} vs ${match.team2.name} | SportyRadar`} />
      <SportsTabs />
      <CricketTabs extraTab={{ label: 'IPL 2026', path: '/cricket/ipl' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Match header banner */}
        <div className="bg-[#00698c] text-white rounded-lg px-4 py-3 mb-4">
          <h2 className="text-base font-bold">INDIAN PREMIER LEAGUE 2026</h2>
        </div>

        {/* Match info */}
        <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm mb-4">
          <div className="flex items-center gap-4 mb-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: match.team1.color || '#dc2626' }}
              >
                {match.team1.shortName}
              </span>
              <span className="font-bold text-gray-900 dark:text-white text-sm">{match.team1.name}</span>
            </div>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">VS</span>
            <div className="flex items-center gap-2">
              <span 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: match.team2.color || '#f97316' }}
              >
                {match.team2.shortName}
              </span>
              <span className="font-bold text-gray-900 dark:text-white text-sm">{match.team2.name}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 dark:text-gray-400 mb-3">
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-0.5">Location</p>
              <p>{match.venue}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-0.5">Date & Time</p>
              <p>{match.dateTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
            <span>{match.date}</span>
            <span className="font-semibold">{match.matchNumber}</span>
          </div>

          {/* Sub tabs */}
          <div className="flex items-center gap-0 border-b border-gray-100 dark:border-gray-700 mt-3 -mx-4 px-4 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-[#00698c] text-[#00698c]'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Teams content */}
        {activeTab === 'Teams' && (
          <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Team 1 */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <span 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: match.team1.color || '#dc2626' }}
                  >
                    {match.team1.shortName}
                  </span>
                  <div>
                    <span className="font-bold text-sm text-gray-900 dark:text-white">{match.team1.name}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {teamsData.team1?.players?.length || 0} Players
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  {teamsData.team1?.players?.map((player) => (
                    <PlayerItem key={player.id} player={player} />
                  ))}
                  {(!teamsData.team1?.players || teamsData.team1.players.length === 0) && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm py-4 text-center">
                      No players found.
                    </p>
                  )}
                </div>
              </div>

              {/* Team 2 */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <span 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: match.team2.color || '#f97316' }}
                  >
                    {match.team2.shortName}
                  </span>
                  <div>
                    <span className="font-bold text-sm text-gray-900 dark:text-white">{match.team2.name}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {teamsData.team2?.players?.length || 0} Players
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  {teamsData.team2?.players?.map((player) => (
                    <PlayerItem key={player.id} player={player} />
                  ))}
                  {(!teamsData.team2?.players || teamsData.team2.players.length === 0) && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm py-4 text-center">
                      No players found.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <BlogsSection />
      </div>
    </>
  )
}

export default IPLMatchTeamsPage