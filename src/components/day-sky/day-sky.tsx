import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import { useLocation } from '../../hooks';
import { useRef } from 'react';
import { Sky } from '@react-three/drei'
import { SkyGeometry } from 'three/examples/jsm/Addons.js';
import { calcSunPosition } from '../../utils';

const calcVec = new THREE.Vector3()

export function DaySky() {
  const skyRef = useRef<THREE.Mesh<SkyGeometry, THREE.ShaderMaterial>>(null)
  const location = useLocation()
  
  useFrame(() => {
    const place = location.data
    
    if (skyRef.current) {
      calcSunPosition(place, calcVec)

      skyRef.current.material.uniforms.sunPosition.value.copy(calcVec)
    }
  })

  return (
    <Sky distance={1.99} ref={skyRef} />
  )
}
