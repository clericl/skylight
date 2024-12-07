import { useRef, useState } from "react"
import { NoiseMaterial, NoiseShadowMaterial } from "../../materials"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'

export function Cloth() {
  const [noiseMaterial] = useState(new NoiseMaterial())
  const [noiseShadowMaterial] = useState(new NoiseShadowMaterial())
  const clothRef = useRef<THREE.Mesh>(null!)
  // const shadowRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    (clothRef.current.material as NoiseMaterial).uniforms.u_time.value = state.clock.elapsedTime;
    // (shadowRef.current.material as NoiseShadowMaterial).uniforms.u_time.value = state.clock.elapsedTime;
  })

  return (
    <group position={[1, 0, -1]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh castShadow ref={clothRef} >
        <planeGeometry args={[5, 5, 64, 64]} />
        <primitive attach="material" object={noiseMaterial} />
      </mesh>
      {/* <mesh ref={shadowRef} position={[0, 0, -5]}>
        <planeGeometry args={[5, 5, 50, 50]} />
        <primitive attach="material" object={noiseShadowMaterial} />
      </mesh> */}
    </group>
  )
}
