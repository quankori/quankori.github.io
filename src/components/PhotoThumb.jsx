import { motion } from 'framer-motion'
import { photoDimensions, photoSrcSet } from '../utils/photo.js'
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
    <motion.button
      type="button"
      className={styles.thumb}
      variants={item}
      onClick={onClick}
      aria-label={`Open photo${photo.description ? `: ${photo.description}` : ''}`}
    >
      <img
        src={photo.thumb}
        srcSet={photoSrcSet(photo)}
        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
        {...photoDimensions(photo)}
        alt={photo.description || ''}
        className={styles.img}
        loading="lazy"
        decoding="async"
      />
      <span className={styles.expand} aria-hidden="true">⤢</span>
      {photo.description && (
        <div className={styles.caption}>
          <span>{photo.description}</span>
        </div>
      )}
    </motion.button>
  )
}
