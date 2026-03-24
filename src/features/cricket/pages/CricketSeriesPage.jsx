import SportsTabs from '@/layouts/SportsTabs'
import CricketTabs from '../components/CricketTabs'
import SectionHeader from '@/shared/components/SectionHeader'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import { currentSeries, recentSeries } from '@/shared/constants/cricket.data'

const SeriesRow = ({ series }) => (
  <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-semibold text-gray-900 dark:text-white">{series.name}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{series.dates}</p>
    </div>
    <div className="flex items-center gap-4">
      {series.links.map((link) => (
        <button key={link} className="text-xs text-gray-600 dark:text-gray-400 hover:text-[#00698c] dark:hover:text-[#3387a3] font-medium transition-colors">
          {link}
        </button>
      ))}
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
      </svg>
    </div>
  </div>
)

const CricketSeriesPage = () => (
  <>
    <SeoManager title="Cricket Series | SportyRadar" />
    <SportsTabs />
    <CricketTabs />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <SectionHeader title="Cricket Series" />

      <h3 className="text-base font-bold text-gray-900  dark:text-white mb-3">Current Series</h3>
      <div className="space-y-2 mb-6">
        {currentSeries.map((s) => <SeriesRow key={s.id} series={s} />)}
      </div>

      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">Recent Series</h3>
      <div className="space-y-2 mb-8">
        {recentSeries.map((s) => <SeriesRow key={s.id} series={s} />)}
      </div>

      <BlogsSection />
    </div>
  </>
)

export default CricketSeriesPage
