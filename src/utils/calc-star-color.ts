import * as THREE from 'three'
import type { Star } from '../types'

const calcColor = new THREE.Color()

export function calcStarColor(star: Star, bonus: number = 0) {
  const expMag = (Math.pow(100, ((5 - Number(star.mag)) / 5)) * 0.05) + bonus

  return calcColor.setRGB(expMag * 1.1, expMag * 1.1, expMag)
}
