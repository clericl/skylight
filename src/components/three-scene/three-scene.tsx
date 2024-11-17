import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Sky } from "../sky";
import { Terrain } from "../terrain";
import type { ReactNode } from "react";

type ThreeSceneProps = {
  children?: ReactNode;
}

export function ThreeScene({ children }: ThreeSceneProps) {

  return (
    <Canvas
      camera={{
        position: [0, 100, -100],
        fov: 80,
      }}
    >
      <Environment preset="park" />
      <ambientLight intensity={0.5} />
      <Sky />
      {/* <Terrain /> */}
      {children}
      <OrbitControls />
    </Canvas>
  )
}
