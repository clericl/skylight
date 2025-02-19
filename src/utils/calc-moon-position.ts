import * as THREE from 'three'
import SunCalc from 'suncalc'
import { DEFAULT_COORDINATES } from "../constants"
import type { Point } from "../types"

export function calcMoonPosition(location: Point = DEFAULT_COORDINATES, vector?: THREE.Vector3) {
  const angles = SunCalc.getMoonPosition(new Date(), location.latitude, location.longitude)

  const phi = (Math.PI / 2) - angles.altitude
  const theta = angles.azimuth * -1

  if (vector) {
    vector.setFromSphericalCoords(1, phi, theta)
  }
  
  return angles
}
