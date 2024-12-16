import starMap from '../../assets/hiptyc_2020_4k.exr?url'
import constellationMap from '../../assets/constellation_figures_8k.tif?url'
import * as THREE from 'three'
import { EXRLoader, TIFFLoader } from "three/examples/jsm/Addons.js"
import { useFrame, useLoader } from "@react-three/fiber"
import { RefObject, useCallback, useRef, useState } from 'react'
import { generateStarfield } from '../../utils'

type CelestialSphereProps = {
  ref?: RefObject<THREE.Mesh | null>;
}

export function CelestialSphere({ ref }: CelestialSphereProps) {
  const [starfieldMesh] = useState(generateStarfield())
  const tex = useLoader(EXRLoader, starMap)
  const constellations = useLoader(TIFFLoader, constellationMap)
  const showRef = useRef(true)
  const constellationRef = useRef<THREE.Mesh>(null)

  const handleClick = useCallback(() => {
    showRef.current = !showRef.current
  }, [])
  
  useFrame(() => {
    if (constellationRef.current) {
      constellationRef.current.visible = showRef.current
    }
  })

  return (
    <group>
      <primitive object={starfieldMesh} />
      {/* <mesh ref={ref}>
        <sphereGeometry args={[2]} />
        <meshBasicMaterial map={tex} side={THREE.BackSide} transparent />
      </mesh>
      <mesh ref={constellationRef} onClick={handleClick}>
        <sphereGeometry args={[1.99]} />
        <meshBasicMaterial
          map={constellations}
          alphaMap={constellations}
          side={THREE.BackSide}
          transparent
        />
      </mesh> */}
    </group>
  )
}
