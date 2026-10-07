// Deterministic seeded RNG so the demo world is stable across reloads
export function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const rng = mulberry32(20260915)

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)]
}

export function between(min: number, max: number): number {
  return min + rng() * (max - min)
}

export function intBetween(min: number, max: number): number {
  return Math.floor(between(min, max + 1))
}
