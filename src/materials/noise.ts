import * as THREE from 'three'
import noiseFragment from '../shaders/noise-vertex.glsl?raw'
import noiseVertex from '../shaders/noise-vertex.glsl?raw'
import { extend, MaterialNode } from '@react-three/fiber'

const uniforms = {
  u_resolution: {
    type: 'v2',
    value: new THREE.Vector2(window.innerWidth, window.innerHeight),
  },
  u_time: {
    type: 'f',
    value: 0.0,
  },
}

export const NoiseMaterial = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: noiseVertex,
  fragmentShader: noiseFragment,
})
 
extend({ NoiseMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    noiseMaterial: MaterialNode<NoiseMaterial, typeof NoiseMaterial>
  }
}
