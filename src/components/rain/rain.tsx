import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef, useState } from "react";
import { RainMaterial } from "../../materials";
import { Billboard, ScreenSizer, useTexture } from '@react-three/drei';
import blueTex from '../../assets/blue.jpg'

const data = new Uint8Array([200, 0, 0, 0])
const blankTex = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat)
blankTex.needsUpdate = true

export function Rain() {
  const [rainMaterial] = useState(new RainMaterial())
  const ref = useRef<THREE.Mesh>(null!)
  const tex = useTexture(blueTex)

  useFrame((state) => {
    (ref.current.material as RainMaterial).uniforms.iTime.value = state.clock.elapsedTime
  })

  useLayoutEffect(() => {
    (ref.current.material as RainMaterial).uniforms.iResolution.value = new THREE.Vector2(document.body.clientWidth, document.body.clientHeight);
    (ref.current.material as RainMaterial).uniforms.iChannel0.value = tex;
  }, [tex])

  return (
    <ScreenSizer>
      <Billboard>
        <mesh ref={ref}>
          <planeGeometry args={[document.body.clientWidth, document.body.clientHeight]} />
          <primitive attach="material" object={rainMaterial} side={THREE.DoubleSide} transparent blending={THREE.NormalBlending} />
        </mesh>
      </Billboard>
    </ScreenSizer>
  )
}
