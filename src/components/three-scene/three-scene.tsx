import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Sky } from "../sky";
import { Effects } from "../effects";
import type { ReactNode } from "react";

type ThreeSceneProps = {
  children?: ReactNode;
}

export function ThreeScene({ children }: ThreeSceneProps) {
  return (
    <Canvas
      shadows
      camera={{
        position: [0, -0.01, 0],
        fov: 70,
      }}
    >
      <color attach="background" args={['#000000']} />
      <Sky />
      {children}
      <OrbitControls />
      <Effects />
    </Canvas>
  )
}
