import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const siteUrl = 'https://quankori.github.io'
const defaultImage = 'https://live.staticflickr.com/65535/55317363308_b1bfafd7e8_k.jpg'
const baseHtml = await readFile(join(dist, 'index.html'), 'utf8')
const trips = JSON.parse(await readFile(resolve(root, 'src/data/trips.json'), 'utf8'))
const streetPhotos = JSON.parse(await readFile(resolve(root, 'src/data/streetPhotos.json'), 'utf8'))

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return {}
  const data = {}

  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(':')
    if (colon < 0) continue
    const key = line.slice(0, colon).trim()
    let value = line.slice(colon + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }
  return data
}

async function readPosts(section) {
  const directory = resolve(root, `src/content/${section}`)
  const files = (await readdir(directory)).filter(file => file.endsWith('.md'))
  return Promise.all(
    files.map(async file => ({
      slug: file.replace(/\.md$/, ''),
      ...parseFrontmatter(await readFile(join(directory, file), 'utf8')),
    }))
  )
}

function firstPhoto(trip) {
  return (trip.visits || [{ photos: trip.photos || [] }])
    .flatMap(visit => visit.photos || [])
    .find(Boolean)
}

function photoCount(trip) {
  return (trip.visits || [{ photos: trip.photos || [] }])
    .reduce((total, visit) => total + (visit.photos?.length || 0), 0)
}

function routeUrl(path) {
  return path === '/' ? `${siteUrl}/` : `${siteUrl}/${path.replace(/^\/|\/$/g, '')}/`
}

function replaceMeta(html, selector, tag) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`<meta\\s+(?:name|property)=["']${escapedSelector}["'][^>]*>`, 'i')
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace('</head>', `    ${tag}\n  </head>`)
}

function pageHtml(route) {
  const title = `${route.title} — Quan Kori`
  const url = routeUrl(route.path)
  const image = route.image || defaultImage
  let html = baseHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)

  const metas = [
    ['description', `<meta name="description" content="${escapeHtml(route.description)}" />`],
    ['robots', `<meta name="robots" content="${route.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}" />`],
    ['og:type', `<meta property="og:type" content="${route.type || 'website'}" />`],
    ['og:title', `<meta property="og:title" content="${escapeHtml(title)}" />`],
    ['og:description', `<meta property="og:description" content="${escapeHtml(route.description)}" />`],
    ['og:url', `<meta property="og:url" content="${url}" />`],
    ['og:image', `<meta property="og:image" content="${escapeHtml(image)}" />`],
    ['og:image:alt', `<meta property="og:image:alt" content="${escapeHtml(route.imageAlt || route.title)}" />`],
    ['twitter:card', '<meta name="twitter:card" content="summary_large_image" />'],
    ['twitter:title', `<meta name="twitter:title" content="${escapeHtml(title)}" />`],
    ['twitter:description', `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`],
    ['twitter:image', `<meta name="twitter:image" content="${escapeHtml(image)}" />`],
    ['twitter:image:alt', `<meta name="twitter:image:alt" content="${escapeHtml(route.imageAlt || route.title)}" />`],
  ]

  for (const [selector, tag] of metas) html = replaceMeta(html, selector, tag)
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${url}" />`
  )

  if (route.structuredData) {
    const json = JSON.stringify(route.structuredData).replaceAll('<', '\\u003c')
    html = html.replace('</head>', `    <script type="application/ld+json">${json}</script>\n  </head>`)
  }
  return html
}

const [photographyPosts, techPosts] = await Promise.all([
  readPosts('photography'),
  readPosts('tech'),
])

const routes = [
  {
    path: '/',
    title: 'Travels',
    description: 'A quiet travel photo archive by Quan Kori, with photography field notes and writing about code, cryptography, and systems.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Quan Kori',
      url: `${siteUrl}/`,
    },
  },
  {
    path: '/about',
    title: 'About',
    description: 'Quan Kori is a software developer and photographer documenting travel, landscapes, street life, code, and systems.',
  },
  {
    path: '/street-photography',
    title: 'Street Photography',
    description: 'Candid street photography by Quan Kori: fleeting light, architecture, people, and the everyday rhythm of cities in Vietnam.',
    image: streetPhotos[0]?.full || defaultImage,
  },
  {
    path: '/photography',
    title: 'Photography Notes',
    description: 'Field notes by Quan Kori on light, color, camera technique, visual storytelling, and the craft behind a photograph.',
  },
  {
    path: '/tech',
    title: 'Tech Notes',
    description: 'Technical writing by Quan Kori about software engineering, cryptography, secure messaging, and systems.',
  },
  ...trips.map(trip => {
    const count = photoCount(trip)
    const lead = firstPhoto(trip)
    return {
      path: `/trip/${trip.id}`,
      title: `${trip.name} Travel Photography`,
      description: `${trip.name}${trip.country ? `, ${trip.country}` : ''} — ${count} travel ${count === 1 ? 'photo' : 'photos'} by Quan Kori.`,
      image: lead?.full || defaultImage,
      imageAlt: lead?.description || `${trip.name} travel photography`,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: `${trip.name} Travel Photography`,
        url: routeUrl(`/trip/${trip.id}`),
        numberOfItems: count,
        image: lead?.full,
      },
    }
  }),
  ...photographyPosts.map(post => ({
    path: `/photography/${post.slug}`,
    title: post.title,
    description: post.summary || `A photography field note by Quan Kori: ${post.title}.`,
    image: post.coverImage || defaultImage,
    type: 'article',
    lastmod: post.date,
  })),
  ...techPosts.map(post => ({
    path: `/tech/${post.slug}`,
    title: post.title,
    description: post.summary || `A technical note by Quan Kori: ${post.title}.`,
    image: post.coverImage || defaultImage,
    type: 'article',
    lastmod: post.date,
  })),
]

for (const route of routes) {
  const target = route.path === '/'
    ? join(dist, 'index.html')
    : join(dist, route.path.replace(/^\//, ''), 'index.html')
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, pageHtml(route), 'utf8')
}

const notFoundHtml = pageHtml({
  path: '/404',
  title: 'Page not found',
  description: 'The requested page does not exist.',
  noIndex: true,
})
await writeFile(join(dist, '404.html'), notFoundHtml, 'utf8')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${routeUrl(route.path)}</loc>${route.lastmod ? `
    <lastmod>${escapeHtml(route.lastmod)}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>
`
await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8')
await writeFile(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  'utf8'
)

console.log(`Generated ${routes.length} indexable routes, sitemap.xml, robots.txt, and 404.html.`)
