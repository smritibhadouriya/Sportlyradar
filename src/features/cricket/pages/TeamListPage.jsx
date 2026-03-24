import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom' // or useLocation if you prefer
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
    className="flex items-center gap-3 p-4 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
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

const TeamListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedTeam, setSelectedTeam] = useState('Royal Challengers Bengaluru')

  // Read team from URL on component mount and when URL changes
  useEffect(() => {
    const teamFromUrl = searchParams.get('team')
    if (teamFromUrl && iplTeams.includes(teamFromUrl)) {
      setSelectedTeam(teamFromUrl)
    }
  }, [searchParams])

  // Update URL when team changes
  const handleTeamChange = (team) => {
    setSelectedTeam(team)
    setSearchParams({ team: team })
  }

  const players = iplTeamPlayers[selectedTeam] || []

  return (
    <>
      <SeoManager title={`IPL 2026 Teams - ${selectedTeam} | SportyRadar`} />
      <SportsTabs />
      <CricketTabs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <SectionHeader title={`IPL 2026 Teams - ${selectedTeam}`} />

        <div className="flex gap-4">
          {/* Teams sidebar */}
          <div className="w-56 flex-shrink-0 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm self-start">
            {iplTeams.map((team) => (
              <button
                key={team}
                onClick={() => handleTeamChange(team)}
                className={`w-full text-left px-4 py-3 text-sm border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center justify-between transition-colors ${
                  selectedTeam === team
                    ? 'bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {team}
                {selectedTeam === team && (
                  <svg className="w-4 h-4 text-[#00698c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Players list */}
          <div className="flex-1 space-y-3">
            {players.map((player) => (
              <PlayerRow key={player.id} player={player} />
            ))}
            {players.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm py-8 text-center">No players found.</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <BlogsSection />
        </div>
      </div>
    </>
  )
}

export default TeamListPage