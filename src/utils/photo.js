export function photoSrcSet(photo) {
  if (!Array.isArray(photo?.sources)) return undefined

  const entries = photo.sources
    .filter(source => source?.url && Number(source.width))
    .sort((a, b) => Number(a.width) - Number(b.width))
    .map(source => `${source.url} ${source.width}w`)

  return entries.length ? entries.join(', ') : undefined
}

export function photoDimensions(photo) {
  const width = Number(photo?.width)
  const height = Number(photo?.height)
  return width > 0 && height > 0 ? { width, height } : {}
}

export function photoSourceUrl(photo) {
  if (photo?.sourceUrl) return photo.sourceUrl
  const id = photo?.id || photo?.flickrId ||
    String(photo?.full || photo?.thumb || '').match(/\/(\d+)_/)?.[1]
  return id ? `https://www.flickr.com/photos/144992510@N06/${id}/` : ''
}
