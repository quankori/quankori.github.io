import * as THREE from 'three'

const cache = new Map()
export function mat(color, opts = {}) {
  const key = color + JSON.stringify(opts)
  if (!cache.has(key)) {
    cache.set(
      key,
      new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.75, metalness: 0, ...opts }),
    )
  }
  return cache.get(key)
}

const glow = (color, intensity = 1.6) => mat(color, { emissive: color, emissiveIntensity: intensity, roughness: 0.4 })

function mesh(geo, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, material)
  m.position.set(x, y, z)
  m.castShadow = true
  return m
}

export function makeBook(color = '#8c3b2f') {
  const g = new THREE.Group()
  g.add(mesh(new THREE.BoxGeometry(0.3, 0.07, 0.38), mat(color)))
  g.add(mesh(new THREE.BoxGeometry(0.28, 0.05, 0.36), mat('#f3ead7'), 0.012, 0, 0))
  return g
}

export function makeBackpack() {
  const g = new THREE.Group()
  g.add(mesh(new THREE.BoxGeometry(0.42, 0.5, 0.2), mat('#6b4a2e')))
  g.add(mesh(new THREE.BoxGeometry(0.3, 0.2, 0.08), mat('#7d5836'), 0, -0.1, -0.13))
  g.add(mesh(new THREE.BoxGeometry(0.43, 0.14, 0.22), mat('#563a23'), 0, 0.2, 0))
  g.add(mesh(new THREE.BoxGeometry(0.04, 0.04, 0.05), mat('#c9a14a', { metalness: 0.6 }), 0, 0.12, -0.12))
  return g
}

export function makeLantern() {
  const g = new THREE.Group()
  const frame = mat('#2b2622', { metalness: 0.4 })
  g.add(mesh(new THREE.ConeGeometry(0.11, 0.08, 6), frame, 0, 0.12, 0))
  g.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.03, 6), frame, 0, -0.1, 0))
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4
    g.add(mesh(new THREE.BoxGeometry(0.015, 0.2, 0.015), frame, Math.cos(a) * 0.085, 0, Math.sin(a) * 0.085))
  }
  const core = mesh(new THREE.OctahedronGeometry(0.065, 1), glow('#ffb347', 2.4))
  core.castShadow = false
  core.name = 'core'
  g.add(core)
  const handle = mesh(new THREE.TorusGeometry(0.05, 0.008, 4, 10, Math.PI), frame, 0, 0.16, 0)
  g.add(handle)
  return g
}

export function makeMedal() {
  const g = new THREE.Group()
  const r1 = mesh(new THREE.BoxGeometry(0.05, 0.16, 0.01), mat('#c0392b'), -0.025, 0.09, 0)
  r1.rotation.z = 0.35
  const r2 = mesh(new THREE.BoxGeometry(0.05, 0.16, 0.01), mat('#2e5aa8'), 0.025, 0.09, 0)
  r2.rotation.z = -0.35
  const disc = mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.018, 12), mat('#f2c14e', { metalness: 0.8, roughness: 0.3, emissive: '#7a5a10', emissiveIntensity: 0.4 }))
  disc.rotation.x = Math.PI / 2
  g.add(r1, r2, disc)
  return g
}

export function makeScarfPiece() {
  const g = new THREE.Group()
  const t = mesh(new THREE.TorusGeometry(0.16, 0.05, 6, 12), mat('#00ADD8'))
  t.rotation.x = Math.PI / 2
  const tail = mesh(new THREE.BoxGeometry(0.1, 0.35, 0.03), mat('#00ADD8'), 0.08, -0.18, 0.12)
  tail.rotation.z = 0.2
  g.add(t, tail)
  return g
}

export function makeCompass() {
  const g = new THREE.Group()
  const body = mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.035, 14), mat('#b8862b', { metalness: 0.7, roughness: 0.35 }))
  const face = mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.01, 14), mat('#f4ecd6'), 0, 0.02, 0)
  const n1 = mesh(new THREE.ConeGeometry(0.015, 0.07, 4), mat('#c0392b'), 0, 0.03, -0.03)
  n1.rotation.x = -Math.PI / 2
  const n2 = mesh(new THREE.ConeGeometry(0.015, 0.07, 4), mat('#333'), 0, 0.03, 0.03)
  n2.rotation.x = Math.PI / 2
  g.add(body, face, n1, n2)
  g.rotation.x = Math.PI / 2
  const wrap = new THREE.Group()
  wrap.add(g)
  return wrap
}

export function makeBadges() {
  const g = new THREE.Group()
  ;[-0.06, 0.06].forEach((x, i) => {
    const hex = mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.02, 6), mat('#ff9900', { emissive: '#ff9900', emissiveIntensity: 0.35 }), x, 0, 0)
    hex.rotation.x = Math.PI / 2
    const inner = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.025, 6), mat(i ? '#232f3e' : '#1b2633'), x, 0, 0.004)
    inner.rotation.x = Math.PI / 2
    g.add(hex, inner)
  })
  return g
}

export function makeShield() {
  const g = new THREE.Group()
  const body = mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 8), mat('#4b5d73', { metalness: 0.5, roughness: 0.45 }))
  body.rotation.x = Math.PI / 2
  const rim = mesh(new THREE.TorusGeometry(0.22, 0.02, 4, 8), mat('#c9a14a', { metalness: 0.7 }))
  rim.rotation.z = Math.PI / 8
  const boss = mesh(new THREE.OctahedronGeometry(0.06), mat('#d9e3ee', { metalness: 0.8, roughness: 0.2 }), 0, 0, 0.04)
  g.add(body, rim, boss)
  return g
}

export function makeKey() {
  const g = new THREE.Group()
  const m = glow('#ffd36b', 0.9)
  const bow = mesh(new THREE.TorusGeometry(0.05, 0.016, 6, 12), m, 0, 0.09, 0)
  const shaft = mesh(new THREE.BoxGeometry(0.022, 0.16, 0.022), m, 0, -0.01, 0)
  const t1 = mesh(new THREE.BoxGeometry(0.045, 0.02, 0.02), m, 0.025, -0.07, 0)
  const t2 = mesh(new THREE.BoxGeometry(0.035, 0.02, 0.02), m, 0.02, -0.04, 0)
  g.add(bow, shaft, t1, t2)
  return g
}

export const ITEM_FACTORY = {
  book: () => makeBook(),
  backpack: makeBackpack,
  lantern: makeLantern,
  medal: makeMedal,
  scarf: makeScarfPiece,
  compass: makeCompass,
  badge: makeBadges,
  shield: makeShield,
  key: makeKey,
}
