import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import RecipeBlock from './RecipeBlock.jsx'
import GalleryBlock from './GalleryBlock.jsx'
import MermaidDiagram from './MermaidDiagram.jsx'
import styles from './MarkdownRenderer.module.css'

const components = {
  pre({ children }) {
    return <div className={styles.preWrap}>{children}</div>
  },

  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    if (!match) {
      return <code className={styles.inlineCode} {...props}>{children}</code>
    }

    const lang = match[1]
    const content = String(children).replace(/\n$/, '')

    if (lang === 'recipe') return <RecipeBlock content={content} />
    if (lang === 'gallery') return <GalleryBlock content={content} />
    if (lang === 'mermaid') return <MermaidDiagram chart={content} />

    return (
      <SyntaxHighlighter
        style={oneLight}
        language={lang}
        showLineNumbers
        customStyle={{
          borderRadius: '8px',
          fontSize: '0.84rem',
          margin: 0,
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
        }}
        codeTagProps={{ style: { fontFamily: 'inherit' } }}
      >
        {content}
      </SyntaxHighlighter>
    )
  },

  img({ src, alt }) {
    return (
      <span className={styles.imgBlock}>
        <img src={src} alt={alt || ''} loading="lazy" className={styles.img} />
        {alt && <span className={styles.imgCaption}>{alt}</span>}
      </span>
    )
  },

  blockquote({ children }) {
    return <blockquote className={styles.blockquote}>{children}</blockquote>
  },

  table({ children }) {
    return (
      <div className={styles.tableWrap}>
        <table className={styles.table}>{children}</table>
      </div>
    )
  },
}

export default function MarkdownRenderer({ content }) {
  return (
    <div className={styles.prose}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
