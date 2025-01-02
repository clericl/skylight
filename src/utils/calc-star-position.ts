import * as dragon from "dragon-astronomy";
import type { AltAz, Point, Star } from "../types";
import { decimalToHms } from "./decimal-to-hms";
import { DEFAULT_COORDINATES } from "../constants";

export function calcStarPosition(star: Star, lmst: number, localPosition: Point = DEFAULT_COORDINATES): AltAz {
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

  return dragon.HorizontalCoordinate.fromEquatorialCoordinateDegree(
    eq,
    lmst,
    localPosition.latitude,
  )
}
