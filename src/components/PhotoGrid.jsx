import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PhotoThumb from './PhotoThumb.jsx'
import Lightbox from './Lightbox.jsx'
import styles from './PhotoGrid.module.css'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

export default function PhotoGrid({ photos }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <>
      <motion.div
        className={styles.grid}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {photos.map((photo, i) => (
          <PhotoThumb
            key={photo.id || photo.thumb || i}
            photo={photo}
            onClick={() => setLightboxIndex(i)}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
