import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { topHeadlineMatches } from '@/shared/constants/cricket.data'

// const TickerCard = memo(({ match, onClick }) => {
//   const isLive = match.type === 'Live'
//   const isRecent = match.type === 'Recent'
//   const isUpcoming = match.type === 'Upcoming'

//   return (
//     <div
//       onClick={onClick}
//       className="flex-shrink-0 w-48 rounded-xl p-3 bg-[#0d2d3d] shadow-sm cursor-pointer hover:bg-[#123a4d] transition-colors"
//     >
//       {/* Badge */}
//       <div className="flex items-center gap-1.5 mb-2">
//         {isLive && (
//           <span className="flex items-center gap-1 text-red-500 text-xs font-semibold">
//             <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
//             Live
//           </span>
//         )}
//         {isUpcoming && (
//           <span className="text-xs text-[#3ab4d4] font-medium">Upcoming</span>
//         )}
//         {isRecent && (
//           <span className="text-xs text-emerald-400 font-medium">Recent</span>
//         )}
//       </div>

//       {/* Series title */}
//       <p className="text-xs font-bold text-white mb-3 leading-tight line-clamp-2">
//         {match.series}
//       </p>

//       {/* Teams */}
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex flex-col items-center gap-1 flex-1">
//           <span className="text-xl">{match.team1.flag}</span>
//           <span className="text-xs font-semibold text-white/90">{match.team1.name}</span>
//         </div>
//         <span className="text-white/40 text-lg mx-2">—</span>
//         <div className="flex flex-col items-center gap-1 flex-1">
//           <span className="text-xl">{match.team2.flag}</span>
//           <span className="text-xs font-semibold text-white/90">{match.team2.name}</span>
//         </div>
//       </div>

//       {/* Bottom info */}
//       <div className="flex items-center justify-between pt-2 border-t border-white/10">
//         {isLive && (
//           <>
//             {match.team1.status && (
//               <span className="text-xs text-white/50">{match.team1.status}</span>
//             )}
//             {match.team2.score && (
//               <span className="text-xs font-bold text-white ml-auto">{match.team2.score}</span>
//             )}
//           </>
//         )}
//         {isUpcoming && (
//           <span className="text-xs text-white/50 w-full text-center">{match.date}</span>
//         )}
//         {isRecent && (
//           <span className="text-xs text-emerald-400/80 w-full text-center leading-tight">
//             {match.result}
//           </span>
//         )}
//       </div>
//     </div>
//   )
// })


const TickerCard = memo(({ match, onClick }) => {
  const isLive = match.type === 'Live'
  const isRecent = match.type === 'Recent'
  const isUpcoming = match.type === 'Upcoming'

  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-72  flex flex-col rounded-xl p-4 bg-[#0d2d3d] shadow-sm cursor-pointer hover:bg-[#123a4d] transition-colors"
    >
      {/* Badge - Fixed height */}
      <div className="h-6 flex items-center gap-1.5 mb-2">
        {isLive && (
          <span className="flex items-center gap-1 text-red-500 text-xs font-semibold">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            Live
          </span>
        )}
        {isUpcoming && (
          <span className="text-xs text-[#3ab4d4] font-medium">Upcoming</span>
        )}
        {isRecent && (
          <span className="text-xs text-emerald-400 font-medium">Recent</span>
        )}
      </div>

      {/* Series title - Fixed height with ellipsis */}
      <div className="h-10 mb-3 ">
        <p className="text-xs font-bold text-white leading-tight line-clamp-2">
          {match.series}
        </p>
      </div>

{/* Teams - Fixed height container */}
<div className="h-10 flex items-center justify-between">
  <div className="flex flex-col items-center gap-2 flex-1">
    <img 
      src={match.team1.flag} 
      alt={`${match.team1.name} flag`}
      className="w-6 h-6 object-cover rounded-full" // Consistent sizing
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://via.placeholder.com/40x40/CCCCCC/FFFFFF?text=?'; // Fallback image
      }}
    />
    <span className="text-xs font-semibold text-white/90 text-center line-clamp-1">
      {match.team1.name}
    </span>
  </div>
  <span className="text-white/40 text-lg mx-2">vs</span>
  <div className="flex flex-col items-center gap-2 flex-1">
    <img 
      src={match.team2.flag} 
      alt={`${match.team2.name} flag`}
      className="w-6 h-6 object-cover rounded-full" // Consistent sizing
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://via.placeholder.com/40x40/CCCCCC/FFFFFF?text=?'; // Fallback image
      }}
    />
    <span className="text-xs font-semibold text-white/90 text-center line-clamp-1">
      {match.team2.name}
    </span>
  </div>
</div>

      {/* Bottom info - Fixed height container */}
      <div className="h-10 flex items-center justify-between pt-3 border-t border-white/10 mt-10">
        {isLive && (
          <div className="flex items-center justify-between w-full gap-2">
            {match.team1.status && (
              <span className="text-xs text-white/50 truncate flex-1">
                {match.team1.status}
              </span>
            )}
            {match.team2.score && (
              <span className="text-xs font-bold text-white flex-shrink-0">
                {match.team2.score}
              </span>
            )}
          </div>
        )}
        {isUpcoming && (
          <span className="text-xs text-white/50 w-full text-center truncate">
            {match.date}
          </span>
        )}
        {isRecent && (
          <span className="text-xs text-emerald-400/80 w-full text-center leading-tight line-clamp-2">
            {match.result}
          </span>
        )}
      </div>
    </div>
  )
})

const LiveTicker = memo(() => {
  const [activeTab, setActiveTab] = useState('All')
  const navigate = useNavigate()

  const filtered = activeTab === 'All'
    ? topHeadlineMatches
    : topHeadlineMatches.filter((m) => m.type === activeTab)

  const handleClick = (match) => {
    if (match.sport === 'cricket') {
      navigate(`/cricket`)
    }
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 py-3">

    

          {/* Scrollable cards */}
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-1">
              {filtered.length > 0 ? (
                filtered.map((match) => (
                  <TickerCard
                    key={match.id}
                    match={match}
                    onClick={() => handleClick(match)}
                  />
                ))
              ) : (
                <p className="text-white/50 text-xs py-4 px-2">No matches found</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
})

LiveTicker.displayName = 'LiveTicker'

export default LiveTicker