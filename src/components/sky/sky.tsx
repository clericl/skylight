import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import { useLocation } from '../../hooks';
import { useRef } from 'react';
import { Sky as DreiSky } from '@react-three/drei'
import { SkyGeometry } from 'three/examples/jsm/Addons.js';
import { calcSunPosition } from '../../utils';

const calcVec = new THREE.Vector3()

const nightColor = new THREE.Color().setRGB(0, 0.001, 0.02)

export function Sky() {
  const dayRef = useRef<THREE.Mesh<SkyGeometry, THREE.ShaderMaterial>>(null)
  const nightRef = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>>(null)
  const location = useLocation()
  
  useFrame(() => {
    const place = location.data
    
    const { altitude } = calcSunPosition(place, calcVec)

    if (dayRef.current) {
      dayRef.current.material.uniforms.sunPosition.value.copy(calcVec)
    }
    
    if (nightRef.current) {
      const smoothedOpacity = 1 - THREE.MathUtils.smoothstep(altitude, -0.3, 0.4)
      nightRef.current.material.opacity = smoothedOpacity
    }
  })

  return (
    <>
      <DreiSky distance={2.04} ref={dayRef} />
      
      <mesh ref={nightRef}>
        <sphereGeometry args={[1.02]} />
        <meshBasicMaterial
          color={nightColor}
          side={THREE.BackSide}
          transparent
        />
      </mesh>
    </>
  )
}
