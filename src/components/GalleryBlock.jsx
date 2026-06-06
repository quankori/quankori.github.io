import { useState, useCallback, useEffect } from 'react'
import styles from './GalleryBlock.module.css'

function parseGallery(content) {
  return content.trim().split('\n')
    .map(line => {
      const [url, caption] = line.split('|').map(s => s.trim())
      return { url, caption: caption || '' }
    })
    .filter(item => item.url)
}

export default function GalleryBlock({ content }) {
  const items = parseGallery(content)
  const [active, setActive] = useState(null)

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(e => { e.stopPropagation(); setActive(i => Math.max(0, i - 1)) }, [])
  const next = useCallback(e => { e.stopPropagation(); setActive(i => Math.min(items.length - 1, i + 1)) }, [items.length])

  useEffect(() => {
    if (active === null) return
    const handler = e => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') setActive(i => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setActive(i => Math.min(items.length - 1, i + 1))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, close, items.length])

  return (
    <>
      <div className={styles.grid}>
        {items.map(({ url, caption }, i) => (
          <button key={i} className={styles.thumb} onClick={() => setActive(i)}>
            <img src={url} alt={caption} loading="lazy" />
            {caption && <span className={styles.caption}>{caption}</span>}
          </button>
        ))}
      </div>

      {active !== null && (
        <div className={styles.overlay} onClick={close}>
          <button className={styles.close} onClick={close} aria-label="Close">✕</button>
          {active > 0 && (
            <button className={`${styles.nav} ${styles.navPrev}`} onClick={prev} aria-label="Previous">‹</button>
          )}
          <img
            className={styles.fullImg}
            src={items[active].url}
            alt={items[active].caption}
            onClick={e => e.stopPropagation()}
          />
          {active < items.length - 1 && (
            <button className={`${styles.nav} ${styles.navNext}`} onClick={next} aria-label="Next">›</button>
          )}
          {items[active].caption && (
            <p className={styles.fullCaption}>{items[active].caption}</p>
          )}
          <span className={styles.counter}>{active + 1} / {items.length}</span>
        </div>
      )}
    </>
  )
}
