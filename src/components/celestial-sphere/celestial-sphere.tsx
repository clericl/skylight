import * as THREE from 'three'
import constellations from "../../assets/constellations.json"
import { useConstellations, useLocation, useStarfield } from '../../hooks'
import { useFrame } from "@react-three/fiber"
import { useCallback, useMemo, useRef } from 'react'
import { Moon } from '../moon'
import { Text } from '@react-three/drei'
import type { Constellation } from '../../types'
import { calcSunPosition } from '../../utils'
import { useInterval } from 'usehooks-ts'
import { CELESTIAL_UPDATE_INTERVAL } from '../../constants'

const calcBox = new THREE.Box3()
const calcVec = new THREE.Vector3()
const unitVec = new THREE.Vector3()

export function CelestialSphere() {
  const { mesh: starfieldMesh } = useStarfield()
  const { constellationsGroup, pointsMesh } = useConstellations(constellations as Constellation[])
  const labelsRef = useRef<THREE.Group>(null)
  const starsRef = useRef<THREE.Group>(null)
  const utilRef = useRef<THREE.Group>(null)
  const needsToRotateRef = useRef(true)
  const constellationsRef = useRef<THREE.Group>(null)

  const labels = useMemo(() => constellations.map(({ label }) => (
    <Text fontSize={0.01} key={label}>{label}</Text>
  )), [])

  const location = useLocation()

  const updateStarVisibility = useCallback(() => {
    if (starsRef.current) {
      const { altitude } = calcSunPosition(location.data)
  
      const smoothedOpacity = 1 - THREE.MathUtils.smoothstep(altitude, -0.3, 0.4)
  
      if (constellationsRef.current) {
        constellationsRef.current.visible = smoothedOpacity >= 0.5
      }
  
      starsRef.current.traverse((node) => {
        const mat = (node as THREE.Mesh).material as THREE.Material
  
        if (mat) {
          mat.opacity = smoothedOpacity
        }
      })
    }
  }, [location.data])

  useInterval(updateStarVisibility, CELESTIAL_UPDATE_INTERVAL)
  
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
  })

  return (
    <>
      <group ref={starsRef}>
        <primitive object={starfieldMesh} />
        <primitive object={pointsMesh} />
        <group ref={utilRef}>
          {/* <Text fontSize={0.1} position={[0, 1, -0.1]}>
            North
          </Text>
          <Text fontSize={0.1} position={[0, 1, 0.1]}>
            South
          </Text> */}
        </group>
      </group>

      <Moon />

      <group ref={constellationsRef}>
        <primitive object={constellationsGroup} />
        <group ref={labelsRef}>
          {labels}
        </group>
      </group>
    </>
  )
}
