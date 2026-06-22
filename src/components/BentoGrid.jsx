import StreetPhotoTile from './StreetPhotoTile.jsx'
import styles from './BentoGrid.module.css'

export default function BentoGrid({ photos, onPhotoClick }) {
  return (
    <div className={styles.grid}>
      {photos.map((photo, i) => (
        <StreetPhotoTile
          key={photo.thumb}
          photo={photo}
          onClick={() => onPhotoClick(i)}
        />
      ))}
    </div>
  )
}
