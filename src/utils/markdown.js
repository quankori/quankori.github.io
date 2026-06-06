export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data = {}
  for (const line of match[1].split('\n')) {
    const l = line.replace(/\r$/, '')
    const colon = l.indexOf(':')
    if (colon === -1 || !l.trim()) continue
    const key = l.slice(0, colon).trim()
    let val = l.slice(colon + 1).trim()
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1)
        .split(',')
        .map(v => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (key) data[key] = val
  }
  return { data, content: match[2] }
}

export function loadPosts(modules) {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const slug = path.split('/').pop().replace(/\.md$/, '')
      const { data, content } = parseFrontmatter(raw)
      return { slug, ...data, content }
    })
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
}

export function groupByYear(posts) {
  const groups = {}
  for (const post of posts) {
    const year = post.year || (post.date ? post.date.slice(0, 4) : 'Other')
    if (!groups[year]) groups[year] = []
    groups[year].push(post)
  }
  return Object.entries(groups).sort(([a], [b]) => Number(b) - Number(a))
}
