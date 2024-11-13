import { Environment, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode } from "react";
import { Terrain } from '../../vendor/THREE.Terrain.mjs'

type ThreeSceneProps = {
  children: ReactNode;
}

export function ThreeScene({ children }: ThreeSceneProps) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 20],
        fov: 80,
      }}
    >
      <Environment preset="park" />
      <Sky />
      {children}
    </Canvas>
  )
}
