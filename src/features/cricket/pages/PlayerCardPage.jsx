import { useState } from 'react'
import SportsTabs from '@/layouts/SportsTabs'
import CricketTabs from '../components/CricketTabs'
import SectionHeader from '@/shared/components/SectionHeader'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import { iplTeams, iplTeamPlayers } from '@/shared/constants/cricket.data'
import { Link } from 'react-router-dom'

const PlayerRow = ({ player }) => (
  <Link
    to={`/cricket/player/${player.id}`}
    className="flex items-center gap-3 p-4 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
  >
    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-yellow-100">
      {player.image ? (
        <img src={player.image} alt={player.name} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-purple-300 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{player.name}</h4>
      <p className="text-xs text-gray-500 dark:text-gray-400">{player.role}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">Age: {player.age}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Batting: <span className="font-semibold text-gray-700 dark:text-gray-300">{player.batting}</span>
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Bowling: <span className="font-semibold text-gray-700 dark:text-gray-300">{player.bowling}</span>
      </p>
    </div>
    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
    </svg>
  </Link>
)

const PlayerCardPage = () => {
  const [selectedTeam, setSelectedTeam] = useState('Royal Challengers Bengaluru')
  const [showDropdown, setShowDropdown] = useState(false)

  const players = iplTeamPlayers[selectedTeam] || []

  return (
    <>
      <SeoManager title="Player Info | SportyRadar" />
      <SportsTabs />
      <CricketTabs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <SectionHeader title="Player Info" />

        {/* Team Selector */}
        <div className="relative inline-block mb-4">
          <button
            onClick={() => setShowDropdown((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1c2128] hover:border-[#00698c] transition-colors"
          >
            {selectedTeam || 'Select Team'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showDropdown && (
            <div className="absolute top-full mt-1 left-0 z-20 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg min-w-[220px]">
              {iplTeams.map((team) => (
                <button
                  key={team}
                  onClick={() => { setSelectedTeam(team); setShowDropdown(false) }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    selectedTeam === team ? 'text-[#00698c] font-semibold' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {team}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Team Name */}
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">{selectedTeam}</h3>

        {/* Players */}
        <div className="space-y-3 mb-8">
          {players.map((player) => (
            <PlayerRow key={player.id} player={player} />
          ))}
          {players.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm py-4">No players found for this team.</p>
          )}
        </div>

        <BlogsSection />
      </div>
    </>
  )
}

export default PlayerCardPage
