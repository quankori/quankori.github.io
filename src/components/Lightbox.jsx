import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Lightbox.module.css'

function ExifStrip({ exif }) {
  const settings = [
    exif.f && `ƒ/${exif.f}`,
    exif.ss && `${exif.ss}s`,
    exif.iso && `ISO ${exif.iso}`,
    exif.focal && exif.focal,
  ].filter(Boolean)
  const device = [exif.camera, exif.lens].filter(Boolean).join(' · ')

  if (!settings.length && !device) return null

  return (
    <div className={styles.exif}>
      {settings.length > 0 && (
        <div className={styles.exifSettings}>
          {settings.map((s, i) => (
            <span key={i} className={styles.exifItem}>{s}</span>
          ))}
        </div>
      )}
      {device && <span className={styles.exifDevice}>{device}</span>}
    </div>
  )
}

export default function Lightbox({ photos, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex)
  const touchStartX = useRef(null)

  const prev = useCallback(
    () => setIndex(i => (i - 1 + photos.length) % photos.length),
    [photos.length]
  )
  const next = useCallback(
    () => setIndex(i => (i + 1) % photos.length),
    [photos.length]
  )

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, onClose])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const photo = photos[index]

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        if (touchStartX.current === null) return
        const delta = e.changedTouches[0].clientX - touchStartX.current
        if (delta > 55) prev()
        else if (delta < -55) next()
        touchStartX.current = null
      }}
    >
      {/* Close */}
      <button
        className={styles.close}
        onClick={e => { e.stopPropagation(); onClose() }}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Prev arrow */}
      {photos.length > 1 && (
        <button
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={e => { e.stopPropagation(); prev() }}
          aria-label="Previous photo"
        >
          ←
        </button>
      )}

      {/* Image frame */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          className={styles.frame}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          onClick={e => e.stopPropagation()}
        >
          <img
            src={photo.full}
            alt={photo.description || ''}
            className={styles.img}
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* Caption + EXIF — fixed to the viewport so it's never clipped */}
      {(photo.description || photo.exif) && (
        <div className={styles.caption} onClick={e => e.stopPropagation()}>
          {photo.description && <p className={styles.capText}>{photo.description}</p>}
          {photo.exif && <ExifStrip exif={photo.exif} />}
        </div>
      )}

      {/* Next arrow */}
      {photos.length > 1 && (
        <button
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={e => { e.stopPropagation(); next() }}
          aria-label="Next photo"
        >
          →
        </button>
      )}

      {/* Counter */}
      {photos.length > 1 && (
        <div className={styles.counter}>
          {index + 1} / {photos.length}
        </div>
      )}
    </motion.div>
  )
}
