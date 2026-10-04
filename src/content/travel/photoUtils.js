export const cx = (...names) => names.filter(Boolean).join(' ')

export const tripPhotos = (trip) => trip.visits.flatMap((v) => v.photos)

export const countPhotos = (trip) => trip.visits.reduce((n, v) => n + v.photos.length, 0)

export const coverOf = (trip) => trip.visits.find((v) => v.photos.length)?.photos[0] ?? null

export const yearOf = (date) => String(date ?? '').slice(0, 4)

export const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`

/** "2026" stays as-is, "2026-03" → "March 2026", "2026-03-14" → "March 14, 2026". */
export function formatDate(date) {
  const s = String(date ?? '')
  const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(s)
  if (!m) return s
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, m[3] ? +m[3] : 1))
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    ...(m[3] ? { day: 'numeric' } : {}),
    timeZone: 'UTC',
  }).format(d)
}

/** EXIF values as display chips, only for the fields that are present. */
export function exifChips(exif) {
  if (!exif) return []
  const chips = []
  const has = (v) => v !== undefined && v !== null && String(v).trim() !== ''
  if (has(exif.camera)) chips.push({ key: 'camera', title: 'Camera', label: String(exif.camera) })
  if (has(exif.lens)) chips.push({ key: 'lens', title: 'Lens', label: String(exif.lens) })
  if (has(exif.f)) chips.push({ key: 'f', title: 'Aperture', label: `f/${String(exif.f).replace(/^f\/?/i, '')}` })
  if (has(exif.ss)) {
    const ss = String(exif.ss)
    chips.push({ key: 'ss', title: 'Shutter speed', label: /s$/i.test(ss) ? ss : `${ss}s` })
  }
  if (has(exif.iso)) {
    const iso = String(exif.iso)
    chips.push({ key: 'iso', title: 'ISO', label: /^iso/i.test(iso) ? iso : `ISO ${iso}` })
  }
  if (has(exif.focal)) {
    const focal = String(exif.focal)
    chips.push({ key: 'focal', title: 'Focal length', label: /^\d+(\.\d+)?$/.test(focal) ? `${focal}mm` : focal })
  }
  return chips
}

/**
 * Grid spans for a 4-column gallery that always fills complete rows:
 * blocks of five (one 2x2 feature + four singles, feature alternating sides),
 * then the remainder is shaped to close the last block.
 */
export function tileSpan(i, n) {
  const blocks = Math.floor(n / 5) * 5
  if (i < blocks) {
    const featurePos = Math.floor(i / 5) % 2 === 0 ? 0 : 2
    return i % 5 === featurePos ? { c: 2, r: 2 } : { c: 1, r: 1 }
  }
  const rest = n - blocks
  const k = i - blocks
  if (rest === 1) return { c: 4, r: 2 }
  if (rest === 2) return { c: 2, r: 2 }
  if (rest === 3) return k === 0 ? { c: 2, r: 2 } : { c: 2, r: 1 }
  if (k === 0) return { c: 2, r: 2 }
  return k === 3 ? { c: 2, r: 1 } : { c: 1, r: 1 }
}
