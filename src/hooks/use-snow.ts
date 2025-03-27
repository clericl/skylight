import * as THREE from 'three'
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const BASE_VELOCITY = 0.0001

const assignSRGB = (texture: THREE.Texture) => {
  texture.colorSpace = THREE.SRGBColorSpace
}

const snowGeometry = new THREE.BufferGeometry()

export function useSnow(count: number | null) {
  const [points, setPoints] = useState<THREE.Group>()

  const tex1 = useTexture('snowflake1.png', assignSRGB)
  const tex2 = useTexture('snowflake2.png', assignSRGB)
  const tex3 = useTexture('snowflake3.png', assignSRGB)
  const tex4 = useTexture('snowflake4.png', assignSRGB)
  const tex5 = useTexture('snowflake5.png', assignSRGB)

  const parameters: [number[], THREE.Texture, number][] | null = useMemo(() => {
    if (tex1 && tex2 && tex3 && tex4 && tex5) {
      return [
        [[ 1.0, 0.2, 0.5 ], tex2, 0.02 ],
        [[ 0.95, 0.1, 0.5 ], tex3, 0.015 ],
        [[ 0.90, 0.05, 0.5 ], tex1, 0.01 ],
        [[ 0.85, 0, 0.5 ], tex5, 0.08 ],
        [[ 0.80, 0, 0.5 ], tex4, 0.05 ]
      ]
    }

    return null
  }, [tex1, tex2, tex3, tex4, tex5])

  const initializeSnow = useCallback(() => {
    const group = new THREE.Group

    if (parameters) {
      const vertices = []
  
      for (let i = 0; i < (count ?? 0); i++) {
        const x = (Math.random() * 2) - 1
        const y = Math.random()
        const z = (Math.random() * 2) - 1
  
        vertices.push(x, y, z)
      }
  
      snowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  
      for (let i = 0; i < parameters.length; i++) {
        const color = parameters[i][0]
        const sprite = parameters[i][1]
        const size = parameters[i][2]
  
        const material = new THREE.PointsMaterial({
          size,
          map: sprite,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          // transparent: true,
        })
  
        material.color.setHSL(color[0], color[1], color[2], THREE.SRGBColorSpace)
  
        const particles = new THREE.Points(snowGeometry, material)
        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;
  
        group.add(particles)
      }
    }

    return group
  }, [count, parameters])

  useFrame(({ clock }) => {
    for (let i = 0; i < (points?.children.length ?? 0); i++) {
      const obj = points?.children[i]

      if (obj && obj instanceof THREE.Points) {
        // obj.rotation.y = clock.elapsedTime * 0.5 *  (i < 4 ? i + 1 : -(i + 1))

        if (obj.position.y < -0.5) {
          obj.position.set(
            (Math.random() * 2) - 1,
            (Math.random() * 0.25) + 0.5,
            (Math.random() * 2) - 1,
          )
        } else {
          obj.position.setY(obj.position.y - BASE_VELOCITY)
        }
      }
    }
  })

  useEffect(() => {
    const newPoints = initializeSnow()

    setPoints(newPoints)
  }, [initializeSnow])

  return points
}
