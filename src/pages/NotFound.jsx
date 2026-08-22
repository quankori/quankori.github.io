import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <main className="route-not-found">
      <Seo
        title="Page not found"
        description="The page you requested does not exist."
        path={window.location.pathname}
        noIndex
      />
      <p className="route-not-found__code">404</p>
      <h1>Page not found</h1>
      <p>The page may have moved, or the address may be incorrect.</p>
      <Link to="/">← Back home</Link>
    </main>
  )
}
