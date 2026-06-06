import { motion } from 'framer-motion'
import TripTile from './TripTile.jsx'
import styles from './MetroGrid.module.css'

/*
 * Metro tile sizing chosen per trip count so the 4-column grid fills its
 * rows with no gaps (combined with grid-auto-flow: dense). Hand-tuned for
 * small counts; cycles a balanced pattern beyond 8.
 */
const LAYOUTS = {
  1: ['lg'],
  2: ['lg', 'lg'],
  3: ['lg', 'wide', 'wide'],
  4: ['lg', 'sm', 'sm', 'wide'],
  5: ['lg', 'sm', 'sm', 'sm', 'sm'],
  6: ['lg', 'lg', 'sm', 'sm', 'sm', 'sm'],
  7: ['lg', 'sm', 'sm', 'wide', 'sm', 'sm', 'wide'],
  8: ['lg', 'lg', 'sm', 'sm', 'sm', 'sm', 'wide', 'wide'],
}
const CYCLE = ['lg', 'sm', 'sm', 'wide', 'sm', 'sm', 'lg', 'wide']

function layoutSizes(n) {
  if (LAYOUTS[n]) return LAYOUTS[n]
  return Array.from({ length: n }, (_, i) => CYCLE[i % CYCLE.length])
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
}

export default function MetroGrid({ trips }) {
  const sizes = layoutSizes(trips.length)
  return (
    <motion.div
      className={styles.grid}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {trips.map((trip, i) => (
        <TripTile key={trip.id} trip={trip} size={sizes[i]} />
      ))}
    </motion.div>
  )
}
