import * as THREE from 'three'
import { useCallback, useEffect, useState } from "react";
import { useFrame } from '@react-three/fiber';

const BASE_VELOCITY = 0.015

const calcMatrix = new THREE.Matrix4()
const calcVec = new THREE.Vector3()

const rainGeometry = new THREE.ConeGeometry(0.001, 0.04)
// const rainGeometry = new THREE.SphereGeometry(0.002)
const rainMaterial = new THREE.MeshBasicMaterial({
  color: 0x515759,
  opacity: 0.1,
  transparent: true,
})

export function useRain(count: number) {
  const [mesh] = useState(new THREE.InstancedMesh(
    rainGeometry,
    rainMaterial,
    count,
  ))

  const initializeRainPositions = useCallback(() => {
    for (let i = 0; i < count; i++) {
      calcMatrix.setPosition(
        (Math.random() * 2) - 1,
        Math.random(),
        (Math.random() * 2) - 1,
      )

      mesh.setMatrixAt(i, calcMatrix)
    }

    mesh.instanceMatrix!.needsUpdate = true
  }, [count, mesh])

  useFrame(() => {
    for (let i = 0; i < count; i++) {
      mesh.getMatrixAt(i, calcMatrix)

      calcVec.setFromMatrixPosition(calcMatrix)

      if (calcVec.y < -0.5) {
        calcMatrix.setPosition(
          (Math.random() * 2) - 1,
          (Math.random() * 0.25) + 0.5,
          (Math.random() * 2) - 1,
        )
      } else {
        calcMatrix.setPosition(
          calcVec.x,
          calcVec.y - BASE_VELOCITY,
          calcVec.z,
        )
      }

      mesh.setMatrixAt(i, calcMatrix)
    }

    mesh.instanceMatrix!.needsUpdate = true
  })

  useEffect(() => {
    initializeRainPositions()
  }, [initializeRainPositions])

  return mesh
}
