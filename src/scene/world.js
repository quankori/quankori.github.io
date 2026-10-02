import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import {
  R, STAIR_IN, STAIR_OUT, STEP_COUNT, LANDING_LEN, ALL_LANDINGS, SUMMIT, SCAR_POINTS, SEGMENTS,
  height, theta, landingAt, clamp, lerp, smoothstep,
} from '../path.js'
import { MILESTONES } from '../data/journey.js'
import { ITEM_FACTORY, mat } from './items.js'

const rng = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647
const C = (hex) => new THREE.Color(hex)

// Sky moods keyed by milestone position (0 = first landing … 9 = summit).
const PALETTE = [
  { at: -1, top: '#24325f', mid: '#f0a07a', bottom: '#f7d2a6', fog: '#eab38f', sun: '#ffcf9e', sunI: 2.4, sky: '#ffd8b8', ground: '#4b3d55', hemi: 1.1, cloud: '#ffd9c7', stars: 0.15 },
  { at: 0.2, top: '#3770b8', mid: '#a9d2ef', bottom: '#e3f1f8', fog: '#c2e0f2', sun: '#fff1db', sunI: 2.8, sky: '#d6ebff', ground: '#5b5a48', hemi: 1.15, cloud: '#ffffff', stars: 0 },
  { at: 1.55, top: '#47586e', mid: '#8c99a8', bottom: '#aab3bd', fog: '#8d98a4', sun: '#dde4ec', sunI: 1.3, sky: '#b9c4cf', ground: '#3b3d40', hemi: 1.0, cloud: '#c4cbd2', stars: 0 },
  { at: 2.3, top: '#2f78c8', mid: '#9ccdf0', bottom: '#e0f1fa', fog: '#bfe0f4', sun: '#fff6e6', sunI: 2.8, sky: '#d6ebff', ground: '#5a5a4a', hemi: 1.15, cloud: '#ffffff', stars: 0 },
  { at: 3.55, top: '#1d2430', mid: '#3c4552', bottom: '#59626e', fog: '#454e5a', sun: '#aab6c4', sunI: 0.7, sky: '#7d8a99', ground: '#22252a', hemi: 0.85, cloud: '#6b737d', stars: 0 },
  { at: 4.15, top: '#2c6fbe', mid: '#a3d4f2', bottom: '#eef8fc', fog: '#cbe7f6', sun: '#fff8ea', sunI: 3.0, sky: '#e0f0ff', ground: '#5e5c4c', hemi: 1.2, cloud: '#ffffff', stars: 0 },
  { at: 5.3, top: '#3b3c7a', mid: '#f09a6c', bottom: '#ffd59a', fog: '#f0ad84', sun: '#ffbd80', sunI: 2.5, sky: '#ffd0a8', ground: '#4f3e52', hemi: 1.05, cloud: '#ffd0b4', stars: 0.05 },
  { at: 6.55, top: '#141a33', mid: '#3d3f63', bottom: '#5e5577', fog: '#3a3d5c', sun: '#9fa8d8', sunI: 0.8, sky: '#6a6f9a', ground: '#1f1f2e', hemi: 0.85, cloud: '#55597a', stars: 0.1 },
  { at: 7.4, top: '#0c1130', mid: '#2a3166', bottom: '#4a4677', fog: '#2a2f58', sun: '#a8b6ff', sunI: 0.9, sky: '#5a63a0', ground: '#1a1b2c', hemi: 0.8, cloud: '#4a5080', stars: 0.6 },
  { at: 8.6, top: '#03050f', mid: '#111a3c', bottom: '#1f2c5c', fog: '#121a38', sun: '#9fb4ff', sunI: 0.75, sky: '#3c4a86', ground: '#121424', hemi: 0.75, cloud: '#323a66', stars: 1 },
]
PALETTE.forEach((p) => {
  for (const k of ['top', 'mid', 'bottom', 'fog', 'sun', 'sky', 'ground', 'cloud']) p[k] = C(p[k])
})

function samplePalette(mp, out) {
  let a = PALETTE[0]
  let b = PALETTE[PALETTE.length - 1]
  for (let i = 0; i < PALETTE.length - 1; i++) {
    if (mp >= PALETTE[i].at && mp <= PALETTE[i + 1].at) {
      a = PALETTE[i]
      b = PALETTE[i + 1]
      break
    }
  }
  if (mp > b.at) a = b
  const t = a === b ? 0 : smoothstep(0, 1, (mp - a.at) / (b.at - a.at))
  for (const k of ['top', 'mid', 'bottom', 'fog', 'sun', 'sky', 'ground', 'cloud']) out[k].copy(a[k]).lerp(b[k], t)
  for (const k of ['sunI', 'hemi', 'stars']) out[k] = lerp(a[k], b[k], t)
  return out
}

function sectorGeometry(rIn, rOut, a0, a1, thickness, segs) {
  const s = new THREE.Shape()
  for (let i = 0; i <= segs; i++) {
    const a = lerp(a0, a1, i / segs)
    i ? s.lineTo(rOut * Math.cos(a), rOut * Math.sin(a)) : s.moveTo(rOut * Math.cos(a), rOut * Math.sin(a))
  }
  for (let i = segs; i >= 0; i--) {
    const a = lerp(a0, a1, i / segs)
    s.lineTo(rIn * Math.cos(a), rIn * Math.sin(a))
  }
  const g = new THREE.ExtrudeGeometry(s, { depth: thickness, bevelEnabled: false, curveSegments: 1 })
  g.rotateX(-Math.PI / 2)
  g.translate(0, -thickness, 0)
  return g
}

function blobTexture(stops) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  stops.forEach(([o, col]) => grad.addColorStop(o, col))
  g.fillStyle = grad
  g.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function cloudTexture(seed) {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 128
  const g = c.getContext('2d')
  const r = rng(seed)
  for (let i = 0; i < 14; i++) {
    const x = 50 + r() * 156
    const y = 50 + r() * 40
    const rad = 20 + r() * 38
    const grad = g.createRadialGradient(x, y, 0, x, y, rad)
    grad.addColorStop(0, 'rgba(255,255,255,0.55)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = grad
    g.fillRect(0, 0, 256, 128)
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function plaqueTexture(m) {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 640
  const g = c.getContext('2d')
  g.fillStyle = '#2b2620'
  g.fillRect(0, 0, 512, 640)
  g.strokeStyle = '#c9a14a'
  g.lineWidth = 10
  g.strokeRect(22, 22, 468, 596)
  g.fillStyle = '#f2c14e'
  g.textAlign = 'center'
  g.font = '800 170px "Be Vietnam Pro", system-ui, sans-serif'
  g.fillText(m.year, 256, 300)
  g.fillStyle = '#e9dcc0'
  g.font = '600 46px "Be Vietnam Pro", system-ui, sans-serif'
  const words = m.place.split(' ')
  let line = ''
  let y = 410
  words.forEach((w) => {
    const test = line ? line + ' ' + w : w
    if (g.measureText(test).width > 420) {
      g.fillText(line, 256, y)
      line = w
      y += 58
    } else line = test
  })
  g.fillText(line, 256, y)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  return t
}

export class World {
  constructor(renderer) {
    this.renderer = renderer
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog('#c2e0f2', 18, 130)
    this.pal = { top: C('#000'), mid: C('#000'), bottom: C('#000'), fog: C('#000'), sun: C('#000'), sky: C('#000'), ground: C('#000'), cloud: C('#000') }
    this.flash = 0
    this.summitY = height(SUMMIT)
    this.buildSky()
    this.buildLights()
    this.buildGround()
    this.buildSpire()
    this.buildSteps()
    this.buildLandings()
    this.buildThorns()
    this.buildClouds()
    this.buildRocks()
    this.buildWeather()
    this.buildCampfire()
  }

  buildSky() {
    const g = (this.skyGroup = new THREE.Group())
    this.scene.add(g)
    this.skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: { top: { value: C('#000') }, mid: { value: C('#000') }, bottom: { value: C('#000') }, flash: { value: 0 } },
      vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform vec3 top; uniform vec3 mid; uniform vec3 bottom; uniform float flash; varying vec3 vDir;
        void main(){ float h = vDir.y; vec3 c = h > 0.0 ? mix(mid, top, pow(smoothstep(0.0, 1.0, h), 0.55)) : mix(mid, bottom, smoothstep(0.0, -0.35, h));
        c += flash * vec3(0.55, 0.6, 0.75); gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
        }`,
    })
    const sky = new THREE.Mesh(new THREE.SphereGeometry(600, 32, 16), this.skyMat)
    sky.renderOrder = -10
    g.add(sky)

    // stars
    const r = rng(42)
    const n = 1800
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const u = r() * Math.PI * 2
      const v = Math.acos(1 - r() * 1.05)
      pos.set([Math.sin(v) * Math.cos(u) * 500, Math.cos(v) * 500, Math.sin(v) * Math.sin(u) * 500], i * 3)
    }
    const sg = new THREE.BufferGeometry()
    sg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    this.stars = new THREE.Points(
      sg,
      new THREE.PointsMaterial({ size: 1.6, sizeAttenuation: false, color: '#ffffff', transparent: true, opacity: 0, fog: false, depthWrite: false }),
    )
    g.add(this.stars)

    // aurora curtains above the summit
    this.auroraMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      fog: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: { time: { value: 0 }, strength: { value: 0 } },
      vertexShader: `varying vec2 vUv; uniform float time; void main(){ vUv = uv; vec3 p = position; p.z += sin(p.x * 0.02 + time * 0.3) * 18.0; gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0); }`,
      fragmentShader: `varying vec2 vUv; uniform float time; uniform float strength;
        void main(){ float band = sin(vUv.x * 18.0 + time * 0.6) * 0.5 + 0.5; band *= sin(vUv.x * 7.0 - time * 0.4) * 0.5 + 0.5;
        float fade = smoothstep(0.0, 0.25, vUv.y) * (1.0 - smoothstep(0.35, 1.0, vUv.y)) * smoothstep(0.0, 0.1, vUv.x) * (1.0 - smoothstep(0.9, 1.0, vUv.x));
        vec3 col = mix(vec3(0.2, 1.0, 0.6), vec3(0.6, 0.3, 1.0), vUv.y);
        gl_FragColor = vec4(col * band * fade * strength, 1.0);
        #include <colorspace_fragment>
        }`,
    })
    this.aurora = new THREE.Group()
    ;[0, 2.1, 4.2].forEach((a, i) => {
      const p = new THREE.Mesh(new THREE.PlaneGeometry(420, 120, 80, 1), this.auroraMat)
      p.position.set(Math.cos(a) * 300, 120 + i * 20, Math.sin(a) * 300)
      p.lookAt(0, 120, 0)
      this.aurora.add(p)
    })
    g.add(this.aurora)

    // a rainbow after the storm
    this.rainbowMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      fog: false,
      blending: THREE.AdditiveBlending,
      uniforms: { strength: { value: 0 } },
      vertexShader: `varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `varying vec2 vP; uniform float strength;
        vec3 hue(float h){ return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0); }
        void main(){ float r = length(vP); float t = (r - 150.0) / 22.0; if (t < 0.0 || t > 1.0) discard;
        float edge = smoothstep(0.0, 0.15, t) * (1.0 - smoothstep(0.85, 1.0, t)); float foot = smoothstep(0.0, 60.0, vP.y);
        gl_FragColor = vec4(hue(t * 0.8) * edge * foot * strength * 0.55, 1.0);
        #include <colorspace_fragment>
        }`,
    })
    this.rainbow = new THREE.Mesh(new THREE.RingGeometry(150, 172, 96, 1, 0, Math.PI), this.rainbowMat)
    this.scene.add(this.rainbow)
  }

  buildLights() {
    this.hemi = new THREE.HemisphereLight('#ffffff', '#444444', 1)
    this.scene.add(this.hemi)
    this.sun = new THREE.DirectionalLight('#ffffff', 2)
    this.sun.castShadow = true
    this.sun.shadow.mapSize.set(1024, 1024)
    const sc = this.sun.shadow.camera
    sc.left = sc.bottom = -7
    sc.right = sc.top = 7
    sc.near = 1
    sc.far = 70
    this.sun.shadow.bias = -0.0015
    this.sun.shadow.normalBias = 0.02
    this.scene.add(this.sun, this.sun.target)
    this.sunOffset = new THREE.Vector3(18, 26, 14)
  }

  buildGround() {
    const ground = new THREE.Mesh(new THREE.CircleGeometry(700, 48), mat('#6f7c58', { roughness: 1 }))
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.02
    ground.receiveShadow = true
    this.scene.add(ground)

    const r = rng(9)
    const grass = []
    for (let i = 0; i < 160; i++) {
      const a = r() * Math.PI * 2
      const d = 9.5 + r() * 26
      const g = new THREE.ConeGeometry(0.06 + r() * 0.05, 0.3 + r() * 0.4, 3)
      g.translate(Math.cos(a) * d, 0.15, Math.sin(a) * d)
      grass.push(g)
    }
    const gm = new THREE.Mesh(mergeGeometries(grass), mat('#58703f'))
    this.scene.add(gm)

    // distant mountains
    const mts = []
    for (let i = 0; i < 46; i++) {
      const a = (i / 46) * Math.PI * 2 + r() * 0.1
      const d = 150 + r() * 140
      const h = 25 + r() * 70
      const g = new THREE.ConeGeometry(h * (0.6 + r() * 0.5), h, 5 + Math.floor(r() * 3))
      g.rotateY(r() * 3)
      g.translate(Math.cos(a) * d, h / 2 - 2, Math.sin(a) * d)
      mts.push(g)
    }
    this.scene.add(new THREE.Mesh(mergeGeometries(mts), mat('#6a6c80')))

    // boulders at the foot
    for (let i = 0; i < 14; i++) {
      const a = r() * Math.PI * 2
      const d = 10 + r() * 14
      const b = new THREE.Mesh(new THREE.DodecahedronGeometry(0.4 + r() * 0.9, 0), mat('#8a8176'))
      b.position.set(Math.cos(a) * d, 0.2, Math.sin(a) * d)
      b.rotation.set(r() * 3, r() * 3, r() * 3)
      b.castShadow = b.receiveShadow = true
      this.scene.add(b)
    }
  }

  buildSpire() {
    const top = this.summitY + 3.5
    const H = top + 4
    const geo = new THREE.CylinderGeometry(4.9, 5.2, H, 34, Math.ceil(H), false)
    geo.translate(0, H / 2 - 4, 0)
    const pos = geo.attributes.position
    const colors = []
    const base = C('#857a6e')
    const high = C('#5f5b6d')
    const band = C('#9a8a73')
    const tmp = new THREE.Color()
    const r = rng(3)
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)
      const a = Math.atan2(z, x)
      const rad = Math.hypot(x, z)
      if (rad < 0.01) continue
      let n = Math.sin(a * 3 + y * 0.31) * 0.22 + Math.sin(a * 7 - y * 0.9) * 0.12 + Math.sin(y * 0.47 + a) * 0.18 + (r() - 0.5) * 0.18
      let k = 4.75 + n
      const taper = smoothstep(top - 7, top, y)
      k *= 1 - taper * 0.85
      if (y > top - 0.5) k *= 0.2
      pos.setXYZ(i, Math.cos(a) * k, y, Math.sin(a) * k)
      tmp.copy(base).lerp(high, clamp(y / top))
      if (Math.sin(y * 1.3) > 0.82) tmp.lerp(band, 0.6)
      tmp.offsetHSL(0, 0, (r() - 0.5) * 0.06)
      colors.push(tmp.r, tmp.g, tmp.b)
    }
    while (colors.length < pos.count * 3) colors.push(0.5, 0.48, 0.45)
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    const spire = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.95 }))
    spire.receiveShadow = true
    spire.castShadow = true
    this.scene.add(spire)
  }

  buildSteps() {
    const geo = sectorGeometry(STAIR_IN, STAIR_OUT, -0.5 * 0.0875, 0.5 * 0.0875, 0.75, 2)
    const solid = []
    const floating = []
    for (let k = 0; k < STEP_COUNT; k++) {
      if (landingAt(k) >= 0) continue
      if (k + 0.5 > SUMMIT + LANDING_LEN / 2) floating.push(k)
      else solid.push(k)
    }
    const thorny = (k) => SEGMENTS.some((s) => s.scars >= 2 && k > s.start + 2 && k < s.end - 2)
    const r = rng(11)
    const m4 = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const e = new THREE.Euler()
    const col = new THREE.Color()
    const stone = C('#c2b39b')
    const dark = C('#7f7366')

    const steps = new THREE.InstancedMesh(geo, mat('#ffffff', { roughness: 0.9 }), solid.length)
    solid.forEach((k, i) => {
      const cracked = thorny(k) && r() < 0.35
      e.set(cracked ? (r() - 0.5) * 0.05 : 0, -theta(k + 0.5), cracked ? (r() - 0.5) * 0.06 : 0, 'YXZ')
      q.setFromEuler(e)
      m4.compose(new THREE.Vector3(0, height(k + 1) - (cracked ? 0.03 : 0), 0), q, new THREE.Vector3(1, 1, 1))
      steps.setMatrixAt(i, m4)
      col.copy(stone).lerp(dark, cracked ? 0.55 : r() * 0.18)
      steps.setColorAt(i, col)
    })
    steps.castShadow = steps.receiveShadow = true
    this.scene.add(steps)

    // beyond the summit the steps keep going, unsupported, into the night
    this.floatMat = new THREE.MeshStandardMaterial({
      color: '#bcd0ff', emissive: '#6d86d6', emissiveIntensity: 0.5, flatShading: true, transparent: true, opacity: 0.85,
    })
    const fl = new THREE.InstancedMesh(geo, this.floatMat, floating.length)
    floating.forEach((k, i) => {
      const t = (k - floating[0]) / floating.length
      e.set(0, -theta(k + 0.5), 0)
      q.setFromEuler(e)
      const s = 1 - t * 0.55
      m4.compose(new THREE.Vector3(0, height(k + 1) + t * t * 6, 0), q, new THREE.Vector3(s, 0.4, s))
      fl.setMatrixAt(i, m4)
    })
    this.scene.add(fl)
  }

  buildLandings() {
    this.artifacts = []
    const r = rng(21)
    ALL_LANDINGS.forEach((c, i) => {
      const a0 = theta(c - LANDING_LEN / 2)
      const a1 = theta(c + LANDING_LEN / 2)
      const y = height(c)
      const isSummit = i === ALL_LANDINGS.length - 1
      const outer = STAIR_OUT + (isSummit ? 3.2 : 2.3)
      const pad = new THREE.Mesh(sectorGeometry(STAIR_IN, outer, -a1, -a0, 1.1, 10), mat(isSummit ? '#b8b2c8' : '#cbbda3'))
      pad.position.y = y
      pad.castShadow = pad.receiveShadow = true
      this.scene.add(pad)
      // rubble under the platform
      for (let k = 0; k < 4; k++) {
        const ang = lerp(a0, a1, r())
        const rad = lerp(STAIR_IN + 0.5, outer - 0.3, r())
        const b = new THREE.Mesh(new THREE.DodecahedronGeometry(0.4 + r() * 0.5, 0), mat('#8f8475'))
        b.position.set(Math.cos(ang) * rad, y - 1.1 - r() * 0.4, Math.sin(ang) * rad)
        b.rotation.set(r() * 3, r() * 3, r() * 3)
        this.scene.add(b)
      }
      if (isSummit) return

      const ms = MILESTONES[i]
      // monument with year plaque, facing outwards
      const mAng = theta(c + 1.6)
      const mRad = STAIR_OUT + 1.3
      const mon = new THREE.Group()
      mon.position.set(Math.cos(mAng) * mRad, y, Math.sin(mAng) * mRad)
      mon.rotation.y = -mAng + Math.PI / 2
      const slab = new THREE.Mesh(new THREE.BoxGeometry(1.25, 2.1, 0.28), mat('#6e655b'))
      slab.position.y = 1.05
      slab.castShadow = true
      mon.add(slab)
      const plaque = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.25), new THREE.MeshBasicMaterial({ map: plaqueTexture(ms), toneMapped: false }))
      plaque.position.set(0, 1.2, 0.145)
      mon.add(plaque)
      this.scene.add(mon)

      // pedestal + floating artifact + beacon
      const pAng = theta(c - 0.9)
      const pRad = STAIR_OUT + 0.7
      const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.42, 0.75, 7), mat('#8a7f72'))
      const px = Math.cos(pAng) * pRad
      const pz = Math.sin(pAng) * pRad
      ped.position.set(px, y + 0.37, pz)
      ped.castShadow = true
      this.scene.add(ped)
      const art = ITEM_FACTORY[ms.item]()
      art.userData.home = new THREE.Vector3(px, y + 1.55, pz)
      art.position.copy(art.userData.home)
      art.userData.scale = 2.1
      this.scene.add(art)
      const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: blobTexture([[0, 'rgba(255,225,150,0.95)'], [0.4, 'rgba(255,200,120,0.35)'], [1, 'rgba(255,200,120,0)']]),
          blending: THREE.AdditiveBlending, depthWrite: false, transparent: true,
        }),
      )
      halo.scale.setScalar(2.2)
      this.scene.add(halo)
      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.5, 40, 12, 1, true),
        new THREE.MeshBasicMaterial({ color: '#ffd98a', transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
      )
      beam.position.set(px, y + 20.5, pz)
      this.scene.add(beam)
      this.artifacts.push({ art, halo, beam })
    })
  }

  buildThorns() {
    const r = rng(77)
    const clusters = []
    const at = (u, rad) => {
      const t = theta(u)
      return new THREE.Vector3(Math.cos(t) * rad, height(Math.floor(u) + 1), Math.sin(t) * rad)
    }
    SCAR_POINTS.forEach((p, i) => {
      clusters.push({ c: at(p.u, i % 2 ? STAIR_OUT - 0.55 : STAIR_IN + 0.45), n: 22, big: 1.2 })
    })
    SEGMENTS.forEach((s) => {
      for (let i = 0; i < s.scars * 6; i++) {
        const u = lerp(s.start + 1, s.end - 1, r())
        clusters.push({ c: at(u, r() > 0.5 ? STAIR_OUT - 0.1 : STAIR_IN + 0.15), n: 10 + Math.floor(r() * 8), big: 0.8 + r() * 0.4 })
      }
    })
    const total = clusters.reduce((n, c) => n + c.n, 0)
    const spikes = new THREE.InstancedMesh(new THREE.ConeGeometry(0.045, 1, 4), mat('#ffffff', { roughness: 0.8 }), total)
    const up = new THREE.Vector3(0, 1, 0)
    const m4 = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const col = new THREE.Color()
    const v = new THREE.Vector3()
    const dir = new THREE.Vector3()
    let idx = 0
    clusters.forEach(({ c, n, big }) => {
      for (let i = 0; i < n; i++) {
        dir.set(r() - 0.5, r() * 0.9 + 0.1, r() - 0.5).normalize()
        const len = (0.25 + r() * 0.45) * big
        v.copy(c).addScaledVector(dir, len / 2 + r() * 0.15)
        q.setFromUnitVectors(up, dir)
        m4.compose(v, q, new THREE.Vector3(big, len, big))
        spikes.setMatrixAt(idx, m4)
        spikes.setColorAt(idx, col.set(r() < 0.18 ? '#7a1f24' : r() < 0.5 ? '#2f3424' : '#3d2f22'))
        idx++
      }
    })
    spikes.castShadow = true
    this.scene.add(spikes)

    // bramble vines along the outer edge on the hardest stretches
    const tubes = []
    SEGMENTS.filter((s) => s.scars >= 2).forEach((s) => {
      for (const rad of [STAIR_OUT - 0.08, STAIR_IN + 0.1]) {
        const pts = []
        for (let u = s.start + 2; u < s.end - 1; u += 0.5) {
          const t = theta(u)
          const rr = rad + Math.sin(u * 2.3) * 0.12
          pts.push(new THREE.Vector3(Math.cos(t) * rr, height(Math.floor(u) + 1) + 0.12 + Math.abs(Math.sin(u * 1.7)) * 0.25, Math.sin(t) * rr))
        }
        if (pts.length > 3) tubes.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), pts.length * 3, 0.04, 4))
      }
    })
    if (tubes.length) this.scene.add(new THREE.Mesh(mergeGeometries(tubes), mat('#3a3324')))
  }

  buildClouds() {
    this.clouds = []
    const r = rng(5)
    const tex = [cloudTexture(1), cloudTexture(2), cloudTexture(3)]
    const bandY = height(ALL_LANDINGS[4]) - 2 // the cloud sea sits just above the stormy 2020
    for (let i = 0; i < 90; i++) {
      const sea = i < 45
      const a = r() * Math.PI * 2
      const d = sea ? 12 + r() * 60 : 14 + r() * 80
      const y = sea ? bandY + (r() - 0.5) * 5 : 6 + r() * (this.summitY + 10)
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex[i % 3], transparent: true, depthWrite: false, opacity: 0.6 + r() * 0.3 }))
      const w = sea ? 16 + r() * 22 : 10 + r() * 18
      s.scale.set(w, w * 0.5, 1)
      s.position.set(Math.cos(a) * d, y, Math.sin(a) * d)
      s.userData = { a, d, y, speed: (r() - 0.5) * 0.01, base: s.material.opacity }
      this.scene.add(s)
      this.clouds.push(s)
    }
  }

  buildRocks() {
    this.rocks = []
    const r = rng(13)
    for (let i = 0; i < 46; i++) {
      const a = r() * Math.PI * 2
      const d = 12 + r() * 26
      const y = 4 + r() * (this.summitY + 15)
      const g = new THREE.Group()
      const s = 0.4 + r() * 1.6
      const rock = new THREE.Mesh(new THREE.IcosahedronGeometry(s, 0), mat('#7b7268'))
      rock.scale.y = 0.6
      g.add(rock)
      if (r() > 0.5) {
        const top = new THREE.Mesh(new THREE.CylinderGeometry(s * 0.9, s * 0.7, 0.18, 6), mat('#5d7a46'))
        top.position.y = s * 0.45
        g.add(top)
      }
      g.position.set(Math.cos(a) * d, y, Math.sin(a) * d)
      g.userData = { y, phase: r() * 6, spin: (r() - 0.5) * 0.2 }
      this.scene.add(g)
      this.rocks.push(g)
    }
  }

  buildWeather() {
    // drifting motes: dust and fireflies low, snow up high
    const n = 1400
    const r = rng(8)
    this.moteBox = new THREE.Vector3(44, 28, 44)
    const p = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) p.set([(r() - 0.5) * 44, (r() - 0.5) * 28, (r() - 0.5) * 44], i * 3)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(p, 3))
    this.motes = new THREE.Points(
      g,
      new THREE.PointsMaterial({
        size: 0.14,
        map: blobTexture([[0, 'rgba(255,255,255,1)'], [0.4, 'rgba(255,255,255,0.6)'], [1, 'rgba(255,255,255,0)']]),
        transparent: true, depthWrite: false, color: '#fff3d6', opacity: 0.7,
      }),
    )
    this.motes.frustumCulled = false
    this.scene.add(this.motes)
    this.motesOrigin = new THREE.Vector3()

    const rn = 1100
    const rp = new Float32Array(rn * 6)
    this.rainSeeds = new Float32Array(rn * 3)
    for (let i = 0; i < rn; i++) this.rainSeeds.set([(r() - 0.5) * 40, r() * 30, (r() - 0.5) * 40], i * 3)
    const rg = new THREE.BufferGeometry()
    rg.setAttribute('position', new THREE.BufferAttribute(rp, 3))
    this.rain = new THREE.LineSegments(rg, new THREE.LineBasicMaterial({ color: '#c9d6e6', transparent: true, opacity: 0, depthWrite: false }))
    this.rain.frustumCulled = false
    this.scene.add(this.rain)
  }

  buildCampfire() {
    const c = SUMMIT + 1.2
    const t = theta(c)
    const rad = R + 1.6
    const g = (this.camp = new THREE.Group())
    g.position.set(Math.cos(t) * rad, height(SUMMIT), Math.sin(t) * rad)
    for (let i = 0; i < 4; i++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.8, 6), mat('#5a3b22'))
      log.rotation.z = Math.PI / 2
      log.rotation.y = (i / 4) * Math.PI
      log.position.y = 0.07
      log.castShadow = true
      g.add(log)
    }
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2
      const st = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12, 0), mat('#6d6a73'))
      st.position.set(Math.cos(a) * 0.5, 0.06, Math.sin(a) * 0.5)
      g.add(st)
    }
    this.flames = [0, 1, 2].map((i) => {
      const f = new THREE.Mesh(
        new THREE.ConeGeometry(0.16 - i * 0.04, 0.6 - i * 0.12, 6),
        new THREE.MeshBasicMaterial({ color: ['#ff7a2f', '#ffb347', '#fff1a8'][i], toneMapped: false, transparent: true, opacity: 0.9 }),
      )
      f.position.y = 0.35 - i * 0.03
      g.add(f)
      return f
    })
    this.fireLight = new THREE.PointLight('#ff9b4a', 6, 10, 1.5)
    this.fireLight.position.y = 0.6
    g.add(this.fireLight)
    this.scene.add(g)
  }

  update({ time, dt, camera, mp, weather, focus, absorb, chest, mobile }) {
    const pal = samplePalette(mp, this.pal)

    // lightning during storms
    if (weather.storm > 0.35 && Math.random() < dt * 0.45 * weather.storm) this.flash = 1
    this.flash = Math.max(0, this.flash - dt * 3.2)
    const flicker = this.flash * (0.6 + Math.random() * 0.4)

    this.skyMat.uniforms.top.value.copy(pal.top)
    this.skyMat.uniforms.mid.value.copy(pal.mid)
    this.skyMat.uniforms.bottom.value.copy(pal.bottom)
    this.skyMat.uniforms.flash.value = flicker * 0.5
    this.skyGroup.position.copy(camera.position)
    this.scene.fog.color.copy(pal.fog)
    this.scene.fog.far = lerp(130, 70, weather.storm) * (mobile ? 0.9 : 1)
    this.scene.fog.near = lerp(18, 8, weather.storm)
    this.renderer.setClearColor(pal.fog)

    this.hemi.color.copy(pal.sky)
    this.hemi.groundColor.copy(pal.ground)
    this.hemi.intensity = pal.hemi + flicker * 1.5
    this.sun.color.copy(pal.sun)
    this.sun.intensity = pal.sunI
    this.sun.position.copy(focus).add(this.sunOffset)
    this.sun.target.position.copy(focus)

    this.stars.material.opacity = pal.stars
    this.stars.rotation.y = time * 0.004
    this.auroraMat.uniforms.time.value = time
    this.auroraMat.uniforms.strength.value = smoothstep(7.6, 8.8, mp) * 0.85
    this.aurora.position.y = -camera.position.y * 0.0

    const rb = smoothstep(3.95, 4.15, mp) * (1 - smoothstep(4.6, 5.0, mp))
    this.rainbowMat.uniforms.strength.value = rb
    this.rainbow.visible = rb > 0.001
    if (this.rainbow.visible) {
      const dir = new THREE.Vector3()
      camera.getWorldDirection(dir)
      dir.y = 0
      dir.normalize()
      this.rainbow.position.copy(camera.position).addScaledVector(dir, 320)
      this.rainbow.position.y = camera.position.y - 40
      this.rainbow.lookAt(camera.position.x, this.rainbow.position.y, camera.position.z)
    }

    this.clouds.forEach((s) => {
      const d = s.userData
      d.a += d.speed * dt
      s.position.x = Math.cos(d.a) * d.d
      s.position.z = Math.sin(d.a) * d.d
      s.material.color.copy(pal.cloud)
    })
    this.rocks.forEach((g) => {
      const d = g.userData
      g.position.y = d.y + Math.sin(time * 0.5 + d.phase) * 0.4
      g.rotation.y += d.spin * dt
    })

    // artifacts drift towards the climber when absorbed
    this.artifacts.forEach(({ art, halo, beam }, i) => {
      const a = absorb[i] ?? 0
      const k = a * a * (3 - 2 * a)
      const home = art.userData.home
      art.position.lerpVectors(home, chest, k)
      art.position.y += Math.sin(time * 1.6 + i) * 0.12 * (1 - k) + Math.sin(k * Math.PI) * 0.8
      art.rotation.y = time * (0.8 + k * 8)
      const s = art.userData.scale * (1 - k) + 0.0001
      art.scale.setScalar(s)
      art.visible = a < 0.999
      halo.position.copy(art.position)
      halo.material.opacity = (1 - k) * (0.75 + Math.sin(time * 3 + i) * 0.2)
      halo.visible = art.visible
      beam.material.opacity = (1 - smoothstep(0, 0.3, a)) * 0.13
    })

    // campfire
    this.flames.forEach((f, i) => {
      f.scale.set(1 + Math.sin(time * 9 + i) * 0.12, 1 + Math.sin(time * 13 + i * 2) * 0.25, 1)
      f.rotation.y = time * (1 + i)
    })
    this.fireLight.intensity = 5 + Math.sin(time * 11) * 1.2 + Math.sin(time * 17) * 0.8
    this.floatMat.emissiveIntensity = 0.35 + pal.stars * 0.8 + Math.sin(time * 1.5) * 0.08

    // motes / snow around the camera
    const snow = weather.snow
    const mp_ = this.motes.material
    mp_.color.set(snow > 0.4 ? '#ffffff' : '#ffe2a6')
    mp_.size = lerp(0.1, 0.17, snow)
    mp_.opacity = lerp(0.55, 0.9, snow) * (1 - weather.rain * 0.7)
    const p = this.motes.geometry.attributes.position
    const box = this.moteBox
    const cx = camera.position.x
    const cy = camera.position.y
    const cz = camera.position.z
    const fall = lerp(0.15, 1.6, snow)
    const drift = 0.4 + weather.wind * 3
    for (let i = 0; i < p.count; i++) {
      let x = p.getX(i) + Math.sin(time * 0.7 + i) * 0.004 + drift * dt * 0.5
      let y = p.getY(i) - fall * dt + Math.sin(time + i * 0.3) * 0.003
      let z = p.getZ(i) + Math.cos(time * 0.6 + i) * 0.004
      x = ((x - cx + box.x * 1.5) % box.x) - box.x / 2 + cx
      y = ((y - cy + box.y * 1.5) % box.y) - box.y / 2 + cy
      z = ((z - cz + box.z * 1.5) % box.z) - box.z / 2 + cz
      p.setXYZ(i, x, y, z)
    }
    p.needsUpdate = true

    const rain = weather.rain
    this.rain.visible = rain > 0.02
    this.rain.material.opacity = rain * 0.45
    if (this.rain.visible) {
      const rp = this.rain.geometry.attributes.position
      const seeds = this.rainSeeds
      const slant = 0.15 + weather.wind * 0.35
      for (let i = 0; i < seeds.length / 3; i++) {
        const sx = seeds[i * 3]
        const sz = seeds[i * 3 + 2]
        const y = cy + 15 - ((seeds[i * 3 + 1] + time * 24) % 30)
        const x = cx + sx + (15 - (y - cy)) * slant * 0.2
        const z = cz + sz
        rp.setXYZ(i * 2, x, y, z)
        rp.setXYZ(i * 2 + 1, x - slant * 0.6, y - 0.7, z)
      }
      rp.needsUpdate = true
    }
    return pal
  }
}
