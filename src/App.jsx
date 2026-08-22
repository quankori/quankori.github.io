import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const TripPage = lazy(() => import('./pages/TripPage.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const PhotographyBlog = lazy(() => import('./pages/PhotographyBlog.jsx'))
const PhotographyBlogPost = lazy(() => import('./pages/PhotographyBlogPost.jsx'))
const StreetPhotography = lazy(() => import('./pages/StreetPhotography.jsx'))
const TechBlog = lazy(() => import('./pages/TechBlog.jsx'))
const TechBlogPost = lazy(() => import('./pages/TechBlogPost.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function RouteEffects() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <RouteEffects />
      <NavBar />
      <Suspense fallback={<div className="route-loading" role="status">Loading…</div>}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/trip/:id" element={<TripPage />} />
            <Route path="/photography" element={<PhotographyBlog />} />
            <Route path="/photography/:slug" element={<PhotographyBlogPost />} />
            <Route path="/street-photography" element={<StreetPhotography />} />
            <Route path="/tech" element={<TechBlog />} />
            <Route path="/tech/:slug" element={<TechBlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </>
  )
}
