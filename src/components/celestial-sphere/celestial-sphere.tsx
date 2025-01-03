import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"
import { useRef } from 'react'
import { useConstellations, useStarfield } from '../../hooks'

const nightColor = new THREE.Color().setRGB(0.001, 0.0, 0.01)
const unitVec = new THREE.Vector3()

export function CelestialSphere() {
  const { mesh: starfieldMesh } = useStarfield()
  const { mesh: constellationsMesh, labels } = useConstellations()
  const labelsRef = useRef<THREE.Group>(null)
  const needsToRotateRef = useRef(true)
  
  useFrame(() => {
    if (labelsRef.current && needsToRotateRef.current) {
      labelsRef.current.children.forEach((child) => {
        child.lookAt(unitVec)
      })
    }
  })

  return (
    <group>
      <primitive object={starfieldMesh} />
      <primitive object={constellationsMesh} />
      <mesh>
        <sphereGeometry args={[2]} />
        <meshBasicMaterial color={nightColor} side={THREE.BackSide} transparent />
      </mesh>
      <group ref={labelsRef}>
        {labels}
      </group>
    </group>
  )
}
