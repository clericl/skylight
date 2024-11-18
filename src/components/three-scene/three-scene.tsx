import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Sky } from "../sky";
import { Rain } from "../rain";
import type { ReactNode } from "react";

type ThreeSceneProps = {
  children?: ReactNode;
}

export function ThreeScene({ children }: ThreeSceneProps) {
  return (
    <Canvas
      camera={{
        position: [0, 10, -10],
        fov: 80,
      }}
    >
      <Environment preset="park" />
      <ambientLight intensity={0.5} />
      <Sky />
      {children}
      <Rain />
    </Canvas>
  )
}
