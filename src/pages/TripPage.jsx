import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PhotoGrid from '../components/PhotoGrid.jsx'
import HeroMap from '../components/HeroMap.jsx'
import trips from '../data/trips.json'
import {
  tripVisitsDesc,
  tripPhotoCount,
  tripLatestDate,
  formatMonth,
  firstPhoto,
} from '../utils/trip.js'
import styles from './TripPage.module.css'

const pageIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function TripPage() {
  const { id } = useParams()
  const trip = trips.find(t => t.id === id)

  if (!trip) {
    return (
      <motion.main className={styles.notFound} {...pageIn}>
        <p className={styles.nfTitle}>Not found</p>
        <p className={styles.nfText}>This trip doesn't exist.</p>
        <Link to="/" className={styles.nfLink}>← Back home</Link>
      </motion.main>
    )
  }

  const visits = tripVisitsDesc(trip)
  const multi = visits.length > 1
  const total = tripPhotoCount(trip)
  const photoWord = total === 1 ? 'photo' : 'photos'
  const heroMeta = multi
    ? `${visits.length} visits · ${total} ${photoWord}`
    : `${formatMonth(tripLatestDate(trip))} · ${total} ${photoWord}`

  return (
    <motion.main {...pageIn}>
      {/* Hero — a zoomed-in map of the location (falls back to a photo) */}
      <header className={styles.hero}>
        {trip.coords ? (
          <HeroMap coords={trip.coords} zoom={12} />
        ) : (
          <img
            src={trip.cover || firstPhoto(trip)?.full}
            alt={trip.name}
            className={styles.heroImg}
            loading="eager"
          />
        )}
        <div className={styles.heroOverlay} />
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {trip.country && <p className={styles.heroOver}>{trip.country}</p>}
          <h1 className={styles.heroTitle}>{trip.name}</h1>
          <p className={styles.heroMeta}>{heroMeta}</p>
        </motion.div>
      </header>

      {/* Body */}
      <div className={styles.body}>
        <Link to="/" className={styles.back}>← All trips</Link>

        {visits.map((visit, i) => (
          <section key={visit.date || i} className={styles.visit}>
            {multi && (
              <div className={styles.visitHead}>
                <span className={styles.visitDate}>{formatMonth(visit.date)}</span>
                <span className={styles.rule} />
                <span className={styles.visitCount}>
                  {visit.photos.length} {visit.photos.length === 1 ? 'photo' : 'photos'}
                </span>
              </div>
            )}
            <PhotoGrid photos={visit.photos} />
          </section>
        ))}
      </div>
    </motion.main>
  )
}
