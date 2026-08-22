import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import trips from '../data/trips.json'
import { tripPhotoCount } from '../utils/trip.js'
import Seo, { SITE_URL } from '../components/Seo.jsx'
import styles from './About.module.css'

const pageIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function About() {
  const places = trips.length
  const countries = new Set(trips.map(t => t.country).filter(Boolean)).size
  const photos = trips.reduce((n, t) => n + tripPhotoCount(t), 0)

  return (
    <motion.main className={styles.page} {...pageIn}>
      <Seo
        title="About"
        description="Quan Kori is a software developer and photographer documenting travel, landscapes, street life, and the ideas behind code and systems."
        path="/about"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Quan Kori',
          url: `${SITE_URL}/about/`,
          sameAs: [
            'https://github.com/quankori',
            'https://www.linkedin.com/in/quankori',
            'https://www.flickr.com/photos/144992510@N06/',
          ],
          jobTitle: 'Software Developer',
        }}
      />
      <div className={styles.grid}>
        <div className={styles.portraitWrap}>
          <img
            className={styles.portrait}
            src="https://live.staticflickr.com/65535/55317413759_cef37cd230_c.jpg"
            alt="Portrait"
            loading="lazy"
          />
        </div>

        <div className={styles.text}>
          <p className={styles.overline}>About</p>
          <h1 className={styles.title}>Quan Kori</h1>

          <p className={styles.lead}>
            I'm a software developer — most of my time is spent with lines of
            code and glowing screens. But whenever I step away from the keyboard,
            I pick up a camera and hit the road.
          </p>
          <p className={styles.body}>
            I'm drawn to natural landscapes: the sea at dawn, sand dunes at noon,
            sunsets over an island. For me travel isn't about ticking off as many
            destinations as possible — it's about slowing down, looking closely,
            and keeping a few moments through the lens.
          </p>
          <p className={styles.body}>
            This is where I keep those photos — few words, letting the images
            tell the story.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{places}</span>
              <span className={styles.statLabel}>Destinations</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{countries}</span>
              <span className={styles.statLabel}>Countries</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{photos}</span>
              <span className={styles.statLabel}>Photos</span>
            </div>
          </div>

          <Link to="/" className={styles.cta}>View the trips →</Link>

          <div className={styles.social}>
            <p className={styles.socialHeading}>Find me on</p>
            <div className={styles.socialList}>
              <a
                href="https://www.linkedin.com/in/quankori"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialItem}
              >
                <span className={styles.socialName}>LinkedIn</span>
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="https://github.com/quankori"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialItem}
              >
                <span className={styles.socialName}>GitHub</span>
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="https://www.flickr.com/photos/144992510@N06/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialItem}
              >
                <span className={styles.socialName}>Flickr</span>
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
