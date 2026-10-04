import { useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Button, Drawer, Grid, Layout, Menu } from 'antd'
import { GithubOutlined, LinkedinOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons'
import { CATEGORIES, pagePath } from '../content/registry.js'
import { PROFILE } from '../data/profile.js'
import { CategoryIcon } from './icons.jsx'
import styles from './SiteLayout.module.css'

const { Sider, Header, Content } = Layout

// Pages with a `group` are listed under a small heading inside their category.
function categoryChildren(category) {
  const children = []
  for (const page of category.pages) {
    const item = { key: pagePath(category, page), label: page.title }
    if (!page.group) {
      children.push(item)
      continue
    }
    let group = children.find((c) => c.type === 'group' && c.label === page.group)
    if (!group) {
      group = { type: 'group', label: page.group, children: [] }
      children.push(group)
    }
    group.children.push(item)
  }
  return children
}

const MENU_ITEMS = [
  { key: '/', icon: <UserOutlined />, label: 'About me' },
  { type: 'divider' },
  ...CATEGORIES.map((category) => ({
    key: category.key,
    icon: <CategoryIcon name={category.icon} />,
    label: category.label,
    children: categoryChildren(category),
  })),
]

function Brand() {
  return (
    <Link to="/" className={styles.brand}>
      <Avatar size={40} src={PROFILE.portrait} alt="" />
      <span className={styles.brandText}>
        <span className={styles.brandName}>Quan Kori</span>
        <span className={styles.brandSub}>Notebook</span>
      </span>
    </Link>
  )
}

function SideMenu({ onNavigate }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const selected = pathname.replace(/\/+$/, '') || '/'
  const [openKeys, setOpenKeys] = useState(() => CATEGORIES.map((c) => c.key))

  // Opening a deep link should always reveal its group, even if it was collapsed.
  useEffect(() => {
    const group = selected.split('/')[1]
    if (group && !openKeys.includes(group)) setOpenKeys((keys) => [...keys, group])
    // Keep the active item visible in a long menu (e.g. deep link to the last group).
    const frame = requestAnimationFrame(() => {
      document.querySelector('.ant-menu-item-selected')?.scrollIntoView({ block: 'nearest' })
    })
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <Menu
      mode="inline"
      items={MENU_ITEMS}
      selectedKeys={[selected]}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      onClick={({ key }) => {
        navigate(key)
        onNavigate?.()
      }}
      className={styles.menu}
    />
  )
}

function SiderFooter() {
  return (
    <div className={styles.siderFooter}>
      <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
        <GithubOutlined />
      </a>
      <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <LinkedinOutlined />
      </a>
      <span>© {new Date().getFullYear()} Quan Kori</span>
    </div>
  )
}

export default function SiteLayout() {
  const screens = Grid.useBreakpoint()
  const isDesktop = screens.lg ?? true
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const sider = useMemo(
    () => (
      <div className={styles.siderInner}>
        <Brand />
        <nav className={styles.menuScroll} aria-label="Site">
          <SideMenu onNavigate={() => setDrawerOpen(false)} />
        </nav>
        <SiderFooter />
      </div>
    ),
    [],
  )

  return (
    <Layout className={styles.root}>
      {isDesktop ? (
        <Sider width={260} className={styles.sider}>
          {sider}
        </Sider>
      ) : (
        <>
          <Header className={styles.mobileHeader}>
            <Button
              type="text"
              icon={<MenuOutlined />}
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            />
            <Brand />
          </Header>
          <Drawer
            placement="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            size={280}
            closable={false}
            styles={{ body: { padding: 0 } }}
          >
            {sider}
          </Drawer>
        </>
      )}
      <Layout className={isDesktop ? styles.mainDesktop : undefined}>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
