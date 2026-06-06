import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loadPosts } from '../utils/markdown.js'
import MarkdownRenderer from '../components/MarkdownRenderer.jsx'
import styles from './TravelBlogPost.module.css'

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

export default function TravelBlogPost() {
  const { slug } = useParams()
  const posts = useMemo(() => loadPosts(rawModules), [])
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return (
      <motion.main className={styles.page} {...pageIn}>
        <Link to="/journal" className={styles.back}>← Journal</Link>
        <p className={styles.notFound}>Post not found.</p>
      </motion.main>
    )
  }

  return (
    <motion.main className={styles.page} {...pageIn}>
      <Link to="/journal" className={styles.back}>← Journal</Link>

      {post.coverImage && (
        <div className={styles.hero}>
          <img src={post.coverImage} alt={post.title} loading="eager" />
        </div>
      )}

      <header className={styles.header}>
        <div className={styles.meta}>
          {post.country && <span className={styles.metaCountry}>{post.country}</span>}
          {post.country && <span className={styles.metaDot}>·</span>}
          <time className={styles.metaDate}>{post.date}</time>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        {post.summary && <p className={styles.summary}>{post.summary}</p>}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </header>

      <div className={styles.divider} />

      <div className={styles.content}>
        <MarkdownRenderer content={post.content} />
      </div>

      <footer className={styles.footer}>
        <Link to="/journal" className={styles.back}>← Back to Journal</Link>
      </footer>
    </motion.main>
  )
}
