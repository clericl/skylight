import constellationMap from '../../assets/constellation_figures_8k.tif?url'
import * as THREE from 'three'
import { TIFFLoader } from "three/examples/jsm/Addons.js"
import { useFrame, useLoader } from "@react-three/fiber"
import { useCallback, useEffect, useRef, useState } from 'react'
import { generateStarfield, getLmst } from '../../utils'
import { DEFAULT_COORDINATES } from '../../constants'
import { degToRad } from 'three/src/math/MathUtils.js'

const nightColor = new THREE.Color().setRGB(0.001, 0.0, 0.01)

export function CelestialSphere() {
  const [starfieldMesh] = useState(generateStarfield())
  // const tex = useLoader(TIFFLoader, constellationMap)
  const showRef = useRef(true)
  const constellationRef = useRef<THREE.Mesh>(null)
  
  useFrame(() => {
    if (constellationRef.current) {
      constellationRef.current.visible = showRef.current
    }
  })

  // const handleClick = useCallback(() => {
  //   showRef.current = !showRef.current
  // }, [])

  return (
    <group>
      <primitive object={starfieldMesh} />
      <mesh>
        <sphereGeometry args={[2]} />
        <meshBasicMaterial color={nightColor} side={THREE.BackSide} transparent />
      </mesh>
      {/* <mesh ref={constellationRef} onClick={handleClick}>
        <meshBasicMaterial
          map={tex}
          side={THREE.BackSide}
          transparent
          opacity={0.2}
        />
      </mesh> */}
    </group>
  )
}
