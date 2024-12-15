import { useTexture } from "@react-three/drei"
import starMap from '../../assets/starmap_2020_4k.exr?url'
import * as THREE from 'three'
import { EXRLoader } from "three/examples/jsm/Addons.js"
import { useEffect } from "react"
import { useLoader } from "@react-three/fiber"

export function CelestialSphere() {
  // console.log(starMap)
  // const tex = useTexture(starMap)

  const tex = useLoader(EXRLoader, starMap)

  return (
    <group>
      <mesh>
        <sphereGeometry args={[3]} />
        <meshBasicMaterial map={tex} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}
