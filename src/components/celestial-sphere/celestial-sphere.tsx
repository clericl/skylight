import * as THREE from 'three'
import constellations from "../../assets/constellations.json"
import { useFrame } from "@react-three/fiber"
import { Text } from '@react-three/drei'
import { ForwardedRef, forwardRef, useMemo, useRef } from 'react'
import { useConstellations, useStarfield } from '../../hooks'
import type { Constellation } from '../../types'
import { Moon } from '../moon'

const calcBox = new THREE.Box3()
const calcVec = new THREE.Vector3()
const nightColor = new THREE.Color().setRGB(0.001, 0.0, 0.01)
const unitVec = new THREE.Vector3()

export const CelestialSphere = forwardRef(function(_, ref: ForwardedRef<THREE.Group>) {
  const { mesh: starfieldMesh } = useStarfield()
  const { constellationsGroup, pointsMesh } = useConstellations(constellations as Constellation[])
  const labelsRef = useRef<THREE.Group>(null)
  const utilRef = useRef<THREE.Group>(null)
  const needsToRotateRef = useRef(true)
  const constellationsRef = useRef<THREE.Group>(null)
  const showConstellationsRef = useRef(true)

  const labels = useMemo(() => constellations.map(({ label }) => (
    <Text fontSize={0.01} key={label}>{label}</Text>
  )), [])
  
  useFrame(() => {
    if (labelsRef.current) {
      labelsRef.current.children.forEach((child, index) => {
        calcBox.setFromObject(constellationsGroup.children[index])
        calcBox.getCenter(calcVec)

        child.position.copy(calcVec).normalize()
      })

      if (needsToRotateRef.current) {
        labelsRef.current.children.forEach((child) => {
          child.lookAt(unitVec)
        })
        utilRef.current!.children.forEach((child) => {
          child.lookAt(unitVec)
        })
      }
    }

    if (constellationsRef.current) {
      constellationsRef.current.visible = showConstellationsRef.current
    }
  })

  return (
    <>
      <group ref={ref}>
        <primitive object={starfieldMesh} />
        <primitive object={constellationsGroup} ref={constellationsRef} />
        <primitive object={pointsMesh} />
        <mesh onClick={() => showConstellationsRef.current = !showConstellationsRef.current}>
          <sphereGeometry args={[2]} />
          <meshBasicMaterial color={nightColor} side={THREE.BackSide} transparent />
        </mesh>
        <group ref={utilRef}>
          <Text fontSize={0.1} position={[0, 1, -0.1]}>
            North
          </Text>
          <Text fontSize={0.1} position={[0, 1, 0.1]}>
            South
          </Text>
        </group>
      </group>

      <Moon />

      <group ref={labelsRef}>
        {labels}
      </group>
    </>
  )
})
