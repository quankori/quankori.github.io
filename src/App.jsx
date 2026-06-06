import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import TripPage from './pages/TripPage.jsx'
import About from './pages/About.jsx'
import TravelBlog from './pages/TravelBlog.jsx'
import TravelBlogPost from './pages/TravelBlogPost.jsx'
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
          <Route path="/journal" element={<TravelBlog />} />
          <Route path="/journal/:slug" element={<TravelBlogPost />} />
          <Route path="/tech" element={<TechBlog />} />
          <Route path="/tech/:slug" element={<TechBlogPost />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
