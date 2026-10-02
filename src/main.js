import './style.css'
import * as THREE from 'three'
import Lenis from 'lenis'
import { World } from './scene/world.js'
import { Climber } from './scene/climber.js'
import { Hud } from './ui/hud.js'
import { MILESTONES, UI } from './data/journey.js'
import {
  R, U_START, SUMMIT, SCAR_POINTS, buildTimeline, theta, feetY, height, scarsBefore,
  milestonePos, weatherAt, clamp, lerp, smoothstep,
} from './path.js'

const mobileQuery = matchMedia('(max-width: 760px)')
let mobile = mobileQuery.matches
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

document.getElementById('loader-text').textContent = UI.loading

async function start() {
  try {
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))])
    await document.fonts.load('800 64px "Be Vietnam Pro"')
  } catch {}

  const canvas = document.getElementById('scene')
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 1.75))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05

  const camera = new THREE.PerspectiveCamera(mobile ? 55 : 42, innerWidth / innerHeight, 0.1, 1500)
  const world = new World(renderer)
  const climber = new Climber()
  world.scene.add(climber.root)
  const tl = buildTimeline()

  // scroll space: one "unit" of the timeline = one viewport height
  let unit = innerHeight
  const space = document.getElementById('scroll-space')
  const layout = () => {
    mobile = mobileQuery.matches
    unit = innerHeight
    space.style.height = `${(tl.total + 1) * unit}px`
    renderer.setSize(innerWidth, innerHeight, false)
    camera.aspect = innerWidth / innerHeight
    camera.fov = mobile ? 55 : 42
    camera.updateProjectionMatrix()
  }
  layout()

  const lenis = new Lenis({ lerp: reduced ? 1 : 0.075, smoothWheel: !reduced, wheelMultiplier: 0.85, touchMultiplier: 1.3 })
  if (import.meta.env.DEV) window.__climb = { camera, world, climber, renderer, tl, lenis, dbg: {} }

  const jump = (target) => {
    let T = 0
    if (target === 'start') T = 0
    else if (target === 'top') T = tl.outro.t0 + 0.9
    else {
      const d = tl.dwells[Number(target)]
      T = d.t0 + d.len * 0.7
    }
    const dist = Math.abs(T * unit - lenis.scroll) / unit
    lenis.scrollTo(T * unit, { duration: reduced ? 0 : clamp(1.2 + dist * 0.25, 1.2, 5), easing: (x) => 1 - Math.pow(1 - x, 3) })
  }

  const hud = new Hud({ timeline: tl, onJump: jump })
  hud.mount()

  // Keep the climb position on resize; ignore the small height jitter of mobile URL bars.
  let lastW = innerWidth
  addEventListener('resize', () => {
    const big = innerWidth !== lastW || Math.abs(innerHeight - unit) > 160
    renderer.setSize(innerWidth, innerHeight, false)
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    if (!big) return
    lastW = innerWidth
    const p = lenis.scroll / unit
    layout()
    lenis.resize()
    lenis.scrollTo(p * unit, { immediate: true, force: true })
  })

  // ---------------------------------------------------------------------------
  const camPos = new THREE.Vector3()
  const camLook = new THREE.Vector3()
  const tPos = new THREE.Vector3()
  const tLook = new THREE.Vector3()
  const hPos = new THREE.Vector3()
  const hLook = new THREE.Vector3()
  const oPos = new THREE.Vector3()
  const oLook = new THREE.Vector3()
  const focus = new THREE.Vector3()
  const chest = new THREE.Vector3()
  const head = new THREE.Vector3()
  const scr = new THREE.Vector3()
  let viewX = 0
  let viewY = 0
  let shake = 0
  let prevU = null
  let speed = 0
  let prevAcq = MILESTONES.map(() => 0)
  let lastMove = performance.now()
  let lastT = -1
  let first = true
  let last = performance.now()
  const clock = { time: 0 }

  const toScreen = (v) => {
    scr.copy(v).project(camera)
    return [(scr.x * 0.5 + 0.5) * innerWidth, (-scr.y * 0.5 + 0.5) * innerHeight, scr.z < 1]
  }

  function tick(now) {
    lenis.raf(now)
    const dt = clamp((now - last) / 1000, 0.001, 0.05)
    last = Math.max(last, now)
    clock.time += dt

    const T = (Number.isFinite(lenis.scroll) ? lenis.scroll : scrollY) / unit
    if (Math.abs(T - lastT) > 0.0005) lastMove = now
    lastT = T
    const st = tl.sample(T)
    const u = st.u
    if (prevU === null) prevU = u
    speed = lerp(speed, (u - prevU) / Math.max(dt, 1e-3), 1 - Math.exp(-dt * 10))

    // place the climber
    const th = theta(u)
    const y = feetY(u)
    climber.root.position.set(R * Math.cos(th), y, R * Math.sin(th))
    climber.root.rotation.y = -th
    const scars = scarsBefore(u)
    const mp = milestonePos(u)
    const weather = weatherAt(u)
    const dwell = st.seg.kind === 'dwell'
    const facing = dwell ? smoothstep(0, 0.2, st.local) * (1 - smoothstep(0.85, 1, st.local)) : st.outroW * 0.6
    const night = smoothstep(6.3, 8, mp) + weather.storm * 0.6
    climber.update({
      time: clock.time,
      dt,
      u,
      speed,
      acquire: st.acquire,
      scars,
      wind: weather.wind,
      night,
      facing,
      celebrate: dwell ? st.acquire[st.seg.index] : 0,
    })
    climber.chestWorld(chest)

    // camera rig: follow, hero and outro shots blended together
    // third-person: behind and outside the climber, looking up the stairs
    const ang = th - (mobile ? 0.5 : 0.42)
    const rad = R + (mobile ? 8.5 : 6.6)
    tPos.set(Math.cos(ang) * rad, y + (mobile ? 3.4 : 2.9), Math.sin(ang) * rad)
    const la = th + 0.02
    tLook.set(Math.cos(la) * (R + 0.3), y + 1.45, Math.sin(la) * (R + 0.3))

    const ha = theta(U_START) + 0.5
    hPos.set(Math.cos(ha) * (R + 21), 1.0, Math.sin(ha) * (R + 21))
    hLook.set(Math.cos(theta(U_START)) * R * 0.75, 7.5, Math.sin(theta(U_START)) * R * 0.75)
    tPos.lerp(hPos, st.heroW)
    tLook.lerp(hLook, st.heroW)

    const oa = theta(SUMMIT) + 0.95
    const sy = height(SUMMIT)
    const orad = mobile ? 46 : 34
    oPos.set(Math.cos(oa) * orad, sy + 6, Math.sin(oa) * orad)
    oLook.set(Math.cos(oa) * 4, sy + 2.5, Math.sin(oa) * 4)
    tPos.lerp(oPos, st.outroW)
    tLook.lerp(oLook, st.outroW)

    const k = first ? 1 : 1 - Math.exp(-dt * (reduced ? 20 : 4.5))
    camPos.lerp(tPos, k)
    camLook.lerp(tLook, k)
    camera.position.copy(camPos)
    if (shake > 0.001) {
      camera.position.x += (Math.random() - 0.5) * shake * 0.12
      camera.position.y += (Math.random() - 0.5) * shake * 0.12
      shake *= Math.exp(-dt * 7)
    }
    camera.lookAt(camLook)

    // frame the climber away from the card
    let cardO = 0
    let side = 0
    st.cards.forEach((o, i) => {
      if (o > cardO) {
        cardO = o
        side = i % 2 ? -1 : 1
      }
    })
    const heroShift = st.heroW * (mobile ? 0 : -0.12)
    const tx = mobile ? 0 : (-side * 0.18 * cardO + heroShift) * innerWidth
    const ty = mobile ? 0.2 * cardO * innerHeight : 0
    viewX = lerp(viewX, tx, 1 - Math.exp(-dt * 5))
    viewY = lerp(viewY, ty, 1 - Math.exp(-dt * 5))
    camera.setViewOffset(innerWidth, innerHeight, viewX, viewY, innerWidth, innerHeight)

    focus.set(climber.root.position.x, y + 1, climber.root.position.z)
    world.update({ time: clock.time, dt, camera, mp, weather, focus, absorb: st.absorb, chest, mobile })

    // events
    climber.headWorld(head)
    if (u > prevU && !first) {
      for (const p of SCAR_POINTS) {
        if (p.u > prevU && p.u <= u) {
          const [x, yy] = toScreen(head)
          hud.scar(x, yy, reduced)
          if (!reduced) shake = 1
        }
      }
    }
    st.acquire.forEach((a, i) => {
      if (a >= 0.5 && prevAcq[i] < 0.5 && !first) {
        const [x, yy] = toScreen(head)
        hud.levelUp(i, x, yy)
      }
    })
    prevAcq = st.acquire
    prevU = u

    // idle speech bubble
    const idle = now - lastMove > 2600
    if (idle && st.seg.kind !== 'travel') {
      const stage = st.acquire.filter((a) => a >= 0.5).length
      let text
      if (st.seg.kind === 'hero') text = UI.heroBubble
      else if (st.seg.kind === 'outro') text = UI.outroBubble
      else text = MILESTONES[Math.max(0, stage - 1)].quote
      const [x, yy, ok] = toScreen(head)
      hud.bubble(ok && st.outroW < 0.3 ? text : null, x, yy)
    } else hud.bubble(null)

    const stepNo = Math.max(0, Math.min(Math.floor(SUMMIT), Math.floor(u)))
    hud.update(st, { scars, mp, stepNo, stepTotal: Math.floor(SUMMIT) })

    renderer.render(world.scene, camera)
    if (first) {
      first = false
      document.body.classList.add('is-ready')
    }
  }
  function frame(now) {
    tick(now)
    requestAnimationFrame(frame)
  }
  if (import.meta.env.DEV) window.__climb.run = (n = 90) => { let t = last; for (let i = 0; i < n; i++) tick((t += 16.7)) }
  requestAnimationFrame(frame)
}

start()
