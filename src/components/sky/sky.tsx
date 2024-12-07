import { useInterval } from "usehooks-ts";
import { useState } from 'react';
import { Sky as DreiSky } from '@react-three/drei';
import { useLocation } from '../../hooks';
import * as THREE from 'three'
import { calcSunPosition } from '../../utils';

export function Sky() {
  const [sunPosition, setSunPosition] = useState<THREE.Vector3>(calcSunPosition())
  
  const location = useLocation()

  useInterval(async () => {
    const newPosition = calcSunPosition(location.data)

    setSunPosition(newPosition)
  }, 1000)

  return (
    <DreiSky sunPosition={sunPosition} />
  )
}
