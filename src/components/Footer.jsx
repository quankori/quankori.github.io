import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>© {new Date().getFullYear()} Quan Kori</p>
        <p className={styles.flickr}>
          This product uses the Flickr API but is not endorsed or certified by SmugMug, Inc.
        </p>
      </div>
    </footer>
  )
}
