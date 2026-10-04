import { Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout.jsx'
import ArticleView from './components/ArticleView.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<About />} />
        <Route path=":category/:slug" element={<ArticleView />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
