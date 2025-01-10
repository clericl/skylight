import * as THREE from 'three'
import SunCalc from 'suncalc'
import { useFrame } from "@react-three/fiber";
import { useLocation } from '../../hooks';
import { useRef } from 'react';
import { SkyGeometry } from "three/examples/jsm/Addons.js";
import { CelestialSphere } from '../celestial-sphere';

const calcVec = new THREE.Vector3()

export function Sky() {
  const skyRef = useRef<THREE.Mesh<SkyGeometry, THREE.ShaderMaterial>>(null)
  const nightRef = useRef<THREE.Group>(null)
  
  const location = useLocation()
  
  useFrame(() => {
    const date = new Date()
    const place = location.data
    
    // const moon = SunCalc.getMoonPosition(date, place.latitude, place.longitude)

    // if (skyRef.current) {
    //   const { altitude, azimuth } = SunCalc.getPosition(date, place.latitude, place.longitude)
      
    //   calcVec.setFromSphericalCoords(1, (Math.PI / 2) - altitude, azimuth + Math.PI)

    //   if (nightRef.current) {
    //     nightRef.current.traverse((obj) => {
    //       if (obj.material) {
    //         obj.material.opacity = Math.cos(sunPositionVec.y + (Math.PI / 4)) + 0.1
    //         obj.material.visible = false
    //       }
    //     })
    //   }
    // }
  })

  return (
    <group>
      <CelestialSphere ref={nightRef} />
    </group>
  )
}
