import * as THREE from 'three'
import SunCalc from 'suncalc'
import { useFrame } from "@react-three/fiber";
import { useLocation } from '../../hooks';
import { Suspense, useRef } from 'react';
import { Sky as DreiSky } from '@react-three/drei';
import { SkyGeometry } from "three/examples/jsm/Addons.js";
import { Moon } from '../moon';
import { CelestialSphere } from '../celestial-sphere';

const sunPositionVec = new THREE.Vector3()

export function Sky() {
  const sunRef = useRef<THREE.Group>(null)
  const skyRef = useRef<THREE.Mesh<SkyGeometry, THREE.ShaderMaterial>>(null)
  const nightRef = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>>(null)
  
  const location = useLocation()
  
  useFrame(() => {
    const date = new Date()
    const place = location.data
    
    if (skyRef.current) {
      const angles = SunCalc.getPosition(date, place.latitude, place.longitude)
      const phi = (Math.PI / 2) - angles.altitude
      const theta = angles.azimuth

      sunPositionVec.setFromSphericalCoords(1, phi, theta)

      skyRef.current.material.uniforms.sunPosition.value.copy(sunPositionVec)

      if (sunRef.current) {
        sunRef.current.position.copy(sunPositionVec)
        sunRef.current.position.multiplyScalar(1.1)
      }

      if (nightRef.current) {
        nightRef.current.material.opacity = -sunPositionVec.y * 2
      }
    }
  })

  return (
    <group>
      <DreiSky ref={skyRef} />
      <Suspense fallback={null}>
        <CelestialSphere />
      </Suspense>
      <Moon />
    </group>
  )
}
