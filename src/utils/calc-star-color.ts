import * as THREE from 'three'
import type { Star } from '../types'

const calcColor = new THREE.Color()

export function calcStarColor(star: Star, bonus: number = 0) {
  const expMag = (Math.pow(100, ((5 - Number(star.mag)) / 5)) * 0.05) + bonus

  // const lowerClamped = expMag < 0.3 ? 0.3 : expMag
  const lowerClamped = expMag

  return calcColor.setRGB(lowerClamped * 1.1, lowerClamped * 1.1, lowerClamped)
}
