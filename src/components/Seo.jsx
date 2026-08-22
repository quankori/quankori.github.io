import { useEffect } from 'react'

export const SITE_URL = 'https://quankori.github.io'
export const DEFAULT_IMAGE =
  'https://live.staticflickr.com/65535/55317363308_b1bfafd7e8_k.jpg'

function canonicalUrl(path = '/') {
  const cleanPath = path === '/' ? '/' : `/${path.replace(/^\/|\/$/g, '')}/`
  return `${SITE_URL}${cleanPath}`
}

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value)
  })
}

export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  imageAlt,
  type = 'website',
  noIndex = false,
  structuredData,
}) {
  useEffect(() => {
    const pageTitle = title ? `${title} — Quan Kori` : 'Quan Kori — Travels, Photography & Tech'
    const url = canonicalUrl(path)
    const alt = imageAlt || title || 'Quan Kori photography'

    document.title = pageTitle
    document.documentElement.lang = 'en'

    setMeta('meta[name="description"]', { name: 'description', content: description })
    setMeta('meta[name="robots"]', {
      name: 'robots',
      content: noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: pageTitle })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: image })
    setMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: alt })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: pageTitle })
    setMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
    setMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: alt })

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    let jsonLd = document.head.querySelector('#route-structured-data')
    if (structuredData) {
      if (!jsonLd) {
        jsonLd = document.createElement('script')
        jsonLd.id = 'route-structured-data'
        jsonLd.type = 'application/ld+json'
        document.head.appendChild(jsonLd)
      }
      jsonLd.textContent = JSON.stringify(structuredData)
    } else {
      jsonLd?.remove()
    }
  }, [description, image, imageAlt, noIndex, path, structuredData, title, type])

  return null
}
