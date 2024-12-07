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
      camera={{ position: [12, 8, -10], fov: 50 }}
    >
      <fog attach="fog" args={["white", 0, 40]} />
      <color attach="background" args={['#c6e5db']} />
      <Environment preset="studio" />
      <AccumulativeShadows temporal frames={100} scale={60} position={[0, -3, 0]} color="lightblue">
        <RandomizedLight amount={8} ambient={0.5} intensity={3} position={[0, 25, 1]} size={20} radius={4} />
      </AccumulativeShadows>
      {children}
      <OrbitControls />
    </Canvas>
  )
}
