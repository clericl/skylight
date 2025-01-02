import { Bloom, EffectComposer } from '@react-three/postprocessing'

export function Effects() {
  return (
    <EffectComposer>
      <Bloom
        mipmapBlur
        luminanceThreshold={1}
        intensity={2}
        luminanceSmoothing={0.9}
      />
    </EffectComposer>
  )
}
