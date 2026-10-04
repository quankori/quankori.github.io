import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { cx, exifChips } from './photoUtils'
import styles from './Lightbox.module.css'

/**
 * Full-screen photo viewer.
 * photos: [{ thumb, full, description, meta?, exif? }]
 * index: number | null (null = closed)
 */
export default function Lightbox({ photos, index, onClose, onNavigate }) {
  if (index == null || !photos[index] || typeof document === 'undefined') return null
  return createPortal(
    <LightboxDialog photos={photos} index={index} onClose={onClose} onNavigate={onNavigate} />,
    document.body,
  )
}

const FOCUSABLE = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'

function LightboxDialog({ photos, index, onClose, onNavigate }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const touchRef = useRef(null)
  const [status, setStatus] = useState({ src: null, state: 'loading' })

  const photo = photos[index]
  const count = photos.length
  const hasMany = count > 1
  const state = status.src === photo.full ? status.state : 'loading'
  const chips = exifChips(photo.exif)

  const go = useCallback(
    (delta) => {
      if (count > 1) onNavigate((index + delta + count) % count)
    },
    [count, index, onNavigate],
  )

  // Body scroll lock, initial focus, focus restore.
  useEffect(() => {
    const previous = document.activeElement
    const { body, documentElement } = document
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    closeRef.current?.focus()
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
      if (previous instanceof HTMLElement && document.contains(previous)) {
        previous.focus({ preventScroll: true })
      }
    }
  }, [])

  // Keyboard: Esc, arrows, focus trap.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'Tab') {
        const root = dialogRef.current
        const nodes = root ? Array.from(root.querySelectorAll(FOCUSABLE)) : []
        if (!nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        const active = document.activeElement
        if (!root.contains(active)) {
          e.preventDefault()
          first.focus()
        } else if (e.shiftKey && active === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [go, onClose])

  // Warm the cache for neighbouring photos.
  useEffect(() => {
    if (count < 2) return
    for (const d of [1, -1]) {
      const p = photos[(index + d + count) % count]
      if (p?.full) {
        const img = new Image()
        img.src = p.full
      }
    }
  }, [index, count, photos])

  const onTouchStart = (e) => {
    const t = e.touches[0]
    touchRef.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e) => {
    const start = touchRef.current
    touchRef.current = null
    if (!start) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1)
  }

  return (
    <div
      ref={dialogRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <div className={styles.topbar}>
        <span className={styles.counter} aria-live="polite">
          {index + 1} / {count}
        </span>
        <button
          ref={closeRef}
          type="button"
          className={styles.iconBtn}
          onClick={onClose}
          aria-label="Close photo viewer"
        >
          <CloseOutlined />
        </button>
      </div>

      <div className={styles.stage} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <img key={`thumb-${photo.thumb}`} className={styles.placeholder} src={photo.thumb} alt="" aria-hidden="true" />
        {state !== 'error' && (
          <img
            key={photo.full}
            className={cx(styles.full, state === 'loaded' && styles.loaded)}
            src={photo.full}
            alt={photo.description || 'Photo'}
            onLoad={() => setStatus({ src: photo.full, state: 'loaded' })}
            onError={() => setStatus({ src: photo.full, state: 'error' })}
          />
        )}
        {state === 'loading' && <span className={styles.spinner} aria-hidden="true" />}
        {hasMany && (
          <>
            <button
              type="button"
              className={cx(styles.iconBtn, styles.nav, styles.prev)}
              onClick={() => go(-1)}
              aria-label="Previous photo"
            >
              <LeftOutlined />
            </button>
            <button
              type="button"
              className={cx(styles.iconBtn, styles.nav, styles.next)}
              onClick={() => go(1)}
              aria-label="Next photo"
            >
              <RightOutlined />
            </button>
          </>
        )}
      </div>

      <div className={styles.caption}>
        {photo.description && <p className={styles.desc}>{photo.description}</p>}
        {photo.meta && <p className={styles.meta}>{photo.meta}</p>}
        {chips.length > 0 && (
          <ul className={styles.chips} aria-label="Camera settings">
            {chips.map((c) => (
              <li key={c.key} className={styles.chip} title={c.title}>
                {c.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
