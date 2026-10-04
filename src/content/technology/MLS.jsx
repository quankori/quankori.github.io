import { useMemo, useReducer, useState } from 'react'
import { Button, Collapse, Segmented, Select, Slider, Steps, Switch } from 'antd'
import {
  BranchesOutlined,
  BugOutlined,
  CloudServerOutlined,
  IdcardOutlined,
  KeyOutlined,
  LockOutlined,
  MailOutlined,
  MessageOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  SyncOutlined,
  UnlockOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './MLS.module.css'

/* =====================================================================
   RFC 9420 array representation of a (left-balanced, full) binary tree.
   Leaves sit at even indices (leaf i -> node 2i), parents at odd indices.
   The level of a node is its number of trailing 1 bits (Appendix C).
   ===================================================================== */

const log2Floor = (x) => (x > 0 ? 31 - Math.clz32(x) : 0)

function level(x) {
  let k = 0
  while ((x >> k) & 1) k++
  return k
}

const nodeWidth = (n) => (n === 0 ? 0 : 2 * (n - 1) + 1)
const rootOf = (n) => (1 << log2Floor(nodeWidth(n))) - 1
const leftOf = (x) => x ^ (1 << (level(x) - 1))
const rightOf = (x) => x ^ (3 << (level(x) - 1))

function parentOf(x) {
  const k = level(x)
  const b = (x >> (k + 1)) & 1
  return (x | (1 << k)) ^ (b << (k + 1))
}

function siblingOf(x) {
  const p = parentOf(x)
  return x < p ? rightOf(p) : leftOf(p)
}

/** Parents from x up to and including the root (empty for the root). */
function directPath(x, n) {
  const r = rootOf(n)
  const out = []
  while (x !== r) {
    x = parentOf(x)
    out.push(x)
  }
  return out
}

/** Siblings of x and of every direct-path node except the root. */
function copath(x, n) {
  if (x === rootOf(n)) return []
  return [x, ...directPath(x, n).slice(0, -1)].map(siblingOf)
}

/** True when node y lies in the subtree rooted at x. */
const covers = (x, y) => Math.abs(x - y) < 1 << level(x)

/**
 * Resolution (RFC 9420 §4.1.1): a non-blank node resolves to itself plus its
 * unmerged leaves; a blank leaf to nothing; a blank parent to the union of
 * its children's resolutions.
 */
function resolution(nodes, x) {
  const v = nodes[x]
  if (v) return x % 2 === 0 ? [x] : [x, ...v.unmerged.map((leaf) => 2 * leaf)]
  if (x % 2 === 0) return []
  return [...resolution(nodes, leftOf(x)), ...resolution(nodes, rightOf(x))]
}

/** Short, deterministic hash-like label standing in for a public key. */
function shortHash(seed) {
  let h = 0x811c9dc5
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  h ^= h >>> 15
  h = Math.imul(h, 0x2c1b3c6d)
  return ((h ^ (h >>> 12)) >>> 0).toString(16).padStart(8, '0').slice(0, 4)
}

const cloneNodes = (nodes) =>
  nodes.map((v) => (v ? { ...v, unmerged: v.unmerged ? [...v.unmerged] : undefined } : null))

/** Add proposal: leftmost blank leaf, extending (doubling) the tree if full. */
function addLeaf(tree, member) {
  let { n } = tree
  const nodes = cloneNodes(tree.nodes)
  let leaf = -1
  for (let i = 0; i < n; i++) {
    if (!nodes[2 * i]) {
      leaf = i
      break
    }
  }
  if (leaf === -1) {
    leaf = n
    n *= 2
    while (nodes.length < nodeWidth(n)) nodes.push(null)
  }
  for (const p of directPath(2 * leaf, n)) {
    if (nodes[p]) nodes[p].unmerged = [...nodes[p].unmerged, leaf]
  }
  nodes[2 * leaf] = member
  return { tree: { n, nodes }, leaf }
}

/** Remove proposal: blank the leaf and its direct path, then truncate. */
function removeLeaf(tree, leaf) {
  let { n } = tree
  let nodes = cloneNodes(tree.nodes)
  nodes[2 * leaf] = null
  for (const p of directPath(2 * leaf, n)) nodes[p] = null
  while (n > 1) {
    let rightHalfBlank = true
    for (let i = n / 2; i < n; i++) {
      if (nodes[2 * i]) {
        rightHalfBlank = false
        break
      }
    }
    if (!rightHalfBlank) break
    n /= 2
    nodes = nodes.slice(0, nodeWidth(n))
  }
  return { n, nodes }
}

/**
 * Committer's UpdatePath: fresh leaf key, then a new path secret for every
 * node on the filtered direct path, each HPKE-encrypted to the resolution of
 * the matching copath child (minus leaves added in this same Commit).
 */
function applyUpdatePath(tree, committer, newcomers, epoch) {
  const { n } = tree
  const nodes = cloneNodes(tree.nodes)
  const leafNode = 2 * committer
  const leafPk = shortHash(`leaf:${epoch}:${leafNode}:${nodes[leafNode].name}`)
  nodes[leafNode] = { ...nodes[leafNode], pk: leafPk }
  const excluded = new Set(newcomers.map((l) => 2 * l))
  const cp = copath(leafNode, n)
  const steps = directPath(leafNode, n).map((node, j) => {
    const res = resolution(nodes, cp[j])
    if (res.length === 0) {
      nodes[node] = null
      return { node, copath: cp[j], filtered: true, targets: [], skippedNew: 0 }
    }
    const targets = res.filter((t) => !excluded.has(t))
    const pk = shortHash(`node:${epoch}:${node}`)
    nodes[node] = { pk, unmerged: [] }
    return { node, copath: cp[j], filtered: false, targets, skippedNew: res.length - targets.length, pk }
  })
  const encryptions = steps.reduce((sum, s) => sum + s.targets.length, 0)
  return { tree: { n, nodes }, steps, encryptions, leafPk }
}

const NAMES = [
  'Alice', 'Bob', 'Carol', 'Dave', 'Erin', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy',
  'Kofi', 'Laila', 'Mateo', 'Nadia', 'Omar', 'Priya', 'Quinn', 'Rosa', 'Sven', 'Tariq',
  'Uma', 'Victor', 'Wen', 'Yara', 'Zane',
]
const MEMBER_COLORS = [
  '#2f6f4f', '#0e6a7d', '#7c4a1e', '#5b3fa0', '#9f1239', '#1e4fa8', '#3f6212', '#854d0e',
  '#155e75', '#86198f', '#374151', '#b42318', '#0b5c8f', '#4d6b12', '#57534e', '#a1124a',
]
const MAX_LEAVES = 16

const memberName = (i) => NAMES[i % NAMES.length] + (i >= NAMES.length ? ` ${Math.floor(i / NAMES.length) + 1}` : '')

function membersOf(state) {
  const out = []
  for (let i = 0; i < state.n; i++) {
    const v = state.nodes[2 * i]
    if (v) out.push({ leaf: i, name: v.name, color: v.color })
  }
  return out
}

function canAdd(state) {
  if (state.n < MAX_LEAVES) return true
  for (let i = 0; i < state.n; i++) if (!state.nodes[2 * i]) return true
  return false
}

function commit(state, kind, target) {
  const epoch = state.epoch + 1
  const committer = state.committer
  const committerName = state.nodes[2 * committer].name
  let tree = { n: state.n, nodes: state.nodes }
  let nextName = state.nextName
  let newcomers = []
  let label = 'Update (empty Commit with path)'
  let joined = null
  if (kind === 'add') {
    const name = memberName(nextName)
    const member = { name, color: MEMBER_COLORS[nextName % MEMBER_COLORS.length], pk: shortHash(`kp:${name}`) }
    const r = addLeaf(tree, member)
    tree = r.tree
    newcomers = [r.leaf]
    joined = { leaf: r.leaf, name }
    label = `Add ${name}`
    nextName += 1
  } else if (kind === 'remove') {
    label = `Remove ${tree.nodes[2 * target].name}`
    tree = removeLeaf(tree, target)
  }
  const up = applyUpdatePath(tree, committer, newcomers, epoch)
  if (joined) {
    const lca = up.steps.find((s) => covers(s.node, 2 * joined.leaf))
    joined.pathSecretNode = lca ? lca.node : null
  }
  const last = {
    epoch,
    committer,
    committerName,
    kind,
    label,
    joined,
    steps: up.steps,
    encryptions: up.encryptions,
    leafPk: up.leafPk,
    memberCount: membersOf(up.tree).length,
  }
  return {
    ...state,
    n: up.tree.n,
    nodes: up.tree.nodes,
    epoch,
    nextName,
    last,
    history: [
      { epoch, text: `Commit by ${committerName}: ${label}`, enc: up.encryptions },
      ...state.history,
    ].slice(0, 40),
  }
}

function initialTreeState() {
  let s = {
    n: 1,
    nodes: [{ name: 'Alice', color: MEMBER_COLORS[0], pk: shortHash('kp:Alice') }],
    epoch: 0,
    committer: 0,
    nextName: 1,
    last: null,
    history: [{ epoch: 0, text: 'Alice creates the group (a one-leaf tree)', enc: 0 }],
  }
  s = commit(s, 'add') // Bob   -> epoch 1
  s = commit(s, 'add') // Carol -> epoch 2
  s = commit(s, 'add') // Dave  -> epoch 3
  s = commit({ ...s, committer: 2 }, 'update') // Carol fills her blank parent -> epoch 4
  return { ...s, committer: 0 }
}

function treeReducer(state, action) {
  switch (action.type) {
    case 'committer':
      return state.nodes[2 * action.leaf] ? { ...state, committer: action.leaf } : state
    case 'add':
      return canAdd(state) ? commit(state, 'add') : state
    case 'remove':
      if (action.target === state.committer || !state.nodes[2 * action.target]) return state
      return commit(state, 'remove', action.target)
    case 'update':
      return commit(state, 'update')
    case 'reset':
      return initialTreeState()
    default:
      return state
  }
}

/* ===================================================================== */

function SectionHead({ num, id, title, lead }) {
  return (
    <header className={styles.sectionHead}>
      <span className={styles.sectionNum} aria-hidden="true">{num}</span>
      <div>
        <h2 id={id} className={styles.sectionTitle}>{title}</h2>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
    </header>
  )
}

/* ---------------------- 1. Why groups are hard ---------------------- */

const nFromSlider = (s) => Math.max(2, Math.min(1000, Math.round(2 * Math.pow(500, s / 100))))
const sliderFromN = (n) => (100 * Math.log(n / 2)) / Math.log(500)
const treeCost = (n) => Math.ceil(Math.log2(n))

const CH = { W: 640, H: 300, l: 54, r: 70, t: 18, b: 46 }
const X_TICKS = [2, 5, 10, 20, 50, 100, 200, 500, 1000]

function CostChart({ n, logY }) {
  const plotW = CH.W - CH.l - CH.r
  const plotH = CH.H - CH.t - CH.b
  const x = (v) => CH.l + (Math.log(v / 2) / Math.log(500)) * plotW
  const y = (v) =>
    logY ? CH.t + (1 - Math.log10(Math.max(v, 1)) / 3) * plotH : CH.t + (1 - v / 1000) * plotH
  const yTicks = logY ? [1, 10, 100, 1000] : [0, 250, 500, 750, 1000]

  const samples = useMemo(() => {
    const set = new Set()
    for (let s = 0; s <= 100; s += 0.4) set.add(nFromSlider(s))
    return [...set].sort((a, b) => a - b)
  }, [])

  const line = (fn) => samples.map((v, i) => `${i ? 'L' : 'M'}${x(v).toFixed(1)},${y(fn(v)).toFixed(1)}`).join(' ')
  const pair = n - 1
  const tree = treeCost(n)

  return (
    <svg
      viewBox={`0 0 ${CH.W} ${CH.H}`}
      className={styles.chart}
      role="img"
      aria-label={`Encryptions per key change at ${n} members: pairwise ${pair}, TreeKEM about ${tree}.`}
    >
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={CH.l} x2={CH.W - CH.r} y1={y(t)} y2={y(t)} className={styles.grid} />
          <text x={CH.l - 8} y={y(t) + 4} textAnchor="end" className={styles.axisText}>{t}</text>
        </g>
      ))}
      {X_TICKS.map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={CH.t + plotH} y2={CH.t + plotH + 5} className={styles.axis} />
          <text x={x(t)} y={CH.t + plotH + 19} textAnchor="middle" className={styles.axisText}>{t}</text>
        </g>
      ))}
      <line x1={CH.l} x2={CH.W - CH.r} y1={CH.t + plotH} y2={CH.t + plotH} className={styles.axis} />
      <line x1={CH.l} x2={CH.l} y1={CH.t} y2={CH.t + plotH} className={styles.axis} />
      <text x={CH.l + plotW / 2} y={CH.H - 6} textAnchor="middle" className={styles.axisTitle}>
        group size n (log scale)
      </text>
      <text
        transform={`translate(14 ${CH.t + plotH / 2}) rotate(-90)`}
        textAnchor="middle"
        className={styles.axisTitle}
      >
        encryptions per key change{logY ? ' (log)' : ''}
      </text>

      <path d={line((v) => v - 1)} className={styles.linePair} />
      <path d={line(treeCost)} className={styles.lineTree} />
      <text x={CH.W - CH.r + 6} y={y(999) + 4} className={styles.seriesPair}>n − 1</text>
      <text x={CH.W - CH.r + 6} y={y(treeCost(1000)) + (logY ? 4 : -6)} className={styles.seriesTree}>
        ⌈log₂ n⌉
      </text>

      <line x1={x(n)} x2={x(n)} y1={CH.t} y2={CH.t + plotH} className={styles.marker} />
      <circle cx={x(n)} cy={y(pair)} r="5.5" className={styles.dotPair} />
      <circle cx={x(n)} cy={y(tree)} r="5.5" className={styles.dotTree} />
    </svg>
  )
}

function WhyGroups() {
  const [s, setS] = useState(sliderFromN(100))
  const [scale, setScale] = useState('linear')
  const n = nFromSlider(s)
  const pair = n - 1
  const tree = treeCost(n)
  const ratio = pair / tree

  return (
    <section className={styles.section} aria-labelledby="mls-why">
      <SectionHead
        num="01"
        id="mls-why"
        title="Why groups are hard"
        lead="1:1 end-to-end encryption gives every pair its own session. Stretch that to a group and every key change has to be delivered to each other member individually."
      />
      <div className={styles.whyGrid}>
        <div className={styles.chartCard}>
          <div className={styles.chartControls}>
            <div className={styles.sliderBox}>
              <span className={styles.controlLabel} id="mls-n-label">Group size: <strong>{n}</strong> members</span>
              <Slider
                min={0}
                max={100}
                step={0.2}
                value={s}
                onChange={setS}
                marks={{ 0: '2', [sliderFromN(10)]: '10', [sliderFromN(100)]: '100', 100: '1000' }}
                tooltip={{ formatter: (v) => `${nFromSlider(v)} members` }}
                ariaLabelForHandle="Group size"
                ariaValueTextFormatterForHandle={(v) => `${nFromSlider(v)} members`}
              />
            </div>
            <Segmented
              aria-label="Y axis scale"
              value={scale}
              onChange={setScale}
              options={[
                { label: 'Linear', value: 'linear' },
                { label: 'Log', value: 'log' },
              ]}
            />
          </div>
          <CostChart n={n} logY={scale === 'log'} />
        </div>

        <div className={styles.statStack}>
          <div className={`${styles.stat} ${styles.statPair}`}>
            <span className={styles.statLabel}>Pairwise / Sender Keys fan-out</span>
            <span className={styles.statValue}>{pair.toLocaleString('en-US')}</span>
            <span className={styles.statNote}>encryptions when one member changes their key (n − 1)</span>
          </div>
          <div className={`${styles.stat} ${styles.statTree}`}>
            <span className={styles.statLabel}>MLS TreeKEM UpdatePath</span>
            <span className={styles.statValue}>{tree}</span>
            <span className={styles.statNote}>encryptions in a fully populated tree (⌈log₂ n⌉)</span>
          </div>
          <p className={styles.ratio}>
            {ratio >= 1.5 ? (
              <>
                <strong>{ratio >= 10 ? Math.round(ratio) : ratio.toFixed(1)}×</strong> fewer public-key encryptions per update.
              </>
            ) : (
              'At this size both approaches cost about the same.'
            )}
          </p>
        </div>
      </div>
      <div className={styles.noteRow}>
        <p>
          <strong>Sender Keys</strong> (Signal, WhatsApp) encrypt each message once, but a new sender key is still sent
          over n − 1 pairwise channels. After a removal every remaining member must rotate, so healing costs roughly
          (n − 1)(n − 2) = <strong>{((n - 1) * Math.max(n - 2, 0)).toLocaleString('en-US')}</strong> pairwise sends.
        </p>
        <p>
          <strong>What log n does not buy:</strong> every member still has to download and process each Commit, and
          blank nodes push the real cost above ⌈log₂ n⌉ (towards n − 1 in the worst case). MLS shrinks the
          cryptographic work and message size, not the delivery fan-out.
        </p>
      </div>
    </section>
  )
}

/* ---------------------- 2. Ratchet tree playground ---------------------- */

function Envelope({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} className={styles.envelope} aria-hidden="true">
      <rect x="-8" y="-6" width="16" height="12" rx="2" />
      <path d="M-8 -5 L0 1 L8 -5" />
    </g>
  )
}

function describeNode(nodes, i) {
  const v = nodes[i]
  if (i % 2 === 0) {
    return v ? `Leaf ${i / 2} (node ${i}): ${v.name}, leaf key ${v.pk}` : `Leaf ${i / 2} (node ${i}): blank`
  }
  if (!v) return `Node ${i}: blank parent, no key`
  const um = v.unmerged.map((l) => nodes[2 * l]?.name).filter(Boolean)
  return `Node ${i}: public key ${v.pk}${um.length ? `, unmerged leaves: ${um.join(', ')}` : ''}`
}

function TreeView({ state, focusNode, showIdx }) {
  const { n, nodes, last } = state
  const w = nodeWidth(n)
  const colW = n <= 2 ? 110 : n <= 4 ? 80 : n <= 8 ? 56 : 44
  const W = Math.max(w * colW, 420)
  const depth = log2Floor(n)
  const rowH = n >= 16 ? 72 : 80
  const top = 54
  const groundY = top + depth * rowH + 52
  const H = groundY + 26
  const offX = (W - w * colW) / 2
  const X = (i) => offX + (i + 0.5) * colW
  const Y = (i) => top + level(i) * rowH
  const r = rootOf(n)

  const hl = useMemo(() => {
    const out = {
      committer: null,
      joined: null,
      chain: new Set(),
      path: new Map(),
      filtered: new Set(),
      copath: new Set(),
      targets: new Set(),
    }
    if (!last) return out
    out.committer = 2 * last.committer
    out.joined = last.joined ? 2 * last.joined.leaf : null
    out.chain.add(out.committer)
    last.steps.forEach((s, j) => {
      out.chain.add(s.node)
      if (s.filtered) out.filtered.add(s.node)
      else out.path.set(s.node, j)
    })
    const shown = focusNode == null ? last.steps : last.steps.filter((s) => s.node === focusNode)
    shown.forEach((s) => {
      if (!s.filtered) out.copath.add(s.copath)
      s.targets.forEach((t) => out.targets.add(t))
    })
    return out
  }, [last, focusNode])

  const edges = []
  for (let i = 0; i < w; i++) {
    if (i === r) continue
    const p = parentOf(i)
    const x1 = X(i)
    const y1 = Y(i)
    const x2 = X(p)
    const y2 = Y(p)
    const my = (y1 + y2) / 2
    const onPath = hl.chain.has(i) && hl.chain.has(p)
    const blank = !nodes[i] || !nodes[p]
    edges.push(
      <path
        key={onPath ? `e${i}-${state.epoch}` : `e${i}`}
        d={`M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`}
        pathLength={onPath ? 1 : undefined}
        className={`${styles.branch} ${blank ? styles.branchBlank : ''} ${onPath ? styles.branchPath : ''}`}
        style={{ strokeWidth: onPath ? 4 + level(p) * 0.8 : 1.6 + level(p) * 0.9 }}
      />,
    )
  }

  const trunkW = 8 + depth * 3
  const rx = X(r)
  const ry = Y(r)

  const nodeEls = []
  for (let i = 0; i < w; i++) {
    const v = nodes[i]
    const x = X(i)
    const y = Y(i)
    const isLeaf = i % 2 === 0
    const pathIdx = hl.path.get(i)
    const refreshed = pathIdx !== undefined || i === hl.committer
    const cls = [
      styles.node,
      v ? '' : styles.nodeBlank,
      i === hl.committer ? styles.nodeCommitter : '',
      pathIdx !== undefined ? styles.nodePath : '',
      hl.copath.has(i) ? styles.nodeCopath : '',
      hl.targets.has(i) ? styles.nodeTarget : '',
      i === hl.joined ? styles.nodeJoined : '',
    ].join(' ')
    const delay = { animationDelay: `${(pathIdx === undefined ? 0 : pathIdx + 1) * 160}ms` }

    nodeEls.push(
      <g key={refreshed ? `n${i}-${state.epoch}` : `n${i}`} className={cls}>
        <title>{describeNode(nodes, i)}</title>
        {hl.copath.has(i) &&
          (isLeaf ? (
            <circle cx={x} cy={y} r="27" className={styles.copathRing} />
          ) : (
            <rect x={x - 30} y={y - 19} width="60" height="38" rx="19" className={styles.copathRing} />
          ))}
        <g className={refreshed ? styles.sprout : undefined} style={refreshed ? delay : undefined}>
          {isLeaf ? (
            v ? (
              <>
                <circle cx={x} cy={y} r="19" fill={v.color} className={styles.leafDisc} />
                <text x={x} y={y + 5} textAnchor="middle" className={styles.initial}>{v.name[0]}</text>
              </>
            ) : (
              <>
                <circle cx={x} cy={y} r="17" className={styles.blankShape} />
                <text x={x} y={y + 5} textAnchor="middle" className={styles.blankText}>∅</text>
              </>
            )
          ) : v ? (
            <>
              <rect x={x - 23} y={y - 12} width="46" height="24" rx="12" className={styles.parentShape} />
              <text x={x} y={y + 4} textAnchor="middle" className={styles.hashText}>{v.pk}</text>
            </>
          ) : (
            <>
              <rect x={x - 21} y={y - 11} width="42" height="22" rx="11" className={styles.blankShape} />
              <text x={x} y={y + 4} textAnchor="middle" className={styles.blankText}>∅</text>
            </>
          )}
        </g>
        {isLeaf && (
          <text x={x} y={y - 27} textAnchor="middle" className={v ? styles.nameText : styles.blankLabel}>
            {v ? v.name : 'blank'}
          </text>
        )}
        {!isLeaf && v && v.unmerged.length > 0 && (
          <g className={styles.unmergedBadge}>
            <circle cx={x - 24} cy={y - 12} r="8" />
            <text x={x - 24} y={y - 8.5} textAnchor="middle">+{v.unmerged.length}</text>
          </g>
        )}
        {hl.targets.has(i) && <Envelope x={isLeaf ? x + 19 : x + 24} y={isLeaf ? y - 16 : y - 13} />}
        {showIdx && (
          <text x={isLeaf ? x + 13 : x + 25} y={isLeaf ? y + 29 : y + 22} className={styles.idxText}>
            {i}
          </text>
        )}
      </g>,
    )
  }

  const memberCount = membersOf(state).length
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={styles.treeSvg}
      role="img"
      aria-label={`Ratchet tree with ${n} leaf slots, ${memberCount} members, epoch ${state.epoch}. Members are the leaves at the top; the root is at the bottom.`}
    >
      <defs>
        <linearGradient id="mls-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3faf6" />
          <stop offset="1" stopColor="#e6f3ec" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill="url(#mls-sky)" rx="14" />
      <path
        d={`M0 ${groundY} Q ${W / 2} ${groundY - 14} ${W} ${groundY} L ${W} ${H} L 0 ${H} Z`}
        className={styles.ground}
      />
      <path
        d={`M${rx - trunkW / 2} ${ry} C ${rx - trunkW / 2} ${ry + 30}, ${rx - trunkW} ${groundY - 18}, ${rx - trunkW * 1.6} ${groundY}
            L ${rx + trunkW * 1.6} ${groundY} C ${rx + trunkW} ${groundY - 18}, ${rx + trunkW / 2} ${ry + 30}, ${rx + trunkW / 2} ${ry} Z`}
        className={styles.trunk}
      />
      <text x={rx} y={groundY + 18} textAnchor="middle" className={styles.rootLabel}>
        root · node {r}
      </text>
      {edges}
      {nodeEls}
    </svg>
  )
}

const LEGEND = [
  ['Committer', 'swCommitter'],
  ['Direct path (new path secret)', 'swPath'],
  ['Copath child', 'swCopath'],
  ['Encrypted to (resolution)', 'swTarget'],
  ['New member', 'swJoined'],
  ['Blank node', 'swBlank'],
  ['Unmerged leaves', 'swUnmerged'],
]

function nameOrNode(nodes, x) {
  if (x % 2 === 0) return nodes[x]?.name ?? `leaf ${x / 2}`
  const names = []
  for (let i = x - (1 << level(x)) + 1; i < x + (1 << level(x)); i += 2) {
    if (nodes[i]) names.push(nodes[i].name)
  }
  return `node ${x} (${names.join(', ')})`
}

function TreePlayground() {
  const [state, dispatch] = useReducer(treeReducer, undefined, initialTreeState)
  const [removePick, setRemovePick] = useState(null)
  const [focus, setFocus] = useState({ epoch: -1, node: null })
  const [showIdx, setShowIdx] = useState(true)

  const members = membersOf(state)
  const committerName = state.nodes[2 * state.committer].name
  const removable = members.filter((m) => m.leaf !== state.committer)
  const removeTarget = removable.some((m) => m.leaf === removePick) ? removePick : removable[0]?.leaf
  const focusNode = focus.epoch === state.epoch ? focus.node : null
  const last = state.last
  const blanks = state.nodes.filter((v) => !v).length

  return (
    <section className={`${styles.section} ${styles.hero}`} aria-labelledby="mls-tree">
      <SectionHead
        num="02"
        id="mls-tree"
        title="Ratchet tree playground"
        lead="Members are the leaves. Every parent node holds a key pair that exactly the members below it can know. Drawn like a real tree: leaves at the top, root in the soil."
      />

      <div className={styles.toolbar}>
        <div className={styles.field}>
          <label htmlFor="mls-committer" className={styles.controlLabel}>Committer</label>
          <Select
            id="mls-committer"
            value={state.committer}
            onChange={(leaf) => dispatch({ type: 'committer', leaf })}
            options={members.map((m) => ({ value: m.leaf, label: m.name }))}
            className={styles.select}
          />
        </div>
        <div className={styles.actions}>
          <Button type="primary" icon={<UserAddOutlined />} disabled={!canAdd(state)} onClick={() => dispatch({ type: 'add' })}>
            Add {memberName(state.nextName)}
          </Button>
          <Button icon={<SyncOutlined />} onClick={() => dispatch({ type: 'update' })}>
            Update from {committerName}
          </Button>
        </div>
        <div className={styles.field}>
          <label htmlFor="mls-remove" className={styles.controlLabel}>Remove member</label>
          <div className={styles.inline}>
            <Select
              id="mls-remove"
              value={removeTarget}
              onChange={setRemovePick}
              disabled={!removable.length}
              options={removable.map((m) => ({ value: m.leaf, label: m.name }))}
              className={styles.select}
            />
            <Button
              danger
              icon={<UserDeleteOutlined />}
              disabled={removeTarget === undefined}
              onClick={() => dispatch({ type: 'remove', target: removeTarget })}
            >
              Remove
            </Button>
          </div>
        </div>
        <div className={styles.toolbarEnd}>
          <label className={styles.switchLabel}>
            <Switch size="small" checked={showIdx} onChange={setShowIdx} aria-label="Show node indices" />
            <span>Indices</span>
          </label>
          <Button type="text" icon={<ReloadOutlined />} onClick={() => dispatch({ type: 'reset' })}>
            Reset
          </Button>
        </div>
      </div>
      <p className={styles.hint}>
        Each button sends one Commit from the selected committer, which carries the proposal plus an UpdatePath.
        (RFC 9420 lets an Add-only Commit omit the path; this playground always includes it.)
        {!canAdd(state) && ' The tree is capped at 16 leaves here.'}
      </p>

      <div className={styles.treeFrame}>
        <TreeView state={state} focusNode={focusNode} showIdx={showIdx} />
      </div>

      <ul className={styles.legend} aria-label="Legend">
        {LEGEND.map(([label, sw]) => (
          <li key={label}>
            <span className={`${styles.swatch} ${styles[sw]}`} aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>

      <div className={styles.playGrid}>
        <div className={styles.panel} aria-live="polite">
          {last ? (
            <>
              <div className={styles.panelHead}>
                <span className={styles.epochPill}>epoch {last.epoch}</span>
                <h3 className={styles.panelTitle}>
                  Commit by {last.committerName}: {last.label}
                </h3>
              </div>
              <div className={styles.encRow}>
                <div className={styles.encBig}>
                  <span className={styles.encNum}>{last.encryptions}</span>
                  <span className={styles.encUnit}>HPKE encryption{last.encryptions === 1 ? '' : 's'}</span>
                </div>
                <p className={styles.encCompare}>
                  Pairwise fan-out to the other {Math.max(last.memberCount - 1, 0)} member
                  {last.memberCount - 1 === 1 ? '' : 's'} would need {Math.max(last.memberCount - 1, 0)}.
                  {last.committerName}&apos;s new leaf key is <code>{last.leafPk}</code>.
                </p>
              </div>
              {last.steps.length ? (
                <>
                  <p className={styles.small}>
                    Walk up the direct path. Select a step to highlight just its copath child and recipients.
                  </p>
                  <ol className={styles.stepList}>
                    {last.steps.map((s) => {
                      const active = focusNode === s.node
                      return (
                        <li key={s.node}>
                          <button
                            type="button"
                            className={`${styles.stepBtn} ${active ? styles.stepActive : ''} ${s.filtered ? styles.stepFiltered : ''}`}
                            aria-pressed={active}
                            onClick={() => setFocus({ epoch: state.epoch, node: active ? null : s.node })}
                          >
                            <span className={styles.stepNode}>node {s.node}</span>
                            {s.filtered ? (
                              <span>
                                Skipped: copath child {s.copath} has an empty resolution, so the node stays blank
                                (filtered direct path).
                              </span>
                            ) : (
                              <span>
                                new key <code>{s.pk}</code> · path secret →{' '}
                                {s.targets.length
                                  ? s.targets.map((t) => nameOrNode(state.nodes, t)).join(', ')
                                  : 'only the new member, inside the Welcome'}
                                {s.skippedNew > 0 && s.targets.length > 0 && ' (the new member gets it from the Welcome)'}
                                <strong className={styles.stepCount}> ×{s.targets.length}</strong>
                              </span>
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ol>
                </>
              ) : (
                <p className={styles.small}>The committer is the only member, so there is no path to encrypt.</p>
              )}
              {last.joined && (
                <p className={styles.welcomeNote}>
                  <MailOutlined aria-hidden="true" /> Welcome to {last.joined.name}: joiner_secret plus the path secret
                  for node {last.joined.pathSecretNode}, the lowest point where {last.joined.name}&apos;s and{' '}
                  {last.committerName}&apos;s paths meet. {last.joined.name} derives every key above it.
                </p>
              )}
              <p className={styles.small}>
                The path secret one step past the root becomes the <code>commit_secret</code> fed into the key
                schedule.
              </p>
            </>
          ) : (
            <p>Make a commit to see its UpdatePath.</p>
          )}
        </div>

        <div className={styles.sideCol}>
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Epoch history</h3>
            <ol className={styles.history} aria-label="Epoch history, newest first">
              {state.history.map((h) => (
                <li key={h.epoch}>
                  <span className={styles.histEpoch}>→ {h.epoch}</span>
                  <span>{h.text}</span>
                  {h.epoch > 0 && <span className={styles.histEnc}>{h.enc} enc</span>}
                </li>
              ))}
            </ol>
          </div>
          <div className={`${styles.panel} ${styles.blankPanel}`}>
            <h3 className={styles.panelTitle}>Why blanks cost more</h3>
            <p className={styles.small}>
              Removing a member blanks its leaf <em>and its whole direct path</em>, because those keys were known to
              the removed member. A blank node has no key, so its resolution is every non-blank node beneath it. A path
              secret aimed at a blank copath child has to be encrypted to each of those separately.
            </p>
            <p className={styles.small}>
              New members also appear as <strong>unmerged leaves</strong> on parents they can&apos;t yet decrypt,
              adding one extra recipient each. Both heal when a member whose path crosses those nodes commits.
              Currently <strong>{blanks}</strong> blank node{blanks === 1 ? '' : 's'} in the tree.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------- 3. Message lifecycle ---------------------- */

const LIFECYCLE = [
  {
    title: 'KeyPackage',
    icon: <IdcardOutlined />,
    flow: ['Erin', 'Delivery Service'],
    body: 'Before anyone invites her, Erin’s client publishes KeyPackages: signed bundles with an HPKE init key, a leaf node (encryption key, credential, capabilities, lifetime) and her signature. Each one is meant to be used once.',
  },
  {
    title: 'Add proposal',
    icon: <UserAddOutlined />,
    flow: ['Alice', 'Delivery Service', 'Alice'],
    body: 'Alice fetches one of Erin’s KeyPackages, validates the signature and checks the credential with the Authentication Service, then forms an Add proposal. Proposals can be sent ahead and referenced, or included directly in a Commit.',
  },
  {
    title: 'Commit',
    icon: <BranchesOutlined />,
    flow: ['Alice', 'Delivery Service', 'Bob, Carol, Dave'],
    body: 'The Commit lists the proposals, carries Alice’s UpdatePath, and is signed with a confirmation tag over the new transcript. The DS accepts exactly one Commit per epoch and rejects the rest; Alice applies her own Commit only after it is accepted.',
  },
  {
    title: 'Welcome',
    icon: <MailOutlined />,
    flow: ['Alice', 'Delivery Service', 'Erin'],
    body: 'Erin can’t process the Commit, so she gets a Welcome: joiner_secret (and a path secret) encrypted to her KeyPackage init key, plus GroupInfo encrypted under welcome_secret. The ratchet tree comes in an extension or out-of-band. Send it only after the Commit is accepted.',
  },
  {
    title: 'New epoch',
    icon: <SyncOutlined />,
    flow: ['Everyone'],
    body: 'Each member verifies the Commit, applies the proposals to its copy of the tree, decrypts the one path secret meant for it, derives commit_secret and runs the key schedule. Everyone lands on the same epoch_secret and deletes the previous epoch’s secrets.',
  },
  {
    title: 'App messages',
    icon: <MessageOutlined />,
    flow: ['Any member', 'Delivery Service', 'All members'],
    body: 'Messages are PrivateMessages: content encrypted with the sender’s next key from the secret tree (leaf index + generation), sender data encrypted under sender_data_secret. The DS fans out ciphertext it cannot read.',
  },
]

function Lifecycle() {
  const [cur, setCur] = useState(0)
  const step = LIFECYCLE[cur]
  return (
    <section className={styles.section} aria-labelledby="mls-life">
      <SectionHead
        num="03"
        id="mls-life"
        title="Message lifecycle: adding Erin"
        lead="Select a step. Everything goes through the Delivery Service, but nothing it carries lets it read the group."
      />
      <Steps
        size="small"
        current={cur}
        onChange={setCur}
        items={LIFECYCLE.map((s) => ({ title: s.title, icon: s.icon }))}
        className={styles.steps}
      />
      <div className={styles.lifeDetail} aria-live="polite">
        <div className={styles.flow} aria-label="Message flow">
          {step.flow.map((a, i) => (
            <span key={`${a}-${i}`} className={styles.flowItem}>
              {i > 0 && <span className={styles.flowArrow} aria-hidden="true">→</span>}
              <span className={a === 'Delivery Service' ? `${styles.actor} ${styles.actorDs}` : styles.actor}>{a}</span>
            </span>
          ))}
        </div>
        <p>{step.body}</p>
        <div className={styles.lifeNav}>
          <Button size="small" disabled={cur === 0} onClick={() => setCur(cur - 1)}>Previous</Button>
          <Button size="small" disabled={cur === LIFECYCLE.length - 1} onClick={() => setCur(cur + 1)}>Next</Button>
        </div>
      </div>
      <div className={styles.serviceGrid}>
        <div className={styles.serviceCard}>
          <h3><CloudServerOutlined aria-hidden="true" /> Delivery Service</h3>
          <ul>
            <li>Stores and hands out KeyPackages, ideally each one once.</li>
            <li>Orders handshake messages: picks one Commit per epoch so the group doesn&apos;t fork.</li>
            <li>Fans out Commits, Welcomes and application ciphertext.</li>
            <li>
              <strong>Untrusted for confidentiality and integrity.</strong> It can delay, drop or withhold messages
              (denial of service) but can&apos;t read or forge them.
            </li>
          </ul>
        </div>
        <div className={styles.serviceCard}>
          <h3><SafetyCertificateOutlined aria-hidden="true" /> Authentication Service</h3>
          <ul>
            <li>Binds credentials (e.g. X.509 or basic identities) to signature keys.</li>
            <li>Decides that this leaf really belongs to Erin, and which devices are hers.</li>
            <li>Handles issuance, expiry and revocation. MLS calls it; MLS does not implement it.</li>
            <li>
              <strong>Must be trusted:</strong> a malicious AS can vouch for an impostor&apos;s key, and no amount of
              TreeKEM fixes that.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------------------- 4. Key schedule ---------------------- */

const KS = {
  init_prev: {
    label: 'init_secret',
    sub: 'from epoch n−1',
    kind: 'input',
    formula: 'init_secret[n] = DeriveSecret(epoch_secret[n−1], "init")',
    text: 'The thread that chains epochs together. Only members of the previous epoch know it, which is why a removed member can’t follow along even if they see the Commit. Epoch 0 starts from a random value.',
  },
  commit_secret: {
    label: 'commit_secret',
    sub: 'from TreeKEM',
    kind: 'input',
    formula: 'commit_secret = DeriveSecret(path_secret[root], "path")',
    text: 'Fresh entropy from this Commit’s UpdatePath: the path secret one step past the root. All zeros if the Commit carries no path. This is where post-compromise security enters the schedule.',
  },
  joiner: {
    label: 'joiner_secret',
    kind: 'secret',
    formula: 'ExpandWithLabel(KDF.Extract(init_secret, commit_secret), "joiner", GroupContext[n], Nh)',
    text: 'The entry point for new members. The Welcome encrypts it to each joiner’s KeyPackage init key, so they can enter the schedule here without ever knowing init_secret.',
  },
  psk: {
    label: 'psk_secret',
    sub: 'or zeros',
    kind: 'input',
    formula: 'chained KDF.Extract over each PSK, with labels binding its id and position',
    text: 'Optional pre-shared keys: external PSKs agreed out of band, or resumption PSKs from an earlier epoch or group (re-init, branching). A zero vector when none are used.',
  },
  welcome: {
    label: 'welcome_secret',
    kind: 'side',
    formula: 'DeriveSecret(KDF.Extract(joiner_secret, psk_secret), "welcome")',
    text: 'Derives the key and nonce that encrypt the GroupInfo inside a Welcome message.',
  },
  epoch: {
    label: 'epoch_secret',
    kind: 'core',
    formula: 'ExpandWithLabel(KDF.Extract(joiner_secret, psk_secret), "epoch", GroupContext[n], Nh)',
    text: 'The root of every key in this epoch. It is bound to the GroupContext (group id, epoch, tree hash, confirmed transcript hash, extensions), so members that disagree on any of these derive different keys and fail loudly instead of silently diverging.',
  },
  sender_data: {
    label: 'sender_data_secret',
    tag: '"sender data"',
    kind: 'derived',
    formula: 'DeriveSecret(epoch_secret, "sender data")',
    text: 'Encrypts the sender’s leaf index and generation in each PrivateMessage, keyed by a sample of the ciphertext, so the DS can’t see who sent what.',
  },
  encryption: {
    label: 'encryption_secret',
    tag: '"encryption"',
    kind: 'derived',
    formula: 'DeriveSecret(epoch_secret, "encryption")',
    text: 'The root of the secret tree, which hands every member its own handshake and application ratchets for this epoch.',
  },
  exporter: {
    label: 'exporter_secret',
    tag: '"exporter"',
    kind: 'derived',
    formula: 'MLS-Exporter(label, context, length) = ExpandWithLabel(DeriveSecret(exporter_secret, label), "exported", Hash(context), length)',
    text: 'Gives applications fresh, domain-separated keys tied to group membership: SFrame media keys for calls, attachment wrapping keys, and so on.',
  },
  external: {
    label: 'external_secret',
    tag: '"external"',
    kind: 'derived',
    formula: 'DeriveSecret(epoch_secret, "external") → HPKE key pair; public part = external_pub in GroupInfo',
    text: 'Makes external Commits possible: a non-member holding the GroupInfo encrypts a fresh init secret to external_pub and commits itself in.',
  },
  confirm: {
    label: 'confirmation_key',
    tag: '"confirm"',
    kind: 'derived',
    formula: 'confirmation_tag = MAC(confirmation_key, confirmed_transcript_hash)',
    text: 'The Commit carries a confirmation tag. Receivers check it, which proves they reached the same epoch secrets and transcript as the committer.',
  },
  membership: {
    label: 'membership_key',
    tag: '"membership"',
    kind: 'derived',
    formula: 'membership_tag = MAC(membership_key, AuthenticatedContentTBM)',
    text: 'Tags PublicMessages sent by members, proving the sender knew this epoch’s secrets and not just a valid signature key.',
  },
  resumption: {
    label: 'resumption_psk',
    tag: '"resumption"',
    kind: 'derived',
    formula: 'DeriveSecret(epoch_secret, "resumption")',
    text: 'Injected as a PSK in a later epoch, a re-initialised group or a subgroup branch, proving the new state descends from this one.',
  },
  authenticator: {
    label: 'epoch_authenticator',
    tag: '"authentication"',
    kind: 'derived',
    formula: 'DeriveSecret(epoch_secret, "authentication")',
    text: 'A value members can compare out of band, like a safety number for the whole group, to detect forks or a meddling DS.',
  },
  secret_tree: {
    label: 'secret tree',
    kind: 'tree',
    formula: 'tree_node[root] = encryption_secret; children = ExpandWithLabel(parent, "tree", "left" | "right", Nh)',
    text: 'Same shape as the ratchet tree. Each leaf secret seeds two ratchets for that member: handshake and application. Nodes are deleted as soon as their children are derived.',
  },
  ratchets: {
    label: 'per-sender ratchets',
    kind: 'tree',
    formula: 'key[j] = DeriveTreeSecret(secret[j], "key", j, Nk); nonce[j] = …"nonce"…; secret[j+1] = DeriveTreeSecret(secret[j], "secret", j, Nh)',
    text: 'Every message from a sender uses the next generation j. Keys are deleted after use, so forward secrecy holds even within an epoch, and senders never share a nonce space.',
  },
  init_next: {
    label: 'init_secret',
    sub: 'for epoch n+1',
    kind: 'next',
    formula: 'DeriveSecret(epoch_secret, "init")',
    text: 'Carried into the next Commit’s Extract. After that everything else from this epoch is deleted; old keys can’t be recomputed from new ones.',
  },
}

const DERIVED = ['sender_data', 'encryption', 'exporter', 'external', 'confirm', 'membership', 'resumption', 'authenticator', 'init_next']

function KsBox({ id, sel, onSel }) {
  const b = KS[id]
  return (
    <button
      type="button"
      className={`${styles.ksBox} ${styles[`ks_${b.kind}`]} ${sel === id ? styles.ksSelected : ''}`}
      aria-pressed={sel === id}
      onClick={() => onSel(id)}
      onMouseEnter={() => onSel(id)}
      onFocus={() => onSel(id)}
    >
      <span className={styles.ksLabel}>{b.label}</span>
      {(b.sub || b.tag) && <span className={styles.ksSub}>{b.sub || b.tag}</span>}
    </button>
  )
}

function KsOp({ children }) {
  return (
    <div className={styles.ksOp} aria-hidden="true">
      <span className={styles.ksArrow}>↓</span>
      <span className={styles.ksOpText}>{children}</span>
    </div>
  )
}

function KeySchedule() {
  const [sel, setSel] = useState('epoch')
  const b = KS[sel]
  return (
    <section className={styles.section} aria-labelledby="mls-ks">
      <SectionHead
        num="04"
        id="mls-ks"
        title="Key schedule"
        lead="One epoch_secret per epoch, many purpose-specific keys. Hover, focus or tap a box to see what it does."
      />
      <div className={styles.ksGrid}>
        <div className={styles.ksFlow}>
          <div className={styles.ksRow}>
            <KsBox id="init_prev" sel={sel} onSel={setSel} />
            <span className={styles.ksPlus} aria-hidden="true">+</span>
            <KsBox id="commit_secret" sel={sel} onSel={setSel} />
          </div>
          <KsOp>KDF.Extract, then ExpandWithLabel “joiner”</KsOp>
          <div className={styles.ksRow}>
            <KsBox id="joiner" sel={sel} onSel={setSel} />
            <span className={styles.ksPlus} aria-hidden="true">+</span>
            <KsBox id="psk" sel={sel} onSel={setSel} />
          </div>
          <KsOp>KDF.Extract, then ExpandWithLabel “epoch”</KsOp>
          <div className={styles.ksRow}>
            <KsBox id="epoch" sel={sel} onSel={setSel} />
            <span className={styles.ksSide} aria-hidden="true">also →</span>
            <KsBox id="welcome" sel={sel} onSel={setSel} />
          </div>
          <KsOp>DeriveSecret(epoch_secret, label)</KsOp>
          <div className={styles.ksDerived}>
            {DERIVED.map((id) => (
              <KsBox key={id} id={id} sel={sel} onSel={setSel} />
            ))}
          </div>
          <KsOp>encryption_secret seeds</KsOp>
          <div className={styles.ksRow}>
            <KsBox id="secret_tree" sel={sel} onSel={setSel} />
            <span className={styles.ksPlus} aria-hidden="true">→</span>
            <KsBox id="ratchets" sel={sel} onSel={setSel} />
          </div>
        </div>
        <aside className={styles.ksDetail} aria-live="polite">
          <span className={styles.ksDetailKind}><KeyOutlined aria-hidden="true" /> {b.label}{b.sub ? ` · ${b.sub}` : ''}</span>
          <code className={styles.formula}>{b.formula}</code>
          <p>{b.text}</p>
        </aside>
      </div>
    </section>
  )
}

/* ---------------------- 5. Security properties ---------------------- */

const PCS_MEMBERS = ['Alice', 'Bob', 'Carol', 'Dave']

function pcsInitial() {
  return {
    victim: 'Bob',
    attackerIn: false,
    compromisedAt: null,
    turn: 0,
    epochs: [
      { e: 5, status: 'clean', note: 'Normal traffic' },
      { e: 6, status: 'clean', note: 'Carol commits an update' },
      { e: 7, status: 'clean', note: 'Dave commits an update' },
    ],
  }
}

function pcsReducer(s, a) {
  const cur = s.epochs[s.epochs.length - 1].e
  switch (a.type) {
    case 'victim':
      return s.compromisedAt == null ? { ...s, victim: a.victim } : s
    case 'compromise':
      if (s.attackerIn || s.compromisedAt != null) return s
      return {
        ...s,
        attackerIn: true,
        compromisedAt: cur,
        epochs: s.epochs.map((ep) =>
          ep.e === cur
            ? { ...ep, status: 'exposed', note: `${s.victim}’s device state stolen` }
            : { ...ep, status: 'past' },
        ),
      }
    case 'other': {
      const others = PCS_MEMBERS.filter((m) => m !== s.victim)
      const who = others[s.turn % others.length]
      return {
        ...s,
        turn: s.turn + 1,
        epochs: [
          ...s.epochs,
          s.attackerIn
            ? { e: cur + 1, status: 'exposed', note: `${who} commits; a path secret is encrypted to a key ${s.victim} still holds` }
            : { e: cur + 1, status: 'clean', note: `${who} commits an update` },
        ],
      }
    }
    case 'heal':
      return {
        ...s,
        attackerIn: false,
        epochs: [
          ...s.epochs,
          s.attackerIn
            ? { e: cur + 1, status: 'healed', note: `${s.victim} commits a fresh leaf key and new path secrets` }
            : { e: cur + 1, status: 'clean', note: `${s.victim} commits an update` },
        ],
      }
    case 'reset':
      return pcsInitial()
    default:
      return s
  }
}

const STATUS = {
  clean: { label: 'Private', cls: 'stClean', icon: <LockOutlined /> },
  past: { label: 'Forward secret', cls: 'stPast', icon: <LockOutlined /> },
  exposed: { label: 'Attacker reads', cls: 'stExposed', icon: <UnlockOutlined /> },
  healed: { label: 'Healed', cls: 'stHealed', icon: <SafetyCertificateOutlined /> },
}

function Security() {
  const [s, dispatch] = useReducer(pcsReducer, undefined, pcsInitial)
  const cur = s.epochs[s.epochs.length - 1]
  const exposed = s.epochs.filter((e) => e.status === 'exposed').map((e) => e.e)
  const others = PCS_MEMBERS.filter((m) => m !== s.victim)
  const nextOther = others[s.turn % others.length]

  let verdict
  if (s.compromisedAt == null) verdict = `No compromise yet. Pick a member and steal their device state at epoch ${cur.e}.`
  else if (s.attackerIn)
    verdict = `The attacker holds ${s.victim}’s leaf key and path secrets, so they can decrypt every Commit that doesn’t replace those keys. They read epoch${exposed.length > 1 ? 's' : ''} ${exposed.join(', ')}.`
  else
    verdict = `Locked out. ${s.victim}’s Commit replaced every key the attacker knew, so the attacker can’t follow into later epochs. They read only epoch${exposed.length > 1 ? 's' : ''} ${exposed.join(', ')}, and nothing before epoch ${s.compromisedAt}.`

  return (
    <section className={styles.section} aria-labelledby="mls-sec">
      <SectionHead
        num="05"
        id="mls-sec"
        title="Security properties: compromise, then heal"
        lead="Forward secrecy protects the past; post-compromise security repairs the future."
      />
      <div className={styles.propGrid}>
        <div className={styles.propCard}>
          <h3><LockOutlined aria-hidden="true" /> Forward secrecy</h3>
          <p>
            Stealing a device today doesn&apos;t unlock yesterday. Old epoch secrets, secret-tree nodes and used message
            keys are deleted, and new keys can&apos;t be run backwards to recover them.
          </p>
        </div>
        <div className={styles.propCard}>
          <h3><SafetyCertificateOutlined aria-hidden="true" /> Post-compromise security</h3>
          <p>
            Once the victim commits an UpdatePath with fresh randomness, every key the attacker stole is replaced. The
            new commit_secret is something the attacker never sees, so later epochs are private again.
          </p>
        </div>
      </div>

      <div className={styles.pcsBox}>
        <div className={styles.pcsControls}>
          <div className={styles.field}>
            <label htmlFor="mls-victim" className={styles.controlLabel}>Victim</label>
            <Select
              id="mls-victim"
              value={s.victim}
              disabled={s.compromisedAt != null}
              onChange={(victim) => dispatch({ type: 'victim', victim })}
              options={PCS_MEMBERS.map((m) => ({ value: m, label: m }))}
              className={styles.select}
            />
          </div>
          <div className={styles.actions}>
            <Button
              danger
              type="primary"
              icon={<BugOutlined />}
              disabled={s.compromisedAt != null}
              onClick={() => dispatch({ type: 'compromise' })}
            >
              Compromise {s.victim} at epoch {cur.e}
            </Button>
            <Button icon={<BranchesOutlined />} onClick={() => dispatch({ type: 'other' })}>
              Commit from {nextOther}
            </Button>
            <Button type="primary" icon={<SyncOutlined />} onClick={() => dispatch({ type: 'heal' })}>
              Update from {s.victim}
            </Button>
            <Button type="text" icon={<ReloadOutlined />} onClick={() => dispatch({ type: 'reset' })}>
              Reset
            </Button>
          </div>
        </div>

        <ol className={styles.timeline} aria-label="Epoch timeline">
          {s.epochs.map((ep) => {
            const st = STATUS[ep.status]
            return (
              <li key={ep.e} className={`${styles.epochCard} ${styles[st.cls]}`}>
                <span className={styles.epochNum}>epoch {ep.e}</span>
                <span className={styles.epochStatus}>
                  <span aria-hidden="true">{st.icon}</span> {st.label}
                </span>
                <span className={styles.epochNote}>{ep.note}</span>
              </li>
            )
          })}
        </ol>
        <p className={`${styles.verdict} ${s.attackerIn ? styles.verdictBad : ''}`} aria-live="polite">
          {verdict}
        </p>
        <p className={styles.small}>
          Removing {s.victim} heals the group too, since the leaf and its direct path are blanked. Within an epoch, the
          per-sender ratchets mean the attacker only gets message keys that hadn&apos;t been used and deleted yet.
          Healing assumes the attacker stays passive: if they also hold {s.victim}&apos;s signature key, they can
          race in their own Commit first. That is why credentials should be rotated and revocable through the AS.
        </p>
      </div>
    </section>
  )
}

/* ---------------------- 6. Gotchas ---------------------- */

const GOTCHAS = [
  {
    key: 'fork',
    label: 'Commit ordering and forks',
    children: (
      <>
        <p>
          Two members can commit from the same epoch. Those Commits are siblings, not a sequence, and the group
          can&apos;t merge both. The DS must serialize them per group, ideally with a compare-and-swap on the expected
          epoch, and return which one won.
        </p>
        <p>
          The loser discards its pending Commit, processes the winner and re-proposes anything still relevant. Never
          merge your own Commit just because the upload returned 200. Comparing <code>epoch_authenticator</code> out of
          band catches forks a misbehaving DS might create.
        </p>
      </>
    ),
  },
  {
    key: 'kp',
    label: 'Stale KeyPackages and last-resort keys',
    children: (
      <p>
        KeyPackages are one-time: the DS should hand each out once and delete it, and clients must replenish their
        stock. Each KeyPackage also has a lifetime, and expired ones must be rejected. When a client runs out, a
        reusable &quot;last resort&quot; KeyPackage keeps it reachable at the cost of linkability and replay risk, so
        rotate it and update the leaf soon after joining.
      </p>
    ),
  },
  {
    key: 'welcome',
    label: 'Large-group Welcome size',
    children: (
      <p>
        A joiner needs the whole ratchet tree, which is O(n) in size. Sent in the <code>ratchet_tree</code> extension,
        a Welcome for a group of thousands can reach megabytes. Common fixes: serve the tree from the DS (it&apos;s
        public data, verified against the tree hash in GroupInfo), compress it, and batch several Adds into one Commit
        so one Welcome covers many joiners.
      </p>
    ),
  },
  {
    key: 'external',
    label: 'External commits',
    children: (
      <p>
        A client holding a signed GroupInfo can join without a Welcome: it encrypts a fresh secret to{' '}
        <code>external_pub</code> and commits itself in. This is handy for open rooms and for resyncing a device that
        lost state (the external Commit can remove its old leaf). It is also an access-control hole unless the app
        restricts who can fetch GroupInfo and whose external joins are accepted.
      </p>
    ),
  },
  {
    key: 'devices',
    label: 'Multi-device users are separate leaves',
    children: (
      <p>
        A leaf is a client, not a person. Someone with a phone, a laptop and a tablet takes up three leaves, each with its
        own credential and private state. The tree grows with devices, losing a phone means removing one leaf, and
        the AS maps devices to users. Never copy one device&apos;s MLS state to another.
      </p>
    ),
  },
  {
    key: 'blanks',
    label: 'Removing members blanks paths',
    children: (
      <p>
        Every Remove blanks a leaf and its whole direct path, and every Add leaves unmerged leaves behind. Until members
        below those nodes commit, UpdatePaths get bigger and slower, drifting towards O(n) in churn-heavy groups.
        Encourage regular self-updates, and prefer that the members under blanked subtrees commit next.
      </p>
    ),
  },
  {
    key: 'order',
    label: 'Application message ordering across epochs',
    children: (
      <p>
        Every message carries its epoch. A message from epoch k+1 can arrive before the Commit that creates k+1: buffer
        it per (group, epoch) with strict size and time limits, fetch the missing handshake messages, then retry.
        Unbounded buffering is a memory-DoS vector. Within an epoch, cap how far a sender&apos;s ratchet may skip
        ahead.
      </p>
    ),
  },
  {
    key: 'retain',
    label: 'Retaining old epoch keys briefly',
    children: (
      <p>
        Late messages from the previous epoch need its secret tree, so most stacks keep a small window of past epochs
        (OpenMLS: <code>max_past_epochs</code>). Each extra epoch kept is a longer window where a stolen device can
        still decrypt, so keep the window small, delete used keys right away, and make sure backups and snapshots
        don&apos;t bring deleted secrets back.
      </p>
    ),
  },
]

function Gotchas() {
  return (
    <section className={styles.section} aria-labelledby="mls-gotchas">
      <SectionHead
        num="06"
        id="mls-gotchas"
        title="Gotchas in production"
        lead="The protocol is the easy half. These are the places real deployments get hurt."
      />
      <Collapse
        className={styles.collapse}
        items={GOTCHAS.map((g) => ({ ...g, label: <span><WarningOutlined aria-hidden="true" className={styles.warnIcon} /> {g.label}</span> }))}
        defaultActiveKey={['fork']}
      />
    </section>
  )
}

/* ===================================================================== */

export default function MLS() {
  return (
    <div className={styles.page}>
      <p className={styles.intro}>
        <strong>Messaging Layer Security (RFC 9420)</strong> gives every member of a group the same authenticated
        state, called an <em>epoch</em>. Membership changes are <em>proposals</em> (Add, Update, Remove) applied by a
        signed <em>Commit</em>, and new members join through a <em>Welcome</em>. Underneath is a binary tree of keys,
        so changing a key costs about log n work instead of n.
      </p>
      <WhyGroups />
      <TreePlayground />
      <Lifecycle />
      <KeySchedule />
      <Security />
      <Gotchas />
    </div>
  )
}
