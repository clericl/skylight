import * as THREE from 'three'
import { Cloud, Clouds as DreiClouds } from "@react-three/drei";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const CONTRAST_COLOR = new THREE.Color(0x303030)
const CLOUD_COLOR = new THREE.Color(0x595959)

export function Clouds() {
  const cloudsRef = useRef<THREE.Group>(null)
  const materialUpdated = useRef<boolean>(false)
  
  useFrame(() => {
    if (!materialUpdated.current && cloudsRef.current) {
      cloudsRef.current.renderOrder = 1
      materialUpdated.current = true
    }
  })

  return (
    <DreiClouds
      frustumCulled={false}
      limit={1200}
      material={THREE.MeshBasicMaterial}
      ref={cloudsRef}
    >
      <Cloud
        bounds={[10, 2, 10]}
        color={CONTRAST_COLOR}
        concentrate="outside"
        segments={600}
        scale={0.1}
        speed={0.2}
        position={[0, 0.25, 0]}
      />
      <Cloud
        bounds={[10, 2, 10]}
        color={CLOUD_COLOR}
        concentrate="inside"
        segments={600}
        scale={0.1}
        speed={0.2}
      />
    </DreiClouds>
  )
}
