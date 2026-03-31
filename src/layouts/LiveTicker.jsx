
import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { topHeadlineMatches } from '@/shared/constants/cricket.data'

const TickerCard = memo(({ match, onClick }) => {
  const isLive = match.type === 'Live'
  const isRecent = match.type === 'Recent'
  const isUpcoming = match.type === 'Upcoming'

  return (
    <div
      onClick={onClick}
      className="
        flex-shrink-0 
        w-[85vw] sm:w-96 md:w-[420px] lg:w-[440px] xl:w-[460px]
        flex flex-col rounded-xl p-4
        bg-gradient-to-r from-[#0a1628] to-[#0d2137]
        border border-white/10
        shadow-md cursor-pointer
        hover:opacity-90 transition-all
      "
    >
      {/* Badge - Fixed height with increased weight */}
      <div className="h-7 flex items-center gap-2 mb-3">
        {isLive && (
          <span className="flex items-center gap-1.5 text-red-400 text-sm font-extrabold tracking-wide">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            Live
          </span>
        )}
        {isUpcoming && (
          <span className="text-sm text-[#3ab4d4] font-extrabold tracking-wide">Upcoming</span>
        )}
        {isRecent && (
          <span className="text-sm text-emerald-400 font-extrabold tracking-wide">Recent</span>
        )}
      </div>

      {/* Series title - enhanced weight */}
      <div className="h-9 mb-4">
        <p className="text-base font-black text-white leading-tight line-clamp-2 tracking-wide">
          {match.series}
        </p>
      </div>

      {/* Teams - enhanced weight and size */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-2.5 flex-1">
          <img
            src={match.team1.flag}
            alt={`${match.team1.name} flag`}
            className="w-10 h-10 object-cover rounded-full border-2 border-white/30 shadow-md"
            onError={(e) => {
              e.target.onerror = null
              e.target.src =
                'https://via.placeholder.com/40x40/CCCCCC/FFFFFF?text=?'
            }}
          />
          <span className="text-sm font-extrabold text-white/90 text-center line-clamp-1 tracking-wide">
            {match.team1.name}
          </span>
        </div>

<div className="mx-4 flex items-center justify-center">
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    className="text-white/70"
  >
    {/* Diagonal line */}
    <line
      x1="8"
      y1="20"
      x2="20"
      y2="6"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />

    {/* v */}
    <text
      x="6"
      y="14"
      fill="currentColor"
      fontSize="15"
      fontWeight="500"
      fontStyle="italic"
    >
      v
    </text>

    {/* s */}
    <text
      x="13"
      y="19"
      fill="currentColor"
      fontSize="15"
      fontWeight="500"
      fontStyle="italic"
    >
      s
    </text>
  </svg>
</div>

        <div className="flex flex-col items-center gap-2.5 flex-1">
          <img
            src={match.team2.flag}
            alt={`${match.team2.name} flag`}
            className="w-10 h-10 object-cover rounded-full border-2 border-white/30 shadow-md"
            onError={(e) => {
              e.target.onerror = null
              e.target.src =
                'https://via.placeholder.com/40x40/CCCCCC/FFFFFF?text=?'
            }}
          />
          <span className="text-sm font-extrabold text-white/90 text-center line-clamp-1 tracking-wide">
            {match.team2.name}
          </span>
        </div>
      </div>

      {/* Bottom info - enhanced weight */}
      <div className="h-10 flex items-center justify-between pt-3 border-t border-white/10 mt-4">
        {isLive && (
          <div className="flex items-center justify-between w-full gap-3">
            {match.team1.status && (
              <span className="text-xs font-bold text-white/70 truncate flex-1 tracking-wide">
                {match.team1.status}
              </span>
            )}
            {match.team2.score && (
              <span className="text-sm font-black text-white flex-shrink-0 tracking-wide">
                {match.team2.score}
              </span>
            )}
          </div>
        )}

        {isUpcoming && (
          <span className="text-sm font-bold text-white/60 w-full text-center truncate tracking-wide">
            {match.date}
          </span>
        )}

        {isRecent && (
          <span className="text-sm font-extrabold text-emerald-400/90 w-full text-center leading-tight line-clamp-2 tracking-wide">
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

  const filtered =
    activeTab === 'All'
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
            <div className="flex gap-4 pb-2">
              {filtered.length > 0 ? (
                filtered.map((match) => (
                  <TickerCard
                    key={match.id}
                    match={match}
                    onClick={() => handleClick(match)}
                  />
                ))
              ) : (
                <p className="text-white/50 text-sm font-bold py-4 px-2">
                  No matches found
                </p>
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

// // export default LiveTicker
// import { memo, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { topHeadlineMatches } from '@/shared/constants/cricket.data'

// const TickerCard = memo(({ match, onClick }) => {
//   const isLive = match.type === 'Live'
//   const isRecent = match.type === 'Recent'
//   const isUpcoming = match.type === 'Upcoming'

//   return (
//     <div
//       onClick={onClick}
//       className="
//         flex-shrink-0 w-80 flex flex-col rounded-xl p-3
//         bg-gradient-to-r from-[#0a1628] to-[#0d2137]
//         border border-white/10
//         shadow-md cursor-pointer
//         hover:opacity-90 transition-all
//       "
//     >
//       {/* Badge - Fixed height */}
//       <div className="h-6 flex items-center gap-1.5 mb-2">
//         {isLive && (
//           <span className="flex items-center gap-1.5 text-red-400 text-xs font-bold">
//             <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
//             Live
//           </span>
//         )}
//         {isUpcoming && (
//           <span className="text-xs text-[#3ab4d4] font-bold">Upcoming</span>
//         )}
//         {isRecent && (
//           <span className="text-xs text-emerald-400 font-bold">Recent</span>
//         )}
//       </div>

//       {/* Series title */}
//       <div className="h-8 mb-3">
//         <p className="text-sm font-extrabold text-white leading-tight line-clamp-2 tracking-wide">
//           {match.series}
//         </p>
//       </div>

//       {/* Teams */}
//       <div className="flex items-center justify-between">
//         <div className="flex flex-col items-center gap-2 flex-1">
//           <img
//             src={match.team1.flag}
//             alt={`${match.team1.name} flag`}
//             className="w-8 h-8 object-cover rounded-full border border-white/20"
//             onError={(e) => {
//               e.target.onerror = null
//               e.target.src =
//                 'https://via.placeholder.com/40x40/CCCCCC/FFFFFF?text=?'
//             }}
//           />
//           <span className="text-xs font-bold text-white/90 text-center line-clamp-1">
//             {match.team1.name}
//           </span>
//         </div>

//         <span className="text-white/40 text-xl mx-2 font-light">vs</span>

//         <div className="flex flex-col items-center gap-2 flex-1">
//           <img
//             src={match.team2.flag}
//             alt={`${match.team2.name} flag`}
//             className="w-8 h-8 object-cover rounded-full border border-white/20"
//             onError={(e) => {
//               e.target.onerror = null
//               e.target.src =
//                 'https://via.placeholder.com/40x40/CCCCCC/FFFFFF?text=?'
//             }}
//           />
//           <span className="text-xs font-bold text-white/90 text-center line-clamp-1">
//             {match.team2.name}
//           </span>
//         </div>
//       </div>

//       {/* Bottom info */}
//       <div className="h-9 flex items-center justify-between pt-2 border-t border-white/10 mt-3">
//         {isLive && (
//           <div className="flex items-center justify-between w-full gap-2">
//             {match.team1.status && (
//               <span className="text-xs font-semibold text-white/60 truncate flex-1">
//                 {match.team1.status}
//               </span>
//             )}
//             {match.team2.score && (
//               <span className="text-xs font-extrabold text-white flex-shrink-0">
//                 {match.team2.score}
//               </span>
//             )}
//           </div>
//         )}

//         {isUpcoming && (
//           <span className="text-xs font-semibold text-white/50 w-full text-center truncate">
//             {match.date}
//           </span>
//         )}

//         {isRecent && (
//           <span className="text-xs font-semibold text-emerald-400/80 w-full text-center leading-tight line-clamp-2">
//             {match.result}
//           </span>
//         )}
//       </div>
//     </div>
//   )
// })

// const LiveTicker = memo(() => {
//   const [activeTab, setActiveTab] = useState('All')
//   const navigate = useNavigate()

//   const filtered =
//     activeTab === 'All'
//       ? topHeadlineMatches
//       : topHeadlineMatches.filter((m) => m.type === activeTab)

//   const handleClick = (match) => {
//     if (match.sport === 'cricket') {
//       navigate(`/cricket`)
//     }
//   }

//   return (
//     <div>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="flex items-center gap-4 py-3">

//           {/* Scrollable cards */}
//           <div className="flex-1 overflow-x-auto scrollbar-hide">
//             <div className="flex gap-3 pb-1">
//               {filtered.length > 0 ? (
//                 filtered.map((match) => (
//                   <TickerCard
//                     key={match.id}
//                     match={match}
//                     onClick={() => handleClick(match)}
//                   />
//                 ))
//               ) : (
//                 <p className="text-white/50 text-xs py-4 px-2">
//                   No matches found
//                 </p>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// })

// LiveTicker.displayName = 'LiveTicker'

// export default LiveTicker