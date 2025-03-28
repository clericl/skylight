import * as THREE from 'three'
import { calcSunPosition } from '../../utils';
import { useFrame } from "@react-three/fiber";
import { useLocation } from '../../hooks';
import { useRef } from 'react';
import { Sky as DreiSky } from '@react-three/drei'

const calcVec = new THREE.Vector3()

const DAY_COLOR = new THREE.Color(0xa1c5ff)
const NIGHT_COLOR = new THREE.Color(0x091133)

export function Sky() {
  const dayRef = useRef<THREE.Mesh<THREE.BoxGeometry, THREE.ShaderMaterial>>(null)
  const nightRef = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>>(null)
  const location = useLocation()
  
  useFrame(() => {
    const place = location.data
    
    const { altitude } = calcSunPosition(place, calcVec)

    if (dayRef.current) {
      dayRef.current.material.uniforms.sunPosition.value.copy(calcVec)
    }
    
    if (nightRef.current) {
      const smoothedAltitude = THREE.MathUtils.smoothstep(altitude, -0.3, 0.4)
      // const smoothedAltitude = 0.4

      nightRef.current.material.opacity = 1 - smoothedAltitude
      nightRef.current.material.color.lerpColors(NIGHT_COLOR, DAY_COLOR, smoothedAltitude)
    }
  })

  return (
    <>
      <DreiSky ref={dayRef} />
    
      <mesh ref={nightRef}>
        <sphereGeometry args={[8.1]} />
        <meshBasicMaterial
          color={NIGHT_COLOR}
          side={THREE.BackSide}
          transparent
        />
      </mesh>
    </>
  )
}
