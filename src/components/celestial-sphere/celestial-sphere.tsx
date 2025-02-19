import * as THREE from 'three'
import constellations from "../../assets/constellations.json"
import { calcSunPosition } from '../../utils'
import { useConstellations, useLocation, useStarfield } from '../../hooks'
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from 'react'
import { Moon } from '../moon'
import { Text } from '@react-three/drei'
import type { Constellation } from '../../types'

const calcBox = new THREE.Box3()
const calcVec = new THREE.Vector3()
const nightColor = new THREE.Color().setRGB(0.001, 0.0, 0.01)
const unitVec = new THREE.Vector3()

type CelestialSphereProps = {
  fadeWithTime?: boolean;
}

export function CelestialSphere({ fadeWithTime }: CelestialSphereProps) {
  const { mesh: starfieldMesh } = useStarfield()
  const { constellationsGroup, pointsMesh } = useConstellations(constellations as Constellation[])
  const labelsRef = useRef<THREE.Group>(null)
  const starsRef = useRef<THREE.Group>(null)
  const utilRef = useRef<THREE.Group>(null)
  const needsToRotateRef = useRef(true)
  const constellationsRef = useRef<THREE.Group>(null)
  const showConstellationsRef = useRef(true)

  const labels = useMemo(() => constellations.map(({ label }) => (
    <Text fontSize={0.01} key={label}>{label}</Text>
  )), [])

  const location = useLocation()
  
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

    if (fadeWithTime && starsRef.current) {
      const { altitude } = calcSunPosition(location.data)

      const smoothedOpacity = 1 - THREE.MathUtils.smoothstep(altitude, -0.3, 0.4)

      if (labelsRef.current) {
        labelsRef.current.visible = smoothedOpacity >= 0.5
      }

      starsRef.current.traverse((node) => {
        const mat = (node as THREE.Mesh).material as THREE.Material

        if (mat) {
          mat.transparent = true
          mat.opacity = smoothedOpacity
        }
      })
    }

    if (constellationsRef.current) {
      constellationsRef.current.visible = showConstellationsRef.current
    }
  })

  return (
    <>
      <group ref={starsRef}>
        <primitive object={starfieldMesh} />
        <primitive object={constellationsGroup} ref={constellationsRef} />
        <primitive object={pointsMesh} />
        <mesh>
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
}
