import * as THREE from "three"
import SunCalc from "suncalc"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { useLocation } from "../../hooks"
import { MOON_SIZE } from "../../constants"
import { calcMoonPosition } from "../../utils"

const calcVec = new THREE.Vector3()
const moonColor = new THREE.Color(1.5, 1.5, 1.2)

export function Moon() {
  const moonRef = useRef<THREE.Mesh>(null)
  const location = useLocation()

  useFrame(() => {
    const place = location.data
    
    calcMoonPosition(place, calcVec)

    if (moonRef.current) {
      moonRef.current.position.copy(calcVec)
    }
  })

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[MOON_SIZE]} />
      <meshBasicMaterial color={moonColor} toneMapped={false} />
    </mesh>
  )
}
