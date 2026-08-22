import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BentoGrid from '../components/BentoGrid.jsx'
import Lightbox from '../components/Lightbox.jsx'
import Seo, { SITE_URL } from '../components/Seo.jsx'
import photos from '../data/streetPhotos.json'
import styles from './StreetPhotography.module.css'

const PAGE_SIZE = 10

const pageIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function StreetPhotography() {
  const [visibleCount, setVisibleCount] = useState(Math.min(PAGE_SIZE, photos.length))
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const sentinelRef = useRef(null)

  const hasMore = visibleCount < photos.length

  const loadMore = useCallback(() => {
    setVisibleCount(c => Math.min(c + PAGE_SIZE, photos.length))
  }, [])

  useEffect(() => {
    if (!hasMore) return
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) loadMore()
      },
      { rootMargin: '600px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, loadMore])

  const visible = photos.slice(0, visibleCount)

  return (
    <motion.main className={styles.page} {...pageIn}>
      <Seo
        title="Street Photography"
        description="Candid street photography by Quan Kori: fleeting light, architecture, people, and the everyday rhythm of cities in Vietnam."
        path="/street-photography"
        image={photos[0]?.full}
        imageAlt={photos[0]?.description || 'Street photography by Quan Kori'}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: 'Street Photography by Quan Kori',
          url: `${SITE_URL}/street-photography/`,
          numberOfItems: photos.length,
          image: photos.slice(0, 12).map(photo => photo.full),
          author: { '@type': 'Person', name: 'Quan Kori' },
        }}
      />
      <header className={styles.header}>
        <p className={styles.overline}>On the Streets</p>
        <h1 className={styles.title}>Street Photography</h1>
        <p className={styles.subtitle}>
          Candid moments, fleeting light, and the everyday rhythm of the streets.
        </p>
      </header>

      <BentoGrid photos={visible} onPhotoClick={setLightboxIndex} />

      {hasMore && (
        <div ref={sentinelRef} className={styles.sentinel}>
          <span className={styles.loadingDot} />
        </div>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </motion.main>
  )
}
