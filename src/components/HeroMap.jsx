import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './HeroMap.module.css'

const heroPin = L.divIcon({
  className: 'trip-pin-wrap',
  html: '<div class="trip-pin"></div>',
  iconSize: [26, 26],
  iconAnchor: [13, 26],
})

/**
 * A zoomed-in, non-interactive map of the trip's location, used as the
 * detail-page "cover". Dark tiles so the overlaid title reads well.
 */
export default function HeroMap({ coords, zoom = 12 }) {
  return (
    <div className={styles.wrap}>
      <MapContainer
        center={coords}
        zoom={zoom}
        zoomControl={false}
        attributionControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        boxZoom={false}
        keyboard={false}
        touchZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />
        <Marker position={coords} icon={heroPin} interactive={false} />
      </MapContainer>
    </div>
  )
}
