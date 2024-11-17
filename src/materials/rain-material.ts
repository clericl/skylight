import * as THREE from 'three'

class RainMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      defines: {
        USE_POST_PROCESSING: true,
      },
      uniforms: {
        
      }
    })
  }
}
