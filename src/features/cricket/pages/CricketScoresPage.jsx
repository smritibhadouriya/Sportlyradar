import { memo } from 'react';
import { useNavigate } from 'react-router-dom';   // ← Added this import

import SportsTabs from '@/layouts/SportsTabs';
import CricketTabs from '../components/CricketTabs';
import SectionHeader from '@/shared/components/SectionHeader';
import BlogsSection from '@/shared/components/BlogsSection';
import SeoManager from '@/core/seo/SeoManager';
import { seoConfig } from '@/config/seo.config';

import { liveScores, upcomingMatches, recentMatches } from '@/shared/constants/cricket.data';

const LiveMatchCard = memo(({ match }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/cricket/${match.id}`)}   // Changed player → match (recommended)
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="flex items-center gap-1 text-red-500 text-xs font-semibold">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          LIVE
        </span>
      </div>

      <p className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">
        {match.series}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
        {match.matchType}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        {match.status}
      </p>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{match.team1.flag}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {match.team1.name}
            </span>
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {match.team1.score}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{match.team2.flag}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {match.team2.name}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {match.team2.score}
          </span>
        </div>
      </div>

      {match.summary && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          {match.summary}
        </p>
      )}
    </div>
  );
});

const UpcomingCard = memo(({ match }) => (
  <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex items-start justify-between mb-2">
      <div>
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          {match.series}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {match.date}
        </p>
      </div>
      <svg
        className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
      </svg>
    </div>

    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-xl">{match.team1.flag}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {match.team1.name}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl">{match.team2.flag}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {match.team2.name}
        </span>
      </div>
    </div>

    {match.venue && (
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
        {match.venue}
      </p>
    )}
  </div>
));

const CricketScoresPage = () => {
  return (
    <>
      <SeoManager
        title={seoConfig.pages.cricket.title}
        description={seoConfig.pages.cricket.description}
      />

      <SportsTabs />
      <CricketTabs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <SectionHeader title="Live Cricket Score" />

        {/* Live Matches */}
        <div className="space-y-3 mb-8">
          {liveScores.map((match) => (
            <LiveMatchCard key={match.id} match={match} />
          ))}
        </div>

        {/* Upcoming Matches */}
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
          Upcoming Matches
        </h3>
        <div className="space-y-3 mb-8">
          {upcomingMatches.map((match) => (
            <UpcomingCard key={match.id} match={match} />
          ))}
        </div>

        {/* Recent Matches */}
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
          Recent Matches
        </h3>
        <div className="space-y-3 mb-8">
          {recentMatches.map((match) => (
            <UpcomingCard key={match.id} match={match} />
          ))}
        </div>

        <BlogsSection />
      </div>
    </>
  );
};

export default CricketScoresPage;