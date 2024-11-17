import SunCalc, { GetSunPositionResult } from 'suncalc'
import { geolocate } from "../../utils";
import { useInterval } from "usehooks-ts";
import { degToRad } from "three/src/math/MathUtils.js";
import { useState } from 'react';
import { Sky as DreiSky } from '@react-three/drei';

export function Sky() {
  const [localPosition, setLocalPosition] = useState<GeolocationPosition | null>(null)
  const [sunPosition, setSunPosition] = useState<GetSunPositionResult | null>(null)

  const azimuthRad = sunPosition?.azimuth ? degToRad(sunPosition.azimuth) : undefined

  useInterval(async () => {
    if (!localPosition) {
      const location = await geolocate()

      setLocalPosition(location)
    } else {
      const newPosition = SunCalc.getPosition(new Date(), localPosition.coords.latitude, localPosition.coords.longitude)
  
      setSunPosition(newPosition)
    }
  }, 1000)

  return (
    <DreiSky azimuth={azimuthRad} inclination={sunPosition?.altitude} />
  )
}
