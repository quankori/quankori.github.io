import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loadPosts, groupByYear } from '../utils/markdown.js'
import styles from './TravelBlog.module.css'

const rawModules = import.meta.glob('/src/content/travel/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const pageIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function TravelBlog() {
  const posts = useMemo(() => loadPosts(rawModules), [])
  const grouped = useMemo(() => groupByYear(posts), [posts])

  return (
    <motion.main className={styles.page} {...pageIn}>
      <header className={styles.header}>
        <p className={styles.overline}>Journal</p>
        <h1 className={styles.title}>Travel Stories</h1>
        <p className={styles.subtitle}>
          Notes from the road — places, light, and the moments in between.
        </p>
      </header>

      {grouped.map(([year, yearPosts]) => (
        <section key={year} className={styles.yearSection}>
          <div className={styles.yearRow}>
            <span className={styles.yearLabel}>{year}</span>
            <div className={styles.yearLine} />
          </div>
          <div className={styles.postGrid}>
            {yearPosts.map(post => (
              <Link key={post.slug} to={`/journal/${post.slug}`} className={styles.card}>
                {post.coverImage && (
                  <div className={styles.cardCover}>
                    <img src={post.coverImage} alt={post.title} loading="lazy" />
                  </div>
                )}
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    {post.country && <span className={styles.metaCountry}>{post.country}</span>}
                    {post.country && <span className={styles.metaDot}>·</span>}
                    <span className={styles.metaDate}>{post.date}</span>
                  </div>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  {post.summary && (
                    <p className={styles.cardSummary}>{post.summary}</p>
                  )}
                  {Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className={styles.tags}>
                      {post.tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <span className={styles.readMore}>Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {grouped.length === 0 && (
        <p className={styles.empty}>No posts yet — check back soon.</p>
      )}
    </motion.main>
  )
}
