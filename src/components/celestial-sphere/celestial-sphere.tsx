import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from 'react'
import { useConstellations, useStarfield } from '../../hooks'
import constellations from "../../assets/constellations.json"
import type { Constellation } from '../../types'
import { Text } from '@react-three/drei'

const calcBox = new THREE.Box3()
const calcVec = new THREE.Vector3()
const nightColor = new THREE.Color().setRGB(0.001, 0.0, 0.01)
const unitVec = new THREE.Vector3()

export function CelestialSphere() {
  const { mesh: starfieldMesh } = useStarfield()
  const { constellationsGroup } = useConstellations(constellations as Constellation[])
  const labelsRef = useRef<THREE.Group>(null)
  const needsToRotateRef = useRef(true)

  const labels = useMemo(() => (
    constellationsGroup.children.map((constellation) => {
      return (
        <Text fontSize={0.01} key={constellation.id}>
          {constellation.name}
        </Text>
      )
    })
  ), [constellationsGroup])
  
  useFrame(() => {
    if (labelsRef.current) {
      labelsRef.current.children.forEach((child, index) => {
        calcBox.setFromObject(constellationsGroup.children[index])
        calcBox.getCenter(calcVec)

        child.position.copy(calcVec)

        if (needsToRotateRef.current) {
          child.lookAt(unitVec)
        }
      })
    }
  })

  return (
    <group>
      <primitive object={starfieldMesh} />
      <primitive object={constellationsGroup} />
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
