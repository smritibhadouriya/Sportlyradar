// Mock Cricket Data

const iplLogos = {
  RCB: 'https://assets.ccbp.in/frontend/react-js/rcb-logo-img.png',
  SRH: 'https://th.bing.com/th/id/OIP.SyIHLPJQ1FBQz5_rcqzbVAHaHa?w=164&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  MI: 'https://resources.pulse.icc-cricket.com/ipl/logos/mi.svg',
  CSK: 'https://resources.pulse.icc-cricket.com/ipl/logos/csk.svg',
  KKR: 'https://resources.pulse.icc-cricket.com/ipl/logos/kkr.svg',
  DC: 'https://resources.pulse.icc-cricket.com/ipl/logos/dc.svg',
  PBKS: 'https://resources.pulse.icc-cricket.com/ipl/logos/pbks.svg',
  RR: 'https://resources.pulse.icc-cricket.com/ipl/logos/rr.svg',
  GT: 'https://resources.pulse.icc-cricket.com/ipl/logos/gt.svg',
  LSG: 'https://resources.pulse.icc-cricket.com/ipl/logos/lsg.svg',
};

export const topHeadlineMatches = [
  // Live matches
  {
    id: 'match-1',
    type: 'Live',
    sport: 'cricket',
    series: 'India Women Tour of Australia',
    team1: { 
      name: 'AUS - W', 
      flag: 'https://flagcdn.com/w320/au.png', // Australia flag
      status: 'Bowling' 
    },
    team2: { 
      name: 'IND - W', 
      flag: 'https://flagcdn.com/w320/in.png', // India flag
      score: '49 / 1 (13.4)' 
    },
  },
  {
    id: 'match-3',
    type: 'Live',
    sport: 'cricket',
    series: 'IPL 2026 — RCB vs SRH',
    team1: { 
      name: 'RCB', 
      flag: 'https://assets.ccbp.in/frontend/react-js/rcb-logo-img.png', // IPL team placeholder
      status: 'Batting' 
    },
    team2: { 
      name: 'SRH', 
      flag: 'https://th.bing.com/th/id/OIP.SyIHLPJQ1FBQz5_rcqzbVAHaHa?w=164&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', // IPL team placeholder
      score: '142 / 6 (18.2)' 
    },
  },
  // Upcoming matches
  {
    id: 'um-1',
    type: 'Upcoming',
    sport: 'cricket',
    series: "Final ICC Men's T20 World Cup, 2026",
    team1: { 
      name: 'New Zealand', 
      flag: 'https://flagcdn.com/w320/nz.png' // New Zealand flag
    },
    team2: { 
      name: 'India', 
      flag: 'https://flagcdn.com/w320/in.png' // India flag
    },
    date: 'Sun, 08 Mar, 07:00 PM',
  },
  {
    id: 'um-2',
    type: 'Upcoming',
    sport: 'cricket',
    series: "Semi Final ICC Men's T20 World Cup, 2026",
    team1: { 
      name: 'Australia', 
      flag: 'https://flagcdn.com/w320/au.png' // Australia flag
    },
    team2: { 
      name: 'England', 
      flag: 'https://flagcdn.com/w320/gb.png' // England/UK flag
    },
    date: 'Sat, 07 Mar, 03:00 PM',
  },
  // Recent matches
  {
    id: 'rm-1',
    type: 'Recent',
    sport: 'cricket',
    series: "Final ICC Men's T20 World Cup, 2026",
    team1: { 
      name: 'New Zealand', 
      flag: 'https://flagcdn.com/w320/nz.png',
      score: '180 / 4' 
    },
    team2: { 
      name: 'India', 
      flag: 'https://flagcdn.com/w320/in.png',
      score: '183 / 3' 
    },
    result: 'India won by 7 wkts',
  },
  {
    id: 'rm-2',
    type: 'Recent',
    sport: 'cricket',
    series: 'India Women Tour of Australia',
    team1: { 
      name: 'AUS - W', 
      flag: 'https://flagcdn.com/w320/au.png',
      score: '198' 
    },
    team2: { 
      name: 'IND - W', 
      flag: 'https://flagcdn.com/w320/in.png',
      score: '201 / 6' 
    },
    result: 'India Women won by 4 wkts',
  },
];
export const liveMatches = [
  {
    id: 'match-1',
    type: 'Live',
    typeLabel: 'Live',
    series: 'India Women Tour of Australia',
    team1: { name: 'AUS - W', flag: 'https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0', score: null, status: 'Bowling' },
    team2: { name: 'IND - W', flag: 'https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0', score: '49 / 1 (13.4)', status: null },
  },
  {
    id: 'match-2',
    type: 'Cricket',
    typeLabel: 'Cricket',
    series: 'India Women Tour of Australia',
    team1: { name: 'AUS - W', flag: 'https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0', score: null, status: null },
    team2: { name: 'IND - W', flag: 'https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0', score: null, status: null },
    schedule: 'Tomorrow at 10:50 am IST',
  },
  {
    id: 'match-3',
    type: 'Live',
    typeLabel: 'Live',
    series: 'India Women Tour of Australia',
    team1: { name: 'AUS - W', flag: 'https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0', score: null, status: 'Bowling' },
    team2: { name: 'IND - W', flag: 'https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0', score: '49 / 1 (13.4)', status: null },
  },
  {
    id: 'match-4',
    type: 'Live',
    typeLabel: 'Live',
    series: 'India Women Tour of Australia',
    team1: { name: 'AUS - W', flag: 'https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0', score: null, status: 'Bowling' },
    team2: { name: 'IND - W', flag: 'https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0', score: '49 / 1 (13.4)', status: null },
  },
]

export const liveScores = [
  {
    id: 'ls-1',
    isLive: true,
    series: 'India Women Tour of Australia',
    matchType: 'One-off Test, India Women in Australia, One-off Test, 2026',
    status: 'Day 1 | Stumps',
    team1: { name: 'Australia Women', flag: '🇦🇺', score: '98/3 (27.0)' },
    team2: { name: 'India Women', flag: '🇮🇳', score: '198' },
    summary: 'Australia Women lead by 102 runs',
  },
  {
    id: 'ls-2',
    isLive: true,
    series: 'India Women Tour of Australia',
    matchType: 'One-off Test, India Women in Australia, One-off Test, 2026',
    status: 'Day 1 | Stumps',
    team1: { name: 'Australia Women', flag: '🇦🇺', score: '98/3 (27.0)' },
    team2: { name: 'India Women', flag: '🇮🇳', score: '198' },
    summary: 'Australia Women lead by 102 runs',
  },
]

export const upcomingMatches = [
  {
    id: 'um-1',
    series: 'Final ICC Men\'s T20 World Cup, 2026',
    date: 'Sun, 08 Mar, 07:00 PM',
    team1: { name: 'New Zealand', flag: '🇳🇿' },
    team2: { name: 'India', flag: '🇮🇳' },
    venue: 'Narenda Modi Stadium, Ahmedabad',
  },
  {
    id: 'um-2',
    series: 'Final ICC Men\'s T20 World Cup, 2026',
    date: 'Sun, 08 Mar, 07:00 PM',
    team1: { name: 'New Zealand', flag: '🇳🇿' },
    team2: { name: 'India', flag: '🇮🇳' },
    venue: 'Narenda Modi Stadium, Ahmedabad',
  },
]

export const recentMatches = [
  {
    id: 'rm-1',
    series: 'Final ICC Men\'s T20 World Cup, 2026',
    date: 'Sun, 08 Mar, 07:00 PM',
    team1: { name: 'New Zealand', flag: '🇳🇿' },
    team2: { name: 'India', flag: '🇮🇳' },
    venue: 'Narenda Modi Stadium, Ahmedabad',
  },
  {
    id: 'rm-2',
    series: 'Final ICC Men\'s T20 World Cup, 2026',
    date: 'Sun, 08 Mar, 07:00 PM',
    team1: { name: 'New Zealand', flag: '🇳🇿' },
    team2: { name: 'India', flag: '🇮🇳' },
    venue: 'Narenda Modi Stadium, Ahmedabad',
  },
]

export const currentSeries = [
  {
    id: 'cs-1',
    name: 'T20 WorldCup 2026',
    dates: 'Feb 07 - Mar 08',
    links: ['Schedule', 'Results', 'Stats', 'News'],
  },
]

export const recentSeries = [
  {
    id: 'rs-1',
    name: 'T20 WorldCup 2026',
    dates: 'Feb 07 - Mar 08',
    links: ['Results', 'Stats', 'News'],
  },
  {
    id: 'rs-2',
    name: 'T20 WorldCup 2026',
    dates: 'Feb 07 - Mar 08',
    links: ['Results', 'Stats', 'News'],
  },
  {
    id: 'rs-3',
    name: 'T20 WorldCup 2026',
    dates: 'Feb 07 - Mar 08',
    links: ['Results', 'Stats', 'News'],
  },
  {
    id: 'rs-4',
    name: 'T20 WorldCup 2026',
    dates: 'Feb 07 - Mar 08',
    links: ['Results', 'Stats', 'News'],
  },
]

export const fixturesByDate = [
  {
    label: 'Tomorrow',
    matches: [
      {
        id: 'f-1',
        name: '2nd T20I, Bahrain in Malaysia, 3 T20I Series, 2026',
        time: 'Sun 12:30 PM',
        venue: 'Bayuemas Oval, Kuala Lumpur',
        team1: { name: 'Malaysia', flag: '🇲🇾' },
        team2: { name: 'Bahrain', flag: '🇧🇭' },
      },
      {
        id: 'f-2',
        name: '2nd T20I, Bahrain in Malaysia, 3 T20I Series, 2026',
        time: 'Sun 12:30 PM',
        venue: 'Bayuemas Oval, Kuala Lumpur',
        team1: { name: 'Malaysia', flag: '🇲🇾' },
        team2: { name: 'Bahrain', flag: '🇧🇭' },
      },
    ],
  },
  {
    label: 'Upcoming',
    matches: [
      {
        id: 'f-3',
        name: '2nd T20I, Bahrain in Malaysia, 3 T20I Series, 2026',
        time: 'Sun 12:30 PM',
        venue: 'Bayuemas Oval, Kuala Lumpur',
        team1: { name: 'Malaysia', flag: '🇲🇾' },
        team2: { name: 'Bahrain', flag: '🇧🇭' },
      },
    ],
  },
]

export const resultsByDate = [
  {
    date: 'Sat, Mar 07 2026',
    matches: [
      {
        id: 'r-1',
        name: '2nd T20I, Bahrain in Malaysia, 3 T20I Series, 2026',
        venue: 'Bayuemas Oval, Kuala Lumpur',
        team1: { name: 'Malaysia', flag: '🇲🇾', score: '98/3 (27.0)' },
        team2: { name: 'Bahrain', flag: '🇧🇭', score: '198' },
      },
      {
        id: 'r-2',
        name: '2nd T20I, Bahrain in Malaysia, 3 T20I Series, 2026',
        venue: 'Bayuemas Oval, Kuala Lumpur',
        team1: { name: 'Malaysia', flag: '🇲🇾', score: '98/3 (27.0)' },
        team2: { name: 'Bahrain', flag: '🇧🇭', score: '198' },
      },
    ],
  },
  {
    date: 'Thr, Mar 05 2026',
    matches: [
      {
        id: 'r-3',
        name: '2nd T20I, Bahrain in Malaysia, 3 T20I Series, 2026',
        venue: 'Bayuemas Oval, Kuala Lumpur',
        team1: { name: 'Malaysia', flag: '🇲🇾', score: '98/3 (27.0)' },
        team2: { name: 'Bahrain', flag: '🇧🇭', score: '198' },
      },
    ],
  },
]

export const iplTeams = [
  'Chennai Super Kings',
  'Delhi Capitals',
  'Gujarat Titans',
  'Royal Challengers Bengaluru',
  'Punjab Kings',
  'Kolkata Knight Riders',
  'Sunrisers Hyderabad',
  'Rajasthan Royals',
  'Lucknow Super Giants',
  'Mumbai Indians',
]

export const iplMatches = [
  {
    id: 'ipl-1',
    date: 'Sat, Mar 28 2026',
    matchNumber: '1st Match',
    team1: { name: 'Royal Challengers Bengaluru', code: 'RCB' },
    team2: { name: 'Sunrisers Hyderabad', code: 'SRH' },
    venue: 'Bengaluru, M.Chinnaswamy Stadium',
    time: '7:30 PM / 2:00 PM (GMT) / 7:30 PM (LOCAL)',
  },
  {
    id: 'ipl-2',
    date: 'Sat, Mar 28 2026',
    matchNumber: '1st Match',
    team1: { name: 'Royal Challengers Bengaluru', code: 'RCB' },
    team2: { name: 'Sunrisers Hyderabad', code: 'SRH' },
    venue: 'Bengaluru, M.Chinnaswamy Stadium',
    time: '7:30 PM / 2:00 PM (GMT) / 7:30 PM (LOCAL)',
  },
  {
    id: 'ipl-3',
    date: 'Sat, Mar 28 2026',
    matchNumber: '1st Match',
    team1: { name: 'Royal Challengers Bengaluru', code: 'RCB' },
    team2: { name: 'Sunrisers Hyderabad', code: 'SRH' },
    venue: 'Bengaluru, M.Chinnaswamy Stadium',
    time: '7:30 PM / 2:00 PM (GMT) / 7:30 PM (LOCAL)',
  },
  {
    id: 'ipl-4',
    date: 'Sat, Mar 28 2026',
    matchNumber: '1st Match',
    team1: { name: 'Royal Challengers Bengaluru', code: 'RCB' },
    team2: { name: 'Sunrisers Hyderabad', code: 'SRH' },
    venue: 'Bengaluru, M.Chinnaswamy Stadium',
    time: '7:30 PM / 2:00 PM (GMT) / 7:30 PM (LOCAL)',
  },
]

export const iplTeamPlayers = {
  'Royal Challengers Bengaluru': [
    {
      id: 'p-1',
      name: 'Virat Kohli',
      role: 'Top order Batter',
      age: '37y 9d',
      batting: 'Right hand Bat',
      bowling: 'Right arm Medium',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Virat_Kohli_2022.jpg/200px-Virat_Kohli_2022.jpg',
    },
    {
      id: 'p-2',
      name: 'Devdutt Padikkal',
      role: 'Top order Batter',
      age: '37y 9d',
      batting: 'Right hand Bat',
      bowling: 'Right arm Medium',
      image: null,
    },
    {
      id: 'p-3',
      name: 'Devdutt Padikkal',
      role: 'Top order Batter',
      age: '37y 9d',
      batting: 'Right hand Bat',
      bowling: 'Right arm Medium',
      image: null,
    },
    {
      id: 'p-4',
      name: 'Devdutt Padikkal',
      role: 'Top order Batter',
      age: '37y 9d',
      batting: 'Right hand Bat',
      bowling: 'Right arm Medium',
      image: null,
    },
    {
      id: 'p-5',
      name: 'Devdutt Padikkal',
      role: 'Top order Batter',
      age: '37y 9d',
      batting: 'Right hand Bat',
      bowling: 'Right arm Medium',
      image: null,
    },
  ],
  'Chennai Super Kings': [
    { id: 'p-6', name: 'MS Dhoni', role: 'Wicket Keeper', age: '44y 3d', batting: 'Right hand Bat', bowling: 'Right arm Medium', image: null },
    { id: 'p-7', name: 'Ruturaj Gaikwad', role: 'Top order Batter', age: '27y 5d', batting: 'Right hand Bat', bowling: 'Right arm Off break', image: null },
  ],
  'Delhi Capitals': [
    { id: 'p-8', name: 'Rishabh Pant', role: 'Wicket Keeper', age: '26y 2d', batting: 'Left hand Bat', bowling: 'Right arm Medium', image: null },
  ],
  'Gujarat Titans': [
    { id: 'p-9', name: 'Shubman Gill', role: 'Top order Batter', age: '24y 8d', batting: 'Right hand Bat', bowling: 'Right arm Medium', image: null },
  ],
  'Punjab Kings': [
    { id: 'p-10', name: 'Shreyas Iyer', role: 'Middle order Batter', age: '29y 4d', batting: 'Right hand Bat', bowling: 'Right arm leg break', image: null },
  ],
  'Kolkata Knight Riders': [
    { id: 'p-11', name: 'Venkatesh Iyer', role: 'All Rounder', age: '29y 1d', batting: 'Left hand Bat', bowling: 'Right arm Medium', image: null },
  ],
  'Sunrisers Hyderabad': [
    { id: 'p-12', name: 'Pat Cummins', role: 'Bowler', age: '31y 5d', batting: 'Right hand Bat', bowling: 'Right arm Fast medium', image: null },
  ],
  'Rajasthan Royals': [
    { id: 'p-13', name: 'Sanju Samson', role: 'Wicket Keeper', age: '29y 7d', batting: 'Right hand Bat', bowling: 'Right arm leg break', image: null },
  ],
  'Lucknow Super Giants': [
    { id: 'p-14', name: 'KL Rahul', role: 'Wicket Keeper', age: '32y 1d', batting: 'Right hand Bat', bowling: 'Right arm leg break', image: null },
  ],
  'Mumbai Indians': [
    { id: 'p-15', name: 'Hardik Pandya', role: 'All Rounder', age: '30y 8d', batting: 'Right hand Bat', bowling: 'Right arm Medium fast', image: null },
  ],
}

export const playerDetail = {
  id: 'p-1',
  name: 'Virat Kohli',
  born: 'November 05, 1988 (37 years)',
  birthPlace: 'Delhi',
  height: '5 ft 9 in (175 cm)',
  role: 'Batsman',
  battingStyle: 'Right Handed Bat',
  bowlingStyle: 'Right-arm medium',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Virat_Kohli_2022.jpg/200px-Virat_Kohli_2022.jpg',
  summary: `A spunky, chubby teenager with gelled hair shot to fame after leading India to glory in the Under-19 World Cup at Kuala Lumpur in early 2008. In an Indian team filled with saint-like icons worthy of their own hagiographies, Virat Kohli, with his most un-Indian, 'bad-boy' intensity, would clearly be an outcast.

A spunky, chubby teenager with gelled hair shot to fame after leading India to glory in the Under-19 World Cup at Kuala Lumpur in early 2008. In an Indian team filled with saint-like icons worthy of their own hagiographies, Virat Kohli, with his most un-Indian, 'bad-boy' intensity, would clearly be an outcast.

A spunky, chubby teenager with gelled hair shot to fame after leading India to glory in the Under-19 World Cup at Kuala Lumpur in early 2008. In an Indian team filled with saint-like icons worthy of their own hagiographies, Virat Kohli, with his most un-Indian, 'bad-boy' intensity, would clearly be an outcast.`,
}

export const iplMatchTeams = {
  team1: {
    name: 'Royal Challengers Bengaluru',
    code: 'RCB',
    players: [
      { id: 'tp-1', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-2', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-3', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-4', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-5', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-6', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-7', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-8', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-9', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-10', name: 'Virat Kohli', role: 'Batsman' },
    ],
  },
  team2: {
    name: 'Sunrisers Hyderabad',
    code: 'SRH',
    players: [
      { id: 'tp-11', name: 'Player 1', role: 'Batsman, All-Rounder' },
      { id: 'tp-12', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-13', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-14', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-15', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-16', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-17', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-18', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-19', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-20', name: 'Player 1', role: 'Batsman' },
    ],
  },
}
