import { memo } from 'react'
import { Link } from 'react-router-dom'

const MatchCard = memo(({ match, showScore = false }) => {
  return (
    <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-white">{match.name || match.series}</p>
          {match.venue && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{match.venue}</p>
          )}
          {match.date && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{match.date}</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          {match.time && (
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{match.time}</span>
          )}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{match.team1.flag}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{match.team1.name}</span>
          </div>
          {showScore && match.team1.score && (
            <span className="text-sm font-bold text-gray-900 dark:text-white">{match.team1.score}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{match.team2.flag}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{match.team2.name}</span>
          </div>
          {showScore && match.team2.score && (
            <span className="text-sm font-bold text-gray-900 dark:text-white">{match.team2.score}</span>
          )}
        </div>
      </div>
    </div>
  )
})

MatchCard.displayName = 'MatchCard'

export default MatchCard
