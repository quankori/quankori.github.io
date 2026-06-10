// Deterministic pseudo-random size picker for bento-style photo grids.
// Same index always yields the same size, so layout doesn't jitter as
// more photos are lazy-loaded in.

const SIZES = ['sm', 'sm', 'sm', 'tall', 'sm', 'wide', 'sm', 'sm', 'big', 'sm', 'tall', 'sm', 'wide', 'sm']

function mulberry32(seed) {
  let t = seed
  return function () {
    t |= 0
    t = (t + 0x6D2B79F5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export function bentoSize(index) {
  const rand = mulberry32(index * 9301 + 49297)
  return SIZES[Math.floor(rand() * SIZES.length)]
}
