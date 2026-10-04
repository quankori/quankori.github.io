import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'
import trips from '../../data/trips.json'
import Lightbox from './Lightbox'
import {
  cx,
  formatDate,
  plural,
  tileSpan,
} from './photoUtils'
import styles from './Trip.module.css'

export default function Trip({ id }) {
  const index = trips.findIndex((t) => t.id === id)
  if (index === -1) return <TripNotFound id={id} />
  return <TripView key={id} trip={trips[index]} />
}

function TripNotFound({ id }) {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="Trip not found"
      subTitle={id ? `There is no trip called “${id}”.` : 'This trip does not exist.'}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Back home
        </Button>
      }
    />
  )
}

function TripView({ trip }) {
  const [open, setOpen] = useState(null)

  // Flat list for the lightbox + start offset of each visit inside it.
  const { photos, offsets } = useMemo(() => {
    const list = []
    const starts = []
    trip.visits.forEach((visit) => {
      starts.push(list.length)
      const when = formatDate(visit.date)
      visit.photos.forEach((p) => {
        list.push({ ...p, meta: [`${trip.name}, ${trip.country}`, when].filter(Boolean).join(' · ') })
      })
    })
    return { photos: list, offsets: starts }
  }, [trip])

  return (
    <div className={styles.page}>
      {trip.visits.map((visit, vi) => (
        <section key={`${visit.date}-${vi}`} className={styles.visit} aria-labelledby={`visit-${vi}`}>
          <header className={styles.visitHead}>
            <h2 id={`visit-${vi}`} className={styles.visitTitle}>
              {formatDate(visit.date)}
            </h2>
            <span className={styles.visitCount}>{plural(visit.photos.length, 'photo')}</span>
          </header>
          <ul className={styles.gallery}>
            {visit.photos.map((photo, i) => {
              const span = tileSpan(i, visit.photos.length)
              return (
                <li key={photo.full} className={cx(styles.tile, styles[`c${span.c}`], styles[`r${span.r}`])}>
                  <button type="button" className={styles.tileBtn} onClick={() => setOpen(offsets[vi] + i)}>
                    <img
                      src={photo.thumb}
                      alt={photo.description || `${trip.name} photo ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      width="800"
                      height="600"
                    />
                    {photo.description && (
                      <span className={styles.tileCaption} aria-hidden="true">
                        {photo.description}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      ))}

      <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </div>
  )
}
