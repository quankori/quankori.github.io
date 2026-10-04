import { Component, Suspense, lazy } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Button, Result, Skeleton, Typography } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { findPage, pagePath } from '../content/registry.js'
import NotFound from '../pages/NotFound.jsx'
import { CategoryIcon } from './icons.jsx'
import { useDocumentTitle } from './useDocumentTitle.js'
import styles from './ArticleView.module.css'

// One lazy component per page path, created once so React keeps its state
// between renders instead of remounting on every navigation.
const lazyPages = new Map()
function lazyPage(path, load) {
  if (!lazyPages.has(path)) lazyPages.set(path, lazy(load))
  return lazyPages.get(path)
}

class PageErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <Result
        status="warning"
        title="This page failed to load"
        subTitle={String(this.state.error?.message ?? this.state.error)}
        extra={
          <Button type="primary" onClick={() => window.location.reload()}>
            Reload
          </Button>
        }
      />
    )
  }
}

export default function ArticleView() {
  const { category: categoryKey, slug } = useParams()
  const found = findPage(categoryKey, slug)
  useDocumentTitle(found?.page.title ?? 'Not found')

  if (!found) return <NotFound />

  const { category, page } = found
  const path = pagePath(category, page)
  const PageComponent = lazyPage(path, page.load)

  return (
    <article className={page.wide ? styles.wide : styles.narrow}>
      <header className={styles.header}>
        <Breadcrumb
          items={[
            { title: <Link to="/"><HomeOutlined /></Link> },
            {
              title: (
                <span>
                  <CategoryIcon name={category.icon} /> {category.label}
                </span>
              ),
            },
            { title: page.title },
          ]}
        />
        <Typography.Title level={2} className={styles.title}>
          {page.title}
        </Typography.Title>
        {page.description && (
          <Typography.Paragraph type="secondary" className={styles.description}>
            {page.description}
          </Typography.Paragraph>
        )}
      </header>

      <PageErrorBoundary key={path}>
        <Suspense fallback={<Skeleton active paragraph={{ rows: 10 }} />}>
          <PageComponent {...page.props} />
        </Suspense>
      </PageErrorBoundary>
    </article>
  )
}
