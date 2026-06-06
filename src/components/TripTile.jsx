import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { tripVisits, tripLatestDate, formatShort, firstPhoto } from '../utils/trip.js'
import styles from './TripTile.module.css'

const item = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function TripTile({ trip, size }) {
  const visits = tripVisits(trip)
  const latest = tripLatestDate(trip)
  const detail = visits.length > 1 ? `${visits.length} visits` : formatShort(latest)
  const cover = trip.cover || firstPhoto(trip)?.thumb

  return (
    <motion.div className={`${styles.tile} ${styles[size]}`} variants={item}>
      <Link to={`/trip/${trip.id}`} className={styles.inner}>
        <img
          src={cover}
          alt={trip.name}
          className={styles.img}
          loading="lazy"
        />
        <div className={styles.gradient} />

        {/* default label, bottom-left */}
        <div className={styles.label}>
          <span className={styles.labelName}>{trip.name}</span>
          <span className={styles.labelMeta}>
            {trip.country ? `${trip.country} · ` : ''}{detail}
          </span>
        </div>

        {/* glass card revealed on hover */}
        <div className={styles.card}>
          {trip.country && <span className={styles.cardOver}>{trip.country}</span>}
          <span className={styles.cardName}>{trip.name}</span>
          <span className={styles.cardDate}>{detail}</span>
        </div>
      </Link>
    </motion.div>
  )
}
