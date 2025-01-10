import * as THREE from "three"
import SunCalc from "suncalc"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { useLocation } from "../../hooks"
import { MOON_SIZE } from "../../constants"

const calcSpherical = new THREE.Spherical()
const moonColor = new THREE.Color(1.5, 1.5, 1.2)

export function Moon() {
  const moonRef = useRef<THREE.Mesh>(null)
  const location = useLocation()

  useFrame(() => {
    const date = new Date()
    const place = location.data
    
    const { altitude, azimuth } = SunCalc.getMoonPosition(date, place.latitude, place.longitude)
    calcSpherical.set(1, (Math.PI / 2) - altitude, azimuth - Math.PI)

    if (moonRef.current) {
      moonRef.current.position.setFromSpherical(calcSpherical)
    }
  })

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[MOON_SIZE]} />
      <meshBasicMaterial color={moonColor} toneMapped={false} />
    </mesh>
  )
}
