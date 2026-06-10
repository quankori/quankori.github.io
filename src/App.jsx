import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import TripPage from './pages/TripPage.jsx'
import About from './pages/About.jsx'
import PhotographyBlog from './pages/PhotographyBlog.jsx'
import PhotographyBlogPost from './pages/PhotographyBlogPost.jsx'
import StreetPhotography from './pages/StreetPhotography.jsx'
import TechBlog from './pages/TechBlog.jsx'
import TechBlogPost from './pages/TechBlogPost.jsx'

export default function App() {
  const location = useLocation()

  return (
    <>
      <NavBar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/trip/:id" element={<TripPage />} />
          <Route path="/photography" element={<PhotographyBlog />} />
          <Route path="/photography/:slug" element={<PhotographyBlogPost />} />
          <Route path="/street-photography" element={<StreetPhotography />} />
          <Route path="/tech" element={<TechBlog />} />
          <Route path="/tech/:slug" element={<TechBlogPost />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
