import * as THREE from 'three'
import SunCalc from 'suncalc'
import { DEFAULT_COORDINATES } from "../constants"
import type { Point } from "../types"

export function calcSunPosition(location: Point = DEFAULT_COORDINATES, vector?: THREE.Vector3) {
  const angles = SunCalc.getPosition(new Date(), location.latitude, location.longitude)

  const phi = (Math.PI / 2) - angles.altitude
  const theta = angles.azimuth

  if (vector) {
    return vector.setFromSphericalCoords(1, phi, theta)
  }
  
  return new THREE.Vector3().setFromSphericalCoords(1, phi, theta)
}
