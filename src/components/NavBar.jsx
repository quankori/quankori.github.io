import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import trips from '../data/trips.json'
import styles from './NavBar.module.css'

export default function NavBar() {
  const { pathname } = useLocation()
  const match = pathname.match(/^\/trip\/(.+)$/)
  const trip = match ? trips.find(t => t.id === match[1]) : null

  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.dot} />
          TRAVELS
        </Link>

        {trip && (
          <motion.span
            className={styles.crumb}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.12 }}
          >
            <span className={styles.sep}>/</span>
            <span>{trip.name}</span>
          </motion.span>
        )}

        <div className={styles.links}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Trips
          </NavLink>
          <NavLink
            to="/journal"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Journal
          </NavLink>
          <NavLink
            to="/tech"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Tech
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </motion.nav>
  )
}
