import { AccumulativeShadows, Environment, OrbitControls, RandomizedLight } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

type ThreeSceneProps = {
  children?: ReactNode;
}

export function ThreeScene({ children }: ThreeSceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [8, 6, -6], fov: 45 }}
    >
      <fog attach="fog" args={["white", 0, 40]} />
      <color attach="background" args={['#c6e5db']} />
      <AccumulativeShadows
        temporal
        frames={100}
        color="lightblue"
        position={[0, -1, 0]}
      >
        <RandomizedLight castShadow amount={8} radius={3} ambient={0.8} position={[0, 5, 0]} />
      </AccumulativeShadows>
      <Environment preset="city" />
      {children}
      <OrbitControls />
    </Canvas>
  )
}
