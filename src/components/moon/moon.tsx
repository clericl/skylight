import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import SunCalc from "suncalc"
import { useLocation } from "../../hooks"
import { MOON_SIZE } from "../../constants"

export function Moon() {
  const moonRef = useRef<THREE.Group>(null)
  const umbraRef = useRef<THREE.DirectionalLight>(null)
  const earthRef = useRef<THREE.Mesh>(null)
  const location = useLocation()

  useFrame(() => {
    const date = new Date(2024, 11, 15, 23, 47)
    const place = location.data
    
    const angles = SunCalc.getMoonPosition(date, place.latitude, place.longitude)
    const phi = (Math.PI / 2) - angles.altitude
    const theta = angles.azimuth
    
    if (moonRef.current) {
      moonRef.current.position.setFromSphericalCoords(1, phi, theta)
    }

    if (umbraRef.current) {
      umbraRef.current.position.setFromSphericalCoords(1, phi, theta)
      umbraRef.current.position.negate()
    }

    if (earthRef.current) {
      const { fraction, angle } = SunCalc.getMoonIllumination(date)

      earthRef.current.position.setX(fraction * MOON_SIZE * 2.6 * (angle > 0 ? 1 : -1))
    }
  })

  useEffect(() => {
    if (umbraRef.current) {
      umbraRef.current.shadow.mapSize.width = 8192
      umbraRef.current.shadow.mapSize.height = 8192
    }
  }, [])

  return (
    <group>
      <mesh position={[0, 0, 0]} castShadow ref={earthRef}>
        <sphereGeometry args={[MOON_SIZE * 1.3]} />
        <meshStandardMaterial color="green" transparent opacity={1} />
      </mesh>
      <group ref={moonRef}>
        <mesh receiveShadow>
          <sphereGeometry args={[MOON_SIZE]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
      <directionalLight
        castShadow
        intensity={10}
        ref={umbraRef}
      />
    </group>
  )
}
