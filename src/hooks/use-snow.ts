import * as THREE from 'three'
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const BASE_VELOCITY = 0.001

const calcMatrix = new THREE.Matrix4()
const calcVec = new THREE.Vector3()

const snowGeometry = new THREE.PlaneGeometry(0.005, 0.005)
const snowMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  opacity: 0.9,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthTest: false,
})

const assignSRGB = (texture: THREE.Texture) => {
  texture.colorSpace = THREE.SRGBColorSpace
}

export function useSnow(count: number | null) {
  const [meshes, setMeshes] = useState<THREE.InstancedMesh[]>()

  const tex1 = useTexture('snowflake1.png', assignSRGB)
  const tex2 = useTexture('snowflake2.png', assignSRGB)
  const tex3 = useTexture('snowflake3.png', assignSRGB)
  const tex4 = useTexture('snowflake4.png', assignSRGB)
  const tex5 = useTexture('snowflake5.png', assignSRGB)

  const adjustedCount = useMemo(() => count ? Math.ceil(count / 5) : 0, [count])

  const materials: THREE.Material[] | null = useMemo(() => {
    const textures = [tex1, tex2, tex3, tex4, tex5]
    
    if (textures.every(Boolean)) {
      return textures.map((tex) => {
        const mat = snowMaterial.clone()
        mat.map = tex
        mat.alphaMap = tex

        return mat
      })
    }

    return null
  }, [tex1, tex2, tex3, tex4, tex5])

  const initializeSnow = useCallback(() => {
    const newMeshes = []

    if (materials) {
      for (const snowMaterial of materials) {
        const mesh = new THREE.InstancedMesh(
          snowGeometry,
          snowMaterial,
          adjustedCount,
        )

        for (let i = 0; i < (adjustedCount); i++) {
          calcMatrix.setPosition(
            (Math.random() * 2) - 1,
            Math.random(),
            (Math.random() * 2) - 1,
          )

          mesh.setMatrixAt(i, calcMatrix)
        }

        mesh.instanceMatrix!.needsUpdate = true
        newMeshes.push(mesh)
      }
    }

    return newMeshes
  }, [adjustedCount, materials])

  useFrame(() => {
    if (meshes) {
      for (const mesh of meshes) {
        for (let i = 0; i < adjustedCount; i++) {
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
      }
    }
  })

  useEffect(() => {
    if (adjustedCount) {
      setMeshes((prevMeshes) => {
        if (prevMeshes) {
          prevMeshes.forEach((mesh) => {
            mesh.geometry.dispose()
          })
        }

        return initializeSnow()
      })
    }
  }, [adjustedCount, initializeSnow])
}
