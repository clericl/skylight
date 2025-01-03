import * as dragon from "dragon-astronomy";
import * as THREE from 'three'
import type { Point, Star } from "../types";
import { decimalToHms } from "./decimal-to-hms";
import { DEFAULT_COORDINATES } from "../constants";

const calcVec = new THREE.Vector3()

export function calcStarPosition(star: Star, lmst: number, localPosition: Point = DEFAULT_COORDINATES): THREE.Vector3 {
  const raHms = decimalToHms(Number(star.ra))
  const decHms = decimalToHms(Number(star.dec))

  const eq = dragon.EquatorialCoordinate.fromTimeAndDegree(
    decHms.h,
    decHms.m,
    decHms.s,
    raHms.h,
    raHms.m,
    raHms.s,
  )

  const { altitude, azimuth } = dragon.HorizontalCoordinate.fromEquatorialCoordinateDegree(
    eq,
    lmst,
    localPosition.latitude,
  )

  return calcVec.setFromSphericalCoords(1, (Math.PI / 2) - altitude, azimuth)
}
