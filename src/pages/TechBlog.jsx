import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loadPosts, groupByYear } from '../utils/markdown.js'
import Seo from '../components/Seo.jsx'
import styles from './TechBlog.module.css'

const rawModules = import.meta.glob('/src/content/tech/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const pageIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en', { month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}

export default function TechBlog() {
  const posts = useMemo(() => loadPosts(rawModules), [])
  const grouped = useMemo(() => groupByYear(posts), [posts])

  return (
    <motion.main className={styles.page} {...pageIn}>
      <Seo
        title="Tech Notes"
        description="Technical writing by Quan Kori about software engineering, cryptography, secure messaging, and systems."
        path="/tech"
      />
      <header className={styles.header}>
        <p className={styles.overline}>Writing</p>
        <h1 className={styles.title}>Tech Notes</h1>
        <p className={styles.subtitle}>
          Code, systems, and the occasional idea worth writing down.
        </p>
      </header>

      {grouped.map(([year, yearPosts]) => (
        <section key={year} className={styles.yearSection}>
          <div className={styles.yearRow}>
            <span className={styles.yearLabel}>{year}</span>
            <div className={styles.yearLine} />
          </div>
          <div className={styles.postList}>
            {yearPosts.map(post => (
              <Link key={post.slug} to={`/tech/${post.slug}`} className={styles.postRow}>
                <time className={styles.date}>{formatDate(post.date)}</time>
                <div className={styles.rowBody}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  {post.summary && (
                    <p className={styles.postSummary}>{post.summary}</p>
                  )}
                  {Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className={styles.tags}>
                      {post.tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <span className={styles.arrow}>→</span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {grouped.length === 0 && (
        <p className={styles.empty}>No posts yet.</p>
      )}
    </motion.main>
  )
}
