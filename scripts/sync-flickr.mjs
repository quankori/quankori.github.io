import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const tripsPath = resolve(root, 'src/data/trips.json')
const streetPath = resolve(root, 'src/data/streetPhotos.json')
const configPath = resolve(root, 'src/data/flickr.config.json')
const endpoint = 'https://www.flickr.com/services/rest/'

if (!process.env.FLICKR_API_KEY) {
  try {
    const envFile = await readFile(resolve(root, '.env'), 'utf8')
    for (const line of envFile.split(/\r?\n/)) {
      const match = line.match(/^\s*FLICKR_API_KEY\s*=\s*(.+?)\s*$/)
      if (match) {
        process.env.FLICKR_API_KEY = match[1].replace(/^["']|["']$/g, '')
        break
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}

const apiKey = process.env.FLICKR_API_KEY

if (!apiKey) {
  console.error('FLICKR_API_KEY is required. Copy .env.example or add the key to your shell/GitHub Secret.')
  process.exit(1)
}

const [trips, streetPhotos, config] = await Promise.all([
  readJson(tripsPath),
  readJson(streetPath),
  readJson(configPath),
])

if (!config.userId) {
  throw new Error('src/data/flickr.config.json must contain your Flickr userId.')
}

const metadataCache = new Map()

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'))
}

async function flickr(method, parameters = {}) {
  const query = new URLSearchParams({
    method,
    api_key: apiKey,
    format: 'json',
    nojsoncallback: '1',
    ...Object.fromEntries(
      Object.entries(parameters)
        .filter(([, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => [key, String(value)])
    ),
  })

  const response = await fetch(`${endpoint}?${query}`)
  if (!response.ok) {
    throw new Error(`Flickr ${method} returned HTTP ${response.status}.`)
  }

  const payload = await response.json()
  if (payload.stat !== 'ok') {
    throw new Error(`Flickr ${method} failed (${payload.code || 'unknown'}): ${payload.message || 'Unknown error'}`)
  }
  return payload
}

async function safeFlickr(method, parameters) {
  try {
    return await flickr(method, parameters)
  } catch (error) {
    console.warn(`${error.message} Continuing without this optional metadata.`)
    return null
  }
}

function photoIdFrom(photo) {
  if (photo?.id || photo?.flickrId) return String(photo.id || photo.flickrId)
  const url = photo?.full || photo?.thumb || ''
  return url.match(/\/(\d+)_/)?.[1] || null
}

async function albumPhotoRefs(photosetId) {
  const refs = []
  let page = 1
  let pages = 1

  do {
    const payload = await flickr('flickr.photosets.getPhotos', {
      photoset_id: photosetId,
      user_id: config.userId,
      page,
      per_page: 500,
      media: 'photos',
    })
    refs.push(...payload.photoset.photo)
    pages = Number(payload.photoset.pages || 1)
    page += 1
  } while (page <= pages)

  return refs
}

function content(value) {
  if (typeof value === 'string') return value
  return value?._content || ''
}

function plainText(value) {
  return content(value)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanExifValue(item) {
  return content(item?.clean) || content(item?.raw)
}

function findExif(items, labels) {
  const wanted = labels.map(label => label.toLowerCase())
  const item = items.find(entry => wanted.includes(String(entry.label || '').toLowerCase()))
  return cleanExifValue(item)
}

function normalizeExif(payload) {
  const items = payload?.photo?.exif || []
  if (!items.length) return {}

  const make = findExif(items, ['Make', 'Manufacturer'])
  const model = findExif(items, ['Model', 'Camera Model Name'])
  const camera = model && make && !model.toLowerCase().includes(make.toLowerCase())
    ? `${make} ${model}`
    : model || make
  const aperture = findExif(items, ['Aperture', 'F-Number'])
  const exposure = findExif(items, ['Exposure', 'Exposure Time', 'Shutter Speed'])
  const iso = findExif(items, ['ISO Speed', 'ISO Speed Ratings', 'Photographic Sensitivity'])
  const focal = findExif(items, ['Focal Length'])

  return Object.fromEntries(
    Object.entries({
      camera,
      lens: findExif(items, ['Lens Model', 'Lens', 'Lens Info']),
      f: aperture?.replace(/^[ƒf]\s*\/\s*/i, ''),
      ss: exposure?.replace(/\s*(seconds?|secs?|s)$/i, ''),
      iso: iso?.replace(/^ISO\s*/i, ''),
      focal: focal && /mm$/i.test(focal) ? focal : focal ? `${focal}mm` : '',
    }).filter(([, value]) => value)
  )
}

function normalizeSizes(payload) {
  const seen = new Set()
  return (payload?.sizes?.size || [])
    .map(size => ({
      label: size.label,
      url: size.source,
      width: Number(size.width),
      height: Number(size.height),
    }))
    .filter(size => size.url && size.width > 0 && size.height > 0)
    .sort((a, b) => a.width - b.width)
    .filter(size => {
      if (seen.has(size.width)) return false
      seen.add(size.width)
      return true
    })
}

function pickImageSizes(sizes) {
  if (!sizes.length) return {}

  const webSizes = sizes.filter(size => size.width <= 2048)
  const usable = webSizes.length ? webSizes : sizes
  const thumb = usable.find(size => size.width >= 800) || usable.at(-1)
  const full = usable.at(-1)
  const sources = usable
    .filter(size => size.width >= 320)
    .map(({ url, width, height }) => ({ url, width, height }))

  return {
    thumb: thumb.url,
    full: full.url,
    width: full.width,
    height: full.height,
    sources,
  }
}

function flickrLocation(photo) {
  const location = photo?.location
  if (!location) return ''

  const parts = [
    content(location.locality),
    content(location.county),
    content(location.region),
    content(location.country),
  ].filter(Boolean)

  return [...new Set(parts)].join(', ')
}

async function fetchMetadata(ref) {
  const id = photoIdFrom(ref)
  if (!id) throw new Error(`Cannot find a Flickr photo id in ${ref?.full || ref?.thumb || 'photo record'}.`)
  if (metadataCache.has(id)) return metadataCache.get(id)

  const promise = (async () => {
    const [infoPayload, exifPayload, sizesPayload] = await Promise.all([
      flickr('flickr.photos.getInfo', { photo_id: id }),
      safeFlickr('flickr.photos.getExif', { photo_id: id }),
      flickr('flickr.photos.getSizes', { photo_id: id }),
    ])

    const photo = infoPayload.photo
    const urls = photo.urls?.url || []
    const sourceUrl =
      urls.find(url => url.type === 'photopage')?._content ||
      `https://www.flickr.com/photos/${config.userId}/${id}/`
    const tags = (photo.tags?.tag || []).map(tag => tag.raw || tag._content).filter(Boolean)
    const sizes = normalizeSizes(sizesPayload)

    return {
      id,
      ...pickImageSizes(sizes),
      description: plainText(photo.description) || plainText(photo.title),
      dateTaken: photo.dates?.taken || '',
      sourceUrl,
      location: flickrLocation(photo),
      tags,
      exif: normalizeExif(exifPayload),
    }
  })()

  metadataCache.set(id, promise)
  return promise
}

async function mapLimit(items, limit, worker) {
  const output = new Array(items.length)
  let nextIndex = 0

  async function consume() {
    while (nextIndex < items.length) {
      const index = nextIndex
      nextIndex += 1
      output[index] = await worker(items[index], index)
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, consume))
  return output
}

async function hydratePhotos(refs, existingPhotos = []) {
  const existingById = new Map(
    existingPhotos
      .map(photo => [photoIdFrom(photo), photo])
      .filter(([id]) => id)
  )

  return mapLimit(refs, 4, async ref => {
    const id = photoIdFrom(ref)
    const existing = existingById.get(id) || {}
    const remote = await fetchMetadata(ref)
    const exif = { ...(existing.exif || {}), ...(remote.exif || {}) }

    return {
      ...existing,
      ...remote,
      description: remote.description || existing.description || '',
      location: existing.location || remote.location || '',
      ...(Object.keys(exif).length ? { exif } : {}),
    }
  })
}

async function syncTrips(input) {
  return mapLimit(input, 2, async trip => {
    const visits = trip.visits || [{ date: trip.date, photos: trip.photos || [] }]
    const syncedVisits = []

    for (const visit of visits) {
      const albumId = visit.flickrAlbumId || (visits.length === 1 ? trip.flickrAlbumId : null)
      const currentPhotos = visit.photos || []
      const refs = albumId
        ? await albumPhotoRefs(albumId)
        : currentPhotos.map(photo => ({ id: photoIdFrom(photo), ...photo }))

      syncedVisits.push({
        ...visit,
        photos: await hydratePhotos(refs, currentPhotos),
      })
    }

    const { photos: _legacyPhotos, ...rest } = trip
    return { ...rest, visits: syncedVisits }
  })
}

const syncedTrips = await syncTrips(trips)
const streetRefs = config.streetAlbumId
  ? await albumPhotoRefs(config.streetAlbumId)
  : streetPhotos.map(photo => ({ id: photoIdFrom(photo), ...photo }))
const syncedStreetPhotos = await hydratePhotos(streetRefs, streetPhotos)

await Promise.all([
  writeFile(tripsPath, `${JSON.stringify(syncedTrips, null, 2)}\n`, 'utf8'),
  writeFile(streetPath, `${JSON.stringify(syncedStreetPhotos, null, 2)}\n`, 'utf8'),
])

const tripPhotoCount = syncedTrips.reduce(
  (total, trip) => total + trip.visits.reduce((sum, visit) => sum + visit.photos.length, 0),
  0
)
console.log(`Synced ${tripPhotoCount} trip photos and ${syncedStreetPhotos.length} street photos from Flickr.`)
