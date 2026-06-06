import styles from './RecipeBlock.module.css'

function parseRecipe(content) {
  const lines = content.trim().split('\n')
  let name = 'Fujifilm Recipe'
  const items = []
  for (const line of lines) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const val = line.slice(colon + 1).trim()
    if (key.toLowerCase() === 'name') {
      name = val
    } else {
      items.push({ key, val })
    }
  }
  return { name, items }
}

export default function RecipeBlock({ content }) {
  const { name, items } = parseRecipe(content)
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
        <span className={styles.label}>{name}</span>
      </div>
      <div className={styles.grid}>
        {items.map(({ key, val }) => (
          <div key={key} className={styles.row}>
            <span className={styles.key}>{key}</span>
            <span className={styles.val}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
