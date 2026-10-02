import { MILESTONES, FINAL } from './data/journey.js'

// A helical staircase wound around a rock spire.
// The path parameter `u` counts steps: step k spans u ∈ [k, k+1).
export const R = 7 // centreline radius of the stairs
export const STAIR_IN = 5.6
export const STAIR_OUT = 8.6
export const RISE = 0.27
export const DTHETA = 0.085
export const LANDING_LEN = 5
export const U_START = -9

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
export const lerp = (a, b, t) => a + (b - a) * t
export const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}

// Landing centres sit on half steps so the flat interval [c-2.5, c+2.5] aligns with step edges.
const centers = []
{
  let c = 10.5
  MILESTONES.forEach((m, i) => {
    if (i > 0) c += 20 + m.scars * 2 + LANDING_LEN
    centers.push(c)
  })
}
export const LANDINGS = centers
export const SUMMIT = centers[centers.length - 1] + 26 + LANDING_LEN
export const ALL_LANDINGS = [...centers, SUMMIT]
export const STEP_COUNT = Math.floor(SUMMIT) + 48

const intervals = ALL_LANDINGS.map((c) => [c - LANDING_LEN / 2, c + LANDING_LEN / 2])

function flatBefore(u) {
  let f = 0
  for (const [a, b] of intervals) if (u > a) f += Math.min(u, b) - a
  return f
}

export const theta = (u) => u * DTHETA

export function height(u) {
  if (u <= 0) return 0
  return (u - flatBefore(u)) * RISE
}

// Feet height: hop up at the start of each step, then stay flat.
export function feetY(u) {
  if (u <= 0) return 0
  const k = Math.floor(u)
  return lerp(height(k), height(k + 1), smoothstep(0, 0.45, u - k))
}

export function landingAt(k) {
  return intervals.findIndex(([a, b]) => k >= a && k + 1 <= b)
}

export function pointAt(u, radius, target) {
  const t = theta(u)
  return target.set(radius * Math.cos(t), feetY(u), radius * Math.sin(t))
}

// Segment j is the climb that leads up to landing j (the last one leads to the summit).
export const SEGMENTS = ALL_LANDINGS.map((c, j) => {
  const start = j === 0 ? 0 : ALL_LANDINGS[j - 1] + LANDING_LEN / 2
  const end = c - LANDING_LEN / 2
  const src = MILESTONES[j] || FINAL
  return { j, start, end, scars: src.scars, weather: src.weather }
})

export const SCAR_POINTS = []
SEGMENTS.forEach((s) => {
  for (let i = 0; i < s.scars; i++) {
    SCAR_POINTS.push({ u: lerp(s.start, s.end, (i + 1) / (s.scars + 1)) + 0.3, segment: s.j })
  }
})
export const TOTAL_SCARS = SCAR_POINTS.length

export function scarsBefore(u) {
  let n = 0
  for (const p of SCAR_POINTS) if (p.u < u) n++
  return n
}

// Continuous "milestone position": 0 at landing 0, 1 at landing 1 … N at the summit.
export function milestonePos(u) {
  if (u <= ALL_LANDINGS[0]) return lerp(-1, 0, clamp((u - U_START) / (ALL_LANDINGS[0] - U_START)))
  for (let i = 0; i < ALL_LANDINGS.length - 1; i++) {
    const a = ALL_LANDINGS[i]
    const b = ALL_LANDINGS[i + 1]
    if (u <= b) return i + (u - a) / (b - a)
  }
  return ALL_LANDINGS.length - 1 + (u - SUMMIT) / 30
}

// Weather intensity per kind, peaking in the middle of the segment that owns it.
export function weatherAt(u) {
  const w = { rain: 0, storm: 0, wind: 0, snow: 0 }
  for (const s of SEGMENTS) {
    if (s.weather === 'calm') continue
    const k = smoothstep(s.start - 4, s.start + 3, u) * (1 - smoothstep(s.end - 1, s.end + 4, u))
    w[s.weather] = Math.max(w[s.weather], k)
  }
  w.rain = Math.max(w.rain, w.storm)
  w.wind = Math.max(w.wind, w.storm * 0.8)
  w.snow = Math.max(w.snow, smoothstep(ALL_LANDINGS[7], ALL_LANDINGS[8], u))
  return w
}

// ---------------------------------------------------------------------------
// Scroll timeline, measured in viewport heights.
// hero → (travel → dwell) × milestones → travel → outro
export function buildTimeline() {
  const segs = []
  let T = 0
  const push = (s) => {
    s.t0 = T
    T += s.len
    s.t1 = T
    segs.push(s)
  }
  push({ kind: 'hero', len: 0.8, u0: U_START, u1: U_START })
  let prev = U_START
  LANDINGS.forEach((c, i) => {
    push({ kind: 'travel', len: 0.9 + (c - prev) / 70, u0: prev, u1: c, to: i })
    push({ kind: 'dwell', len: 1.15, u0: c, u1: c, index: i })
    prev = c
  })
  push({ kind: 'travel', len: 1.5, u0: prev, u1: SUMMIT, to: 'summit' })
  push({ kind: 'outro', len: 1.4, u0: SUMMIT, u1: SUMMIT })

  const dwells = segs.filter((s) => s.kind === 'dwell')
  const outro = segs[segs.length - 1]
  const ease = (t) => -(Math.cos(Math.PI * t) - 1) / 2

  function sample(t) {
    t = Number.isFinite(t) ? clamp(t, 0, T) : 0
    let seg = segs[segs.length - 1]
    for (const s of segs) if (t <= s.t1) { seg = s; break }
    const local = clamp((t - seg.t0) / seg.len)
    const u = seg.kind === 'travel' ? lerp(seg.u0, seg.u1, ease(local)) : seg.u0
    const acquire = dwells.map((d) => smoothstep(d.t0 + d.len * 0.4, d.t0 + d.len * 0.62, t))
    const absorb = dwells.map((d) => smoothstep(d.t0 + d.len * 0.08, d.t0 + d.len * 0.55, t))
    const cards = dwells.map(
      (d) => smoothstep(d.t0 - 0.3, d.t0 + 0.05, t) * (1 - smoothstep(d.t1 - 0.05, d.t1 + 0.3, t)),
    )
    return {
      t,
      u,
      seg,
      local,
      acquire,
      absorb,
      cards,
      heroW: 1 - smoothstep(0.15, 1.6, t),
      outroW: smoothstep(outro.t0 - 0.9, outro.t0 + 0.8, t),
    }
  }

  return { segs, dwells, outro, total: T, sample }
}
