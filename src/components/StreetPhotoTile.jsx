import { motion } from 'framer-motion'
import styles from './StreetPhotoTile.module.css'

const item = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function StreetPhotoTile({ photo, size, onClick }) {
  return (
    <motion.div
      className={`${styles.tile} ${styles[size]}`}
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '80px' }}
      whileHover="hover"
      onClick={onClick}
    >
      <motion.img
        src={photo.thumb}
        alt={photo.description || ''}
        className={styles.img}
        loading="lazy"
        variants={{ hover: { scale: 1.07, filter: 'brightness(0.86)' } }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className={styles.gradient} />
      <span className={styles.expand} aria-hidden="true">⤢</span>
      {(photo.location || photo.description) && (
        <div className={styles.caption}>
          {photo.location && <span className={styles.location}>{photo.location}</span>}
          {photo.description && <span className={styles.desc}>{photo.description}</span>}
        </div>
      )}
    </motion.div>
  )
}
