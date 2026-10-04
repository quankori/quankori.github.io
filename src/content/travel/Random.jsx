import { useMemo, useState } from 'react'
import randomPhotos from '../../data/randomPhotos.json'
import Lightbox from './Lightbox'
import { exifChips, plural, yearOf } from './photoUtils'
import styles from './Random.module.css'

const pad = (n) => String(n).padStart(2, '0')

export default function Random() {
  const [open, setOpen] = useState(null)

  const frames = useMemo(
    () =>
      randomPhotos.map((p) => ({
        ...p,
        meta: [p.location, p.date].filter(Boolean).join(' · '),
        settings: exifChips(p.exif)
          .filter((c) => c.key !== 'camera' && c.key !== 'lens')
          .map((c) => c.label)
          .join('  '),
      })),
    [],
  )

  const sheetInfo = useMemo(() => {
    const cameras = [...new Set(randomPhotos.map((p) => p.exif?.camera).filter(Boolean))]
    const years = [...new Set(randomPhotos.map((p) => yearOf(p.date)).filter(Boolean))].sort()
    const places = new Set(randomPhotos.map((p) => p.location).filter(Boolean)).size
    return [
      plural(randomPhotos.length, 'frame'),
      places ? plural(places, 'location') : null,
      cameras.join(' / ') || null,
      years.length ? (years.length > 1 ? `${years[0]}–${years[years.length - 1]}` : years[0]) : null,
    ].filter(Boolean)
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.sheet}>
        <p className={styles.sheetHead}>
          <span className={styles.sheetLabel}>Contact sheet</span>
          {sheetInfo.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>

        <ol className={styles.frames}>
          {frames.map((p, i) => {
            const n = i + 1
            return (
              <li key={p.full} className={styles.frame}>
                <div className={styles.strip}>
                  <button
                    type="button"
                    className={styles.shot}
                    onClick={() => setOpen(i)}
                    aria-label={`Frame ${n}: ${p.description || 'photo'}${p.location ? `, ${p.location}` : ''}`}
                  >
                    <img
                      src={p.thumb}
                      alt={p.description || `Photo ${n}`}
                      loading="lazy"
                      decoding="async"
                      width="800"
                      height="533"
                    />
                  </button>
                  <span className={styles.edge} aria-hidden="true">
                    <span>▸ {n}</span>
                    <span>{n}A</span>
                  </span>
                </div>
                <div className={styles.caption}>
                  <p className={styles.capTitle}>
                    <span className={styles.capNum}>{pad(n)}</span>
                    {p.description}
                  </p>
                  {p.meta && <p className={styles.capLine}>{p.meta}</p>}
                  {p.settings && <p className={styles.capLine}>{p.settings}</p>}
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      <Lightbox photos={frames} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </div>
  )
}
