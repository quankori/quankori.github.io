import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loadPosts } from '../utils/markdown.js'
import MarkdownRenderer from '../components/MarkdownRenderer.jsx'
import styles from './TechBlogPost.module.css'

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

export default function TechBlogPost() {
  const { slug } = useParams()
  const posts = useMemo(() => loadPosts(rawModules), [])
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return (
      <motion.main className={styles.page} {...pageIn}>
        <Link to="/tech" className={styles.back}>← Tech Notes</Link>
        <p className={styles.notFound}>Post not found.</p>
      </motion.main>
    )
  }

  return (
    <motion.main className={styles.page} {...pageIn}>
      <Link to="/tech" className={styles.back}>← Tech Notes</Link>

      <header className={styles.header}>
        <time className={styles.date}>{post.date}</time>
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
        <Link to="/tech" className={styles.back}>← Back to Tech Notes</Link>
      </footer>
    </motion.main>
  )
}
