

import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import SportsTabs from '@/layouts/SportsTabs'
import CricketTabs from '../components/CricketTabs'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import { iplMatches } from '@/shared/constants/cricket.data'
import { iplScorecards } from '@/shared/constants/iplScorecards'

// ─── Batting Table ────────────────────────────────────────────────────────────
const BattingTable = ({ innings, teamName }) => {
  if (!innings) return null
  const {
    batting = [],
    extras,
    total,
    didNotBat = [],
    fallOfWickets = [],
    powerplays = [],
    partnerships = [],
  } = innings

  return (
    <div className="mb-6">
      {/* Team header 
      <div className="flex items-center justify-between bg-[#00698c] dark:bg-[#005570] text-white px-3 sm:px-4 py-2.5 rounded-t-lg">
        <span className="text-sm sm:text-base font-bold">{teamName}</span>
        <span className="text-sm sm:text-base font-bold">
          {total} ({innings.overs} Ov)
        </span>
      </div>*/}

      {/* Batting header */}
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-t-0">
        <div className="grid px-3 sm:px-4 py-2" style={{ gridTemplateColumns: '1fr 36px 36px 36px 36px 52px' }}>
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Batting</span>
          {['R','B','4s','6s','SR'].map(h => (
            <span key={h} className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center">{h}</span>
          ))}
        </div>
      </div>

      {/* Batting rows */}
      <div className="border border-gray-200 dark:border-gray-700 border-t-0">
        {batting.map((player, idx) => (
          <div
            key={player.playerId || idx}
            className={`grid px-3 sm:px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
              idx % 2 === 0 ? 'bg-white dark:bg-[#1c2128]' : 'bg-gray-50/40 dark:bg-[#161b22]'
            }`}
            style={{ gridTemplateColumns: '1fr 36px 36px 36px 36px 52px' }}
          >
            <div className="min-w-0 pr-2">
              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{player.name}</p>
              {player.dismissal === 'not out' ? (
                <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">not out</p>
              ) : player.dismissal ? (
                <p className="text-xs font-medium text-gray-500 dark:text-gray-300 mt-0.5 line-clamp-1">{player.dismissal}</p>
              ) : null}
            </div>
            <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white text-center self-center">{player.runs}</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center self-center">{player.balls}</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center self-center">{player.fours}</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center self-center">{player.sixes}</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-right self-center">{Number(player.strikeRate).toFixed(2)}</span>
          </div>
        ))}

        {/* Extras */}
        {extras && (
          <div className="flex items-start justify-between px-3 sm:px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1c2128]">
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-shrink-0 mr-4">Extra</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-right">
              {extras.total} (b {extras.byes}, lb {extras.legByes}, w {extras.wides}, nb {extras.noBalls}, p {extras.penalty})
            </span>
          </div>
        )}

        {/* Total */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1c2128]">
          <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Total</span>
          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            {total} ({innings.overs} Overs, RR: {innings.runRate})
          </span>
        </div>

        {/* Did not bat */}
        {didNotBat.length > 0 && (
          <div className="flex items-start gap-3 px-3 sm:px-4 py-2.5 bg-white dark:bg-[#1c2128]">
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">Did not Bat</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{didNotBat.join(', ')}</span>
          </div>
        )}
      </div>

      {/* Bowling */}
      {innings.bowling?.length > 0 && <BowlingTable bowling={innings.bowling} />}

      {/* Fall of Wickets */}
      {fallOfWickets.length > 0 && <FallOfWicketsTable fow={fallOfWickets} />}

      {/* Powerplays */}
      {powerplays.length > 0 && <PowerplaysTable powerplays={powerplays} />}

      {/* Partnerships */}
      {partnerships.length > 0 && <PartnershipsTable partnerships={partnerships} batting={batting} />}
    </div>
  )
}

// ─── Bowling Table ────────────────────────────────────────────────────────────
const BowlingTable = ({ bowling }) => (
  <div className="mt-4">
    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-t-lg">
      <div className="grid px-3 sm:px-4 py-2" style={{ gridTemplateColumns: '1fr 36px 36px 36px 36px 36px 52px' }}>
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Bowler</span>
        {['O','M','R','W','NB','ECO'].map(h => (
          <span key={h} className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center">{h}</span>
        ))}
      </div>
    </div>
    <div className="border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-lg">
      {bowling.map((b, idx) => (
        <div
          key={idx}
          className={`grid px-3 sm:px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
            idx % 2 === 0 ? 'bg-white dark:bg-[#1c2128]' : 'bg-gray-50/40 dark:bg-[#161b22]'
          }`}
          style={{ gridTemplateColumns: '1fr 36px 36px 36px 36px 36px 52px' }}
        >
          <span className="text-xs sm:text-sm text-gray-900 dark:text-white truncate pr-2 self-center">{b.playerName}</span>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center self-center">{b.overs}</span>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center self-center">{b.maidens}</span>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center self-center">{b.runs}</span>
          <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white text-center self-center">{b.wickets}</span>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center self-center">{b.noBalls}</span>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-right self-center">{Number(b.economy).toFixed(2)}</span>
        </div>
      ))}
    </div>
  </div>
)

// ─── Fall of Wickets ──────────────────────────────────────────────────────────
const FallOfWicketsTable = ({ fow }) => (
  <div className="mt-4">
    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-t-lg">
      <div className="grid grid-cols-[1fr_120px_80px] px-3 sm:px-4 py-2">
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Fall of Wickets</span>
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center">Score</span>
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 text-right">Over</span>
      </div>
    </div>
    <div className="border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-lg">
      {fow.map((w, idx) => (
        <div
          key={idx}
          className={`grid grid-cols-[1fr_120px_80px] px-3 sm:px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
            idx % 2 === 0 ? 'bg-white dark:bg-[#1c2128]' : 'bg-gray-50/40 dark:bg-[#161b22]'
          }`}
        >
          <span className="text-xs sm:text-sm text-gray-900 dark:text-white truncate">{w.batsman}</span>
          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center">{w.score} - {w.wicket}</span>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-right">{w.over}</span>
        </div>
      ))}
    </div>
  </div>
)

// ─── Powerplays ───────────────────────────────────────────────────────────────
const PowerplaysTable = ({ powerplays }) => (
  <div className="mt-4">
    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-t-lg">
      <div className="grid grid-cols-[1fr_120px_80px] px-3 sm:px-4 py-2">
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Powerplays</span>
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center">Overs</span>
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 text-right">Runs</span>
      </div>
    </div>
    <div className="border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-lg">
      {powerplays.map((pp, idx) => (
        <div key={idx} className="grid grid-cols-[1fr_120px_80px] px-3 sm:px-4 py-2.5 bg-white dark:bg-[#1c2128] last:rounded-b-lg">
          <span className="text-xs sm:text-sm text-gray-900 dark:text-white">{pp.name}</span>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center">{pp.overs}</span>
          <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white text-right">{pp.runs}</span>
        </div>
      ))}
    </div>
  </div>
)

// ─── Partnerships ─────────────────────────────────────────────────────────────
const PartnershipsTable = ({ partnerships, batting }) => (
  <div className="mt-4">
    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-t-lg px-3 sm:px-4 py-2">
      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Partnerships</span>
    </div>
    <div className="border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-lg">
      {partnerships.map((p, idx) => {
        const parts = (p.batsmen || '').split(' / ')
        const b1 = batting.find(b => b.name === parts[0]?.trim())
        const b2 = batting.find(b => b.name === parts[1]?.trim())
        return (
          <div
            key={idx}
            className={`grid grid-cols-[1fr_1fr_80px] px-3 sm:px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 last:rounded-b-lg gap-2 ${
              idx % 2 === 0 ? 'bg-white dark:bg-[#1c2128]' : 'bg-gray-50/40 dark:bg-[#161b22]'
            }`}
          >
            <div className="min-w-0">
              {b1 && <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate">{b1.name} <span className="text-gray-500">{b1.runs}({b1.balls})</span></p>}
              {b2 && <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate mt-0.5">{b2.name} <span className="text-gray-500">{b2.runs}({b2.balls})</span></p>}
            </div>
            <div className="min-w-0 hidden sm:block">
              {b1 && <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate">{b1.name} <span className="text-gray-500">{b1.runs}({b1.balls})</span></p>}
              {b2 && <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate mt-0.5">{b2.name} <span className="text-gray-500">{b2.runs}({b2.balls})</span></p>}
            </div>
            <div className="text-right self-center">
              <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{p.runs}({p.balls})</span>
            </div>
          </div>
        )
      })}
    </div>
  </div>
)

// ─── Match Selector ───────────────────────────────────────────────────────────
const MatchSelector = ({ matches, selectedId, onSelect }) => (
  <div className="bg-white dark:bg-[#1c2128] border  border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
    <div className="px-3 sm:px-4 py-2 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Select Match</span>
    </div>
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex min-w-max">
        {matches.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`flex-shrink-0 px-3 sm:px-4 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              String(selectedId) === String(m.id)
                ? 'border-[#00698c] text-[#00698c] bg-[#00698c]/5 dark:bg-[#00698c]/10'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700  font-bold" >
              {m.team1?.code?.slice(0, 2)}
            </span>
            <span className="text-gray-400">vs</span>
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 font-bold">
              {m.team2?.code?.slice(0, 2)}
            </span>
           
          </button>
        ))}
      </div>
    </div>
  </div>
)

// ─── Main Page ────────────────────────────────────────────────────────────────
const IPLScorecardPage = () => {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const [activeInnings, setActiveInnings] = useState(1)

  const tabs = ['Home', 'Scorecard', 'Matches', 'Table', 'News', 'Photos', 'Video']

  // Tab navigation routes — News/Photos/Video ke liye proper routes
  const tabRoutes = {
    Home:      '/cricket/ipl',
    Scorecard: null, // current page
    Matches:   '/cricket/ipl',
    Table:     null,
    News:      '/cricket/news',
    Photos:    '/photogallary',
    Video:     '/vediogallary',
  }

  // Resolve match — always default to first match so page is never empty
  const resolvedId = matchId || String(iplMatches[0]?.id)
  const match = iplMatches.find(m => String(m.id) === String(resolvedId)) || iplMatches[0]

  // Try key formats: "ipl-1", "ipl-2" etc
  const scorecardKey = `ipl-${match?.id}`
  // Always show scorecard — fallback to first available scorecard if current not found
  const scorecard =
    iplScorecards[scorecardKey] ||
    iplScorecards[Object.keys(iplScorecards)[0]]

  const team1Innings = scorecard?.teams?.team1?.innings
  const team2Innings = scorecard?.teams?.team2?.innings

  const handleMatchSelect = (id) => {
    navigate(`/cricket/ipl/match/${id}/scorecard`)
  }

  return (
    <>
      <SeoManager
        title={`${match?.team1?.name || 'IPL'} vs ${match?.team2?.name || ''} Scorecard | IPL 2026 | SportyRadar`}
      />
      <SportsTabs />
      <CricketTabs extraTab={{ label: 'IPL 2026', path: '/cricket/ipl' }} />

      {/* Main layout: scorecard content + right sidebar space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex gap-6">

          {/* Left: Scorecard content — 80% width */}
          <div className="w-full lg:w-[80%] min-w-0">

            {/* IPL Banner */}
            <div className="bg-[#00698c] text-white rounded-t-lg px-3 sm:px-4 py-2.5">
              <h2 className="text-sm sm:text-base font-bold tracking-wide">INDIAN PREMIER LEAGUE  2026</h2>
            </div>

            {/* Sub-tabs */}
            <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 border-t-0 ">
              <div className="flex items-center overflow-x-auto scrollbar-hide border-b pb-3 border-gray-100 dark:border-gray-700">
                {tabs.map((tab) => {
                  const isActive = tab === 'Scorecard'
                  const route = tabRoutes[tab]
                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        if (tab === 'Scorecard') return
                        if (route) navigate(route)
                      }}
                      className={`flex-shrink-0 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        isActive
                          ? 'border-[#00698c] text-[#00698c]'
                          : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  )
                })}
              </div>

              {/* Match title bar */}
              <div className="bg-[#004d66] dark:bg-[#003344] text-white px-3 sm:px-4 py-2">
                <p className="text-xs sm:text-sm font-medium">
                  {scorecard
                    ? `${scorecard.teams.team1.name} vs ${scorecard.teams.team2.name}, ${scorecard.matchNumber}, IPL 2026`
                    : `${match?.team1?.name} vs ${match?.team2?.name}, ${match?.matchNumber}, IPL 2026`}
                </p>
              </div>

              {/* Match meta */}
              <div className="px-3 sm:px-4 py-3 sm:py-4">
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3">
                  <span className="text-xs sm:text-base font-medium text-gray-500 dark:text-gray-400">Series:</span>
                  <span className="text-xs sm:text-base font-medium text-gray-900 dark:text-white">Indian Premier League 2026</span>
                  <span className="text-xs sm:text-base font-medium text-gray-500 dark:text-gray-400">Venue:</span>
                  <span className="text-xs sm:text-base font-medium text-gray-900 dark:text-white">{scorecard?.venue || match?.venue}</span>
                  <span className="text-xs sm:text-base font-medium text-gray-500 dark:text-gray-400">Date & Time:</span>
                  <span className="text-xs sm:text-base font-medium text-gray-900 dark:text-white">
                    {scorecard?.date || match?.date}, {scorecard?.time || match?.time}
                  </span>
                  {scorecard?.toss && (
                    <>
                      <span className="text-xs sm:text-base font-medium text-gray-500 dark:text-gray-400">Toss:</span>
                      <span className="text-xs sm:text-base font-medium text-gray-900 dark:text-white">
                        {scorecard.toss.winner} won the toss and chose to {scorecard.toss.decision}
                      </span>
                    </>
                  )}
                  {scorecard?.result && (
                    <>
                      <span className="text-xs sm:text-base font-medium text-gray-500 dark:text-gray-400">Result:</span>
                      <span className="text-xs sm:text-base font-semibold text-[#00698c] dark:text-[#3399b3]">{scorecard.result}</span>
                    </>
                  )}
                  {scorecard?.playerOfTheMatch && (
                    <>
                      <span className="text-xs sm:text-base font-medium text-gray-500 dark:text-gray-400">Player of Match:</span>
                      <span className="text-xs sm:text-base font-semibold text-gray-900 dark:text-white"> {scorecard.playerOfTheMatch}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Match Selector */}
            <div className="mt-4">
              <MatchSelector
                matches={iplMatches}
                selectedId={resolvedId}
                onSelect={handleMatchSelect}
              />
            </div>

            {/* Innings toggle tabs */}
            {scorecard && (
              <>
                <div className="flex border border-gray-200 dark:border-gray-700 rounded-t-lg overflow-hidden mt-2">
                  {[1, 2].map((n) => {
                    const teamName = n === 1
                      ? scorecard.teams.team1.name
                      : scorecard.teams.team2.name
                    return (
                      <button
                        key={n}
                        onClick={() => setActiveInnings(n)}
                        className={`flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-colors ${
                          n > 1 ? 'border-l border-gray-200 dark:border-gray-700' : ''
                        } ${
                          activeInnings === n
                            ? 'bg-gray-500 text-white'
                            : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                       <span className="hidden sm:inline">{teamName} </span>Innings {n}
                      </button>
                    )
                  })}
                </div>

                {/* Scorecard content */}
                <div className="mt-0">
                  {activeInnings === 1 && team1Innings && (
                    <BattingTable innings={team1Innings} teamName={scorecard.teams.team1.name} />
                  )}
                  {activeInnings === 2 && team2Innings && (
                    <BattingTable innings={team2Innings} teamName={scorecard.teams.team2.name} />
                  )}
                </div>
              </>
            )}

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

export default IPLScorecardPage