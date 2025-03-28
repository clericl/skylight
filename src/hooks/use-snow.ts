import * as THREE from 'three'
import { useCallback, useEffect, useState } from "react";
import { useFrame } from '@react-three/fiber';

const BASE_VELOCITY = 0.001

const calcMatrix = new THREE.Matrix4()
const calcObj3D = new THREE.Object3D()

const snowGeometry = new THREE.PlaneGeometry(0.01, 0.01)

export function useSnow(count: number | null, tex: THREE.Texture) {
  const generateMesh = useCallback(() => {
    const snowMaterial = new THREE.MeshBasicMaterial({
      blending: THREE.AdditiveBlending,
      alphaMap: tex,
      alphaTest: 0.5,
      color: 0xffffff,
      map: tex,
      side: THREE.DoubleSide,
    })
  
    const newMesh = new THREE.InstancedMesh(
      snowGeometry,
      snowMaterial,
      count ?? 0,
    )

    for (let i = 0; i < (count ?? 0); i++) {
      calcMatrix.setPosition(
        (Math.random() * 2) - 1,
        (Math.random() * 2),
        (Math.random() * 2) - 1,
      )

      newMesh.setMatrixAt(i, calcMatrix)
    }

    newMesh.instanceMatrix!.needsUpdate = true

    return newMesh
  }, [count, tex])

  const [mesh, setMesh] = useState<THREE.InstancedMesh>(generateMesh())

  useFrame(({ clock }) => {
    if (count) {
      for (let i = 0; i < count; i++) {
        mesh.getMatrixAt(i, calcMatrix)

        calcMatrix.decompose(calcObj3D.position, calcObj3D.quaternion, calcObj3D.scale)

        if (calcObj3D.position.y < -1) {
          calcObj3D.position.set(
            (Math.random() * 2) - 1,
            (Math.random() * 1) + 1,
            (Math.random() * 2) - 1,
          )
        } else {
          calcObj3D.position.x += (Math.cos(clock.elapsedTime + i) / 2000)
          calcObj3D.position.y -= BASE_VELOCITY
          calcObj3D.position.z += (Math.sin(clock.elapsedTime + i) / 2000)
        }

        const newRotation = clock.elapsedTime + i

        calcObj3D.rotation.set(
          newRotation,
          newRotation,
          newRotation,
        )
        
        calcObj3D.updateMatrix()
        mesh.setMatrixAt(i, calcObj3D.matrix)
      }

      mesh.instanceMatrix!.needsUpdate = true
    }
  })

  useEffect(() => {
    setMesh((prevMesh) => {
      if (prevMesh) {
        prevMesh.dispose()
      }

      return generateMesh()
    })
  }, [generateMesh])

  return mesh
}
