import { useNavigate } from 'react-router-dom'
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  AttributionControl,
} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './TravelMap.module.css'

// Initial view: centred on Vietnam. Change these to re-centre the map.
const VIETNAM_CENTER = [15.5, 107.8]
const INITIAL_ZOOM = 5

// Vietnamese island territories shown as informational markers
const ISLAND_MARKERS = [
  { id: 'hoang-sa', name: 'Hoàng Sa', coords: [16.5, 112.0] },
  { id: 'truong-sa', name: 'Trường Sa', coords: [9.0, 113.5] },
]

function createIslandIcon(name) {
  return L.divIcon({
    className: 'island-pin-wrap',
    html: `<div class="island-pin">${name}</div>`,
    iconSize: null,
    iconAnchor: null,
    tooltipAnchor: [0, -8],
  })
}

const tripIcon = L.divIcon({
  className: 'trip-pin-wrap',
  html: '<div class="trip-pin"></div>',
  iconSize: [26, 26],
  iconAnchor: [13, 26],
  tooltipAnchor: [0, -24],
})

function createClusterIcon(cluster) {
  const count = cluster.getChildCount()
  const size = count < 10 ? 40 : count < 25 ? 48 : 56
  return L.divIcon({
    className: 'cluster-pin-wrap',
    html: `<div class="cluster-pin">${count}</div>`,
    iconSize: L.point(size, size, true),
  })
}

export default function TravelMap({ trips }) {
  const navigate = useNavigate()
  const pinned = trips.filter(t => Array.isArray(t.coords))

  return (
    <div className={styles.wrap}>
      <MapContainer
        className={styles.map}
        center={VIETNAM_CENTER}
        zoom={INITIAL_ZOOM}
        minZoom={2}
        scrollWheelZoom
        attributionControl={false}
      >
        <AttributionControl
          position="bottomright"
          prefix='<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>'
        />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {ISLAND_MARKERS.map(island => (
          <Marker
            key={island.id}
            position={island.coords}
            icon={createIslandIcon(island.name)}
            interactive={false}
          >
            <Tooltip className="trip-tooltip island-tooltip" direction="top" offset={[0, -6]} permanent={false}>
              {island.name}
            </Tooltip>
          </Marker>
        ))}

        <MarkerClusterGroup
          iconCreateFunction={createClusterIcon}
          showCoverageOnHover={false}
          spiderfyOnMaxZoom
          maxClusterRadius={45}
        >
          {pinned.map(trip => (
            <Marker
              key={trip.id}
              position={trip.coords}
              icon={tripIcon}
              eventHandlers={{ click: () => navigate(`/trip/${trip.id}`) }}
            >
              <Tooltip className="trip-tooltip" direction="top" offset={[0, -6]}>
                {trip.name}
              </Tooltip>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}
