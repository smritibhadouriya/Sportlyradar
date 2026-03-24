import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('@/features/home/HomePage'))
const BlogsPage = lazy(() => import('@/features/blogs/BlogsPage'))
const BlogDetailPage = lazy(() => import('@/features/blogs/BlogDetailPage'))
const ContactPage = lazy(() => import('@/features/contact/ContactPage'))


const NewsPage       = lazy(() => import('@/features/news/pages/NewsPage'))
const NewsListPage   = lazy(() => import('@/features/news/pages/NewsListPage'))
const NewsDetailPage = lazy(() => import('@/features/news/pages/NewsDetailPage'))


// Cricket pages
const CricketScoresPage = lazy(() => import('@/features/cricket/pages/CricketScoresPage'))
const CricketSeriesPage = lazy(() => import('@/features/cricket/pages/CricketSeriesPage'))
const CricketFixturesPage = lazy(() => import('@/features/cricket/pages/CricketFixturesPage'))
const CricketResultsPage = lazy(() => import('@/features/cricket/pages/CricketResultsPage'))
const IPLPage = lazy(() => import('@/features/cricket/pages/IPLPage'))
const IPLMatchTeamsPage = lazy(() => import('@/features/cricket/pages/IPLMatchTeamsPage'))
const PlayerCardPage = lazy(() => import('@/features/cricket/pages/PlayerCardPage'))
const PlayerDetailPage = lazy(() => import('@/features/cricket/pages/PlayerDetailPage'))
const TeamListPage = lazy(() => import('@/features/cricket/pages/TeamListPage'))
const NotFoundPage = lazy(() => import('./NotFoundPage'))

const Allphoto=lazy(()=>import ('../features/news/pages/Allphoto.jsx'))
const GalleryView = lazy(() =>import('../features/news/pages/Allphoto.jsx').then((mod) => ({ default: mod.GalleryView })))

const AllVideo=lazy(()=>import ('../features/news/pages/Allvedio.jsx'))
const VideoDetail= lazy(() =>import('../features/news/pages/Allvedio.jsx').then((mod) => ({ default: mod.VideoDetail })))
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },

      // Blogs
      { path: 'blogs', element: <BlogsPage /> },
      { path: 'blogs/:slug', element: <BlogDetailPage /> },

      // Contact
      { path: 'contact', element: <ContactPage /> },

      // Cricket
      { path: 'cricket', element: <CricketScoresPage /> },
      { path: 'cricket/series', element: <CricketSeriesPage /> },
      { path: 'cricket/fixtures', element: <CricketFixturesPage /> },
      { path: 'cricket/results', element: <CricketResultsPage /> },
      { path: 'cricket/ipl', element: <IPLPage /> },
      { path: 'cricket/:matchId', element: <IPLMatchTeamsPage /> },
      { path: 'cricket/ipl/teams', element: <TeamListPage /> } ,
      { path: 'cricket/players', element: <PlayerCardPage /> },
      { path: 'cricket/player/:id', element: <PlayerDetailPage /> },


         // Cricket News — list + detail
      { path: 'cricket/news',         element: <NewsListPage /> },
      { path: 'cricket/news/:slug',   element: <NewsDetailPage /> },


      { path: 'photogallary' , element:<Allphoto />},
      { path: 'photogallary/:slug'  ,element :<GalleryView />},
      
      {path:"vediogallary",element:<AllVideo />},
      {path:"vediogallary/:slug" ,element:<VideoDetail />},

      // Football (scaffold)
      { path: 'football', element: <CricketScoresPage /> },

       // Football News — list + detail
      { path: 'football/news',        element: <NewsListPage /> },
      { path: 'football/news/:slug',  element: <NewsDetailPage /> },

      // ── Other Sports ─────────────────────────────────────────────────────
      { path: 'sports/news',          element: <NewsListPage /> },
      { path: 'sports/news/:slug',    element: <NewsDetailPage /> },
            // ⚠️  replaces old BlogsPage usage for /news
      { path: 'news', element: <NewsPage /> },
         // ── Top Headlines ─────────────────────────────────────────────────────
      { path: 'headlines',            element: <NewsListPage /> },
      { path: 'headlines/:slug',      element: <NewsDetailPage /> },

      // Badminton (scaffold)
      { path: 'badminton', element: <CricketScoresPage /> },

      // Tennis (scaffold)
      { path: 'tennis', element: <CricketScoresPage /> },

      // Formula 1 (scaffold)
      { path: 'formula1', element: <CricketScoresPage /> },

      // News
      { path: 'news', element: <BlogsPage /> },

      // 404
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default router


