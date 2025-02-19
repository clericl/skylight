import * as THREE from 'three'
import { Cloud, Clouds as DreiClouds } from "@react-three/drei";

const CONTRAST_COLOR = new THREE.Color('#858585')
const CLOUD_COLOR = new THREE.Color('#d6d6d6')

export function Clouds() {
  return (
    <DreiClouds limit={2000} material={THREE.MeshBasicMaterial}>
      <Cloud
        bounds={[15, 1.5, 15]}
        color={CONTRAST_COLOR}
        concentrate="outside"
        segments={500}
        scale={0.11}
        speed={0.1}
        volume={5}
        smallestVolume={1}
        position={[0, 0.5, 0]}
        />
      <Cloud
        bounds={[15, 1.5, 15]}
        color={CLOUD_COLOR}
        concentrate="inside"
        segments={500}
        scale={0.11}
        speed={0.2}
        volume={5}
        smallestVolume={0.75}
      />
    </DreiClouds>
  )
}
