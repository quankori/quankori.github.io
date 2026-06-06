// Helpers that normalise a trip whether it uses the new `visits[]` schema
// or the older flat `photos[]` + `date` schema, so adding data stays simple.

export function tripVisits(trip) {
  if (Array.isArray(trip.visits)) return trip.visits
  if (Array.isArray(trip.photos)) return [{ date: trip.date, photos: trip.photos }]
  return []
}

export function tripPhotoCount(trip) {
  return tripVisits(trip).reduce((n, v) => n + (v.photos?.length || 0), 0)
}

// First photo across all visits — used as the home tile image.
export function firstPhoto(trip) {
  for (const v of tripVisits(trip)) {
    if (v.photos && v.photos.length) return v.photos[0]
  }
  return null
}

export function tripDates(trip) {
  return tripVisits(trip)
    .map(v => v.date)
    .filter(Boolean)
    .sort()
}

export function tripLatestDate(trip) {
  const dates = tripDates(trip)
  return dates[dates.length - 1] || ''
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

// "2025-03" -> "March 2025"
export function formatMonth(date) {
  if (!date) return ''
  const [y, m] = date.split('-')
  return m ? `${MONTHS[parseInt(m, 10) - 1]} ${y}` : y
}

// "2025-03" -> "Mar 2025"
export function formatShort(date) {
  if (!date) return ''
  const [y, m] = date.split('-')
  return m ? `${MONTHS_SHORT[parseInt(m, 10) - 1]} ${y}` : y
}

// Visits sorted most-recent first, for display.
export function tripVisitsDesc(trip) {
  return [...tripVisits(trip)].sort((a, b) => (b.date || '').localeCompare(a.date || ''))
}
