import { useParams } from 'react-router-dom'
import SportsTabs from '@/layouts/SportsTabs'
import CricketTabs from '../components/CricketTabs'
import SectionHeader from '@/shared/components/SectionHeader'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import { playerDetail } from '@/shared/constants/cricket.data'

const PlayerDetailPage = () => {
  const { id } = useParams()
  // In production, fetch player by id. Using mock data.
  const player = playerDetail

  return (
    <>
      <SeoManager title={`${player.name} | SportyRadar`} />
      <SportsTabs />
      <CricketTabs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <SectionHeader title="Player Info" />

        <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm mb-8">
          {/* Player header */}
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div className="flex-shrink-0">
              <div className="w-40 h-44 rounded-lg overflow-hidden bg-gradient-to-br from-orange-100 to-blue-100">
                {player.image ? (
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{player.name}</h2>
              <div className="space-y-1.5">
                {[
                  ['Born', player.born],
                  ['Birth Place', player.birthPlace],
                  ['Height', player.height],
                  ['Role', player.role],
                  ['Batting Style', player.battingStyle],
                  ['Bowling Style', player.bowlingStyle],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Summary</p>
            {player.summary.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                {para}
              </p>
            ))}
          </div>
        </div>

        <BlogsSection />
      </div>
    </>
  )
}

export default PlayerDetailPage
