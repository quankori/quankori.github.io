import { useEffect, useRef, useState } from 'react'
import styles from './MermaidDiagram.module.css'

let mermaid = null
let initPromise = null

async function getMermaid() {
  if (mermaid) return mermaid
  if (!initPromise) {
    initPromise = import('mermaid').then(m => {
      mermaid = m.default
      mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        fontFamily: 'Jost, system-ui, sans-serif',
        fontSize: 14,
        securityLevel: 'loose',
      })
      return mermaid
    })
  }
  return initPromise
}

let idCounter = 0

export default function MermaidDiagram({ chart }) {
  const id = useRef(`mermaid-${++idCounter}`)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setSvg('')
    setError(null)

    getMermaid().then(async m => {
      try {
        const { svg: rendered } = await m.render(id.current, chart.trim())
        if (!cancelled) setSvg(rendered)
      } catch (e) {
        if (!cancelled) setError(e.message || 'Diagram error')
      }
    })

    return () => { cancelled = true }
  }, [chart])

  if (error) return (
    <pre className={styles.error}>{error}</pre>
  )

  if (!svg) return (
    <div className={styles.loading}>Loading diagram…</div>
  )

  return (
    <div
      className={styles.wrap}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
