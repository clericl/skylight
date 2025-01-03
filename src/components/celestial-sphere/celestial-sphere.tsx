import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"
import { useRef } from 'react'
import { useConstellations, useStarfield } from '../../hooks'
import asterisms from "../../assets/asterisms.json"
import constellations from "../../assets/constellations.json"
import type { Constellation } from '../../types'

const nightColor = new THREE.Color().setRGB(0.001, 0.0, 0.01)
const unitVec = new THREE.Vector3()

export function CelestialSphere() {
  const { mesh: starfieldMesh } = useStarfield()
  const {
    mesh: asterismsMesh,
    labels: asterismsLabels,
  } = useConstellations(asterisms as Constellation[])
  const {
    mesh: constellationsMesh,
    labels: constellationsLabels,
  } = useConstellations(constellations as Constellation[])
  const asterismsLabelsRef = useRef<THREE.Group>(null)
  const constellationsLabelsRef = useRef<THREE.Group>(null)
  const needsToRotateRef = useRef(true)
  
  useFrame(() => {
    if (needsToRotateRef.current) {
      if (asterismsLabelsRef.current) {
        asterismsLabelsRef.current.children.forEach((child) => {
          child.lookAt(unitVec)
        })
      }

      if (constellationsLabelsRef.current) {
        constellationsLabelsRef.current.children.forEach((child) => {
          child.lookAt(unitVec)
        })
      }
    }
  })

  return (
    <group>
      <primitive object={starfieldMesh} />
      <primitive object={asterismsMesh} />
      <primitive object={constellationsMesh} />
      <mesh>
        <sphereGeometry args={[2]} />
        <meshBasicMaterial color={nightColor} side={THREE.BackSide} transparent />
      </mesh>
      <group ref={asterismsLabelsRef}>
        {asterismsLabels}
      </group>
      <group ref={constellationsLabelsRef}>
        {constellationsLabels}
      </group>
    </group>
  )
}
