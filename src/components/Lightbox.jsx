import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { photoDimensions, photoSourceUrl, photoSrcSet } from '../utils/photo.js'
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
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  const prev = useCallback(
    () => setIndex(i => (i - 1 + photos.length) % photos.length),
    [photos.length]
  )
  const next = useCallback(
    () => setIndex(i => (i + 1) % photos.length),
    [photos.length]
  )

  useEffect(() => {
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()

    const onKey = e => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') onClose()
      else if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button, a[href]')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.()
    }
  }, [prev, next, onClose])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const photo = photos[index]
  const sourceUrl = photoSourceUrl(photo)

  return (
    <motion.div
      ref={dialogRef}
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
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
        ref={closeRef}
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
            srcSet={photoSrcSet(photo)}
            sizes="100vw"
            {...photoDimensions(photo)}
            alt={photo.description || ''}
            className={styles.img}
            loading="eager"
            decoding="async"
          />
        </motion.div>
      </AnimatePresence>

      {/* Caption + EXIF — fixed to the viewport so it's never clipped */}
      {(photo.description || photo.exif || sourceUrl) && (
        <div className={styles.caption} onClick={e => e.stopPropagation()}>
          {photo.description && <p className={styles.capText}>{photo.description}</p>}
          {photo.exif && <ExifStrip exif={photo.exif} />}
          {sourceUrl && (
            <a
              className={styles.source}
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Flickr ↗
            </a>
          )}
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
        <div className={styles.counter} aria-live="polite">
          {index + 1} / {photos.length}
        </div>
      )}
    </motion.div>
  )
}
