import { motion } from 'framer-motion'
import styles from './PhotoThumb.module.css'

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
}

export default function PhotoThumb({ photo, onClick }) {
  return (
    <motion.div
      className={styles.thumb}
      variants={item}
      onClick={onClick}
    >
      <img
        src={photo.thumb}
        alt={photo.description || ''}
        className={styles.img}
        loading="lazy"
      />
      <span className={styles.expand} aria-hidden="true">⤢</span>
      {photo.description && (
        <div className={styles.caption}>
          <span>{photo.description}</span>
        </div>
      )}
    </motion.div>
  )
}
