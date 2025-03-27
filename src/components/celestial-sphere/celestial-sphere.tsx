import * as THREE from 'three'
import constellations from "../../assets/constellations.json"
import { calcSunPosition } from '../../utils'
import { useCallback, useMemo, useRef } from 'react'
import { useConstellations, useLocation, useStarfield } from '../../hooks'
import { useFrame } from "@react-three/fiber"
import { useInterval } from 'usehooks-ts'
import { Moon } from '../moon'
import { Text } from '@react-three/drei'
import { CELESTIAL_UPDATE_INTERVAL } from '../../constants'
import type { Constellation } from '../../types'

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
    const { altitude } = calcSunPosition(location.data)

    const smoothedOpacity = 1 - THREE.MathUtils.smoothstep(altitude, -0.3, 0.4)

    if (starsRef.current) {      
      starsRef.current.visible = smoothedOpacity >= 0.5

      starsRef.current.traverse((node) => {
        const mat = (node as THREE.Mesh).material as THREE.Material
        
        if (mat) {
          mat.opacity = smoothedOpacity
        }
      })
    }

    if (constellationsRef.current) {
      constellationsRef.current.visible = smoothedOpacity >= 0.5
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
      <group ref={starsRef} visible={false}>
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

      <group ref={constellationsRef} visible={false}>
        <primitive object={constellationsGroup} />
        <group ref={labelsRef}>
          {labels}
        </group>
      </group>
    </>
  )
}
