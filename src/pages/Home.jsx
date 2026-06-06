import { motion } from 'framer-motion'
import TravelMap from '../components/TravelMap.jsx'
import MetroGrid from '../components/MetroGrid.jsx'
import trips from '../data/trips.json'
import styles from './Home.module.css'

export default function Home() {
  const places = trips.length
  const countries = new Set(trips.map(t => t.country).filter(Boolean)).size

  return (
    <motion.main
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.22 } }}
    >
      <section className={styles.intro}>
        <p className={styles.overline}>Travel photo archive</p>
        <h1 className={styles.title}>Places I've been</h1>
        <p className={styles.meta}>
          {places} {places === 1 ? 'destination' : 'destinations'}
          {countries ? ` · ${countries} ${countries === 1 ? 'country' : 'countries'}` : ''}
        </p>
      </section>

      <section className={styles.mapSection}>
        <TravelMap trips={trips} />
      </section>

      <section className={styles.gridSection}>
        <div className={styles.gridHead}>
          <span className={styles.gridLabel}>All trips</span>
          <span className={styles.rule} />
        </div>
        <MetroGrid trips={trips} />
      </section>
    </motion.main>
  )
}
