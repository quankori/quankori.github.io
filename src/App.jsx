import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import TripPage from './pages/TripPage.jsx'
import About from './pages/About.jsx'

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
        </Routes>
      </AnimatePresence>
    </>
  )
}
