import * as THREE from 'three'
import { mat, makeBook, makeBackpack, makeLantern, makeMedal, makeCompass, makeBadges, makeShield, makeKey } from './items.js'
import { MILESTONES } from '../data/journey.js'
import { TOTAL_SCARS, clamp, lerp, smoothstep } from '../path.js'

const IDX = Object.fromEntries(MILESTONES.map((m, i) => [m.item, i]))
const SKIN = '#f0c6a0'
const HAIR = '#1b1820'
const SHIRT_CLEAN = new THREE.Color('#f4f1ea')
const SHIRT_DIRTY = new THREE.Color('#8f806a')
const PANTS_CLEAN = new THREE.Color('#33476e')
const PANTS_DIRTY = new THREE.Color('#2c2a2b')
const BOOK_COLORS = ['#8c3b2f', '#2f5d8c', '#3f7a4a', '#9a6b1f', '#5b3f8c', '#1f6f74', '#8c2f63', '#3b3b3b']
const ORB_COLORS = ['#7fe3ff', '#ffd36b', '#ff8fb1', '#9dff9a', '#c6a2ff', '#ffb070', '#6be4c9', '#ff6b5b', '#a0c4ff']

// part, y along limb (or elevation for head), angle around limb (0 = front), roll
const SCAR_SPOTS = [
  ['armR', -0.24, 0.3, 0.6], ['legL', -0.22, 0.4, -0.5], ['legR', -0.15, -0.3, 0.4], ['armL', -0.18, -0.4, -0.7],
  ['head', -0.12, 0.6, 0.9], ['chest', 0.3, 0.5, -0.6], ['legL', -0.38, -0.2, 0.3], ['armR', -0.32, 1.2, -0.4],
  ['head', 0.3, -0.45, 0.5], ['legR', -0.32, 0.5, -0.3], ['armL', -0.3, 0.6, 0.5], ['chest', 0.18, -0.4, 0.7],
  ['head', 0.02, 0.95, -0.4], ['legL', -0.1, 1.0, 0.6], ['armR', -0.12, -0.5, 0.3], ['legR', -0.42, -0.8, -0.6],
  ['chest', 0.4, 0.1, 0.4], ['armL', -0.36, 1.4, -0.3], ['head', -0.2, -0.85, 0.7], ['legR', -0.05, 0.0, 0.5],
]

const easeOutBack = (t) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return t <= 0 ? 0 : 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

function m(geo, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(geo, material)
  mesh.position.set(x, y, z)
  mesh.castShadow = true
  return mesh
}

function tatterTexture(level) {
  const c = document.createElement('canvas')
  c.width = 32
  c.height = 128
  const g = c.getContext('2d')
  g.fillStyle = '#fff'
  g.fillRect(0, 0, 32, 128)
  g.fillStyle = '#000'
  let seed = 7 + level * 13
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  // jagged end
  const cut = 128 - level * 16
  g.beginPath()
  g.moveTo(0, 128)
  for (let x = 0; x <= 32; x += 4) g.lineTo(x, cut + rnd() * (8 + level * 10))
  g.lineTo(32, 128)
  g.fill()
  // notches & holes
  for (let i = 0; i < level * 3; i++) {
    const y = 30 + rnd() * 80
    const side = rnd() > 0.5 ? 0 : 32
    g.beginPath()
    g.moveTo(side, y)
    g.lineTo(side === 0 ? 6 + rnd() * 8 : 26 - rnd() * 8, y + 4)
    g.lineTo(side, y + 8 + rnd() * 6)
    g.fill()
  }
  for (let i = 0; i < level * 2; i++) {
    g.beginPath()
    g.arc(8 + rnd() * 16, 30 + rnd() * 70, 1.5 + rnd() * 2.5, 0, Math.PI * 2)
    g.fill()
  }
  const t = new THREE.CanvasTexture(c)
  return t
}

export class Climber {
  constructor() {
    this.root = new THREE.Group()
    this.body = new THREE.Group()
    this.root.add(this.body)
    this.body.scale.setScalar(1.2)
    this.yaw = 0
    this.amp = 0
    this.items = {}
    this.shirt = new THREE.MeshStandardMaterial({ color: SHIRT_CLEAN.clone(), flatShading: true, roughness: 0.9 })
    this.pants = new THREE.MeshStandardMaterial({ color: PANTS_CLEAN.clone(), flatShading: true, roughness: 0.9 })
    this.build()
  }

  build() {
    const skin = mat(SKIN)
    const hair = mat(HAIR)
    const shoe = mat('#2a2420')

    const hips = (this.hips = new THREE.Group())
    hips.position.y = 0.66
    this.body.add(hips)
    hips.add(m(new THREE.BoxGeometry(0.34, 0.16, 0.21), this.pants, 0, 0.02, 0))

    this.legs = [-1, 1].map((s) => {
      const p = new THREE.Group()
      p.position.set(0.1 * s, 0, 0)
      p.add(m(new THREE.CapsuleGeometry(0.075, 0.42, 3, 8), this.pants, 0, -0.3, 0))
      p.add(m(new THREE.BoxGeometry(0.12, 0.08, 0.22), shoe, 0, -0.62, 0.04))
      hips.add(p)
      return p
    })

    const torso = (this.torso = new THREE.Group())
    torso.position.y = 0.06
    hips.add(torso)
    const chest = m(new THREE.CapsuleGeometry(0.17, 0.26, 3, 10), this.shirt, 0, 0.26, 0)
    chest.scale.set(1.15, 1, 0.78)
    torso.add(chest)
    torso.add(m(new THREE.CylinderGeometry(0.06, 0.07, 0.1, 8), skin, 0, 0.52, 0))

    // head
    const head = (this.head = new THREE.Group())
    head.position.y = 0.72
    torso.add(head)
    head.add(m(new THREE.SphereGeometry(0.2, 14, 12), skin))
    const cap = m(new THREE.SphereGeometry(0.215, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), hair, 0, 0.015, -0.01)
    cap.rotation.x = -0.35
    head.add(cap)
    for (let i = -2; i <= 2; i++) {
      const tuft = m(new THREE.BoxGeometry(0.07, 0.06, 0.05), hair, i * 0.06, 0.13 - Math.abs(i) * 0.015, 0.15)
      tuft.rotation.z = i * 0.15
      tuft.rotation.x = 0.4
      head.add(tuft)
    }
    const eye = new THREE.SphereGeometry(0.024, 8, 6)
    ;[-1, 1].forEach((s) => {
      head.add(m(eye, mat('#1a1414'), 0.07 * s, 0.0, 0.18))
      const brow = m(new THREE.BoxGeometry(0.06, 0.012, 0.01), hair, 0.07 * s, 0.06, 0.188)
      brow.rotation.z = -0.22 * s
      head.add(brow)
    })
    // glasses (earned with the algorithm medal — too many late nights)
    const glasses = (this.items.glasses = new THREE.Group())
    const gm = mat('#222', { metalness: 0.5 })
    ;[-1, 1].forEach((s) => {
      const ring = m(new THREE.TorusGeometry(0.046, 0.008, 4, 12), gm, 0.07 * s, 0.0, 0.2)
      glasses.add(ring)
    })
    glasses.add(m(new THREE.BoxGeometry(0.05, 0.01, 0.01), gm, 0, 0.01, 0.205))
    head.add(glasses)
    // wounds
    const bandage = (this.items.bandage = m(new THREE.TorusGeometry(0.203, 0.03, 4, 16), mat('#f2eee6'), 0, 0.08, 0))
    bandage.rotation.x = Math.PI / 2 + 0.25
    bandage.rotation.z = 0.15
    head.add(bandage)
    const aid = (this.items.bandaid = m(new THREE.BoxGeometry(0.075, 0.028, 0.012), mat('#e2b48a'), -0.11, -0.06, 0.16))
    aid.rotation.set(0, -0.55, 0.5)
    head.add(aid)

    // arms
    this.arms = [-1, 1].map((s) => {
      const p = new THREE.Group()
      p.position.set(0.25 * s, 0.44, 0)
      p.add(m(new THREE.CapsuleGeometry(0.068, 0.08, 3, 8), this.shirt, 0, -0.06, 0))
      p.add(m(new THREE.CapsuleGeometry(0.052, 0.3, 3, 8), skin, 0, -0.24, 0))
      p.add(m(new THREE.SphereGeometry(0.062, 8, 6), skin, 0, -0.44, 0))
      p.rotation.z = 0.08 * s
      torso.add(p)
      return p
    })
    const [armL, armR] = this.arms
    const wrap = (this.items.armwrap = m(new THREE.CylinderGeometry(0.062, 0.062, 0.12, 8), mat('#f2eee6'), 0, -0.3, 0))
    armR.add(wrap)
    const knee = (this.items.knee = m(new THREE.BoxGeometry(0.1, 0.1, 0.02), mat('#9b6b3a'), 0, -0.3, 0.077))
    this.legs[0].add(knee)

    // shirt patches (repairs after rough stretches)
    this.patches = [
      ['#3f6fb5', -0.09, 0.2, 0.3],
      ['#c9783a', 0.1, 0.34, -0.2],
      ['#5b8f4e', 0.02, 0.1, 0.5],
    ].map(([c, x, y, r]) => {
      const p = m(new THREE.BoxGeometry(0.075, 0.075, 0.012), mat(c), x, y, 0.14)
      p.rotation.z = r
      torso.add(p)
      return p
    })

    // scars
    const scarMat = mat('#9b1c24', { roughness: 1 })
    const scarGeo = new THREE.BoxGeometry(0.007, 0.075, 0.006)
    const parts = { head, chest: torso, armL, armR, legL: this.legs[0], legR: this.legs[1] }
    this.scars = SCAR_SPOTS.slice(0, Math.max(TOTAL_SCARS, 1)).map(([part, y, a, roll]) => {
      const g = new THREE.Group()
      const s1 = new THREE.Mesh(scarGeo, scarMat)
      const s2 = new THREE.Mesh(scarGeo, scarMat)
      s2.position.x = 0.018
      s2.scale.y = 0.7
      g.add(s1, s2)
      let pos
      let normal
      if (part === 'head') {
        normal = new THREE.Vector3(Math.cos(y) * Math.sin(a), Math.sin(y), Math.cos(y) * Math.cos(a))
        pos = normal.clone().multiplyScalar(0.201)
      } else {
        const r = part === 'chest' ? 0.15 : part.startsWith('arm') ? 0.054 : 0.077
        normal = new THREE.Vector3(Math.sin(a), 0, Math.cos(a))
        pos = normal.clone().multiplyScalar(r)
        pos.y = y
      }
      g.position.copy(pos)
      g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal)
      g.rotateZ(roll)
      g.scale.setScalar(0.001)
      parts[part].add(g)
      return g
    })

    // items
    const bp = (this.items.backpack = new THREE.Group())
    bp.add(makeBackpack())
    bp.position.set(0, 0.28, -0.2)
    torso.add(bp)
    const straps = (this.items.straps = new THREE.Group())
    ;[-1, 1].forEach((s) => straps.add(m(new THREE.BoxGeometry(0.045, 0.34, 0.02), mat('#4a3220'), 0.11 * s, 0.3, 0.135)))
    torso.add(straps)

    this.books = BOOK_COLORS.map((c, i) => {
      const b = makeBook(c)
      b.position.set((i % 2 ? 0.02 : -0.02), 0.58 + i * 0.075, -0.2)
      b.rotation.y = ((i * 37) % 7) * 0.08 - 0.25
      torso.add(b)
      return b
    })
    const handBook = (this.items.handBook = makeBook(BOOK_COLORS[0]))
    handBook.rotation.set(0, 0, Math.PI / 2)
    handBook.position.set(-0.06, -0.38, 0.05)
    armL.add(handBook)

    const lantern = (this.items.lantern = makeLantern())
    lantern.position.set(0, -0.62, 0.02)
    armR.add(lantern)
    this.lanternCore = lantern.getObjectByName('core')
    this.light = new THREE.PointLight('#ffb25a', 0, 7, 1.6)
    this.lanternCore.add(this.light)

    const medal = (this.items.medal = makeMedal())
    medal.position.set(-0.07, 0.24, 0.15)
    torso.add(medal)

    const key = (this.items.key = makeKey())
    key.position.set(0.07, 0.22, 0.155)
    key.userData.base = 0.8
    torso.add(key)

    const compass = (this.items.compass = makeCompass())
    compass.position.set(0.2, 0.0, 0.04)
    compass.rotation.y = Math.PI / 2
    hips.add(compass)

    const badges = (this.items.badge = makeBadges())
    badges.position.set(-0.32, 0.46, 0.02)
    badges.rotation.y = -Math.PI / 2
    badges.userData.base = 0.85
    torso.add(badges)

    const shield = (this.items.shield = makeShield())
    shield.position.set(-0.07, -0.26, 0.0)
    shield.rotation.y = -Math.PI / 2
    armL.add(shield)

    // scarf: a ring + a ribbon that flaps in the wind and frays as it goes
    const scarf = (this.items.scarf = new THREE.Group())
    const scarfMat = new THREE.MeshStandardMaterial({ color: '#00ADD8', flatShading: true, side: THREE.DoubleSide, alphaTest: 0.5, roughness: 0.8 })
    const ring = m(new THREE.TorusGeometry(0.1, 0.045, 6, 14), scarfMat, 0, 0.52, 0)
    ring.rotation.x = Math.PI / 2
    scarf.add(ring)
    this.ribbonGeo = new THREE.PlaneGeometry(0.13, 0.85, 1, 12)
    this.ribbon = m(this.ribbonGeo, scarfMat, -0.06, 0.5, -0.09)
    this.ribbon.frustumCulled = false
    scarf.add(this.ribbon)
    this.scarfMat = scarfMat
    this.tatters = [0, 1, 2, 3, 4].map(tatterTexture)
    torso.add(scarf)

    // skill orbs
    const total = MILESTONES.reduce((n, ms) => n + ms.skills.length, 0)
    this.orbOwner = []
    MILESTONES.forEach((ms, i) => ms.skills.forEach((_, k) => this.orbOwner.push([i, k])))
    this.orbs = new THREE.InstancedMesh(
      new THREE.IcosahedronGeometry(0.05, 0),
      new THREE.MeshBasicMaterial({ toneMapped: false }),
      total,
    )
    this.orbs.frustumCulled = false
    const col = new THREE.Color()
    this.orbOwner.forEach(([i], j) => this.orbs.setColorAt(j, col.set(ORB_COLORS[i % ORB_COLORS.length])))
    this.root.add(this.orbs)

    const auraTex = (() => {
      const c = document.createElement('canvas')
      c.width = c.height = 128
      const g = c.getContext('2d')
      const grad = g.createRadialGradient(64, 64, 20, 64, 64, 64)
      grad.addColorStop(0, 'rgba(255,220,150,0)')
      grad.addColorStop(0.6, 'rgba(255,220,150,0.6)')
      grad.addColorStop(1, 'rgba(255,220,150,0)')
      g.fillStyle = grad
      g.fillRect(0, 0, 128, 128)
      return new THREE.CanvasTexture(c)
    })()
    this.aura = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 1.8),
      new THREE.MeshBasicMaterial({ map: auraTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
    )
    this.aura.rotation.x = -Math.PI / 2
    this.aura.position.y = 0.03
    this.root.add(this.aura)

    this.body.traverse((o) => {
      if (o.isMesh) o.castShadow = true
    })
    this._m4 = new THREE.Matrix4()
    this._q = new THREE.Quaternion()
    this._v = new THREE.Vector3()
    this._s = new THREE.Vector3()
  }

  // Where floating texts and speech bubbles anchor.
  headWorld(target) {
    return this.head.getWorldPosition(target).add(this._v.set(0, 0.35, 0))
  }

  chestWorld(target) {
    return this.torso.localToWorld(target.set(0, 0.3, 0.1))
  }

  update({ time, dt, u, speed, acquire, scars, wind, night, facing, celebrate }) {
    const a = (name) => clamp(acquire[IDX[name]] ?? 0)
    const pop = (obj, w) => {
      const s = easeOutBack(w)
      obj.visible = s > 0.001
      obj.scale.setScalar(Math.max(s, 0.001) * (obj.userData.base || 1))
    }

    // facing: walk forward, turn around when going down, turn to camera on landings
    // facing = 1 means "turn around to the camera" (which sits behind and outside)
    const targetYaw = speed < -0.6 ? Math.PI : facing * 2.2
    this.yaw = lerp(this.yaw, targetYaw, 1 - Math.exp(-dt * 6))
    this.body.rotation.y = this.yaw

    const targetAmp = clamp(Math.abs(speed) / 2.2)
    this.amp = lerp(this.amp, targetAmp, 1 - Math.exp(-dt * 8))
    const amp = this.amp
    const run = clamp((Math.abs(speed) - 7) / 8)
    const phase = u * Math.PI

    const dirt = TOTAL_SCARS ? scars / TOTAL_SCARS : 0
    let books = 0
    for (let i = 2; i < MILESTONES.length; i++) books += clamp(acquire[i] ?? 0)
    books += clamp(acquire[1] ?? 0) * clamp(acquire[0] ?? 0)

    const hop = Math.sin(Math.PI * clamp(celebrate)) * 0.22
    const swing = Math.sin(phase)
    this.legs[0].rotation.x = swing * (0.6 + run * 0.35) * amp - hop * 1.2
    this.legs[1].rotation.x = -swing * (0.6 + run * 0.35) * amp - hop * 1.2
    this.arms[0].rotation.x = -swing * (0.5 + run * 0.4) * amp - hop * 9
    this.arms[1].rotation.x = swing * 0.3 * amp - hop * 3
    this.items.lantern.rotation.x = -this.arms[1].rotation.x + Math.sin(time * 3) * 0.05

    const breathe = Math.sin(time * 2.2) * 0.012
    this.hips.position.y = 0.66 + Math.abs(Math.cos(phase)) * 0.045 * amp + hop - dirt * 0.02
    this.torso.rotation.x = 0.06 + amp * (0.12 + run * 0.2) + books * 0.018 + dirt * 0.06
    this.torso.scale.y = 1 + breathe
    this.head.rotation.x = -this.torso.rotation.x * 0.6 - hop * 1.5
    this.head.rotation.y = Math.sin(time * 0.45) * 0.35 * (1 - amp)

    // wear and tear
    this.shirt.color.copy(SHIRT_CLEAN).lerp(SHIRT_DIRTY, dirt)
    this.pants.color.copy(PANTS_CLEAN).lerp(PANTS_DIRTY, dirt * 0.8)
    this.scars.forEach((s, i) => s.scale.setScalar(i < scars ? 1 : 0.001))
    pop(this.items.bandaid, smoothstep(0.2, 0.25, dirt))
    pop(this.items.knee, smoothstep(0.32, 0.37, dirt))
    pop(this.items.bandage, smoothstep(0.52, 0.57, dirt))
    pop(this.items.armwrap, smoothstep(0.72, 0.77, dirt))
    this.patches.forEach((p, i) => pop(p, clamp(acquire[3 + i * 2] ?? 0)))

    // inventory
    pop(this.items.handBook, a('book') * (1 - a('backpack')))
    pop(this.items.backpack, a('backpack'))
    pop(this.items.straps, a('backpack'))
    this.books.forEach((b, i) => {
      const w = i === 0 ? a('book') * a('backpack') : clamp(acquire[i + 1] ?? 0)
      pop(b, w)
    })
    pop(this.items.lantern, a('lantern'))
    pop(this.items.glasses, a('medal'))
    pop(this.items.medal, a('medal'))
    pop(this.items.scarf, a('scarf'))
    pop(this.items.compass, a('compass'))
    pop(this.items.badge, a('badge'))
    pop(this.items.shield, a('shield'))
    pop(this.items.key, a('key'))

    // lantern glows brighter as knowledge piles up (and matters more at night)
    let skillW = 0
    this.orbOwner.forEach(([i]) => (skillW += clamp(acquire[i] ?? 0)))
    const know = skillW / this.orbOwner.length
    this.light.intensity = a('lantern') * (0.8 + know * 2 + night * 7)
    this.lanternCore.material.emissiveIntensity = 1.5 + know * 2.5
    this.items.key.children.forEach((c) => (c.material.emissiveIntensity = 0.6 + Math.sin(time * 3) * 0.3))

    // scarf ribbon
    const tatter = Math.min(4, Math.floor(dirt * 5))
    if (this.scarfMat.alphaMap !== this.tatters[tatter]) {
      this.scarfMat.alphaMap = this.tatters[tatter]
      this.scarfMat.needsUpdate = true
    }
    const pos = this.ribbonGeo.attributes.position
    const rows = 13
    const flow = clamp(0.25 + amp * 0.6 + wind * 0.9)
    for (let r = 0; r < rows; r++) {
      const t = r / (rows - 1)
      const phi = 0.15 + flow * 1.15 + Math.sin(time * (5 + wind * 6) - t * 5) * 0.18 * (0.3 + flow)
      const L = 0.85 * t
      const y = -L * Math.cos(phi)
      const z = -L * Math.sin(phi)
      const sway = Math.sin(time * 7 - t * 6) * 0.05 * t * (0.3 + flow)
      pos.setXYZ(r * 2, -0.065 + sway, y, z)
      pos.setXYZ(r * 2 + 1, 0.065 + sway, y, z)
    }
    pos.needsUpdate = true
    this.ribbonGeo.computeVertexNormals()

    // skill orbs orbit the climber
    this.orbOwner.forEach(([i, k], j) => {
      const w = smoothstep(k * 0.06, k * 0.06 + 0.5, clamp(acquire[i] ?? 0) * (1 + k * 0.06))
      const ring = j % 3
      const r = 0.85 + ring * 0.22
      const sp = 0.6 + ring * 0.25
      const ang = time * sp * (ring % 2 ? -1 : 1) + (j * 2.399)
      const y = 1.05 + Math.sin(time * 0.9 + j) * 0.12 + (ring - 1) * 0.3
      this._v.set(Math.cos(ang) * r, y, Math.sin(ang) * r)
      const s = easeOutBack(w)
      this._s.setScalar(Math.max(0.0001, s) * (0.8 + Math.sin(time * 4 + j) * 0.15))
      this._q.setFromEuler(new THREE.Euler(time + j, time * 0.7, 0))
      this._m4.compose(this._v, this._q, this._s)
      this.orbs.setMatrixAt(j, this._m4)
    })
    this.orbs.instanceMatrix.needsUpdate = true

    this.aura.material.opacity = know * 0.9
    this.aura.scale.setScalar(0.6 + know * 1.2)
    this.know = know
  }
}
