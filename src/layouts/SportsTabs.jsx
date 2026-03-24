import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { appConfig } from '@/config/app.config'
import LiveTicker from './LiveTicker'

const SportsTabs = memo(() => {
  const location = useLocation()

  const isActive = (sport) => {
    if (sport.id === 'all') return location.pathname === '/'
    return location.pathname.startsWith(sport.path || '')
  }

  return (
    <div className="bg-[#0a3d4f] dark:bg-[#0a1628]">
      <LiveTicker/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
          {appConfig.sports.map((sport) => {
            const active = isActive(sport)
            return (
              <Link
                key={sport.id}
                to={sport.path || '/'}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
                  active
                    ? 'bg-[#00698c] text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {sport.emoji && <span>{sport.emoji}</span>}
                {sport.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
})

SportsTabs.displayName = 'SportsTabs'

export default SportsTabs
